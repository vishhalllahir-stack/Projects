

// PartsSelector.jsx

import './7-2-Accessories.css';

const cars = [
  {
    id: 1,
    category: "Off-Roading",
    name: "Fortuner",
    image: "https://www.toyotapartsconnect.in/images/models/5.jpg",
    link: "/parts/fortuner",
  },
  {
    id: 2,
    category: "Off-Roading",
    name: "Fortuner Legender",
    image: "https://www.toyotapartsconnect.in/images/models/6.jpg",
    link: "/parts/fortuner-legender",
  },
  {
    id: 3,
    category: "Off-Roading",
    name: "Hilux",
    image: "https://www.toyotapartsconnect.in/images/models/7.jpg",
    link: "/parts/hilux",
  },
  {
    id: 4,
    category: "Comfort",
    name: "Camry",
    image: "https://www.toyotapartsconnect.in/images/models/3.jpg",
    link: "/parts/camry",
  },
  {
    id: 5,
    category: "Comfort",
    name: "Vellfire",
    image: "https://www.toyotapartsconnect.in/images/models/21.jpg",
    link: "/parts/vellfire",
  },
  {
    id: 6,
    category: "Driving",
    name: "Glanza",
    image: "https://www.toyotapartsconnect.in/images/models/21.jpg",
    link: "/parts/glanza",
  },
  {
    id: 7,
    category: "Driving",
    name: "Urban Cruiser Taisor",
    image: "https://www.toyotapartsconnect.in/images/models/18.jpg",
    link: "/parts/taisor",
  },
  {
    id: 8,
    category: "Safety",
    name: "Urban Cruiser Hyryder",
    image: "https://www.toyotapartsconnect.in/images/models/17.jpg",
    link: "/parts/hyryder",
  },
  {
    id: 9,
    category: "Safety",
    name: "Innova Hycross",
    image: "https://www.toyotapartsconnect.in/images/models/24.jpg",
    link: "/parts/innova-hycross",
  },
  {
    id: 10,
    category: "Family",
    name: "Innova Crysta",
    image: "https://www.toyotapartsconnect.in/images/models/2.jpg",
    link: "/parts/innova-crysta",
  },
  {
    id: 11,
    category: "Family",
    name: "Rumion",
    image: "https://www.toyotapartsconnect.in/images/models/23.jpg",
    link: "/parts/rumion",
  },
  {
    id: 12,
    category: "Luxury",
    name: "Land Cruiser 300",
    image: "https://www.toyotapartsconnect.in/images/models/15.jpg",
    link: "/parts/land-cruiser-300",
  },
];

export default function CarsShow() {
  return (
    <section className="partsSection">
      <div className="partsContainer">
        {/* Heading */}
        <div className="partsHeading">
          <h2>Search parts by selecting your car</h2>
          <span></span>
        </div>

        {/* Grid */}
        <div className="partsGrid">
          {cars.map((car) => (
            <a href={car.link} key={car.id} className="partCard">
              <div className="partImage">
                <img src={car.image} alt={car.name} loading="lazy" />
              </div>
              <p className="partCategory">{car.category}</p>
              <h3 className="partTitle">{car.name}</h3>
            </a>
          ))}
        </div>

        {/* Button */}
        <div className="viewAllWrapper">
          <button className="viewAllBtn">View All</button>
        </div>
      </div>
    </section>
  );
}