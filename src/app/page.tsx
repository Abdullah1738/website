import ProductsSection from "@/components/ProductsSection";
import { getPublicCatalog } from "@/lib/catalog/public";

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

export default async function Home() {
  const { categories, products } = await getPublicCatalog();
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
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 8h12l-1 13H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
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
        <ProductsSection categories={categories} products={products} />

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
