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
# DEPLOY_ROOT   directory on the host that holds releases/ and the current
#               symlink. Apache's DocumentRoot must point at $DEPLOY_ROOT/current
# DEPLOY_URL    the public URL, used to check the deployment actually landed
DEPLOY_HOST="user@host.example"
DEPLOY_ROOT="/var/www/danileau.com"
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
: "${DEPLOY_URL:?DEPLOY_URL missing from deploy.conf}"
[ "$DEPLOY_HOST" = "user@host.example" ] && die "deploy.conf still holds the template values"

KEEP="${KEEP:-${DEPLOY_KEEP:-5}}"
HEALTH_TIMEOUT="${DEPLOY_HEALTH_TIMEOUT:-60}"

# ----- preflight ------------------------------------------------------------
for c in ssh rsync curl git npm; do command -v "$c" >/dev/null || die "$c is required"; done
ssh -o BatchMode=yes -o ConnectTimeout=8 "$DEPLOY_HOST" true 2>/dev/null \
  || die "cannot reach $DEPLOY_HOST over ssh without a prompt — is your key loaded?"

remote() { ssh -o BatchMode=yes "$DEPLOY_HOST" "$@"; }

live_release()   { remote "readlink '$DEPLOY_ROOT/current' 2>/dev/null | xargs -r basename" || true; }
list_releases()  { remote "ls -1 '$DEPLOY_ROOT/releases' 2>/dev/null | sort -r" || true; }
live_stamp()     { curl -fsS --max-time 10 "$DEPLOY_URL/.build.json" 2>/dev/null || true; }

# ----- status ---------------------------------------------------------------
show_status() {
  step "On $DEPLOY_HOST"
  local cur; cur="$(live_release)"
  if [ -n "$cur" ]; then ok "current → ${CYN}$cur${R}"; else warn "no current symlink yet — nothing deployed"; fi

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
  if [ -n "$(git -C "$ROOT" status --porcelain)" ]; then
    warn "working tree is dirty — a deployment would ship uncommitted changes"
  else
    ok "working tree is clean"
  fi
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
  remote "ln -sfn '$DEPLOY_ROOT/releases/$target' '$DEPLOY_ROOT/current.tmp' && mv -Tf '$DEPLOY_ROOT/current.tmp' '$DEPLOY_ROOT/current'"
  ok "current → $target"
  exit 0
fi

# ----- 1. which build -------------------------------------------------------
show_status
hr
SHA="$(git -C "$ROOT" rev-parse --short HEAD)"
if [ -n "$(git -C "$ROOT" status --porcelain)" ]; then
  read -rp "The tree is dirty. Build and ship it anyway? [y/N] " a
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
LOCAL_SUM="$( cd "$ROOT/dist" && find . -type f ! -name .build.json -exec sha256sum {} + | sort -k2 | sha256sum | cut -d' ' -f1 )"
REMOTE_SUM="$( remote "cd '$DEPLOY_ROOT/releases/$RELEASE' && find . -type f ! -name .build.json -exec sha256sum {} + | sort -k2 | sha256sum | cut -d' ' -f1" )"
[ "$LOCAL_SUM" = "$REMOTE_SUM" ] || {
  remote "rm -rf '$DEPLOY_ROOT/releases/$RELEASE'"
  die "checksums differ after upload — the release was removed, nothing was switched"
}
ok "checksums match (${LOCAL_SUM:0:12}…)"

# ----- 3. switch, then prove it ---------------------------------------------
PREVIOUS="$(live_release)"
step "3/3  Switching"
read -rp "Point $DEPLOY_URL at $RELEASE? [y/N] " a
[ "$a" = "y" ] || { echo "Uploaded but not switched. It is at releases/$RELEASE."; exit 0; }

# mv -T on a symlink is atomic: no request ever sees a missing docroot.
remote "ln -sfn '$DEPLOY_ROOT/releases/$RELEASE' '$DEPLOY_ROOT/current.tmp' && mv -Tf '$DEPLOY_ROOT/current.tmp' '$DEPLOY_ROOT/current'"
ok "current → $RELEASE"

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
    remote "ln -sfn '$DEPLOY_ROOT/releases/$PREVIOUS' '$DEPLOY_ROOT/current.tmp' && mv -Tf '$DEPLOY_ROOT/current.tmp' '$DEPLOY_ROOT/current'"
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
