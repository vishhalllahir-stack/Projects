import { NavLink, Outlet } from "react-router-dom";
import { ChevronDown, UserRound, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import logoTweb from "./assets/chatgpt-image.png";
import "./7-1-Tweb.css";
import TwebFooter from "./7-1-Tweb-Footer";

const cars = [
  {
    name: "Urban Cruiser Hyryder",
    path: "/BuyOnline/UrbanCruserHyryder",
  },
  {
    name: "Innova Hycross",
    path: "/BuyOnline/InnovaHycross",
  },
  {
    name: "Innova Crysta",
    path: "/BuyOnline/InnovaCrysta",
  },
  {
    name: "Camry",
    path: "/BuyOnline/Carmy",
  },
  {
    name: "Fortuner",
    path: "/BuyOnline/Fortuner",
  },
  {
    name: "Legender",
    path: "/BuyOnline/Legender",
  },
  {
    name: "Hilux",
    path: "/BuyOnline/Hilux",
  },
];

const bannerImages = [
  "https://tweb.toyotabharat.com/media/wysiwyg/05-Tweb-Adapts_Legender-1920x807.jpg",
  "https://tweb.toyotabharat.com/media/wysiwyg/Legender.jpg",
  "https://tweb.toyotabharat.com/media/wysiwyg/13-TCare-KVs-04-09-2024_1280x538-2.jpg",
  "https://tweb.toyotabharat.com/media/wysiwyg/Crysta.jpg",
  "https://tweb.toyotabharat.com/media/wysiwyg/Camry.jpg",
  "https://tweb.toyotabharat.com/media/wysiwyg/Fortuner.jpg",
  "https://tweb.toyotabharat.com/media/wysiwyg/T_Web_Banners_Hyryder_1920x807pix_-_Copy.jpeg.jpg",
  "https://tweb.toyotabharat.com/media/wysiwyg/Hilux.jpg",
  "https://tweb.toyotabharat.com/media/wysiwyg/05-Tweb-Adapts_Hycross-1920x807.jpg",
  "https://tweb.toyotabharat.com/media/wysiwyg/Hycross.jpg",
];

export default function Tweb() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector('.tweb-header');
      if (!header) return;
      if (window.scrollY > 5) {
        header.classList.add('is-sticky');
      } else {
        header.classList.remove('is-sticky');
      }
    };

    window.addEventListener('scroll', onScroll);
    // run once to set initial state
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);









  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
  };

  return (
    <>
      <header className="tweb-header">
        <div className="logo-tweb">
          <img src={logoTweb} alt="TWEB logo" />
        </div>

        <div className="buyMenu">
          <NavLink to="/BuyOnline/tweb/BuyOnline" className="tweb-link">
            Buy Online
            <ChevronDown size={18} />
          </NavLink>

          <div className="buyDropdown">
            {cars.map((car) => (
              <NavLink key={car.name} to={car.path} className="buyItem">
                {car.name}
              </NavLink>
            ))}
          </div>
        </div>

        <NavLink to="/BuyOnline/tweb/HowItWork" className="tweb-link border">
          How It Works
        </NavLink>

        <NavLink
          to="/BuyOnline/tweb/SignUp"
          className="tweb-link   underline "
        >
          Sign Up
        </NavLink>

        <NavLink to="/BuyOnline/tweb/MyToyota" className="tweb-link underline">
          MY Toyota
        </NavLink>

        <NavLink to="/BuyOnline/tweb/Profile" className="tweb-icon">
          <UserRound size={25} />
        </NavLink>

        <NavLink to="/BuyOnline/tweb/Cart" className="tweb-cart">
          <ShoppingCart size={22} />
          <span>0</span>
        </NavLink>
      </header>




      <div className="slider">
        <button className="arrow left" onClick={prevSlide}>
          &#10094;
        </button>

        <div
          className="slides"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {bannerImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Toyota ${index + 1}`}
              className="slide"
            />
          ))}
        </div>

        <button className="arrow right" onClick={nextSlide}>
          &#10095;
        </button>

        <div className="dots">
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={current === index ? "dot active" : "dot"}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="tweb-banner">
        <img
          src="https://tweb.toyotabharat.com/media/wysiwyg/youtube_placeholder.jpg"
          alt="Toyota YouTube Banner"
        />
      </div>

      <div className="text-center">
        <h2>Toyota in the Spotlight</h2>
        <p>Get to know us better before you make your purchase</p>
      </div>

      <div className="cards">
        {/* Toyota Mobility Services */}
        <div className="card">
          <img
            src="https://tweb.toyotabharat.com/media/wysiwyg/mobility-service.jpg"
            alt="Toyota Mobility Services"
          />

          <h2>Toyota Mobility Services</h2>

          <p>
            Lease or subscribe to an awesome car that/ fits your needs with
            flexible tenure.
          </p>

          <NavLink to="/Mobility" className="know-btn">
            Know More
          </NavLink>
        </div>

        {/* Toyota Service */}
        <div className="card">
          <img
            src="https://tweb.toyotabharat.com/media/wysiwyg/Toyota-Service.jpg"
            alt="Toyota Service"
          />

          <h2>Toyota Service</h2>

          <p>
            Convenient bookings, transparent calculations and information at
            your fingertips!
          </p>

          <NavLink
            to="/Service/Services/Service_Dealer_Locator"
            className="know-btn"
          >
            Know More
          </NavLink>
        </div>

        {/* Used Cars */}
        <div className="card">
          <img
            src="https://tweb.toyotabharat.com/media/wysiwyg/Innova_Old_Crysta_new.jpg"
            alt="Used Cars"
          />

          <h2>Used Cars</h2>

          <p>Exchange your used car of any brand for a brand-new Toyota.</p>

          <NavLink to="/UsedCars" className="know-btn">
            Know More
          </NavLink>
        </div>
      </div>

      <div>
        <TwebFooter />
      </div>

      <Outlet />
    </>
  );
}
