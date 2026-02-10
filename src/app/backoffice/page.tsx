import "./backoffice.css";

import { isBackofficeAuthed } from "@/lib/backoffice/auth";
import { readCatalog } from "@/lib/catalog/store";

import {
  createCategoryAction,
  createProductAction,
  deleteCategoryAction,
  deleteProductAction,
  loginAction,
  logoutAction,
} from "./actions";

export const dynamic = "force-dynamic";

function errorFromSearchParams(searchParams: { [key: string]: string | string[] | undefined }): string {
  const e = searchParams.error;
  if (!e) return "";
  if (Array.isArray(e)) return e[0] ?? "";
  return e;
}

export default async function BackofficePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const error = errorFromSearchParams(sp);
  const authed = await isBackofficeAuthed();

  if (!authed) {
    return (
      <main className="bo">
        <div className="bo__wrap bo__login">
          <div className="bo__topbar">
            <h1 className="bo__title">Backoffice</h1>
          </div>

          <div className="bo__card">
            <h2>Sign in</h2>
            <p className="bo__hint">
              Password is read from <code>BACKOFFICE_PASSWORD</code>.
            </p>
            {error ? <div className="bo__error">{decodeURIComponent(error)}</div> : null}
            <form className="bo__form" action={loginAction}>
              <div className="bo__field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required />
              </div>
              <button className="bo__btn" type="submit">
                Enter
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  const catalog = await readCatalog();
  const categories = [...catalog.categories].sort((a, b) => a.name.localeCompare(b.name));
  const products = [...catalog.products].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <main className="bo">
      <div className="bo__wrap">
        <div className="bo__topbar">
          <h1 className="bo__title">Backoffice</h1>
          <div className="bo__pill">
            <form action={logoutAction}>
              <button className="bo__btn bo__btn--ghost" type="submit">
                Logout
              </button>
            </form>
          </div>
        </div>

        {error ? <div className="bo__error">{decodeURIComponent(error)}</div> : null}

        <div className="bo__grid">
          <section className="bo__card">
            <h2>Categories</h2>
            <p className="bo__hint">Deleting a category also deletes its products.</p>

            <form className="bo__form" action={createCategoryAction}>
              <div className="bo__field">
                <label htmlFor="cat-name">New category name</label>
                <input id="cat-name" name="name" type="text" placeholder="e.g. Berry Blends" required />
              </div>
              <button className="bo__btn" type="submit">
                Add category
              </button>
            </form>

            <div className="bo__divider" />

            <ul className="bo__list">
              {categories.map((c) => (
                <li className="bo__item" key={c.id}>
                  <div>
                    <strong>{c.name}</strong>
                    <div className="bo__meta">
                      <code>{c.id}</code>
                    </div>
                  </div>
                  <form action={deleteCategoryAction}>
                    <input type="hidden" name="id" value={c.id} />
                    <button className="bo__btn bo__btn--ghost" type="submit">
                      Remove
                    </button>
                  </form>
                </li>
              ))}
              {categories.length === 0 ? <li className="bo__meta">No categories yet.</li> : null}
            </ul>
          </section>

          <section className="bo__card">
            <h2>Products</h2>
            <p className="bo__hint">
              Product images must be <code>https</code> URLs. Price is a label, e.g. <code>£12.00</code>.
            </p>

            <form className="bo__form" action={createProductAction}>
              <div className="bo__row">
                <div className="bo__field">
                  <label htmlFor="p-category">Category</label>
                  <select id="p-category" name="categoryId" required defaultValue="">
                    <option value="" disabled>
                      Select…
                    </option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bo__field">
                  <label htmlFor="p-price">Price label</label>
                  <input id="p-price" name="priceLabel" type="text" placeholder="£12.00" required />
                </div>
              </div>

              <div className="bo__row">
                <div className="bo__field">
                  <label htmlFor="p-name">Name</label>
                  <input id="p-name" name="name" type="text" placeholder="Miško Uogos" required />
                </div>
                <div className="bo__field">
                  <label htmlFor="p-badge">Badge text (optional)</label>
                  <input id="p-badge" name="badgeText" type="text" placeholder="New" />
                </div>
              </div>

              <div className="bo__row">
                <div className="bo__field">
                  <label htmlFor="p-badge-variant">Badge variant</label>
                  <select id="p-badge-variant" name="badgeVariant" defaultValue="">
                    <option value="">None</option>
                    <option value="default">Default</option>
                    <option value="hot">Hot</option>
                  </select>
                </div>
                <div className="bo__field">
                  <label htmlFor="p-image-alt">Image alt (optional)</label>
                  <input id="p-image-alt" name="imageAlt" type="text" placeholder="Forest Berry Tea" />
                </div>
              </div>

              <div className="bo__field">
                <label htmlFor="p-desc">Description</label>
                <textarea id="p-desc" name="description" placeholder="Short description…" required />
              </div>

              <div className="bo__field">
                <label htmlFor="p-image">Image URL</label>
                <input
                  id="p-image"
                  name="imageUrl"
                  type="url"
                  placeholder="https://images.unsplash.com/…"
                  required
                />
              </div>

              <button className="bo__btn" type="submit">
                Create product
              </button>
            </form>

            <div className="bo__divider" />

            <ul className="bo__list">
              {products.map((p) => {
                const cat = categories.find((c) => c.id === p.categoryId);
                return (
                  <li className="bo__item" key={p.id}>
                    <div>
                      <strong>{p.name}</strong> <span className="bo__meta">{p.priceLabel}</span>
                      <div className="bo__meta">
                        {cat ? cat.name : <code>(missing category)</code>} · <code>{p.id}</code>
                      </div>
                    </div>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <button className="bo__btn bo__btn--ghost" type="submit">
                        Remove
                      </button>
                    </form>
                  </li>
                );
              })}
              {products.length === 0 ? <li className="bo__meta">No products yet.</li> : null}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
