import { useState } from "react";

export default function TCareSlider() {
  const services = [
    {
      name: "T DELIVER",
      image:
        "https://static3.toyotabharat.com/images/t-care/t-deliver-banner.webp",
    },
    {
      name: "T GLOSS",
      image:
        "https://static3.toyotabharat.com/images/t-care/t-gloss-banner.webp",
    },
    {
      name: "T WEB",
      image:
        "https://static3.toyotabharat.com/images/t-care/t-web-banner.webp",
    },
    {
      name: "T CHOICE",
      image:
        "https://static3.toyotabharat.com/images/t-care/t-choice-banner.webp",
    },
    {
      name: "T INSPECT",
      image:
        "https://static3.toyotabharat.com/images/t-care/t-inspect-banner.webp",
    },
    {
      name: "T SAATH",
      image:
        "https://static3.toyotabharat.com/images/t-care/t-saath-banner.webp",
    },
    {
      name: "T SERV",
      image:
        "https://static3.toyotabharat.com/images/t-care/t-serv-banner.webp",
    },
    {
      name: "T SPARSH",
      image:
        "https://static3.toyotabharat.com/images/t-care/t-sparsh-banner.webp",
    },
    {
      name: "T CLUB",
      image:
        "https://static3.toyotabharat.com/images/t-care/t-club-banner.webp",
    },
    {
      name: "T SHIELD",
      image:
        "https://static3.toyotabharat.com/images/t-care/t-shield-banner.webp",
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "30px auto",
        fontFamily: "Arial",
      }}
    >
      {/* Logo Menu */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "20px",
          padding: "15px 0",
          justifyContent: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
        {services.map((item, index) => (
          <img
            key={index}
            src={item.image}
            alt={item.name}
            onClick={() => setCurrent(index)}
            style={{
              width: "120px",
              cursor: "pointer",
              borderBottom:
                current === index ? "3px solid red" : "3px solid transparent",
              transition: "0.3s",
            }}
          />
        ))}
      </div>

      {/* Banner */}
      <div style={{ marginTop: "20px" }}>
        <img
          src={services[current].image}
          alt={services[current].name}
          style={{
            width: "100%",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}