import React, { useState } from "react";
import "./LandingPage.css";

const categories = [
  { name: "Toyota Parts", icon: "🚗" },
  { name: "Nissan Parts", icon: "🚙" },
  { name: "Ford Parts", icon: "🚘" },
  { name: "Subaru Parts", icon: "🏎️" },
  { name: "Brake Parts", icon: "⚙️" },
  { name: "Engine Parts", icon: "🔧" },
  { name: "Batteries", icon: "🔋" },
  { name: "Tyres", icon: "🛞" },
];

const products = [
  {
    name: "Toyota Brake Pads",
    category: "Brake System",
    price: "KSh 4,500",
    oldPrice: "KSh 5,500",
    icon: "🛞",
    discount: "-18%",
  },
  {
    name: "Nissan Genuine Oil Filter",
    category: "Service Parts",
    price: "KSh 1,500",
    oldPrice: "KSh 1,900",
    icon: "🔧",
    discount: "-21%",
  },
  {
    name: "12V Car Battery",
    category: "Batteries",
    price: "KSh 12,500",
    oldPrice: "KSh 14,000",
    icon: "🔋",
    discount: "-11%",
  },
  {
    name: "5W-30 Synthetic Engine Oil",
    category: "Engine Oil",
    price: "KSh 6,200",
    oldPrice: "KSh 7,000",
    icon: "🛢️",
    discount: "-11%",
  },
  {
    name: "Toyota Suspension Arm",
    category: "Suspension",
    price: "KSh 8,500",
    oldPrice: "KSh 9,800",
    icon: "⚙️",
    discount: "-13%",
  },
  {
    name: "Performance Spark Plugs",
    category: "Engine Parts",
    price: "KSh 3,600",
    oldPrice: "KSh 4,200",
    icon: "🔩",
    discount: "-14%",
  },
  {
    name: "Premium Air Filter",
    category: "Service Parts",
    price: "KSh 1,800",
    oldPrice: "KSh 2,200",
    icon: "▣",
    discount: "-18%",
  },
  {
    name: "All Terrain Tyre",
    category: "Tyres",
    price: "KSh 14,500",
    oldPrice: "KSh 16,000",
    icon: "⭕",
    discount: "-9%",
  },
];

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(0);

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const addToCart = () => {
    setCart((current) => current + 1);
  };

  return (
    <div className="garage-page">

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <span>🚗 Genuine Parts • Professional Service</span>
          <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="header">

        <div className="container header-main">

          <a href="#" className="logo">
            <span className="logo-box">AP</span>
            <span>
              Auto<span>Pro</span>
            </span>
          </a>

          <div className="desktop-search">
            <input
              type="text"
              placeholder="Search for products, parts or services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>⌕</button>
          </div>

          <div className="header-right">

            <a href="tel:+254700000000" className="phone">
              <small>Call us</small>
              <strong>+254 700 000 000</strong>
            </a>

            <a href="#products" className="cart">
              🛒
              <span>{cart}</span>
            </a>

            <button
              className="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

          </div>
        </div>

        {/* NAVIGATION */}
        <nav className={`navigation ${menuOpen ? "show" : ""}`}>
          <div className="container nav-content">

            <button className="category-button">
              ☰ &nbsp; All Categories
            </button>

            <div className="nav-links">
              <a href="#home" onClick={() => setMenuOpen(false)}>
                Home
              </a>

              <a href="#categories" onClick={() => setMenuOpen(false)}>
                Categories
              </a>

              <a href="#services" onClick={() => setMenuOpen(false)}>
                Services
              </a>

              <a href="#about" onClick={() => setMenuOpen(false)}>
                About Us
              </a>

              <a href="#products" onClick={() => setMenuOpen(false)}>
                Products
              </a>

              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </div>

            <a
              className="whatsapp-button"
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>

          </div>
        </nav>

        {/* MOBILE SEARCH */}
        <div className="container mobile-search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>⌕</button>
        </div>

      </header>

      {/* HERO */}
      <section className="hero" id="home">

        <div className="hero-overlay"></div>

        <div className="container hero-content">

          <div className="hero-text">

            <span className="red-label">
              YOUR TRUSTED AUTO PARTNER
            </span>

            <h1>
              Keep Your Car
              <br />
              <span>Running Better.</span>
            </h1>

            <p>
              Quality spare parts, reliable automotive service and
              expert support — all in one place.
            </p>

            <div className="hero-buttons">

              <a href="#products" className="primary-button">
                Shop Parts →
              </a>

              <a href="#services" className="outline-button">
                Our Services
              </a>

            </div>

            <div className="hero-stats">

              <div>
                <strong>100%</strong>
                <span>Genuine Parts</span>
              </div>

              <div>
                <strong>10+</strong>
                <span>Years Experience</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>WhatsApp Support</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="categories section" id="categories">

        <div className="container">

          <div className="section-header">

            <div>
              <span className="section-label">
                SHOP BY CATEGORY
              </span>

              <h2>Find the right parts for your car</h2>
            </div>

            <a href="#products">View all →</a>

          </div>

          <div className="category-grid">

            {categories.map((category) => (
              <a
                href="#products"
                className="category-card"
                key={category.name}
              >
                <div className="category-icon">
                  {category.icon}
                </div>

                <h3>{category.name}</h3>

                <p>Quality products</p>
              </a>
            ))}

          </div>

        </div>

      </section>

      {/* RED PROMOTION */}
      <section className="promotion">

        <div className="container promotion-content">

          <div>

            <span className="red-label">
              LIMITED TIME OFFER
            </span>

            <h2>
              Save on selected
              <br />
              <span>automotive essentials.</span>
            </h2>

            <p>
              Great prices on selected service and replacement parts.
            </p>

          </div>

          <a href="#products" className="white-button">
            Shop Deals →
          </a>

        </div>

      </section>

      {/* PRODUCTS */}
      <section className="products section" id="products">

        <div className="container">

          <div className="section-header">

            <div>
              <span className="section-label">
                FEATURED PRODUCTS
              </span>

              <h2>Popular parts & accessories</h2>
            </div>

            <span className="product-count">
              {filteredProducts.length} products
            </span>

          </div>

          <div className="product-grid">

            {filteredProducts.map((product) => (

              <div className="product-card" key={product.name}>

                <span className="discount">
                  {product.discount}
                </span>

                <div className="product-image">
                  {product.icon}
                </div>

                <div className="product-details">

                  <small>{product.category}</small>

                  <h3>{product.name}</h3>

                  <div className="price-row">
                    <strong>{product.price}</strong>
                    <del>{product.oldPrice}</del>
                  </div>

                  <div className="product-buttons">

                    <button onClick={addToCart}>
                      Add to Cart
                    </button>

                    <a
                      href={`https://wa.me/254700000000?text=${encodeURIComponent(
                        `Hello AutoPro, I am interested in ${product.name}. Is it available?`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              No products found.
            </div>
          )}

        </div>

      </section>

      {/* SERVICES */}
      <section className="services section" id="services">

        <div className="container">

          <div className="center-heading">

            <span className="section-label">
              WHAT WE DO
            </span>

            <h2>More than just spare parts</h2>

            <p>
              Professional automotive solutions designed to keep
              you safely on the road.
            </p>

          </div>

          <div className="service-grid">

            <div className="service-card">
              <div className="service-icon">🔧</div>

              <h3>Auto Repairs</h3>

              <p>
                Professional diagnosis, repair and maintenance
                for your vehicle.
              </p>

              <a href="#contact">Learn more →</a>
            </div>

            <div className="service-card">
              <div className="service-icon">🛠️</div>

              <h3>Routine Service</h3>

              <p>
                Oil changes, filters, brakes and scheduled
                vehicle maintenance.
              </p>

              <a href="#contact">Book service →</a>
            </div>

            <div className="service-card">
              <div className="service-icon">🔍</div>

              <h3>Parts Sourcing</h3>

              <p>
                Tell us what you need and our team will help
                you find the right part.
              </p>

              <a href="#contact">Ask us →</a>
            </div>

          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section className="about section" id="about">

        <div className="container about-grid">

          <div className="about-photo">
            <div className="about-badge">
              <strong>10+</strong>
              <span>Years Experience</span>
            </div>
          </div>

          <div className="about-text">

            <span className="section-label">
              WHY CHOOSE US
            </span>

            <h2>
              Quality parts. Honest advice.
              Reliable service.
            </h2>

            <p>
              We help drivers and vehicle owners find dependable
              parts and professional automotive support without
              the guesswork.
            </p>

            <ul>
              <li>✓ Genuine and quality-tested parts</li>
              <li>✓ Experienced automotive team</li>
              <li>✓ Competitive prices</li>
              <li>✓ Fast customer support via WhatsApp</li>
            </ul>

            <a href="#contact" className="dark-button">
              Talk to our team →
            </a>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="contact-cta" id="contact">

        <div className="container cta-content">

          <div>

            <span className="red-label">
              NEED A PART?
            </span>

            <h2>Can't find what you're looking for?</h2>

            <p>
              Send us your vehicle model and the part you need.
              We'll help you check availability.
            </p>

          </div>

          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            className="white-button"
          >
            Chat on WhatsApp →
          </a>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">

        <div className="container footer-grid">

          <div>
            <a href="#" className="logo footer-logo">
              <span className="logo-box">AP</span>
              <span>
                Auto<span>Pro</span>
              </span>
            </a>

            <p>
              Your trusted partner for genuine car parts,
              automotive service and expert support.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#products">Products</a>
            <a href="#contact">Contact</a>
          </div>

          <div>
            <h4>Categories</h4>
            <a href="#products">Toyota Parts</a>
            <a href="#products">Nissan Parts</a>
            <a href="#products">Ford Parts</a>
            <a href="#products">Subaru Parts</a>
          </div>

          <div>
            <h4>Contact</h4>
            <p>📍 Nairobi, Kenya</p>
            <p>☎ +254 700 000 000</p>
            <p>✉ info@autopro.co.ke</p>
          </div>

        </div>

        <div className="copyright">
          <div className="container">
            © 2026 AutoPro Garage. All rights reserved.
          </div>
        </div>

      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        className="floating-whatsapp"
        href="https://wa.me/254700000000"
        target="_blank"
        rel="noreferrer"
      >
        ☎
      </a>

    </div>
  );
}

export default LandingPage;