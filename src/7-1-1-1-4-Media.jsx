import { useState } from "react";
import ToyotaFooter from "./Footer";


const newsData = [
  {
    id: 1,
    year: "2025",
    date: "December 24 2025",
    title:
      "Toyota Signs MoU with Wildlife Foundation for Environmental Conservation",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  },
  {
    id: 2,
    year: "2025",
    date: "December 21 2025",
    title:
      "Toyota India's Brand Ambassador Completes Successful Tour Across India",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
  },
  {
    id: 3,
    year: "2025",
    date: "December 19 2025",
    title:
      "Toyota Hosts National Automobile Olympiad 2025 in Bengaluru",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
  },
  {
    id: 4,
    year: "2025",
    date: "December 17 2025",
    title:
      "Toyota Launches Community Education Initiative for Rural Students",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
  },
  {
    id: 5,
    year: "2025",
    date: "December 15 2025",
    title:
      "Toyota Opens New Training Centre to Enhance Technical Skills",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
  },
  {
    id: 6,
    year: "2025",
    date: "December 11 2025",
    title:
      "Toyota Signs Renewable Energy Partnership for Future Mobility",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
  },
  {
    id : 7,
    year : "2025",
    date : "December 03 2025",
    title : "Toyota Kirloskar Motor Inaugurates “Toyota Hornbill Music Festival 2025”",
    image : "https://static3.toyotabharat.com/images/news/2025/dec-03/thumb-311x175.webp"
  },
  {
    id : 8,
    year : "2025",
    date : "December 02 2025",
    title : "Toyota Kirloskar Motor Signs MoU with Government of Nagaland to Implement Strategic CSR Initiatives",
    image : "https://static3.toyotabharat.com/images/news/2025/dec-02/thumb-311x175.webp"
  },
  {
    id : 9,
    year : "2025",
    date : "December 24 2025",
    title : "Toyota India’s Brand Ambassador DRUM TAO Strikes a Powerful Chord: Successfully Concludes its Tour in India",
    image : "https://static3.toyotabharat.com/images/news/2025/dec-24/thumb-311x175.webp"
  },
];

export default function Media() {
  const [year, setYear] = useState("All");
  const [visible, setVisible] = useState(6);

  const years = [
    "All",
    "2026",
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
  ];

  const filtered =
    year === "All"
      ? newsData
      : newsData.filter((item) => item.year === year);

  return (
    <>

      {/* Hero */}

      <section className="newsHero">
        <div className="newsOverlay">
          <h1>PRESS RELEASE</h1>
        </div>
      </section>

      {/* Archive */}

      <section className="archive">

        <div className="archiveTitle">
          <small>ARCHIVE</small>
          <h1>All</h1>
        </div>

        <div className="years">

          {years.map((item) => (
            <button
              key={item}
              className={year === item ? "activeYear" : ""}
              onClick={() => setYear(item)}
            >
              {item}
            </button>
          ))}

        </div>

      </section>

      {/* Grid */}

      <section className="newsGrid">

        {filtered.slice(0, visible).map((item) => (

          <div className="newsCard" key={item.id}>

            <img src={item.image} alt="" />

            <span>{item.date}</span>

            <h3>{item.title}</h3>

            <button>READ MORE →</button>

          </div>

        ))}

      </section>

      {visible < filtered.length && (
        <div className="loadBox">
          <button onClick={() => setVisible(visible + 6)}>
            Load More
          </button>
        </div>
      )}

      <div>
        <ToyotaFooter />
      </div>

    </>
  );
}