import "./7-1-1-BuyOnline.css";

import { useState } from "react";
import TwebFooter from "./7-1-Tweb-Footer";

const COLORS = [
  {
    name: "PANTHOM BROWN",
    hex: "#111111",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/4/w/4w9.png",
  },
  {
    name: "SUPER WHITE",
    hex: "#354540",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/0/4/040_3.png",
  },
  {
    name: "ATITUDE BLACK MICA",
    hex: "#1a1a1a",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/2/2/220_1.png",
  },
  {
    name: "SILVER METALLIC",
    hex: "#580e0e",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/1/d/1d6_3.png",
  },
  {
    name: "PAHANTOM BROWN",
    hex: "#6d6f73",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/4/v/4v8_2.png",
  },
  {
    name: "SPARKLING BLACK PERAL CRYSTAL SHINE",
    hex: "#111111",
    img:" https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/2/1/218_3.png"
  }
 
];

const FUEL_TYPES = ["CNG", "PETROL", "HYBRID"];
const VARIANTS = ["E", "S", "G.", "V", "V AT AWD NEODRIVE"];
const TRANSMISSIONS = ["MT", "AT", "e-Drive"];
const DRIVE_TYPES = ["2WD", "4WD"];
const PRICES = { CNG: 1131000, PETROL: 1195000, HYBRID: 1929000 };


function OptionGroup({ label, options, value, onChange }) {
  return (
    <div className="field">
      <div className="field-label">{label}</div>
      <div className="options">
        {options.map((opt) => (
          <button
            key={opt}
            className={`opt${value === opt ? " selected" : ""}`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}



const specificationData = [
  {
    title: "Dimensions & Weight",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Overall (L × W × H)</td>
            <td>4795 × 1855 × 1835 mm</td>
          </tr>
          <tr>
            <td>Wheelbase</td>
            <td>2745 mm</td>
          </tr>
          <tr>
            <td>Fuel Tank Capacity</td>
            <td>80 L</td>
          </tr>
          <tr>
            <td>Seating Capacity</td>
            <td>7</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "Engine, Chassis & Transmission",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Engine</td>
            <td>2755 cc Diesel / 2694 cc Petrol</td>
          </tr>
          <tr>
            <td>Transmission</td>
            <td>6MT / 6AT</td>
          </tr>
          <tr>
            <td>Drive Type</td>
            <td>2WD / 4WD</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "Safety & Security",
    content: (
      <ul className="spec-list">
        <li>7 SRS Airbags</li>
        <li>Vehicle Stability Control</li>
        <li>Hill Assist Control</li>
        <li>ABS with EBD</li>
        <li>Traction Control System</li>
      </ul>
    ),
  },
  {
    title: "Exterior Features",
    content: (
      <ul className="spec-list">
        <li>LED Headlamps</li>
        <li>LED DRLs</li>
        <li>LED Fog Lamps</li>
        <li>Chrome Grille</li>
        <li>Alloy Wheels</li>
      </ul>
    ),
  },
  {
    title: "Interior Features / Comfort & Convenience",
    content: (
      <ul className="spec-list">
        <li>Leather Seats</li>
        <li>Ventilated Front Seats</li>
        <li>Automatic Climate Control</li>
        <li>8" Touchscreen</li>
        <li>Android Auto & Apple CarPlay</li>
      </ul>
    ),
  },
  {
    title: "Off-Road Features",
    content: (
      <ul className="spec-list">
        <li>4WD System</li>
        <li>Downhill Assist Control</li>
        <li>Active Traction Control</li>
        <li>Lockable Differential</li>
      </ul>
    ),
  },
];






export default function Carmy() {
  const [fuel, setFuel] = useState("CNG");
  const [variant, setVariant] = useState("S");
  const [trans, setTrans] = useState("MT");
  const [drive, setDrive] = useState("2WD");
  const [colorIdx, setColorIdx] = useState(1);
  // const [activeTab, setActiveTab] = useState("E CNG");
  // const [activeSub, setActiveSub] = useState("S");

  const price = PRICES[fuel] ?? PRICES.CNG;

  const cyclePhoto = (dir) => {
    const n = COLORS.length;
    setColorIdx((prev) => (prev + dir + n) % n);
  };


  const handleBuy = () => {
    alert(
      `Booking summary\n\nFuel: ${fuel}\nVariant: ${variant}\nTransmission: ${trans}\nDrive: ${drive}\nColour: ${COLORS[colorIdx].name}\nBooking amount: ₹25,000`,
    );
  };


  const [active, setActive] = useState(null);
  const toggleAccordion = (index) => {
    setActive(active === index ? null : index);
  }

  return (
    <>
      <div>
        <div className="breadcrumb">
          Home <span className="sep">›</span>{" "}
          <span className="current">Fortuner</span>
        </div>

        <div className="layout">
          <div className="gallery">
            <div className="stage">
              <button className="nav-btn prev" onClick={() => cyclePhoto(-1)}>
                ‹
              </button>
              <img src={COLORS[colorIdx].img} alt={COLORS[colorIdx].name} />
              <button className="nav-btn next" onClick={() => cyclePhoto(1)}>
                ›
              </button>
            </div>
            <div className="thumbs">
              {COLORS.map((c, i) => (
                <div
                  key={c.name}
                  className={`thumb${colorIdx === i ? " active" : ""}`}
                  onClick={() => setColorIdx(i)}
                >
                  <img src={c.img} alt={c.name} />
                </div>
              ))}
            </div>
          </div>

          <div className="info">
            <h1>Fortuner</h1>

            <div className="price-row">
              <span className="price-label">EX SHOWROOM PRICE START FROM</span>
              <span className="price-value">
                ₹{price.toLocaleString("en-IN")}
              </span>
            </div>

            <OptionGroup
              label="Fuel Type"
              options={FUEL_TYPES}
              value={fuel}
              onChange={setFuel}
            />
            <OptionGroup
              label="Variant"
              options={VARIANTS}
              value={variant}
              onChange={setVariant}
            />
            <OptionGroup
              label="Transmission Type"
              options={TRANSMISSIONS}
              value={trans}
              onChange={setTrans}
            />
            <OptionGroup
              label="Drive Type"
              options={DRIVE_TYPES}
              value={drive}
              onChange={setDrive}
            />

            <div className="field">
              <div className="field-label">
                Exterior Color — {COLORS[colorIdx].name}
              </div>
              <div className="swatches">
                {COLORS.map((c, i) => (
                  <div
                    key={c.name}
                    className={`swatch${colorIdx === i ? " selected" : ""}`}
                    style={{ background: c.hex }}
                    title={c.name}
                    onClick={() => setColorIdx(i)}
                  />
                ))}
              </div>
            </div>

            <div className="booking">BOOKING AMOUNT: ₹25,000</div>
            <button className="buy-btn" onClick={handleBuy}>
              Proceed to Buy
            </button>

            <div className="OnlineBookingBTN">
              <h4>i</h4>
              <p>
                For online booking, click on the "proceed to <br /> virtual
                showroom" button.
              </p>
            </div>

            {/*---------------------------------------------------------- Click on the below link to proceed to virtual showroom for online booking. */}
            <div className="preferred-note">
              <div className="preferred-note__icon">
                <span>i</span>
              </div>

              <div className="preferred-note__content">
                <p>
                  If the preferred model is not listed, you can
                  <br />
                  book it on Toyota bharat website.
                </p>

                <a
                  href="https://www.toyotabharat.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click Here to Follow
                </a>
              </div>
            </div>
          </div>
        </div>




        <section className="specifications-section">
      <div className="spec-container">

        <h2 className="spec-heading">Specifications</h2>

        {specificationData.map((item, index) => (
          <div className="accordion-item" key={index}>
            <button
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.title}</span>

              <div className={`icon ${active === index ? "open" : ""}`}>
                ▼
              </div>
            </button>

            {active === index && (
              <div className="accordion-content">
                {item.content}
              </div>
            )}
          </div>
        ))}




        <div className="disclaimer">
          <h3>Disclaimer</h3>
          <p>
            *The driver is always responsible for paying attention to the
            vehicle surroundings & driving safely as there are limitations
            to degree of recognition & controlling performance that this
            system can provide.
          </p>

          <p>
            **This function is activated only for vehicles and is also
            activated when the vehicle's speed is within the range of
            approximately 5 to 180 km/h. The system assists in mitigating
            damage. However the braking ability varies from road and
            driving conditions.
          </p>

          <p>
            #For more details on the functioning of airbags, please refer
            to the owner's manual.
          </p>
        </div>

      </div>
    </section>







      </div>

      <div>
        <TwebFooter />
      </div>
    </>
  );
}

