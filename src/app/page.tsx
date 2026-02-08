import Image from "next/image";

type Product = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
  badge?: { text: string; variant?: "default" | "hot" };
};

const products: Product[] = [
  {
    name: "Miško Uogos",
    description: "Forest berries & black tea blend.",
    price: "£12.00",
    imageUrl:
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=2670&auto=format&fit=crop",
    imageAlt: "Forest Berry Tea",
    badge: { text: "New" },
  },
  {
    name: "Ramunėlės",
    description: "Whole flower chamomile calming set.",
    price: "£10.50",
    imageUrl:
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?q=80&w=2670&auto=format&fit=crop",
    imageAlt: "Chamomile Tea",
  },
  {
    name: "Čiobreliai",
    description: "Wild thyme for immune support.",
    price: "£14.00",
    imageUrl:
      "https://images.unsplash.com/photo-1576092768241-dec231847233?q=80&w=2574&auto=format&fit=crop",
    imageAlt: "Thyme Tea",
    badge: { text: "Hot", variant: "hot" },
  },
];

type StoryItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const story: StoryItem[] = [
  {
    title: "Authentic Source",
    description: "Directly from Lithuanian family-owned growers.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#E85D4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "UK Fast Delivery",
    description: "Next day shipping from our London depot.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#E85D4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Taste of Home",
    description: "Traditional blends for the Lithuanian soul.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#E85D4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <nav aria-label="Primary">
        <div className="logo">Arbatai.</div>
        <div className="nav-links">
          <a className="nav-item" href="#shop">
            Shop
          </a>
          <a className="nav-item" href="#roots">
            Our Roots
          </a>
          <a className="nav-item" href="#shop">
            Bundles
          </a>
          <button className="btn-reset cart-count" type="button" aria-label="Basket">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 3h3l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 7M17 13l1.4 7M7 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM17 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
            <span className="cart-badge" aria-hidden="true">
              2
            </span>
          </button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-bg-img" aria-hidden="true" />

        <div className="hero-overlay" aria-hidden="true">
          <svg className="doodle-shape doodle-1" viewBox="0 0 200 200">
            <path d="M32 106c-12-48 28-86 74-90 50-4 84 26 88 67 4 44-22 95-76 101-48 5-75-30-86-78z" />
          </svg>
          <svg className="doodle-shape doodle-2" viewBox="0 0 240 240">
            <path d="M28 130c-6-58 50-102 110-104 64-2 102 34 106 84 4 54-30 110-98 116-62 6-112-36-118-96z" />
          </svg>
        </div>

        <div className="hero-content">
          <h1 className="hero-title readable">
            London
            <br />
            Meets
            <br />
            Lietuva
          </h1>
          <h1 className="hero-title">
            London
            <br />
            Meets
            <br />
            Lietuva
          </h1>

          <a href="#shop" className="cta-btn">
            Taste Home
          </a>
        </div>
      </header>

      <main>
        <section className="products-section" id="shop">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Rituals from the Homeland</h2>
              <svg
                width="100"
                height="40"
                viewBox="0 0 100 40"
                className="section-arrow"
                aria-hidden="true"
              >
                <path d="M0,20 Q50,0 90,20 L80,10 M90,20 L80,30" />
              </svg>
            </div>

            <div className="filter-row" role="group" aria-label="Tea filters">
              <button className="filter-btn" type="button" aria-pressed="true">
                All Teas
              </button>
              <button className="filter-btn" type="button" aria-pressed="false">
                Berry Blends
              </button>
              <button className="filter-btn" type="button" aria-pressed="false">
                Herbal
              </button>
              <button className="filter-btn" type="button" aria-pressed="false">
                Wellness
              </button>
            </div>

            <div className="product-grid">
              {products.map((p, idx) => (
                <article className="product-card" key={p.name}>
                  <div className="card-image-wrapper">
                    {p.badge ? (
                      <div
                        className={`card-sticker${p.badge.variant === "hot" ? " hot" : ""}`}
                      >
                        {p.badge.text}
                      </div>
                    ) : null}
                    <Image
                      src={p.imageUrl}
                      alt={p.imageAlt}
                      fill
                      className="card-img"
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="product-info">
                    <div>
                      <h3 className="product-name">{p.name}</h3>
                      <p className="product-desc">{p.description}</p>
                    </div>
                    <span className="product-price">{p.price}</span>
                  </div>
                  <button className="add-btn" type="button">
                    Add to Basket
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="story-section" id="roots">
          <div className="container">
            <div className="story-grid">
              {story.map((item) => (
                <div className="story-item" key={item.title}>
                  <div className="story-icon">{item.icon}</div>
                  <h3 className="story-title">{item.title}</h3>
                  <p className="story-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <span className="footer-logo">ARBATAI</span>
          <div className="footer-links">
            <a href="#">Shipping</a>
            <a href="#">Instagram</a>
            <a href="#">Contact</a>
          </div>
          <p className="footer-copy">© 2026 Arbatai London Ltd.</p>
        </div>
      </footer>
    </>
  );
}
