import ToyotaFooter from "./Footer";
import './6-1-Mobility.css'



const cards = [
  {
    title: "KINTO ONE",
    text: "Experience seamless & Smart Mobility for individuals",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800",
    layout: "image-text",
  },
  {
    title: "EMPLOYEE BENEFITS",
    text: "Explore the Awesome benefits on wide range of our product",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800",
    layout: "text-image",
  },
  {
    title: "TOYOTA CORPORATE LEASING",
    text: "Give your corporate commute, Toyota's Awesome touch",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    layout: "text-image",
  },
  {
    title: "TOYOTA SUBSCRIPTION",
    text: "Enjoy the Awesome Toyota Experience without actual purchase",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
    layout: "image-text",
  },
  {
    title: "CONVERSION SOLUTIONS",
    text: "Customize your favorite Toyota to suit your unique requirement",
    image:
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800",
    layout: "text-image",
  },
  {
    title: "FIELD DIAGNOSIS",
    text: "",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800",
    layout: "image-only",
  },
];

export default function Mobility() {
  return (
    <>
    <div>
      <img style={{width : "100%"}}
  src="https://static3.toyotabharat.com/images/subscription/mobility-solution-leasing-main-banner-01.webp"
  alt="Toyota Mobility Solution"
/>
    </div>
    <div className="mobility-page">
      <div className="grid">

        {/* Left Column */}

        <div className="column">

          <div className="card image-card">
            <img src={cards[0].image} alt="" />
          </div>

          <div className="card text-card">
            <h2>{cards[0].title}</h2>
            <p>{cards[0].text}</p>
            <span>→</span>
          </div>

          <div className="card text-card">
            <h2>{cards[2].title}</h2>
            <p>{cards[2].text}</p>
            <span>→</span>
          </div>

        </div>

        {/* Middle Column */}

        <div className="column">

          <div className="card text-card">
            <h2>{cards[1].title}</h2>
            <p>{cards[1].text}</p>
            <span>→</span>
          </div>

          <div className="card image-card">
            <img src={cards[3].image} alt="" />
          </div>

          <div className="card image-card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg"
              alt=""
            />
          </div>

          <div className="card text-card">
            <h2>{cards[4].title}</h2>
            <p>{cards[4].text}</p>
            <span>→</span>
          </div>

        </div>

        {/* Right Column */}

        <div className="column">

          <div className="card image-card">
            <img src={cards[1].image} alt="" />
          </div>

          <div className="card image-card">
            <img src={cards[5].image} alt="" />
          </div>

        </div>

      </div>
      <ToyotaFooter />
    </div>
    </>
  );
}