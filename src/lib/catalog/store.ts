import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import type { CatalogData } from "./types";

const CATALOG_PATH = path.join(process.cwd(), "data", "catalog.json");

function defaultCatalog(nowIso: string): CatalogData {
  return {
    version: 1,
    updatedAt: nowIso,
    categories: [],
    products: [],
  };
}

export async function readCatalog(): Promise<CatalogData> {
  const nowIso = new Date().toISOString();
  try {
    const raw = await fs.readFile(CATALOG_PATH, "utf8");
    const parsed = JSON.parse(raw) as CatalogData;
    if (parsed?.version !== 1 || !Array.isArray(parsed.categories) || !Array.isArray(parsed.products)) {
      return defaultCatalog(nowIso);
    }
    return parsed;
  } catch (err) {
    const e = err as NodeJS.ErrnoException;
    if (e.code === "ENOENT") return defaultCatalog(nowIso);
    throw err;
  }
}

export async function writeCatalog(next: CatalogData): Promise<void> {
  const dir = path.dirname(CATALOG_PATH);
  await fs.mkdir(dir, { recursive: true });

  const tmpPath = `${CATALOG_PATH}.tmp`;
  const payload = JSON.stringify(next, null, 2) + "\n";
  await fs.writeFile(tmpPath, payload, "utf8");
  await fs.rename(tmpPath, CATALOG_PATH);
}

