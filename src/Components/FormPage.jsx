import React, { useState } from "react";
import "./FormPage.css";

function FormPage() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="form-page">

      {/* HEADER */}
      <header className="form-header">
        <div className="form-container form-header-inner">

          <a href="/" className="form-logo">
            <span className="form-logo-box">LA</span>

            <span>
              Legacy<span>Auto</span>
            </span>
          </a>

          <a href="/" className="back-home">
            ← Back to Home
          </a>

        </div>
      </header>

      {/* FORM HERO */}
      <section className="form-hero">

        <div className="form-hero-overlay"></div>

        <div className="form-container">

          <div className="form-hero-content">

            <span>GET IN TOUCH</span>

            <h1>
              Tell us what your
              <br />
              <strong>car needs.</strong>
            </h1>

            <p>
              Need a spare part, vehicle service or expert advice?
              Fill in the form and our team will get back to you.
            </p>

          </div>

        </div>

      </section>

      {/* FORM SECTION */}
      <section className="form-section">

        <div className="form-container form-grid">

          {/* LEFT SIDE */}
          <div className="form-information">

            <span className="form-label">
              CONTACT US
            </span>

            <h2>
              Let's get your vehicle
              <br />
              back on the road.
            </h2>

            <p>
              Give us a few details about your vehicle and what
              you need. Our team will contact you with the next
              steps.
            </p>

            <div className="contact-items">

              <div className="contact-item">
                <div className="contact-icon">📍</div>

                <div>
                  <small>Visit us</small>
                  <strong>Nairobi, Kenya</strong>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">☎</div>

                <div>
                  <small>Call us</small>
                  <strong>+254 700 000 000</strong>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">✉</div>

                <div>
                  <small>Email us</small>
                  <strong>info@autopro.co.ke</strong>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">◔</div>

                <div>
                  <small>WhatsApp</small>
                  <strong>Available 24/7</strong>
                </div>
              </div>

            </div>

          </div>

          {/* FORM */}
          <div className="form-card">

            {submitted && (
              <div className="success-message">
                ✓ Your request has been submitted successfully!
              </div>
            )}

            <div className="form-card-header">
              <span>REQUEST SERVICE</span>

              <h2>
                Send us your request
              </h2>

              <p>
                Fields marked with * are required.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-row">

                <div className="input-group">
                  <label>
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="input-group">
                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">

                <div className="input-group">
                  <label>
                    Vehicle
                  </label>

                  <input
                    type="text"
                    name="vehicle"
                    placeholder="e.g. Toyota Premio 2018"
                    value={formData.vehicle}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>
                    Service Needed *
                  </label>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select a service
                    </option>

                    <option value="spare-parts">
                      Spare Parts
                    </option>

                    <option value="vehicle-service">
                      Vehicle Service
                    </option>

                    <option value="repairs">
                      Auto Repairs
                    </option>

                    <option value="diagnostics">
                      Vehicle Diagnostics
                    </option>

                    <option value="oil-change">
                      Oil Change
                    </option>

                    <option value="brake-service">
                      Brake Service
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>

                </div>

              </div>

              <div className="input-group">

                <label>
                  Message *
                </label>

                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell us what you need..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

              </div>

              <button
                type="submit"
                className="submit-button"
              >
                Submit Request →
              </button>

              <a
                className="form-whatsapp"
                href="https://wa.me/+254707177362"
                target="_blank"
                rel="noreferrer"
              >
                Or chat with us on WhatsApp
              </a>

            </form>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="form-footer">

        <div className="form-container">

          <div className="footer-main">

            <div>
              <a href="/" className="form-logo footer-logo">
                <span className="form-logo-box">AP</span>

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
              <h3>Contact</h3>

              <p>📍 Nairobi, Kenya</p>
              <p>☎ +254 707 177 362</p>
              <p>✉ legacyauto@gmail.com</p>
            </div>

          </div>

          <div className="form-copyright">
            © 2026 Legacy Auto Parts. All rights reserved.
          </div>

        </div>

      </footer>

    </div>
  );
}

export default FormPage;