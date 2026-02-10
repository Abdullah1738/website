import "server-only";

import { readCatalog } from "./store";
import type { Category, Product } from "./types";

export async function getPublicCatalog(): Promise<{ categories: Category[]; products: Product[] }> {
  const catalog = await readCatalog();
  const categories = [...catalog.categories].sort((a, b) => a.name.localeCompare(b.name));

  const categoryIds = new Set(categories.map((c) => c.id));
  const products = catalog.products
    .filter((p) => categoryIds.has(p.categoryId))
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return { categories, products };
}

