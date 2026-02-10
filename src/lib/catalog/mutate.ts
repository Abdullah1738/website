import "server-only";

import crypto from "node:crypto";

import type { CatalogData, Category, Product, ProductBadgeVariant } from "./types";
import { readCatalog, writeCatalog } from "./store";

function nowIso(): string {
  return new Date().toISOString();
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueId(base: string, used: Set<string>): string {
  if (!used.has(base)) return base;
  for (let i = 0; i < 10; i += 1) {
    const suffix = crypto.randomBytes(2).toString("hex");
    const candidate = `${base}-${suffix}`;
    if (!used.has(candidate)) return candidate;
  }
  return crypto.randomUUID();
}

function normalizeName(s: string): string {
  return s.trim().replace(/\s+/g, " ");
}

export async function createCategory(nameRaw: string): Promise<Category> {
  const name = normalizeName(nameRaw);
  if (!name) throw new Error("Category name is required.");
  if (name.length > 60) throw new Error("Category name is too long (max 60 chars).");

  const catalog = await readCatalog();
  const exists = catalog.categories.some((c) => c.name.toLowerCase() === name.toLowerCase());
  if (exists) throw new Error("Category already exists.");

  const usedIds = new Set(catalog.categories.map((c) => c.id));
  const baseId = slugify(name) || crypto.randomUUID();
  const id = uniqueId(baseId, usedIds);

  const createdAt = nowIso();
  const category: Category = { id, name, createdAt };

  const next: CatalogData = {
    ...catalog,
    updatedAt: createdAt,
    categories: [...catalog.categories, category],
  };
  await writeCatalog(next);
  return category;
}

export async function deleteCategory(categoryId: string): Promise<void> {
  const catalog = await readCatalog();
  const beforeCount = catalog.categories.length;
  const nextCategories = catalog.categories.filter((c) => c.id !== categoryId);
  if (nextCategories.length === beforeCount) return;

  const nextProducts = catalog.products.filter((p) => p.categoryId !== categoryId);
  const updatedAt = nowIso();
  const next: CatalogData = {
    ...catalog,
    updatedAt,
    categories: nextCategories,
    products: nextProducts,
  };
  await writeCatalog(next);
}

export type CreateProductInput = {
  categoryId: string;
  name: string;
  description: string;
  priceLabel: string;
  imageUrl: string;
  imageAlt: string;
  badgeText?: string;
  badgeVariant?: ProductBadgeVariant;
};

export async function createProduct(input: CreateProductInput): Promise<Product> {
  const categoryId = input.categoryId.trim();
  const name = normalizeName(input.name);
  const description = input.description.trim();
  const priceLabel = input.priceLabel.trim();
  const imageUrl = input.imageUrl.trim();
  const imageAlt = input.imageAlt.trim() || name;
  const badgeText = input.badgeText?.trim() || undefined;
  const badgeVariant = input.badgeVariant;

  if (!categoryId) throw new Error("Category is required.");
  if (!name) throw new Error("Product name is required.");
  if (name.length > 80) throw new Error("Product name is too long (max 80 chars).");
  if (!description) throw new Error("Product description is required.");
  if (description.length > 200) throw new Error("Product description is too long (max 200 chars).");
  if (!priceLabel) throw new Error("Price is required.");
  if (priceLabel.length > 20) throw new Error("Price is too long.");
  if (!imageUrl) throw new Error("Image URL is required.");
  if (imageUrl.length > 2000) throw new Error("Image URL is too long.");

  let parsedUrl: URL | undefined;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    throw new Error("Image URL is invalid.");
  }
  if (parsedUrl.protocol !== "https:") throw new Error("Image URL must be https.");

  if (badgeVariant && badgeVariant !== "default" && badgeVariant !== "hot") {
    throw new Error("Badge variant is invalid.");
  }

  const catalog = await readCatalog();
  const categoryExists = catalog.categories.some((c) => c.id === categoryId);
  if (!categoryExists) throw new Error("Category does not exist.");

  const usedIds = new Set(catalog.products.map((p) => p.id));
  const baseId = slugify(name) || crypto.randomUUID();
  const id = uniqueId(baseId, usedIds);

  const createdAt = nowIso();
  const product: Product = {
    id,
    categoryId,
    name,
    description,
    priceLabel,
    imageUrl,
    imageAlt,
    badgeText,
    badgeVariant,
    createdAt,
  };

  const next: CatalogData = {
    ...catalog,
    updatedAt: createdAt,
    products: [...catalog.products, product],
  };
  await writeCatalog(next);
  return product;
}

export async function deleteProduct(productId: string): Promise<void> {
  const catalog = await readCatalog();
  const beforeCount = catalog.products.length;
  const nextProducts = catalog.products.filter((p) => p.id !== productId);
  if (nextProducts.length === beforeCount) return;

  const updatedAt = nowIso();
  const next: CatalogData = { ...catalog, updatedAt, products: nextProducts };
  await writeCatalog(next);
}

