#!/usr/bin/env node
import { mkdirSync, existsSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://gamefer.grok.me";

const FILES = [
  "public/favicon.svg",
  "public/og.jpg",
  "public/x-banner.jpg",
  "public/media/gamefer-avatar.png",
  "public/media/hero-forest.jpg",
  "public/media/yt-sonic.jpg",
  "public/media/yt-99nights.jpg",
  "public/media/yt-creepypasta.jpg",
  "public/media/yt-fungle.jpg",
  "public/media/yt-hacks.jpg",
  "public/media/yt-pomni.jpg",
  "public/media/yt-f3r-bingo.jpg",
  "public/media/yt-f3r-bluey.jpg",
  "public/media/yt-f3r-rainbow.jpg",
  "public/media/yt-f3r-falsity.jpg",
];

async function pull(rel) {
  const dest = join(root, rel);
  mkdirSync(dirname(dest), { recursive: true });
  if (existsSync(dest) && statSync(dest).size > 800) return;
  const url = `${BASE}/${rel.replace(/^public\//, "")}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`[fetch-media] skip ${rel} (${res.status})`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
  console.log(`[fetch-media] ${rel} ${buf.length} bytes`);
}

await Promise.all(FILES.map(pull));
