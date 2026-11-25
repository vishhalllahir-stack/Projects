import { useState, useEffect } from "react";
import ToyotaFooter from "./Footer";
import "./App.css";

const banners = [
  "https://static3.toyotabharat.com/images/homepage/banners/inc-mmc-banner-1920x807.webp",
  "https://static3.toyotabharat.com/images/homepage/banners/fortuner-le-1920x807.webp",
  "https://static3.toyotabharat.com/images/homepage/banners/lc-300-gr-sport-1920x807.webp",
  "https://static3.toyotabharat.com/images/homepage/banners/hilux-black-edition-1920x807.webp",
  "https://static3.toyotabharat.com/images/homepage/banners/self-charging-strong-hybrid-electric-suv_1920x807.webp",
  "https://static3.toyotabharat.com/images/homepage/banners/legender-effortless-prestigious-1920x807.webp",
  "https://static3.toyotabharat.com/images/homepage/banners/celebrating-2nd-anniversary-1920x807.webp",
  "https://static3.toyotabharat.com/images/homepage/banners/glanza-saftey-in-every-drive-1920x807.webp",
  "https://static3.toyotabharat.com/images/homepage/banners/urban-cruiser-taisor-homepage-banner-1920x807.webp",
  "https://static3.toyotabharat.com/images/homepage/banners/vellfire-homepage-banner-1920x807.webp",
  "https://static3.toyotabharat.com/images/homepage/banners/camry-sprint-teaser-banner-1920x807.webp",
  "https://static3.toyotabharat.com/images/homepage/banners/home-banner-1920x807.webp",
];


  const carsData = [
    {
      name: "Urban Cruiser Taisor",
      category: "SUV",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/132427/taisor-exterior-right-front-three-quarter-41.png?isig=0",
    },
    {
      name: "Rumion",
      category: "MPV",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/105799/rumion-exterior-right-front-three-quarter-8.png?isig=0",
    },
    {
      name: "Urban Cruiser Hyryder",
      category: "SUV",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/124027/hyryder-exterior-right-front-three-quarter-74.png?isig=0",
    },
    {
      name: "Urban Cruiser Ebella",
      category: "SUV",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/191295/urban-cruiser-ebella-exterior-right-front-three-quarter-14.png?isig=0",
    },
    {
      name: "Innova Crysta",
      category: "MPV",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/222736/innova-crysta-2026-exterior-right-front-three-quarter.png?isig=0",
    },
    {
      name: "Innova Hycross",
      category: "MPV",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/115025/innova-hycross-exterior-right-front-three-quarter-74.png?isig=0",
    },
    {
      name: "Hilux",
      category: "SUV",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/109265/hilux-exterior-right-front-three-quarter-44.png?isig=0",
    },
    {
      name: "Fortuner",
      category: "SUV",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-28.png?isig=0",
    },
    {
      name: "Legender",
      category: "SUV",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/137767/fortuner-legender-exterior-right-front-three-quarter-5.png?isig=0",
    },
    {
      name: "Camry",
      category: "Cars",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/192443/camry-exterior-right-front-three-quarter-15.png?isig=0",
    },
    {
      name: "Vellfire",
      category: "MPV",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/154483/vellfire-exterior-right-front-three-quarter-4.png?isig=0",
    },
    {
      name: "Land Cruiser 300",
      category: "SUV",
      image:
        "https://imgd.aeplcdn.com/500x281/n/cw/ec/139739/land-cruiser-exterior-right-front-three-quarter-3.png?isig=0",
    },
  ];

export default function Products( ) {
  const [current, setCurrent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Models");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const categories = ["All Models", "Cars", "SUV", "MPV"];

  const filteredCars =
    selectedCategory === "All Models"
      ? carsData
      : carsData.filter(
          (car) => car.category === selectedCategory
        );

  return (
    <>
      {/* ================= Banner Slider ================= */}

      <div className="hero-slider">
        <button className="arrow left" onClick={prevSlide}>
          ❮
        </button>

        <img
          src={banners[current]}
          alt="Toyota Banner"
          className="banner-image"
        />

        <button className="arrow right" onClick={nextSlide}>
          ❯
        </button>

        <div className="dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={current === index ? "dot active" : "dot"}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* ================= Products ================= */}

      <section className="products-container">

        <h2 className="product-heading">
          Toyota Models
        </h2>

        <div className="category-bar">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-tab active"
                  : "category-tab"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="cars-grid">
          {filteredCars.map((car) => (
            <div className="car-card" key={car.name}>

              <div className="car-card-image-wrapper">
                <img
                  src={car.image}
                  alt={car.name}
                  className="car-image"
                />
              </div>

              <h3>{car.name}</h3>

              <p>{car.category}</p>

              <div className="car-card-red-bar"></div>

            </div>
          ))}
        </div>

      </section>

      {/* ================= Bottom Banner ================= */}

      <div className="hero-banner">
        <img
          src="https://static3.toyotabharat.com/images/homepage/banners/happier-paths-tomorrow-1920x807.webp"
          alt="Toyota Banner"
        />
      </div>

      {/* ================= Footer ================= */}

      <ToyotaFooter />
    </>
  );
}