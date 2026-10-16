import './7-2-Accessories.css';


const categories = [
  {
    title: "Oil Filters",
    image:
      "https://www.toyotapartsconnect.in/images/home/oil-filters.jpg",
  },
  {
    title: "Brakes Disc",
    image:
      "https://www.toyotapartsconnect.in/images/home/disc.jpg",
  },
  {
    title: "Wipers",
    image:
      "https://www.toyotapartsconnect.in/images/home/wipers.jpg",
  },
  {
    title: "Spark Plugs",
    image:
      "https://www.toyotapartsconnect.in/images/home/spark-plug.jpgF",
  },
];

export default function SecondPage() {
  return (
    <section className="pcSection">
      <div className="pcHeading">
        <h2>Popular Categories</h2>
        <div className="pcLine"></div>
      </div>

      <div className="pcGrid">
        {categories.map((item, index) => (
          <div className="pcCard" key={index}>
            <div className="pcImageBox">
              <img src={item.image} alt={item.title} />
            </div>

            <h3>{item.title}</h3>

            <div className="pcBottomLine"></div>
          </div>
        ))}
      </div>
    </section>
  );
}