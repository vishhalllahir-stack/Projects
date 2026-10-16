import "./7-1-1-BuyOnline.css";

import { useState } from "react";
import TwebFooter from "./7-1-Tweb-Footer";

const COLORS = [
  {
    name: "Cafe White",
    hex: "#e8e6df",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/s/u/super-white_1.png",
  },
  {
    name: "Speedy Blue",
    hex: "#1e73c9",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/a/g/ageha-blackish.png",
  },
  {
    name: "Cave Black",
    hex: "#1a1a1a",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/s/p/sparkling-black-pearl-crystal-shine.png",
  },
  {
    name: "Enticing Silver",
    hex: "#a8a8a8",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/p/l/platinum-white-pearl_1.png",
  },
  {
    name: "Gaming Grey",
    hex: "#6d6f73",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/a/v/avant-garde-bronze_1.png",
  },
  {
    name: "Midnight Black",
    hex: "#111111",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/a/t/attitude-black.png",
  },
  {
    name: "Midnight Black with Red Roof",
    hex: "#111111",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/m/e/metallic-silver_1.png",
  },
  {
    name: "Fooly White with Red Roof   ",
    hex: "#c9c9c9",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/a/v/avant-garde-bronze_1.png",
  },
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
    title: "Dimensions",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Overall Length</td>
            <td>4365 mm</td>
          </tr>
          <tr>
            <td>Overall Width</td>
            <td>1795 mm</td>
          </tr>
          <tr>
            <td>Overall Height</td>
            <td>1645 mm</td>
          </tr>
          <tr>
            <td>Wheelbase</td>
            <td>2600 mm</td>
          </tr>
          <tr>
            <td>Ground Clearance</td>
            <td>210 mm</td>
          </tr>
        </tbody>
      </table>
    ),
  },

  {
    title: "Engine, Transmission & Chassis",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Engine Type</td>
            <td>1.5L Petrol</td>
          </tr>
          <tr>
            <td>Max Power</td>
            <td>103 PS</td>
          </tr>
          <tr>
            <td>Transmission</td>
            <td>5MT / 6AT / e-CVT</td>
          </tr>
          <tr>
            <td>Fuel Tank</td>
            <td>45 L</td>
          </tr>
        </tbody>
      </table>
    ),
  },

  {
    title: "Exteriors",
    content: (
      <ul className="feature-list">
        <li>LED Projector Headlamps</li>
        <li>LED DRLs</li>
        <li>Chrome Front Grille</li>
        <li>17-inch Alloy Wheels</li>
        <li>Rear Spoiler</li>
      </ul>
    ),
  },

  {
    title: "Seats, Comfort & Convenience",
    content: (
      <ul className="feature-list">
        <li>Automatic Climate Control</li>
        <li>Rear AC Vent</li>
        <li>Push Start/Stop</li>
        <li>Cruise Control</li>
        <li>Wireless Charger</li>
      </ul>
    ),
  },

  {
    title: "Safety & Security",
    content: (
      <ul className="feature-list">
        <li>6 Airbags</li>
        <li>ABS with EBD</li>
        <li>Vehicle Stability Control</li>
        <li>Hill Hold Assist</li>
        <li>Rear Parking Camera</li>
      </ul>
    ),
  },

  {
    title: "Interiors",
    content: (
      <ul className="feature-list">
        <li>Leather Wrapped Steering</li>
        <li>Premium Dashboard</li>
        <li>9-inch Touchscreen</li>
        <li>Connected Car Technology</li>
        <li>Ambient Lighting</li>
      </ul>
    ),
  },
];





export default function UrbanCruiserHyryder() {
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
          <span className="current">Innova Hycross</span>
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
            <h1>Innova Hycross</h1>

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

