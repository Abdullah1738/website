"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  clearBackofficeSessionCookie,
  isBackofficeAuthed,
  setBackofficeSessionCookie,
  verifyBackofficePassword,
} from "@/lib/backoffice/auth";
import { createCategory, createProduct, deleteCategory, deleteProduct } from "@/lib/catalog/mutate";
import type { ProductBadgeVariant } from "@/lib/catalog/types";

async function requireAuth(): Promise<void> {
  if (!(await isBackofficeAuthed())) redirect("/backoffice?error=auth-required");
}

function redirectWithError(message: string): never {
  redirect(`/backoffice?error=${encodeURIComponent(message)}`);
}

export async function loginAction(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");
  if (!verifyBackofficePassword(password)) {
    redirectWithError("Invalid password.");
  }
  await setBackofficeSessionCookie();
  redirect("/backoffice");
}

export async function logoutAction(): Promise<void> {
  await clearBackofficeSessionCookie();
  redirect("/backoffice");
}

export async function createCategoryAction(formData: FormData): Promise<void> {
  await requireAuth();
  const name = String(formData.get("name") ?? "");

  try {
    await createCategory(name);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create category.";
    redirectWithError(message);
  }

  revalidatePath("/");
  revalidatePath("/backoffice");
  redirect("/backoffice");
}

export async function deleteCategoryAction(formData: FormData): Promise<void> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  if (!id) redirectWithError("Missing category id.");

  await deleteCategory(id);
  revalidatePath("/");
  revalidatePath("/backoffice");
  redirect("/backoffice");
}

export async function createProductAction(formData: FormData): Promise<void> {
  await requireAuth();

  const categoryId = String(formData.get("categoryId") ?? "");
  const name = String(formData.get("name") ?? "");
  const description = String(formData.get("description") ?? "");
  const priceLabel = String(formData.get("priceLabel") ?? "");
  const imageUrl = String(formData.get("imageUrl") ?? "");
  const imageAlt = String(formData.get("imageAlt") ?? "");
  const badgeText = String(formData.get("badgeText") ?? "");
  const badgeVariantRaw = String(formData.get("badgeVariant") ?? "");
  const badgeVariant =
    badgeVariantRaw === "" ? undefined : (badgeVariantRaw as ProductBadgeVariant);

  try {
    await createProduct({
      categoryId,
      name,
      description,
      priceLabel,
      imageUrl,
      imageAlt,
      badgeText: badgeText || undefined,
      badgeVariant,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create product.";
    redirectWithError(message);
  }

  revalidatePath("/");
  revalidatePath("/backoffice");
  redirect("/backoffice");
}

export async function deleteProductAction(formData: FormData): Promise<void> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  if (!id) redirectWithError("Missing product id.");

  await deleteProduct(id);
  revalidatePath("/");
  revalidatePath("/backoffice");
  redirect("/backoffice");
}
