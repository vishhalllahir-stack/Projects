import "./7-1-1-BuyOnline.css";

import { useState } from "react";
import TwebFooter from "./7-1-Tweb-Footer";

const COLORS = [
  {
    name: "AVANT GARDE BRONZE",
    hex: "#e8e6df",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/4/v/4v8.png",
  },
  {
    name: "SILVER METALLIC",
    hex: "#073e43fd",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/1/d/1d6_1.png",
  },
  {
    name: "AITUDE BLACK MICA",
    hex: "#1a1a1a",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/202c6726f17996e432b304563772432b/2/1/218_1.png",
  },
  {
    name: "PLATINUM WHITE PEARL",
    hex: "#6d6f73",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/0/8/089_1.png",
  },
  {
    name: "SUPER WHITE",
    hex: "#ffffff   ",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/0/4/040_1.png",
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
    title: "Grade",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>G</td>
            <td>MANUAL</td>
          </tr>
          <tr>
            <td>GL</td>
            <td>MANUAL</td>
          </tr>
          <tr>
            <td>VX</td>
            <td>MANUAL</td>
          </tr>
          <tr>
            <td>ZX</td>
            <td>MANUAL</td>
          </tr>
        </tbody>
      </table>
    ),
  },

  {
    title: "Engine Type",
    content: (
      <table className="spec-table">
        <tbody>
          <tr>
            <td>GRADE</td>
            <td></td>
            <td>SEATING CAPACITY</td>
          </tr>
          <tr>
            <td>G</td>
            <td>DIESEL</td>
            <td>7 / 8 N SEATER</td>
          </tr>
          <tr>
            <td>GX</td>
            <td>DIESEL</td>
            <td>7 / 8 N SEATER</td>
          </tr>
          <tr>
            <td>VX</td>
            <td>DIESEL</td>
            <td>7 / 8 N SEATER</td>
          </tr>
          <tr>
            <td>ZX</td>
            <td>DIESEL</td>
            <td>7 SEATER</td>
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
                    <td>GRADE</td>
                    <td>G</td>
                    <td>GX</td>
                    <td>VX</td>
                    <td>ZX</td>
                </tr>
                <tr>
                    <td>DISPLACEMENT</td>
                    <td></td>
                    <td>0.002393m3(2393cm3)</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>DRIVE MODES</td>
                    <td></td>
                    <td>ECO & Power Mode</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>MAX. OUTPUT</td>
                    <td></td>
                    <td>ECO & Power Mode</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>MAX. TORQUE</td>
                    <td></td>
                    <td>343 N/m (35.0 kg-m) @ 23.33 – 46.66 s-1</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>TRANSMISSION</td>
                    <td></td>
                    <td>5 SPEED MANUAL</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>TYRES</td>
                    <td>205/65 R16 (40.64cm), Steel Wheels###</td>
                    <td>205/65 R16 (40.64cm), Alloy Wheels###</td>
                    <td>215/55 R17 (43.18cm) Alloy Wheels</td>
                </tr>
            </tbody>

        </table>
    ),
  },

  {
    title: "Exterior",
    content: (
        <table className="spec-table">
            <tbody>
                <tr>
                    <td>GRADE</td>
                    <td>G</td>
                    <td>GX</td>
                    <td>VX</td>
                    <td>ZX</td>
                </tr>
                <tr>
                    <td>RADIATOR GRILLE</td>
                    <td>New Design Black</td>
                    <td>New Design Black & Silver</td>
                    <td>New Design Premium Black & Chrome</td>
                    <td>New Design Premium Black & Chrome</td>
                </tr>
                <tr>
                    <td>HEADLAMP</td>
                    <td>MULTIREFLECTOR</td>
                    <td>AUTOMATIC LED PROJECTOR, HALOGEN WITH LED CLEARANCE LAMP</td>
                </tr>
                <tr>
                    <td>OUTSIDE REARVIEW MIRROR</td>
                    <td>Body Coloured, Electric Adjust with Side Turn Indicators</td>
                    <td>Body Coloured, Electric Adjust & Retract, Welcome Lights with Side Turn Indicators</td>
                </tr>
            </tbody>
        </table>
    ),
  },

  {
    title: "Interior",
    content: (
         <table className="spec-table">
            <tbody>
                <tr>
                    <td>GRADE</td>
                    <td>G</td>
                    <td>GX</td>
                    <td>VX</td>
                    <td>ZX</td>
                </tr>
                <tr>
                    <td>INDIRECT BLUE AMBIENTILLUMINATION</td>
                    <td>x</td>
                    <td>x</td>
                    <td>✓</td>
                    <td>✓</td>
                </tr>
                <tr>
                    <td>STEERING WHEEL</td>
                    <td>URETHANE WITH SILVER ORNAMENT</td>
                    <td>LEATHER WRAP WITH SILVER & WOOD FINISH</td>
                </tr>
                <tr>
                    <td>SPEEDOMETER</td>
                    <td>WITH MULTI INFORMATION DISPLAY</td>
                    <td>BLUE ILLUMINATION, 3D DESIGN WITHTFT MULTI INFORMATION DISPLAY & ILLUMINATION CONTROL</td>
                </tr>
                <tr>
                    <td>MULTI INFORMATION DISPLAY (MID)</td>
                    <td>Dot Type MID with Drive Information (Fuel Consumption, Cruising Range, Average Speed, Elapsed Time, ECO Indicator), Outside Temperature</td>
                    <td>TFT MID with Drive Information (Fuel Consumption, Cruising Range, Average Speed, Elapsed Time, ECO Drive Indicator & ECO Score, ECO Wallet), Outside Temperature, Audio Display, Phone Caller Display, Warning Message</td>
                    <td>TFT MID with Drive Information (Fuel Consumption, Cruising Range, Average Speed, Elapsed Time, ECO Drive Indicator & ECO Score, ECO Wallet, Cruise Control Display), Outside Temperature, Audio Display, Phone Caller Display, Warning Message</td>
                </tr>
            </tbody>
        </table>
    ),
  },

  {
    title: "Seats, Comfort & Convenience",
    content: (
                <table className="spec-table">
            <tbody>
                <tr>
                    <td>GRADE</td>
                    <td>G</td>
                    <td>GX</td>
                    <td>VX</td>
                    <td>ZX</td>
                </tr>
                <tr>
                    <td>AIR CONDITIONER</td>
                    <td>MANUAL CONTROL</td>
                    <td>AUTOMATIC CLIMATE CONTROL WITH COOL START ANDREGISTER ORNAMENT</td>
                </tr>
                <tr>
                    <td>FRONT SEAT</td>
                    <td>Separate Seats with Slide & Recline</td>
                    <td>SEPARATE SEATS WITH SLIDE & RECLINE, DRIVER SEAT HEIGHT ADJUST</td>
                </tr>
                <tr>
                   <td>8-WAY POWER ADJUSTDRIVER SEAT</td>
                   <td>x</td>
                   <td>x</td>
                   <td>x</td>
                   <td>✓</td>
                </tr>
                <tr>
                    <td>SEAT COVER MATERIAL</td>
                    <td>BLACK FABRIC</td>
                    <td>BLACK FABRIC</td>
                    <td>Premium Black Fabric with STITCHED ‘CRYSTA’ INSIGNIA</td>
                    <td>	Option of Perforated Black OR Camel Tan Leather* with embossed “CRYSTA” insignia</td>
                </tr>
                <tr>
                    <td>AUDIO</td>
                    <td>x</td>
                    <td>8 INCH DISPLAY AUDIO, </td>
                    <td> CAPACITIVE TOUCH SCREEN,</td>
                    <td>FLICK & DRAG FUNCTION, BLUETOOTH</td>
                </tr>
                <tr>
                    <td>ANDROID AUTO / APPLE CARPLAY</td>
                    <td>x</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✓</td>
                </tr>
                <tr>
                    <td>Accessory Connector 12V DC</td>
                    <td>2N</td>
                    <td>2N</td>
                    <td>2N</td>
                    <td>2N</td>
                </tr>
                <tr>
                    <td>SMART ENTRY SYSTEM</td>
                    <td>x</td>
                    <td>x</td>
                    <td>✓</td>
                    <td>✓</td>
                </tr>
                <tr>
                    <td>WIRELESS DOOR LOCK</td>
                    <td>WITH JACK-KNIFE KEY</td>
                    <td>WITH JACK-KNIFE KEY</td>
                    <td>WITH SMART ENTRY KEY & </td>
                    <td>PUSH START / STOP BUTTON</td>
                </tr>

                <tr>
                    <td>EASY CLOSERBACK DOOR</td>
                    <td>x</td>
                    <td>x</td>
                    <td>x</td>
                    <td>✓</td>
                </tr>
                <tr>
                    <td>CRUISE CONTROL</td>
                     <td>x</td>
                    <td>x</td>
                    <td>✓</td>
                    <td>✓</td>
                </tr>
                <tr>
                    <td>SEAT BACK POCKET</td>
                       <td>x</td>
                    <td>x</td>
                    <td>✓</td>
                    <td>WITH WOOD-FINISH ORNAMENT</td>
                </tr>
                <tr>
                    <td>TILT AND TELESCOPICSTEERING COLUMN</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✓</td>
                </tr>
            </tbody>
        </table>
    ),
  },

  {
    title : "Safety & Security",
    content : (
        <table className="spec-table">
            <tbody>
                <tr>
                    <td>GRADE</td>
                    <td>G</td>
                    <td>GX</td>
                    <td>VX</td>
                    <td>ZX</td>
                </tr>
                <tr>
                    <td>SRS AIRBAG**</td>
                    <td></td>
                    <td>DRIVER, FRONT PASSENGER & DRIVER KNEE AIRBAGS** (3 UNITS)</td>
                    <td></td>
                    <td>DRIVER, FRONT PASSENGER, DRIVER KNEE,FRONT SIDE, CURTAIN SHIELD AIRBAGS** (7 UNITS)</td>
                </tr>
                <tr>
                    <td>ABS WITH EBD & BA</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✓</td>
                </tr>
                <tr>
                    <td>VEHICLE STABILITY <br />CONTROL</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✓</td>
                </tr>
                <tr>
                    <td>HILL START <br/> ASSISTCONTROL</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✓</td>
                </tr>
                <tr>
                    <td>FRONT CLEARANCE SONARWITH <br /> MID INDICATION</td>
                    <td>x</td>
                    <td>x</td>
                    <td>✓</td>
                    <td>✓</td>
                </tr>
            </tbody>
        </table>
    )
  }
];





export default function Innova_Crysta () {
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
