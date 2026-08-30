#!/usr/bin/env bash
#
# danileau.com deploy wizard — the single entry point for putting the site live.
#
# Runs FROM THE CHECKOUT, because unlike a container deployment the artefact
# does not exist until something builds it. The host is plain Apache with no
# toolchain, so it receives files, never a build.
#
# It answers the questions a bare `rsync -a dist/ host:/var/www/` does not:
#   1. WHICH build?  → builds from the current tree, records which commit it
#      came from, and refuses a dirty tree unless you say otherwise. `--status`
#      shows what is live, what releases the host is holding, and whether the
#      tree you are standing in would change anything.
#   2. IS IT INTACT? → checksums every file locally, uploads into a NEW dated
#      release directory beside the live one, then re-checksums on the host
#      before anything is switched. A half-finished upload is never reachable,
#      because nothing points at it yet.
#   3. DID IT WORK?  → the switch is one symlink move, so it is atomic. Then it
#      fetches the live URL and checks the build stamp actually changed. If it
#      does not come good, the symlink goes back to the previous release on its
#      own, and it tells you it did.
#
# Nothing is uploaded or switched without an explicit y/N.
#
# Configuration is READ, never guessed. Guessing the target of a deployment is
# not a cosmetic error — it silently publishes to the wrong place — so a
# missing deploy.conf writes a template and stops.
#
# Usage:
#   ./scripts/deploy-wizard.sh              # build, upload, switch, verify
#   ./scripts/deploy-wizard.sh --status     # read-only
#   ./scripts/deploy-wizard.sh --rollback   # pick an older release
#   ./scripts/deploy-wizard.sh --keep 10    # how many releases to retain

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONF="$ROOT/deploy.conf"

# ----- pretty ---------------------------------------------------------------
if [ -t 1 ]; then
  B=$'\e[1m'; DIM=$'\e[2m'; R=$'\e[0m'
  RED=$'\e[31m'; GRN=$'\e[32m'; YLW=$'\e[33m'; CYN=$'\e[36m'
else
  B=""; DIM=""; R=""; RED=""; GRN=""; YLW=""; CYN=""
fi
die()  { echo "${RED}✗ $*${R}" >&2; exit 1; }
ok()   { echo "${GRN}✓${R} $*"; }
warn() { echo "${YLW}!${R} $*"; }
step() { echo; echo "${B}$*${R}"; }
hr()   { printf '%s\n' "${DIM}────────────────────────────────────────────────────────────${R}"; }

# ----- args -----------------------------------------------------------------
MODE="deploy"
KEEP=""
while [ $# -gt 0 ]; do
  case "$1" in
    --status)   MODE="status"; shift ;;
    --rollback) MODE="rollback"; shift ;;
    --keep)     KEEP="${2:?--keep needs a number}"; shift 2 ;;
    -h|--help)  sed -n '2,35p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) die "unknown argument: $1" ;;
  esac
done

# ----- config ---------------------------------------------------------------
if [ ! -f "$CONF" ]; then
  cat > "$CONF" <<'TEMPLATE'
# danileau.com deployment target. Not in git — it names a host.
#
# DEPLOY_HOST   ssh destination, as ssh would take it (user@host, or a Host
#               alias out of ~/.ssh/config, which is the tidier option)
# DEPLOY_ROOT   where releases are kept. It MUST sit outside the web root, or
#               every past release is browsable at your own domain.
# DEPLOY_LINK   the path the web server serves. On shared hosting you cannot
#               edit a vhost, so this path itself becomes the symlink that gets
#               swapped. It is what "deploying" actually means here.
# DEPLOY_URL    the public URL, used to check the deployment actually landed
DEPLOY_HOST="user@host.example"
DEPLOY_ROOT="/home/user/deploy/danileau.com"
DEPLOY_LINK="/home/user/www/danileau.com"
DEPLOY_URL="https://danileau.com"
TEMPLATE
  echo "${YLW}Wrote a template to deploy.conf.${R}"
  echo "Fill in the three values and run this again. Nothing was uploaded."
  exit 1
fi
# shellcheck source=/dev/null
. "$CONF"
: "${DEPLOY_HOST:?DEPLOY_HOST missing from deploy.conf}"
: "${DEPLOY_ROOT:?DEPLOY_ROOT missing from deploy.conf}"
: "${DEPLOY_LINK:?DEPLOY_LINK missing from deploy.conf}"
: "${DEPLOY_URL:?DEPLOY_URL missing from deploy.conf}"
[ "$DEPLOY_HOST" = "user@host.example" ] && die "deploy.conf still holds the template values"
case "$DEPLOY_ROOT" in
  "$DEPLOY_LINK"|"$DEPLOY_LINK"/*)
    die "DEPLOY_ROOT sits inside DEPLOY_LINK. Every release would be reachable at $DEPLOY_URL. Move it outside the web root." ;;
esac
case "$DEPLOY_ROOT" in
  */www/*|*/public_html/*|*/htdocs/*)
    warn "DEPLOY_ROOT looks like it is under a web root — check that $DEPLOY_URL cannot serve $DEPLOY_ROOT/releases" ;;
esac

KEEP="${KEEP:-${DEPLOY_KEEP:-5}}"
HEALTH_TIMEOUT="${DEPLOY_HEALTH_TIMEOUT:-60}"

# ----- preflight ------------------------------------------------------------
for c in ssh rsync curl git npm; do command -v "$c" >/dev/null || die "$c is required"; done
ssh -o BatchMode=yes -o ConnectTimeout=8 "$DEPLOY_HOST" true 2>/dev/null \
  || die "cannot reach $DEPLOY_HOST over ssh without a prompt — is your key loaded?"

remote() { ssh -o BatchMode=yes "$DEPLOY_HOST" "$@"; }

# Checksums are compared across two operating systems, so neither the tool nor
# the collation can be assumed. `sort` under en_US.UTF-8 ignores the leading dot
# in .htaccess and files it among the letters; BSD sort uses byte order and puts
# it first. Same bytes, different order, different aggregate — a green upload
# reported as corruption. LC_ALL=C makes both sides agree, and the lists are
# compared line by line so a real mismatch can name the file.
SUMCMD='if command -v sha256sum >/dev/null 2>&1; then sha256sum "$@"; else shasum -a 256 "$@"; fi'
sums_local()  { ( cd "$1" && find . -type f ! -name .build.json -exec sha256sum {} + | LC_ALL=C sort -k2 ); }
sums_remote() { remote "cd '$1' && find . -type f ! -name .build.json -exec sh -c '$SUMCMD' _ {} + | LC_ALL=C sort -k2"; }

live_release()   { remote "readlink '$DEPLOY_LINK' 2>/dev/null | xargs -r basename" || true; }
list_releases()  { remote "ls -1 '$DEPLOY_ROOT/releases' 2>/dev/null | sort -r" || true; }
live_stamp()     { curl -fsS --max-time 10 "$DEPLOY_URL/.build.json" 2>/dev/null || true; }

# ----- status ---------------------------------------------------------------
show_status() {
  step "On $DEPLOY_HOST"
  local cur; cur="$(live_release)"
  if [ -n "$cur" ]; then
    ok "$DEPLOY_LINK → ${CYN}$cur${R}"
  elif remote "[ -d '$DEPLOY_LINK' ] && [ ! -L '$DEPLOY_LINK' ]"; then
    warn "$DEPLOY_LINK is a real directory, not a symlink — this host has never been deployed by the wizard"
  else
    warn "$DEPLOY_LINK does not exist yet"
  fi

  local rels; rels="$(list_releases)"
  if [ -n "$rels" ]; then
    echo "${DIM}releases held:${R}"
    echo "$rels" | head -"$KEEP" | while read -r r; do
      [ "$r" = "$cur" ] && echo "  $r ${GRN}← live${R}" || echo "  $r"
    done
  fi

  step "At $DEPLOY_URL"
  local stamp; stamp="$(live_stamp)"
  if [ -n "$stamp" ]; then echo "  $stamp"; else warn "no /.build.json served — either not deployed by this wizard, or the site is down"; fi

  step "In this checkout"
  echo "  commit  $(git -C "$ROOT" rev-parse --short HEAD) on $(git -C "$ROOT" rev-parse --abbrev-ref HEAD)"
  if [ -n "$(git -C "$ROOT" status --porcelain -uno)" ]; then
    warn "tracked files are modified — a deployment would ship uncommitted changes"
  else
    ok "no uncommitted changes to tracked files"
  fi
  local untracked; untracked="$(git -C "$ROOT" ls-files --others --exclude-standard | wc -l | tr -d ' ')"
  [ "$untracked" != "0" ] && echo "  ${DIM}($untracked untracked file(s), which the build does not read)${R}"
}

if [ "$MODE" = "status" ]; then show_status; exit 0; fi

# ----- rollback -------------------------------------------------------------
if [ "$MODE" = "rollback" ]; then
  cur="$(live_release)"
  mapfile -t rels < <(list_releases)
  [ "${#rels[@]}" -gt 1 ] || die "there is nothing to roll back to"
  step "Pick a release to point at"
  for i in "${!rels[@]}"; do
    [ "${rels[$i]}" = "$cur" ] && echo "  $((i+1))) ${rels[$i]} ${GRN}← live${R}" || echo "  $((i+1))) ${rels[$i]}"
  done
  read -rp "number: " pick
  target="${rels[$((pick-1))]:-}"
  [ -n "$target" ] || die "no such entry"
  [ "$target" = "$cur" ] && die "that one is already live"
  read -rp "Point $DEPLOY_URL at $target? [y/N] " a
  [ "$a" = "y" ] || { echo "Left alone."; exit 0; }
  remote "ln -sfn '$DEPLOY_ROOT/releases/$target' '$DEPLOY_LINK.tmp' && mv -Tf '$DEPLOY_LINK.tmp' '$DEPLOY_LINK'"
  ok "$DEPLOY_LINK → $target"
  exit 0
fi

# ----- 0. first run: adopt whatever is already live -------------------------
# A host that has never been deployed by this wizard has a real directory where
# the symlink needs to be. Deleting it would throw away the only thing you could
# roll back to, so it becomes the first release instead.
if remote "[ -d '$DEPLOY_LINK' ] && [ ! -L '$DEPLOY_LINK' ]"; then
  ADOPTED="adopted-$(date -u +%Y%m%d-%H%M%S)"
  step "First run on this host"
  echo "$DEPLOY_LINK is a real directory. To switch releases atomically it has to"
  echo "become a symlink, so what is live now moves to:"
  echo "  ${CYN}$DEPLOY_ROOT/releases/$ADOPTED${R}"
  echo "and stays available to --rollback."
  echo
  echo "${DIM}What is in there today:${R}"
  remote "ls -1 '$DEPLOY_LINK'" | sed 's/^/  /'
  echo
  warn "Anything above that 'npm run build' does not produce will NOT be in the next"
  warn "release. Copy it into dist/ (or public/) first if you want to keep it."
  echo
  echo "${DIM}The site is unreachable between the move and the link — well under a second.${R}"
  read -rp "Adopt it and switch to a symlink? [y/N] " a
  [ "$a" = "y" ] || { echo "Nothing changed."; exit 0; }
  remote "mkdir -p '$DEPLOY_ROOT/releases' && mv '$DEPLOY_LINK' '$DEPLOY_ROOT/releases/$ADOPTED' && ln -s '$DEPLOY_ROOT/releases/$ADOPTED' '$DEPLOY_LINK'"
  ok "adopted as $ADOPTED, and $DEPLOY_LINK is now a symlink"
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$DEPLOY_URL" || echo 000)"
  [ "$code" = "200" ] && ok "$DEPLOY_URL still answers 200" || warn "$DEPLOY_URL answered $code — check before continuing"
fi

# ----- 1. which build -------------------------------------------------------
show_status
hr
SHA="$(git -C "$ROOT" rev-parse --short HEAD)"
if [ -n "$(git -C "$ROOT" status --porcelain -uno)" ]; then
  read -rp "Tracked files are modified. Build and ship them anyway? [y/N] " a
  [ "$a" = "y" ] || { echo "Nothing done."; exit 0; }
  SHA="$SHA-dirty"
fi

RELEASE="$(date -u +%Y%m%d-%H%M%S)"
step "1/3  Building $RELEASE from $SHA"
( cd "$ROOT" && npm run build >/dev/null ) || die "the build failed — nothing was uploaded"
[ -f "$ROOT/dist/index.html" ] || die "dist/index.html is missing after the build"

# The stamp is what makes step 3 an actual check rather than a 200 from cache.
cat > "$ROOT/dist/.build.json" <<JSON
{"release":"$RELEASE","commit":"$SHA","builtAt":"$(date -u +%Y-%m-%dT%H:%M:%SZ)"}
JSON
ok "$(find "$ROOT/dist" -type f | wc -l | tr -d ' ') files, $(du -sh "$ROOT/dist" | cut -f1)"

# ----- 2. upload beside the live one, then verify ---------------------------
step "2/3  Uploading to releases/$RELEASE"
echo "${DIM}Nothing points at it yet, so a partial upload is unreachable.${R}"
read -rp "Upload to $DEPLOY_HOST? [y/N] " a
[ "$a" = "y" ] || { echo "Nothing uploaded."; exit 0; }

remote "mkdir -p '$DEPLOY_ROOT/releases/$RELEASE'"
rsync -a --delete --checksum "$ROOT/dist/" "$DEPLOY_HOST:$DEPLOY_ROOT/releases/$RELEASE/"

# Re-checksum on the host. rsync reporting success is not the same as the bytes
# being right, and this is the last moment it is cheap to find out.
LOCAL_SUMS="$(sums_local "$ROOT/dist")"
REMOTE_SUMS="$(sums_remote "$DEPLOY_ROOT/releases/$RELEASE")"
if [ "$LOCAL_SUMS" != "$REMOTE_SUMS" ]; then
  echo "${RED}These differ between here and the host:${R}"
  diff <(printf '%s\n' "$LOCAL_SUMS") <(printf '%s\n' "$REMOTE_SUMS") | sed 's/^/  /' || true
  remote "rm -rf '$DEPLOY_ROOT/releases/$RELEASE'"
  die "checksums differ after upload — the release was removed, nothing was switched"
fi
ok "$(printf '%s\n' "$LOCAL_SUMS" | wc -l | tr -d ' ') files verified byte for byte on the host"

# ----- 3. switch, then prove it ---------------------------------------------
PREVIOUS="$(live_release)"
step "3/3  Switching"
read -rp "Point $DEPLOY_URL at $RELEASE? [y/N] " a
[ "$a" = "y" ] || { echo "Uploaded but not switched. It is at releases/$RELEASE."; exit 0; }

# mv -T on a symlink is atomic: no request ever sees a missing docroot.
remote "ln -sfn '$DEPLOY_ROOT/releases/$RELEASE' '$DEPLOY_LINK.tmp' && mv -Tf '$DEPLOY_LINK.tmp' '$DEPLOY_LINK'"
ok "$DEPLOY_LINK → $RELEASE"

echo -n "Checking $DEPLOY_URL "
deadline=$(( $(date +%s) + HEALTH_TIMEOUT ))
landed=0
while [ "$(date +%s)" -lt "$deadline" ]; do
  if curl -fsS --max-time 10 "$DEPLOY_URL/.build.json" 2>/dev/null | grep -q "\"release\":\"$RELEASE\""; then
    landed=1; break
  fi
  echo -n "."
  sleep 3
done
echo

if [ "$landed" -eq 1 ]; then
  ok "$RELEASE is live and serving its own stamp"
else
  warn "the site is not serving $RELEASE within ${HEALTH_TIMEOUT}s"
  if [ -n "$PREVIOUS" ]; then
    remote "ln -sfn '$DEPLOY_ROOT/releases/$PREVIOUS' '$DEPLOY_LINK.tmp' && mv -Tf '$DEPLOY_LINK.tmp' '$DEPLOY_LINK'"
    die "rolled back to $PREVIOUS. The bad release is still at releases/$RELEASE if you want to look at it."
  fi
  die "there is no previous release to roll back to. releases/$RELEASE is still in place."
fi

# ----- prune ----------------------------------------------------------------
OLD="$(list_releases | tail -n +$((KEEP+1)))"
if [ -n "$OLD" ]; then
  echo
  echo "${DIM}Older than the last $KEEP:${R}"; echo "$OLD" | sed 's/^/  /'
  read -rp "Remove them? [y/N] " a
  if [ "$a" = "y" ]; then
    echo "$OLD" | while read -r r; do
      [ -n "$r" ] && [ "$r" != "$RELEASE" ] && remote "rm -rf '$DEPLOY_ROOT/releases/$r'"
    done
    ok "pruned"
  fi
fi

hr
ok "Done. $DEPLOY_URL is serving $RELEASE ($SHA)."
