import { useEffect, useState } from "react";
import './7-2-Accessories.css';

const banners = [
  "https://www.toyotapartsconnect.in/images/home/home-banner-extended-warranty.jpg",
  "https://www.toyotapartsconnect.in/images/home/home-banner-t-assist.jpg",
  "https://www.toyotapartsconnect.in/images/home/tpc-main-banner.jpg",
  "https://www.toyotapartsconnect.in/images/home/home-banner-genuine-parts-01.jpg",
  "https://www.toyotapartsconnect.in/images/home/home-banner-smiles-plus.jpg",
];

export default function HomeBannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homeBannerSlider">
      {banners.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className={`homeBannerImage ${
            current === index ? "activeBanner" : ""
          }`}
        />
      ))}
    </div>
  );
}