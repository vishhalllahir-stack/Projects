import { useState } from "react";
import ToyotaFooter from "./Footer";

const awardsData = {
  2020: [
    {
      id: 1,
      title: "Golden Peacock National Training Award 2020",
      category: "TKM Wins Golden Peacock National Training Award 2020",
      image:
        "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=900",
    },
  ],

  2019: [
    {
      id: 2,
      title: "Autocar CSR Award",
      category: "Recognition for Corporate Social Responsibility",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900",
    },
  ],

  2018: [
    {
      id: 3,
      title: "Best Manufacturing Excellence",
      category: "Innovation & Manufacturing",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900",
    },
  ],

  2017: [
    {
      id: 4,
      title: "Quality Leadership Award",
      category: "Quality & Customer Satisfaction",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900",
    },
  ],
};

export default function Awards() {
  const years = [
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
    2009,
    2008,
    2007,
    2006,
    2005,
    2004,
    2003,
    2002,
    2001,
    2000,
  ];

  const [selectedYear, setSelectedYear] = useState(2020);

  return (
    <>
    <img className="A-IMG"
      src="https://static3.toyotabharat.com/images/toyota-in-india/award/bg-img-1200x800.webp"
      alt=""
    />

    <div className="awardsPage">
      <aside className="awardsSidebar">


        <h2>By Year</h2>

        {years.map((year) => (
          <button
            key={year}
            className={selectedYear === year ? "activeYear" : ""}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}

      </aside>

      <section className="awardsContent">

        <h1>Toyota Awards / {selectedYear}</h1>

        <div className="awardsGrid">

          {(awardsData[selectedYear] || []).map((award) => (
            <div className="awardCard" key={award.id}>

              <img src={award.image} alt={award.title} />

              <div className="awardBody">

                <h3>{award.title}</h3>

                <p>{award.category}</p>

              </div>

            </div>
          ))}

          {!awardsData[selectedYear] && (
            <div className="empty">
              No awards available for {selectedYear}
            </div>
          )}

        </div>

      </section>

    </div>

    <div>
        <ToyotaFooter />
    </div>
    </>
  );
}