import React, { useRef, useState } from "react";
import ToyotaFooter from "./Footer";
import "./8-2-HappierPathsTogether.css"


// ============================================================
// LOCAL IMAGE IMPORTS
// ============================================================

import together from "./assets/happier-paths/together.svg";
import green from "./assets/happier-paths/green.svg";
import clean from "./assets/happier-paths/clean.svg";
import learning from "./assets/happier-paths/learning.svg";
import tomorrow from "./assets/happier-paths/tomorrow.svg";
import smiles from "./assets/happier-paths/smiles.svg";

// ============================================================
// YOUTUBE VIDEO
// ============================================================

const YOUTUBE_VIDEO_ID = "VWR4n4GFQCw";

// ============================================================
// HAPPIER PATHS DATA
// ============================================================
const galleryImages = [
  {
    id: 1,
    title: "HAPPIER\nPATHS TOGETHER",
    description:
      "Creating a happier future for all through multi-pathway technologies, sustainable green practices, and social transformation.",
    image:
      "https://static.toyotabharat.com/images/toyota-in-india/happier-path/happier-paths-together.jpg",
    alt: "Happier Paths Together",
    color: "red",
    shape: "circle",
  },

  {
    id: 2,
    title: "HAPPIER\nPATHS TO GREEN",
    description:
      "Creating a greener world with initiatives like afforestation and other eco-friendly practices.",
    image:
      "https://static.toyotabharat.com/images/toyota-in-india/happier-path/happier-paths-to-green.jpg",
    alt: "Happier Paths To Green",
    color: "green",
    shape: "triangle",
  },

  {
    id: 3,
    title: "HAPPIER\nPATHS TO CLEAN",
    description:
      "Creating a sustainable future in harmony with the environment by utilising natural resources optimally.",
    image:
      "https://static.toyotabharat.com/images/toyota-in-india/happier-path/happier-paths-to-clean.jpg",
    alt: "Happier Paths To Clean",
    color: "blue",
    shape: "circle",
  },

  {
    id: 4,
    title: "HAPPIER\nPATHS TO LEARNING",
    description:
      "Nurturing skills through technical education programs that empower students in skill-based careers.",
    image:
      "https://static.toyotabharat.com/images/toyota-in-india/happier-path/happier-paths-to-learning.jpg",
    alt: "Happier Paths To Learning",
    color: "yellow",
    shape: "square",
  },

  {
    id: 5,
    title: "HAPPIER\nPATHS TO TOMORROW",
    description:
      "Building a better future with multi-pathway technologies that reduce carbon footprint.",
    image:
      "https://static.toyotabharat.com/images/toyota-in-india/happier-path/happier-paths-to-tomorrow.jpg",
    alt: "Happier Paths To Tomorrow",
    color: "blue",
    shape: "triangle",
  },

  {
    id: 6,
    title: "HAPPIER\nPATHS TO SMILES",
    description:
      "Bringing about social transformation through education, sanitation and access to resources.",
    image:
      "https://static.toyotabharat.com/images/toyota-in-india/happier-path/happier-paths-to-smiles.jpg",
    alt: "Happier Paths To Smiles",
    color: "orange",
    shape: "circle",
  },
];
// ============================================================
// VIDEO MODAL
// ============================================================

function VideoModal({ closeVideo }) {
  return (
    <div
      className="hp-video-overlay"
      onClick={closeVideo}
      role="presentation"
    >
      <div
        className="hp-video-container"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="hp-video-close"
          onClick={closeVideo}
          aria-label="Close video"
          type="button"
        >
          ×
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
          title="Toyota Happier Paths Together"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function Hero({ openVideo }) {
  return (
    <section
      className="hp-hero"
      style={{
        backgroundImage: `url(${together})`,
      }}
    >
      <div className="hp-hero-overlay" />

      <div className="hp-hero-top">
        <div className="hp-toyota-brand">
          <div className="hp-toyota-logo">TOYOTA</div>

          <div className="hp-brand-text">
            <strong>Happier Paths Together</strong>
            <span>Toyota India</span>
          </div>
        </div>
      </div>

      <div className="hp-hero-content">
        <div className="hp-hero-title">
          <span>HAPPIER</span>
          <span>PATHS TO</span>
          <strong>CLEAN</strong>
        </div>

        <button
          className="hp-play-button"
          onClick={openVideo}
          aria-label="Play Toyota video"
          type="button"
        >
          <span>▶</span>
        </button>
      </div>

      <button
        className="hp-grid-button"
        type="button"
        aria-label="Gallery menu"
      >
        <span />
        <span />
        <span />

        <span />
        <span />
        <span />

        <span />
        <span />
        <span />
      </button>
    </section>
  );
}

// ============================================================
// COLOR SHAPE
// ============================================================

function ColorShape({ color, shape }) {
  return (
    <>
      <div
        className={`hp-shape hp-shape-${color} hp-shape-${shape}`}
      />
    </>
  );
}

// ============================================================
// FEATURE SECTION
// ============================================================

function FeatureSection({ item, index }) {
  const reverse = index % 2 === 1;

  const titleLines = item.title.split("\n");

  return (
    <section
      className={`hp-feature-section ${
        reverse ? "hp-feature-reverse" : ""
      }`}
    >
      <div className="hp-feature-inner">

        <div className="hp-feature-text">

          <div className={`hp-title-box hp-title-${item.color}`}>

            <div className="hp-title-shape">
              <ColorShape
                color={item.color}
                shape={item.shape}
              />
            </div>

            <h2>
              {titleLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}

                  {i !== titleLines.length - 1 && (
                    <br />
                  )}
                </React.Fragment>
              ))}
            </h2>

            <p>{item.description}</p>

            <button
              className="hp-know-more"
              type="button"
            >
              Know More
            </button>

          </div>

        </div>

        <div className="hp-feature-image-box">

          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
          />

          <div className="hp-image-overlay" />

          <div className="hp-toyota-watermark">
            <strong>TOYOTA</strong>

            <small>
              Better <i>Brighter Awesome</i>
            </small>
          </div>

        </div>

      </div>
    </section>
  );
}

// ============================================================
// HORIZONTAL GALLERY
// ============================================================

function HorizontalGallery() {
  const scrollRef = useRef(null);

  const [active, setActive] = useState(0);

  const moveSlider = (direction) => {
    const slider = scrollRef.current;

    if (!slider) {
      return;
    }

    const card = slider.querySelector(".hp-scroll-card");

    if (!card) {
      return;
    }

    const gap = 24;

    const amount = card.offsetWidth + gap;

    slider.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const slider = scrollRef.current;

    if (!slider) {
      return;
    }

    const card = slider.querySelector(".hp-scroll-card");

    if (!card) {
      return;
    }

    const gap = 24;

    const index = Math.round(
      slider.scrollLeft /
        (card.offsetWidth + gap)
    );

    setActive(
      Math.min(
        Math.max(index, 0),
        galleryImages.length - 1
      )
    );
  };

  const goToSlide = (index) => {
    const slider = scrollRef.current;

    if (!slider) {
      return;
    }

    const cards =
      slider.querySelectorAll(".hp-scroll-card");

    const card = cards[index];

    if (!card) {
      return;
    }

    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

    setActive(index);
  };

  return (
    <section className="hp-horizontal-section">

      <div className="hp-section-heading">

        <span>HAPPIER PATHS TOGETHER</span>

        <h2>
          Explore our journey towards
          <br />
          a happier future.
        </h2>

      </div>

      <div className="hp-slider-wrapper">

        <button
          className="hp-slider-arrow hp-left"
          onClick={() => moveSlider(-1)}
          type="button"
          aria-label="Previous"
        >
          ‹
        </button>

        <div
          className="hp-scroll-container"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {galleryImages.map((item) => (
            <div
              className="hp-scroll-card"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
              />

              <div className="hp-card-dark" />

              <div className="hp-card-shapes">
                <ColorShape
                  color={item.color}
                  shape={item.shape}
                />
              </div>

              <div className="hp-card-content">

                <h3>
                  {item.title
                    .split("\n")
                    .map((line, i) => (
                      <React.Fragment key={i}>
                        {line}

                        {i !==
                          item.title.split("\n").length -
                            1 && <br />}
                      </React.Fragment>
                    ))}
                </h3>

                <span>
                  Explore →
                </span>

              </div>

            </div>
          ))}
        </div>

        <button
          className="hp-slider-arrow hp-right"
          onClick={() => moveSlider(1)}
          type="button"
          aria-label="Next"
        >
          ›
        </button>

      </div>

      <div className="hp-slider-dots">

        {galleryImages.map((item, index) => (
          <button
            key={item.id}
            className={
              active === index ? "active" : ""
            }
            onClick={() => goToSlide(index)}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}

      </div>

    </section>
  );
}

// ============================================================
// FINAL IMAGE GALLERY
// ============================================================

function ImageGallery() {
  return (
    <section className="hp-final-gallery">

      <div className="hp-gallery-container">

        <div className="hp-gallery-heading">

          <span>TOYOTA INDIA</span>

          <h2>Image Gallery</h2>

        </div>

        <div className="hp-gallery-grid">

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="hp-gallery-column">

            <div className="hp-gallery-card hp-gallery-large-card">

              <img
                src={together}
                alt="Toyota Happier Paths Together"
                className="hp-gallery-image"
                loading="lazy"
              />

            </div>

            <div className="hp-gallery-card hp-gallery-small-card">

              <img
                src={green}
                alt="Toyota Happier Paths Green"
                className="hp-gallery-image"
                loading="lazy"
              />

            </div>

          </div>

          {/* =================================================
              CENTER COLUMN
          ================================================= */}

          <div className="hp-gallery-column">

            <div className="hp-gallery-card hp-gallery-large-card">

              <img
                src={clean}
                alt="Toyota Happier Paths Clean"
                className="hp-gallery-image"
                loading="lazy"
              />

            </div>

            <div className="hp-gallery-card hp-gallery-tall-card">

              <img
                src={tomorrow}
                alt="Toyota Happier Paths Tomorrow"
                className="hp-gallery-image"
                loading="lazy"
              />

            </div>

          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="hp-gallery-column">

            <div className="hp-gallery-card hp-gallery-top-card">

              <img
                src={learning}
                alt="Toyota Happier Paths Learning"
                className="hp-gallery-image"
                loading="lazy"
              />

            </div>

            <div className="hp-gallery-card hp-gallery-bottom-card">

              <img
                src={smiles}
                alt="Toyota Happier Paths Smiles"
                className="hp-gallery-image"
                loading="lazy"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Happier_Paths_Together() {

  const [videoOpen, setVideoOpen] =
    useState(false);

  return (
    <div className="happier-paths-page">

      {/* HERO */}

      <Hero
        openVideo={() => setVideoOpen(true)}
      />

      {/* SIX FEATURE SECTIONS */}

      {galleryImages.map((item, index) => (
        <FeatureSection
          key={item.id}
          item={item}
          index={index}
        />
      ))}

      {/* HORIZONTAL GALLERY */}

      <HorizontalGallery />

      {/* FINAL IMAGE GALLERY */}

      <ImageGallery />

      {/* VIDEO */}

      {videoOpen && (
        <VideoModal
          closeVideo={() => setVideoOpen(false)}
        />
      )}

      {/* FOOTER */}

      <ToyotaFooter />

    </div>
  );
}
