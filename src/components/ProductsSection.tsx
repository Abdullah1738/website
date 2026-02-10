"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";

import type { Category, Product } from "@/lib/catalog/types";

export default function ProductsSection({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");

  const filtered = useMemo(() => {
    if (activeCategoryId === "all") return products;
    return products.filter((p) => p.categoryId === activeCategoryId);
  }, [activeCategoryId, products]);

  return (
    <section className="products-section" id="shop">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Rituals from the Homeland</h2>
        </div>

        <div className="filter-row" role="group" aria-label="Tea filters">
          <button
            className="filter-btn"
            type="button"
            aria-pressed={activeCategoryId === "all"}
            onClick={() => setActiveCategoryId("all")}
          >
            All Teas
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className="filter-btn"
              type="button"
              aria-pressed={activeCategoryId === c.id}
              onClick={() => setActiveCategoryId(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filtered.map((p) => (
            <article className="product-card" key={p.id}>
              <div className="card-image-wrapper">
                {p.badgeText ? (
                  <div className={`card-sticker${p.badgeVariant === "hot" ? " hot" : ""}`}>
                    {p.badgeText}
                  </div>
                ) : null}
                <img
                  src={p.imageUrl}
                  alt={p.imageAlt || p.name}
                  className="card-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="product-info">
                <div>
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-desc">{p.description}</p>
                </div>
                <span className="product-price">{p.priceLabel}</span>
              </div>
              <button className="add-btn" type="button">
                Add to Basket
              </button>
            </article>
          ))}

          {filtered.length === 0 ? (
            <div style={{ padding: "12px 40px", color: "#444" }}>
              No products in this category yet.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
