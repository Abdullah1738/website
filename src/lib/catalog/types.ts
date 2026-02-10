export type Category = {
  id: string;
  name: string;
  createdAt: string;
};

export type ProductBadgeVariant = "default" | "hot";

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  priceLabel: string;
  imageUrl: string;
  imageAlt: string;
  badgeText?: string;
  badgeVariant?: ProductBadgeVariant;
  createdAt: string;
};

export type CatalogData = {
  version: 1;
  updatedAt: string;
  categories: Category[];
  products: Product[];
};

