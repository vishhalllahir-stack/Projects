import { useEffect, useState } from "react";
import ToyotaFooter from "./Footer";

export default function Tcar() {
  const slides = [
    {
      image: "https://static3.toyotabharat.com/images/t-care/t-care-banner.webp",
      link: "https://www.toyotabharat.com/t-care/index.html#",
    },
    {
      image: "https://static3.toyotabharat.com/images/t-care/t-assist-banner.webp",
      link: "https://www.toyotabharat.com/q-service/qservices-fullmenu.html#t-assist",
    },
    {
      image: "https://static3.toyotabharat.com/images/t-care/t-deliver-banner.webp",
      link: "https://www.toyotabharat.com/t-care/index.html#",
    },
    {
      image: "https://static3.toyotabharat.com/images/t-care/t-gloss-banner.webp",
      link: "https://www.toyotabharat.com/q-service/qservices-fullmenu.html#t-gloss",
    },
    {
      image: "https://static3.toyotabharat.com/images/t-care/t-secure-banner.webp",
      link: "https://www.toyotabharat.com/q-service/qservices-fullmenu.html#t-secure",
    },
    {
      image: "https://static3.toyotabharat.com/images/t-care/t-smile-banner.webp",
      link: "https://www.toyotabharat.com/q-service/qservices-fullmenu.html#t-smile",
    },
    {
      image: "https://static3.toyotabharat.com/images/t-care/t-web-banner.webp",
      link: "https://tweb.toyotabharat.com/",
    },
    {
      image: "https://static3.toyotabharat.com/images/t-care/t-club-banner.webp",
      link: "https://www.toyotabharat.com/q-service/shop.html#modalFormTC",
    },
    {
      image: "https://static3.toyotabharat.com/images/t-care/t-shield-banner.webp",
      link: "https://www.toyotabharat.com/q-service/t-shield/",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <a href={slides[current].link} target="_blank" rel="noreferrer">
        <img
          src={slides[current].image}
          alt=""
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
          }}
        />
      </a>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "25%",
          left: "20px",
          transform: "translateY(-50%)",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
         ⟨
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "25%",
          right: "20px",
          transform: "translateY(-50%)",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        ⟩
      </button>

      <ToyotaFooter />
    </div>
  );
}