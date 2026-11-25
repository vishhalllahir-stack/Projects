import "./7-1-1-BuyOnline.css";

import { useState } from "react";
import TwebFooter from "./7-1-Tweb-Footer";

const COLORS = [
  {
    name: "PLATINUM WHITE PEARL WHITH BLACK ROOF",
    hex: "#ffffff",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/l/e/legender.png",
  },
  {
    name: "PLATINUM WHITE PEARL WHITH BLACK ROOF",
    hex: "#ffffff",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/l/e/legender.png",
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
            <td>2.745 mm</td>
          </tr>
          <tr>
            <td>Min. Turning Radius</td>
            <td>5.8M</td>
          </tr>
          <tr>
            <td>Fuel Tank Capacity</td>
            <td>8-ltr</td>
          </tr>
          <tr>
            <td>Seating Capacity</td>
            <td>7 seater</td>
          </tr>
          <tr>
            <td>Gross Vehicle Weight</td>
            <td>2610 kg (2WD)</td>
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
            <td>Fuel Type</td>
            <td>Diesel</td>
          </tr> 
          <tr>
            <td>Displacement</td>
            <td>2755 cm3 (cc)</td>
          </tr>
          <tr>
           <td>Valve Train</td>
           <td>Double Overhead Camshaft [DOHC], 16-Valve</td>
          </tr>
          <tr>
            <td>Charging System</td>
                <td>Variable Nozzle Turbocharger with Intercooler</td>
          </tr>
          <tr>
             <td>Cylinder Nos. Layout</td>
                 <td>4-Cylinder, In-Line</td>
          </tr>
          <tr>
             <td>Max. Output</td>
                 <td>150 kW [204 PS] @ 3000-3400 rpm</td>
          </tr>
          <tr>
            <td>Max. Torque</td>
                <td>500 Nm @ 1600 - 2800 rpm</td>
          </tr>
          <tr>
              <td>Front Suspension</td>
                  <td>Front & Rear</td>
          </tr>
          <tr>
            <td>Rear Suspension</td>
                <td>Double Wishbone</td>
          </tr>
          <tr>
             <td>Brake Front & Rear</td>
                 <td>4-Link With Coil Spring</td>
          </tr>
          <tr>
              <td>Tyre</td>
                  <td>Ventilated Discs</td>
          </tr>
          <tr>
              <td>Stabilizer</td>
                  <td>Pitch & Bounce Control</td>
          </tr>
          <tr>
             <td>Transmission</td>
                 <td>6AT [Sequential Shift + Paddle Shift + Shiftlock]</td>
          </tr>
          <tr>
             <td>Drive Type</td>
                 <td>Automatic Idling Stop/Start Function</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "Safety & Security",
    content: (
      <table  className="spec-table">
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
            <td>7 (Units) SRS Airbags**</td>
          </tr>
          <tr>
            <td>Anti Theft Alarm with Ultrasonic Sensor and Glass Break Sensor</td>
          </tr>
          <tr>
            <td>Front Seats: WIL Concept Seats [Whiplash Injury Lessening]</td>
          </tr>
          <tr>
            <td>Child Restraint System: ISOFIX + Tether Anchor on 2nd Row</td>
          </tr>
          <tr>
            <td>Front Row Seatbelts with Pre-Tensioner + Force Limiter</td>
          </tr>
          <tr>
            <td>ABS with EBD</td>
          </tr>
          <tr>
            <td>Speed Auto Lock with Emergency Unlock</td>
          </tr>
          <tr>
            <td>Impact Absorbing Structure with Pedestrian Protection Support</td>
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
      <table  className="spec-table">
        <tbody>
          <tr>
            <td>Fuel Type: Diesel</td>
          </tr>
          <tr>
            <td>Split Quad LED Headlamps with Waterfall LED Line Guide Signature</td>
          </tr>
          <tr>
            <td>New Design Split LED Rear Combination Lamps</td>
          </tr>
          <tr>
            <td>Sequential Turn Indicators (Fr & Rr.)</td>
          </tr>
          <tr>
            <td>Catamaran Style Front & Rear Bumper</td>
          </tr>
          <tr>
            <td>Sleek & Cool Design Theme Grille with Piano Black Highlights</td>
          </tr>
          <tr>
            <td>Dual Tone Black Roof</td>
          </tr>
          <tr>
            <td>SMART Entry and Push Start/Stop</td>
          </tr>
          <tr>
            <td>Illuminated Entry System - Puddle Lamps Under Outside Mirror</td>
          </tr>
          <tr>
            <td>Chrome Plated Door Handles and Window Beltline</td>
          </tr>
          <tr>
            <td>Multi Layer Machine Cut Finish Alloy Wheels</td>
          </tr>
          <tr>
            <td>LED Front Fog Lamp</td>
          </tr>
          <tr>
            <td>Rear Fog Lamp</td>
          </tr>
          <tr>
            <td>Fully Automatic Power Back Door with Height Adjust Memory and Jam Protection</td>
          </tr>
          <tr>
            <td>Electrically Adjustable, Retractable Side Mirrors with Side Turn Indicators</td>
          </tr>
          <tr>
            <td>Aero-Stabilising Fins on ORVM Base and Rear Combination Lamps</td>
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
            <td>Leather Seats* with Perforation</td>
          </tr>
          <tr>
            <td>Ventilated Front Seats</td>
          </tr>
          <tr>
            <td>Dual Tone (Black & Maroon) Upholstery</td>
          </tr>
          <tr>
            <td>Cabin Wrapped in Soft Upholstery, Metallic Accents and Galaxy Black Patterned Ornamentation</td>
          </tr>
          <tr>
            <td>Interior Ambient Illumination (Instrument Center Garnish Area, Front Door Trims, Footwell Area)</td>
          </tr>
          <tr>
            <td>Heat Rejection Glass</td>
          </tr>
          <tr>
            <td>Cruise Control</td>
          </tr>
          <tr>
            <td>Contrast Maroon Stitch Across Interior</td>
          </tr>
          <tr>
            <td>Large TFT Multi-Information Display</td>
          </tr>
          <tr>
            <td>New Optitron Black Dial Combimeter with Illumination Control and White Illumination Bar</td>
          </tr>
          <tr>
            <td>Audio, MID, Tel, Voice Recognition Switches on Steering Wheel</td>
          </tr>
          <tr>
            <td>Tilt & Telescopic Steering Column</td>
          </tr>
          <tr>
            <td>Automatic Climate Control (Dual A/C) with Auto Rear Cooler</td>
          </tr>
          <tr>
            <td>Electrochromic Inside Rear View Mirror</td>
          </tr>
          <tr>
            <td>8.0 DA Touch Screen Audio with Capacitive Switches (BT, USB, Android Auto / Apple CarPlay)</td>
          </tr>
          <tr>
            <td>6 Speakers</td>
          </tr>
          <tr>
            <td>Connected Car Technology (Geo-Fencing, Real-time Vehicle Tracking, Walk to Car & Many More)</td>
          </tr>
          <tr>
            <td>Rear USB Port</td>
          </tr>
          <tr>
            <td>Wireless Smartphone Charger</td>
          </tr>
          <tr>
            <td>Centre Console Box with Soft Armrest</td>
          </tr>
          <tr>
            <td>Power Windows: All Windows Auto Up/Down with Jam Protection and Electronic Internal Rear View Mirror</td>
          </tr>
          <tr>
            <td>Cooled Upper Glovebox</td>
          </tr>
          <tr>
            <td>Power Back Door Access on SMART Key, Back Door and Driver Control</td>
          </tr>
          <tr>
            <td>Kick Sensor for Back Door Opening</td>
          </tr>
          <tr>
            <td>Driving Modes: ECO / NORMAL / SPORT Mode</td>
          </tr>
          <tr>
            <td>Power Adjust Driver and Front Passenger Seats</td>
          </tr>
          <tr>
            <td>2nd Row: 60:40 Split Fold, Slide, Recline & One-Touch Tumble</td>
          </tr>
          <tr>
            <td>3rd Row: One-Touch Easy Space-Up with Recline</td>
          </tr>
          <tr>
            <td>Park Assist: Back Monitor, Front and Rear Sensors with MID Indication</td>
          </tr>
          <tr>
            <td>Power Steering with VFC (Variable Flow Control)</td>
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
            <td>Fuel Type: Diesel</td>
          </tr>
          <tr>
            <td>Tough Frame with Exceptional Torsional and Bending Rigidity</td>
          </tr>
          <tr>
            <td>A-TRC [Active Traction Control]</td>
          </tr>
          <tr>
            <td>Approach/Departure Angle: 0.51 rad/0.44 rad</td>
          </tr>
        </tbody>
      </table>
    ),
  },
];






export default function Legender() {
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

