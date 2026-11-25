import "./7-1-1-BuyOnline.css";

import { useState } from "react";
import TwebFooter from "./7-1-Tweb-Footer";

const COLORS = [
  {
    name: "DARK YELLOW",
    hex: "#ffbb00",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/s/u/sulphur_metallic_latest.png",
  },
  {
    name: "DARK BLACK",
    hex: "#111111",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/a/t/attitude_black_latest_1.png",
  },
  {
    name: "SUPER WHITE",
    hex: "#ffffff",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/s/u/super_white_latest.png",
  },
  {
    name: "EMOTIONAL RED",
    hex: "#ad0000",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/e/m/emotional_red_latest.png",
  },
  {
    name: "PLATINUM WHITE PEARL",
    hex: "#828282",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/p/l/platinum_white_pearl_latest.png",
  },
  {
    name: "GRAY METALIC",
    hex: "#2e3f47",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/a/s/ash_latest.png",
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
    title: "Engine",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Displacement</td>
            <td>2755 cm3</td>
          </tr>
          <tr>
            <td>Fuel Type</td>
            <td>Diesel</td>
          </tr>
          <tr>
            <td>Max. Output</td>
            <td>
              STD MT & High MT - 150 kW [204 PS] (MT) @ 3400 rpm High AT - 150
              kW [204 PS] @ 3000-3400 rpm
            </td>
          </tr>
          <tr>
            <td>Max. Torque</td>
            <td>
              STD MT & High MT - 420 Nm (MT) @ 1400 - 3400 rpm High AT - 500 Nm
              @ 1600 - 2800 rpm
            </td>
          </tr>
          <tr>
            <td>Cylinder Nos. & Layout</td>
            <td>4 & Inline</td>
          </tr>
          <tr>
            <td>Emission Standard</td>
            <td>BS VI</td>
          </tr>
          <tr>
            <td>Drive Type</td>
            <td>4WD Auto Limited Slip Differential</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "Transmission",
    content: (
      <table className="spec-table">
        <tr>
          <td>Type</td>
          <td>6 MT / 6 AT</td>
        </tr>
        <tr>
          <td>STD MT</td>
          <td>Transmission 6MT with iMT [Intelligent Manual Transmission]</td>
        </tr>
        <tr>
          <td>High MT</td>
          <td>Transmission 6MT with iMT [Intelligent Manual Transmission]</td>
        </tr>
        <tr>
          <td>High AT</td>
          <td>6AT [Sequential Shift + Shiftlock]</td>
        </tr>
      </table>
    ),
  },
  {
    title: "Dimensions & Weight",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Overall (L × W × H)</td>
            <td>5325 × 1800 × 1815 mm</td>
          </tr>
          <tr>
            <td>Wheelbase</td>
            <td>3085 mm</td>
          </tr>
          <tr>
            <td>Min. Turning Radius</td>
            <td>6.5 m</td>
          </tr>
          <tr>
            <td>Fuel Tank Capacity</td>
            <td>80 L</td>
          </tr>
          <tr>
            <td>Seating Capacity</td>
            <td>5 Seater</td>
          </tr>
          <tr>
            <td>Gross Vehicle Weight</td>
            <td>2880 kg</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "Chassis",
    content: (
      <table className="spec-table">
        <tr>
          <td>Front</td>
          <td>Double Wishbone</td>
        </tr>
        <tr>
          <td>Rear</td>
          <td>Leaf spring rigid axle</td>
        </tr>
      </table>
    ),
  },
  {
    title: "Stabilizer",
    content: (
      <table className="spec-table">
        <tr>
          <td>Front</td>
          <td>Pitch & Bounce Control</td>
        </tr>
      </table>
    ),
  },
  {
    title: "Brakes",
    content: (
      <table className="spec-table">
        <tr>
          <td>Front</td>
          <td>Ventilated Discs</td>
        </tr>
        <tr>
          <td>Rear</td>
          <td>Drum</td>
        </tr>
      </table>
    ),
  },
  {
    title: "Wheel & Tyre",
    content: (
      <table className="spec-table">
        <tr>
          <td>STD MT</td>
          <td>Bridgestone, 265/65R17 112S, Radial, Tubeless</td>
        </tr>
        <tr>
          <td>High MT & High AT</td>
          <td>Bridgestone, 265/60R18 110H, Radial, Tubeless</td>
        </tr>
      </table>
    ),
  },
  {
    title: "Engine, Chassis & Transmission",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Fuel Type</td>
            <td>Diesel</td>
          </tr>
          <tr>
            <td>Displacement</td>
            <td>2755 cm3 (cc)</td>
          </tr>
          <tr>
            <td>Valve Train</td>
            <td>DOHC, 16-Valve</td>
          </tr>
          <tr>
            <td>Cylinder Layout</td>
            <td>4-Cylinder, In-Line</td>
          </tr>
          <tr>
            <td>Max. Output</td>
            <td>150 kW [204 PS] @ 3400 rpm</td>
          </tr>
          <tr>
            <td>Max. Torque</td>
            <td>500 Nm @ 1600 - 2800 rpm</td>
          </tr>
          <tr>
            <td>Transmission</td>
            <td>6-Speed Automatic / 6-Speed Manual</td>
          </tr>
          <tr>
            <td>Drive Type</td>
            <td>4x4 / 2WD</td>
          </tr>
          <tr>
            <td>Front Suspension</td>
            <td>Independent Double Wishbone</td>
          </tr>
          <tr>
            <td>Rear Suspension</td>
            <td>Leaf Spring</td>
          </tr>
          <tr>
            <td>Brake System</td>
            <td>Ventilated Disc / Solid Disc</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "Safety & Security",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Fuel Type: Diesel</td>
          </tr>
          <tr>
            <td>VSC (Vehicle Stability Control) with BA (Brake Assist)</td>
          </tr>
          <tr>
            <td>HAC (Hill Assist Control)</td>
          </tr>
          <tr>
            <td>TRC (Traction Control System)</td>
          </tr>
          <tr>
            <td>7 SRS Airbags**</td>
          </tr>
          <tr>
            <td>ABS with EBD</td>
          </tr>
          <tr>
            <td>Front & Rear Parking Sensors</td>
          </tr>
          <tr>
            <td>Rear View Camera</td>
          </tr>
          <tr>
            <td>Child Restraint System: ISOFIX + Top Tether</td>
          </tr>
          <tr>
            <td>Anti Theft Alarm with Immobilizer</td>
          </tr>
          <tr>
            <td>Impact Absorbing Structure</td>
          </tr>
          <tr>
            <td>Emergency Brake Signal</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "Exterior Features",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Fuel Type: Diesel</td>
          </tr>
          <tr>
            <td>LED Headlamps</td>
          </tr>
          <tr>
            <td>LED DRLs</td>
          </tr>
          <tr>
            <td>Rear LED Combination Lamps</td>
          </tr>
          <tr>
            <td>Chrome Front Grille</td>
          </tr>
          <tr>
            <td>Heavy Duty Bumper Design</td>
          </tr>
          <tr>
            <td>Side Steps / Step Boards</td>
          </tr>
          <tr>
            <td>17-inch Alloy Wheels</td>
          </tr>
          <tr>
            <td>Roof Rails</td>
          </tr>
          <tr>
            <td>Power Adjustable ORVMs</td>
          </tr>
          <tr>
            <td>Rain Sensing Wipers</td>
          </tr>
          <tr>
            <td>Auto Headlamp On / Off</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "Interior Features / Comfort & Convenience",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>Fuel Type: Diesel</td>
          </tr>
          <tr>
            <td>Leather Upholstery</td>
          </tr>
          <tr>
            <td>8-inch Touchscreen Display</td>
          </tr>
          <tr>
            <td>Apple CarPlay / Android Auto</td>
          </tr>
          <tr>
            <td>Dual Zone Automatic Climate Control</td>
          </tr>
          <tr>
            <td>Steering Mounted Controls</td>
          </tr>
          <tr>
            <td>Tilt & Telescopic Steering</td>
          </tr>
          <tr>
            <td>Cruise Control</td>
          </tr>
          <tr>
            <td>Power Windows</td>
          </tr>
          <tr>
            <td>Smart Entry & Push Start</td>
          </tr>
          <tr>
            <td>Centre Console with Armrest</td>
          </tr>
          <tr>
            <td>Rear USB Charging Port</td>
          </tr>
          <tr>
            <td>Wireless Smartphone Charger</td>
          </tr>
          <tr>
            <td>Multi-Information Display (MID)</td>
          </tr>
          <tr>
            <td>Automatic Headlamps & Wipers</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "Off-Road Features",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>4x4 Capability</td>
          </tr>
          <tr>
            <td>Electronic Differential Lock</td>
          </tr>
          <tr>
            <td>Hill Descent Control</td>
          </tr>
          <tr>
            <td>Multi-Terrain Select</td>
          </tr>
          <tr>
            <td>High Ground Clearance</td>
          </tr>
          <tr>
            <td>Heavy Duty Suspension</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "Safety & Security",
    content: (
      <ul>
        <li>VSC [Vehicle Stability Control] with BA [Brake Assist]</li>
        <li>HAC [Hill Assist Control]</li>
        <li>7 SRS Airbags</li>
        <li>Anti Theft Alarm</li>
        <li>Front Seats: WIL Concept Seats [Whiplash Injury Lessening]</li>
        <li>Child Restraint System: ISOFIX + Tether Anchor on 2nd Row</li>
        <li>Front Row Seatbelts with Pretensioner + Force Limiter</li>
        <li>ABS</li>
        <li>Speed Auto Lock</li>
        <li>Speed Auto Lock</li>
        <li>Impact Absorbing Structure</li>
        <li>Emergency Brake Signal</li>
      </ul>
    ),
  },
  {
    title : "Colour Matrix",
    content : (
      <ul>
        <li>EMOTIONAL RED*</li>
<li>WHITE PEARL Crystal Shine*</li>
<li>SILVER METALLIC*</li>
<li>SUPER WHITE**</li>
<li>GRAY Metallic*</li>
<li>* Only available in High Grade</li>
<li>** Only available in STD grade</li>
      </ul>
    )
  }
];

export default function Hilux() {
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
  };

  return (
    <>
      <div>
        <div className="breadcrumb">
          Home <span className="sep">›</span>{" "}
          <span className="current">Hilux</span>
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
            <h1>Hilux</h1>

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
                  <div className="accordion-content">{item.content}</div>
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
                damage. However the braking ability varies from road and driving
                conditions.
              </p>

              <p>
                #For more details on the functioning of airbags, please refer to
                the owner's manual.
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
