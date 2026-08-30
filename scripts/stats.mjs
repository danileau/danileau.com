#!/usr/bin/env node
/**
 * Holt die Zahlen, die kein Datum hergibt, zur Build-Zeit aus ihrer Quelle
 * und schreibt sie nach src/data/stats.json.
 *
 * Warum Build-Zeit und nicht im Browser: ein Fetch pro Seitenaufruf ist
 * ratenbegrenzt, langsam und scheitert still. Ein Fetch pro Deployment ist
 * keins von beidem.
 *
 * Fehlschlag ist kein Fehler. Ohne Netz bleibt die zuletzt committete Datei
 * stehen — die Zahl ist dann alt, aber sie war einmal wahr, und `asOf` sagt
 * seit wann. Ein Build darf nicht daran scheitern, dass GitHub gerade hustet.
 */
import { readFile, writeFile } from "node:fs/promises";

const OUT = new URL("../src/data/stats.json", import.meta.url);
const UA = { "User-Agent": "danileau.com-build", Accept: "application/vnd.github+json" };

async function json(url) {
  const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function text(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function collect() {
  const repos = await json("https://api.github.com/users/danileau/repos?per_page=100&type=owner");
  const publicRepos = repos.filter((r) => !r.private && !r.fork && !r.archived);

  // Die Blueprint-Zahl steht in ciphras eigener Doku. Sie dort zu lesen heisst,
  // dass sie sich nicht zweimal ändern muss.
  let blueprints = null;
  try {
    const features = await text(
      "https://raw.githubusercontent.com/danileau/ciphra/main/docs/FEATURES.md",
    );
    const hit = features.match(/one of (\d+)\s+condition/i);
    if (hit) blueprints = Number(hit[1]);
  } catch {
    /* optional — fällt auf den letzten bekannten Wert zurück */
  }

  const ciphra = publicRepos.find((r) => r.name === "ciphra");
  const ppp = publicRepos.find((r) => r.name === "prettypleaseprint");

  return {
    asOf: new Date().toISOString().slice(0, 10),
    publicRepos: publicRepos.length,
    stars: publicRepos.reduce((n, r) => n + r.stargazers_count, 0),
    ciphraStars: ciphra?.stargazers_count ?? null,
    pppStars: ppp?.stargazers_count ?? null,
    blueprints,
  };
}

async function main() {
  let previous = null;
  try {
    previous = JSON.parse(await readFile(OUT, "utf8"));
  } catch {
    /* erster Lauf */
  }

  try {
    const fresh = await collect();
    // Ein fehlgeschlagenes Teilstück darf einen guten alten Wert nicht löschen.
    if (fresh.blueprints == null && previous?.blueprints != null) {
      fresh.blueprints = previous.blueprints;
    }
    await writeFile(OUT, JSON.stringify(fresh, null, 2) + "\n");
    console.log(`stats: ${fresh.publicRepos} Repos, ${fresh.stars} Stars, ${fresh.blueprints} Blueprints (${fresh.asOf})`);
  } catch (err) {
    if (previous) {
      console.warn(`stats: Abruf fehlgeschlagen (${err.message}) — behalte Stand ${previous.asOf}`);
      return;
    }
    console.warn(`stats: Abruf fehlgeschlagen (${err.message}) — schreibe leeren Stand`);
    await writeFile(
      OUT,
      JSON.stringify({ asOf: null, publicRepos: null, stars: null, ciphraStars: null, pppStars: null, blueprints: null }, null, 2) + "\n",
    );
  }
}

main();
