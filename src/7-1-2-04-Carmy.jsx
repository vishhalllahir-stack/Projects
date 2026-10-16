import "./7-1-1-BuyOnline.css";

import { useState } from "react";
import TwebFooter from "./7-1-Tweb-Footer";

const COLORS = [
  {
    name: "ATITUDE BLACK",
    hex: "#111111",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/0/6/06-camrynew-allcolors_attitude-black-797x456.jpg",
  },
  {
    name: "PRECIOUS METAL",
    hex: "#354540",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/0/6/06-camrynew-allcolors_cement-grey-797x456.jpg",
  },
  {
    name: "DARK BLUE METALICK",
    hex: "#1a1a1a",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/202c6726f17996e432b304563772432b/0/6/06-camrynew-allcolors_dark-blue-797x456.jpg",
  },
  {
    name: "EMOTIONAL RED",
    hex: "#580e0e",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/202c6726f17996e432b304563772432b/0/6/06-camrynew-allcolors_emotional-red-797x456.jpg",
  },
  {
    name: "PLATINUM WHITE PERAL",
    hex: "#6d6f73",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/202c6726f17996e432b304563772432b/0/6/06-camrynew-allcolors_platinum-white-797x456.jpg",
  },
  {
    name: "CEMENT GRAY",
    hex: "#111111",
    img:" https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/0/6/06-camrynew-allcolors_precious-metal-797x456.jpg"
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
    title: "Engine",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Type</td>
            <td>2.5L Dynamic Force Engine [BS6 Ph2 Petrol]</td>
          </tr>
          <tr>
            <td>No. of Cylinders</td>
            <td>In line - 4 cylinder</td>
          </tr>
          <tr>
            <td>Displacement</td>
            <td>2,487 cm3</td>
          </tr>
          <tr>
            <td>Max Output</td>
            <td>137 kW (187 PS) @ 6,000 rpm</td>
          </tr>
          <tr>
            <td>Max Torque</td>
            <td>221 Nm ( 23 kg-m) @ 3600 rpm to 5200 rpm</td>
          </tr>
        </tbody>
      </table>
    ),
  },

  {
    title: "Hybrid System",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Total Max. Output</td>
            <td>169 kW (230 PS)</td>
          </tr>
          <tr>
            <td>Drive Mode</td>
            <td>EV mode available</td>
          </tr>
          <tr>
            <td>Hybrid Battery: Type</td>
            <td>Li-ion</td>
          </tr>
          <tr>
            <td>Voltage (Nominal)</td>
            <td>251.6V</td>
          </tr>
          <tr>
            <td>Motor Generator: Type</td>
            <td>Type Permanent Magnet Synchronous Motor</td>
          </tr>
          <tr>
            <td>Max. Output</td>
            <td>100 kW (136 PS)</td>
          </tr>
          <tr>
            <td>Max. Torque</td>
            <td>208 Nm (21.2 kg-m)</td>
          </tr>
        </tbody>
      </table>
    ),
  },

  {
    title: "Chassis & Transmission",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Suspension Front/Rear</td>
            <td>MacPherson Strut / Double Wishbone</td>
          </tr>
          <tr>
            <td>Brake Front/Rear</td>
            <td>Disc</td>
          </tr>
          <tr>
            <td>Tyres & Wheels</td>
            <td>235/45R18 Alloys</td>
          </tr>
          <tr>
            <td>Transmission</td>
            <td>e-CVT (Electronic - Continuously Variable Transmission) - PB11</td>
          </tr>
          <tr>
            <td>Driving Modes</td>
            <td>Sport, Eco, Normal</td>
          </tr>
        </tbody>
      </table>
    ),
  },

  {
    title: "Dimensions & Weight",
    content: (
        <table className="spec-table">
        <tbody>
         <tr>
            <td>Overall L x W x H</td>
            <td>4920 mm x 1840 mm x 1455 mm</td>
         </tr>
         <tr>
            <td>Wheel Base</td>
            <td>2825 mm</td>
         </tr>
         <tr>
            <td>Track Front/Rear</td>
            <td>1580 mm/1590 mm</td>
         </tr>
         <tr>
            <td>Minimum Turning Radius</td>
            <td>5700 mm</td>
         </tr>
         <tr>
            <td>Fuel Tank Capacity</td>
            <td>50 litre</td>
         </tr>
         <tr>
            <td>Seating Capacity</td>
            <td>5-Seater</td>
         </tr>
         <tr>
            <td>Kerb Weight</td>
            <td>1,645 kg</td>
         </tr>
         <tr>
            <td>Gross Weight</td>
            <td>2,100 kg</td>
         </tr>
        </tbody>
      </table>
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
          <span className="current">Carmy</span>
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
            <h1>Carmy</h1>

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

