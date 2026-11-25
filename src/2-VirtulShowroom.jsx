import "./2-0-VirtulShowroom.css";


import { useState, useEffect, useRef } from "react";
import ToyotaFooter from "./Footer";

/**
 * NOVA MOTORS — Virtual Showroom
 * Placeholder-branded automotive virtual showroom page.
 * Plain React + CSS, no external UI libraries required.
 */

const MODELS = [
  {
    id: "aster",
    name: "ASTER",
    tag: "Compact Sedan",
    price: "₹11.2L onwards",
    color: "#C9CDD1",
  },
  {
    id: "kestrel",
    name: "KESTREL",
    tag: "Midsize SUV",
    price: "₹18.6L onwards",
    color: "#E63946",
  },
  {
    id: "orbis",
    name: "ORBIS",
    tag: "Full Hybrid",
    price: "₹24.9L onwards",
    color: "#4A6FA5",
  },
  {
    id: "trace",
    name: "TRACE",
    tag: "Performance Coupe",
    price: "₹32.4L onwards",
    color: "#F2C14E",
  },
];

const FEATURES = [
  {
    id: "orbit",
    title: "360° Orbit View",
    copy: "Rotate the exterior in full circle. Every panel line, every angle.",
  },
  {
    id: "cabin",
    title: "Interior Walkthrough",
    copy: "Step inside from the driver's seat and look around the cabin.",
  },
  {
    id: "studio",
    title: "Colour Studio",
    copy: "Preview every paint finish and wheel option in real light.",
  },
  {
    id: "night",
    title: "Night Mode Preview",
    copy: "See how the lighting signature looks after sundown.",
  },
  {
    id: "ar",
    title: "AR Driveway Preview",
    copy: "Place the model in your own driveway using your phone camera.",
  },
  {
    id: "expert",
    title: "Talk to an Expert",
    copy: "Bring in a product specialist for a live guided walkthrough.",
  },
];

const ANGLE_STEP = 30;

export default function VirtualShowroom() {
  const [activeModel, setActiveModel] = useState(MODELS[1].id);
  const [angle, setAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinRef = useRef(null);

  const current = MODELS.find((m) => m.id === activeModel) ?? MODELS[0];

  useEffect(() => {
    if (!isSpinning) return undefined;
    spinRef.current = window.setInterval(() => {
      setAngle((a) => (a + ANGLE_STEP) % 360);
    }, 700);
    return () => window.clearInterval(spinRef.current);
  }, [isSpinning]);

  const rotate = (dir) => {
    setIsSpinning(false);
    setAngle((a) => (a + dir * ANGLE_STEP + 360) % 360);
  };

  return (
  <>
    <div className="vs-root">
      {/* NAVBAR */}
      <header className="vs-nav">
        <div className="vs-nav-inner">
          <a className="vs-logo" href="#top">
            <span className="vs-logo-mark" aria-hidden="true" />
            NOVA<span className="vs-logo-thin">MOTORS</span>
          </a>
          <nav className="vs-nav-links" aria-label="Primary">
            <a href="#models">Models</a>
            <a href="#showroom">Virtual Showroom</a>
            <a href="#features">Explore</a>
            <a href="#dealer">Locate Dealer</a>
          </nav>
          <a className="vs-btn vs-btn-primary vs-nav-cta" href="#book">
            Book Test Drive
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="vs-hero" id="top">
        <div className="vs-hero-grid" aria-hidden="true" />
        <div className="vs-hero-content">
          <p className="vs-eyebrow">Virtual Showroom</p>
          <h1 className="vs-hero-title">
            STEP INSIDE.
            <br />
            EVERY ANGLE, ON YOUR SCREEN.
          </h1>
          <p className="vs-hero-copy">
            Walk around the cabin, spin the exterior a full 360°, and try on
            every colour — before you ever visit a dealership.
          </p>
          <div className="vs-hero-actions">
            <a href="#showroom" className="vs-btn vs-btn-primary">
              Launch 360° View
            </a>
            <a href="#models" className="vs-btn vs-btn-ghost">
              Browse Models
            </a>
          </div>
        </div>
        <svg
          className="vs-hero-car"
          viewBox="0 0 900 320"
          role="img"
          aria-label="Silhouette of a car"
        >
          <path
            d="M40 230 C 60 150, 150 120, 230 118 L 300 70 C 340 45, 420 40, 470 55 L 590 100 C 660 105, 760 120, 840 175 L 860 230 L 800 230 C 796 200, 764 178, 730 178 C 696 178, 664 200, 660 230 L 300 230 C 296 200, 264 178, 230 178 C 196 178, 164 200, 160 230 Z"
            className="vs-car-path"
          />
          <circle cx="230" cy="232" r="34" className="vs-car-wheel" />
          <circle cx="700" cy="232" r="34" className="vs-car-wheel" />
        </svg>
      </section>

      {/* MODEL STRIP */}
      <section className="vs-models" id="models">
        <div className="vs-section-head">
          <h2>Choose a model to explore</h2>
          <p>Every model below opens directly into the virtual bay.</p>
        </div>
        <div className="vs-model-row">
          {MODELS.map((m) => (
            <button
              key={m.id}
              className={
                "vs-model-card" + (m.id === activeModel ? " is-active" : "")
              }
              onClick={() => {
                setActiveModel(m.id);
                setAngle(0);
                setIsSpinning(false);
              }}
            >
              <span
                className="vs-model-swatch"
                style={{ background: m.color }}
                aria-hidden="true"
              />
              <span className="vs-model-name">{m.name}</span>
              <span className="vs-model-tag">{m.tag}</span>
              <span className="vs-model-price">{m.price}</span>
            </button>
          ))}
        </div>
      </section>

      {/* VIRTUAL BAY / SIGNATURE SECTION */}
      <section className="vs-bay" id="showroom">
        <div className="vs-bay-frame">
          <div className="vs-bay-top">
            <div>
              <p className="vs-eyebrow vs-eyebrow-light">The Virtual Bay</p>
              <h2 className="vs-bay-title">{current.name}</h2>
              <p className="vs-bay-tag">{current.tag}</p>
            </div>
            <div className="vs-gauge">
              <span className="vs-gauge-value">{String(angle).padStart(3, "0")}°</span>
              <span className="vs-gauge-label">ORBIT ANGLE</span>
            </div>
          </div>

          <div className="vs-bay-stage">
            <div
              className="vs-turntable"
              style={{ transform: `rotateY(${angle}deg)` }}
              aria-hidden="true"
            >
              <div
                className="vs-turntable-body"
                style={{ background: current.color }}
              />
            </div>
            <div className="vs-turntable-shadow" aria-hidden="true" />
          </div>

          <div className="vs-bay-controls">
            <button
              className="vs-btn vs-btn-ghost vs-btn-small"
              onClick={() => rotate(-1)}
              aria-label="Rotate left"
            >
              ⟲ Rotate
            </button>
            <button
              className={
                "vs-btn vs-btn-small " +
                (isSpinning ? "vs-btn-primary" : "vs-btn-ghost")
              }
              onClick={() => setIsSpinning((s) => !s)}
            >
              {isSpinning ? "Pause Spin" : "Auto-Spin"}
            </button>
            <button
              className="vs-btn vs-btn-ghost vs-btn-small"
              onClick={() => rotate(1)}
              aria-label="Rotate right"
            >
              Rotate ⟳
            </button>
          </div>

          <dl className="vs-spec-sheet">
            <div>
              <dt>Starting Price</dt>
              <dd>{current.price}</dd>
            </div>
            <div>
              <dt>Body Style</dt>
              <dd>{current.tag}</dd>
            </div>
            <div>
              <dt>View Mode</dt>
              <dd>{isSpinning ? "Auto-Spin" : "Manual"}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* FEATURES */}
      <section className="vs-features" id="features">
        <div className="vs-section-head">
          <h2>Everything a showroom visit gives you — from anywhere</h2>
          <p>Six ways to get to know the car before you get the keys.</p>
        </div>
        <div className="vs-feature-grid">
          {FEATURES.map((f) => (
            <div className="vs-feature-card" key={f.id}>
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="vs-cta" id="book">
        <div className="vs-cta-inner">
          <h2>Ready to see it in person?</h2>
          <p>Book a virtual test drive with a product expert, on your schedule.</p>
          <a href="#" className="vs-btn vs-btn-primary vs-btn-large">
            Book a Virtual Test Drive
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vs-footer" id="dealer">
        <div className="vs-footer-inner">
          <div className="vs-footer-brand">
            <span className="vs-logo-mark" aria-hidden="true" />
            NOVA<span className="vs-logo-thin">MOTORS</span>
          </div>
          <div className="vs-footer-cols">
            <div>
              <h4>Explore</h4>
              <a href="#models">All Models</a>
              <a href="#showroom">Virtual Showroom</a>
              <a href="#features">Features</a>
            </div>
            <div>
              <h4>Ownership</h4>
              <a href="#">Locate a Dealer</a>
              <a href="#">Service Booking</a>
              <a href="#">Finance Calculator</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#">About Nova Motors</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        <p className="vs-footer-legal">
          © {new Date().getFullYear()} Nova Motors. This is a demo layout with
          placeholder branding.
        </p>
      </footer>
    </div>

    <div>
      <ToyotaFooter />
    </div>
    </>
  );
}
