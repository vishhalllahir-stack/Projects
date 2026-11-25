import './7-1-1-BuyOnline.css';

import { useState } from "react";
import TwebFooter from './7-1-Tweb-Footer';

const COLORS = [
  {
    name: "Cafe White",
    hex: "#e8e6df",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/c/a/cafe-white-midnight-black_2.png",
  },
  {
    name: "Speedy Blue",
    hex: "#1e73c9",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/s/p/speedy-blue-midnight-black_1.png",
  },
  {
    name: "Cave Black",
    hex: "#1a1a1a",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/c/a/cave-black_2.png",
  },
  {
    name: "Enticing Silver",
    hex: "#a8a8a8",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/e/n/enticing-silver-midnight-black_2.png",
  },
  {
    name: "Gaming Grey",
    hex: "#6d6f73",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/g/a/gaming-grey_2.png",
  },
  {
    name: "Midnight Black",
    hex: "#111111",
    img: "https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/m/i/midnight-black_2.png",
  },
  {
    name : 'Midnight Black with Red Roof',
    hex : '#111111',
    img : 'https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/s/p/sportin-red-midnight-black_2.png'
  },
  {
    name : 'Fooly White with Red Roof   ',
    hex : '#c9c9c9',
    img : 'https://tweb.toyotabharat.com/media/catalog/product/cache/403523c102d3a4bf5f80830b185e0e59/s/p/sportin-red-midnight-black_2.png'
  }
];

const FUEL_TYPES = ["CNG", "PETROL", "HYBRID"];
const VARIANTS = ["E", "S", "G.", "V", "V AT AWD NEODRIVE"];
const TRANSMISSIONS = ["MT", "AT", "e-Drive"];
const DRIVE_TYPES = ["2WD", "4WD"];
const PRICES = { CNG: 1131000, PETROL: 1195000, HYBRID: 1929000 };

const SPEC_DATA = {
  "E CNG": {
    S: {
      Engine: [
        ["Displacement", "1462 cc"],
        ["Fuel Type", "Petrol + CNG"],
        ["Max. Power", "74 kW (100.6 PS) @ 6000 rpm [Gasoline] / 64.6 kW (87.8 PS) @ 5500 rpm [CNG]"],
        ["Max. Torque", "136 Nm @ 4400 rpm [Gasoline] / 121.5 Nm @ 4200 rpm [CNG]"],
      ],
      Transmission: [["Type", "5MT"]],
      Suspension: [["Front", "MacPherson strut"], ["Rear", "Torsion beam"]],
      "Wheel & Tyre": [["Size", "215/60 R17 (43.18 cm)"], ["Type", "Steel wheel with full wheel cap"]],
      ISG: [["ISG", "—"]],
      Drive: [["Type", "2WD"]],
      "Dimensions & Weight": [
        ["Length", "4365 mm"], ["Width", "1795 mm"], ["Height", "1645 mm"],
        ["Wheelbase", "2600 mm"], ["Turning radius", "5.4 m"],
        ["Fuel Tank", "Gasoline: 45 L / CNG: 55 L (water equiv.)"],
        ["Fuel Efficiency", "26.6 km/kg [CNG mode]"],
        ["Seating Capacity", "5"], ["Kerb Weight", "1245 kg"], ["GVW", "1705 kg"],
      ],
      Brakes: [["Front", "Ventilated disc"], ["Rear", "Solid disc"]],
    },
    G: { _placeholder: true },
  },
  Neodrive: { _placeholder: true },
  Hybrid: { _placeholder: true },
};

function OptionGroup({ label, options, value, onChange }) {
  return (
    <div className="field">
      <div className="field-label">{label}</div>
      <div className="options">
        {options.map((opt) => (
          <button key={opt} className={`opt${value === opt ? " selected" : ""}`} onClick={() => onChange(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function UrbanCruiserHyryder() {
  const [fuel, setFuel] = useState("CNG");
  const [variant, setVariant] = useState("S");
  const [trans, setTrans] = useState("MT");
  const [drive, setDrive] = useState("2WD");
  const [colorIdx, setColorIdx] = useState(1);
  const [activeTab, setActiveTab] = useState("E CNG");
  const [activeSub, setActiveSub] = useState("S");

  const price = PRICES[fuel] ?? PRICES.CNG;

  const cyclePhoto = (dir) => {
    const n = COLORS.length;
    setColorIdx((prev) => (prev + dir + n) % n);
  };

  const tabData = SPEC_DATA[activeTab];
  const subKeys = Object.keys(tabData).filter((k) => k !== "_placeholder");
  const groups = subKeys.length ? tabData[activeSub] : tabData;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const subs = Object.keys(SPEC_DATA[tab]).filter((k) => k !== "_placeholder");
    setActiveSub(subs[0] ?? null);
  };

  const handleBuy = () => {
    alert(`Booking summary\n\nFuel: ${fuel}\nVariant: ${variant}\nTransmission: ${trans}\nDrive: ${drive}\nColour: ${COLORS[colorIdx].name}\nBooking amount: ₹25,000`);
  };

  return (
    <>
    <div>
      <div className="breadcrumb">Home <span className="sep">›</span> <span className="current">Urban Cruiser Hyryder</span></div>

      <div className="layout">
        <div className="gallery">
          <div className="stage">
            <button className="nav-btn prev" onClick={() => cyclePhoto(-1)}>‹</button>
            <img src={COLORS[colorIdx].img} alt={COLORS[colorIdx].name} />
            <button className="nav-btn next" onClick={() => cyclePhoto(1)}>›</button>
          </div>
          <div className="thumbs">
            {COLORS.map((c, i) => (
              <div key={c.name} className={`thumb${colorIdx === i ? " active" : ""}`} onClick={() => setColorIdx(i)}>
                <img src={c.img} alt={c.name} />
              </div>
            ))}
          </div>
        </div>

        <div className="info">
          <h1>Urban Cruiser Hyryder</h1>

          <div className="price-row">
            <span className="price-label">EX SHOWROOM PRICE START FROM</span>
            <span className="price-value">₹{price.toLocaleString("en-IN")}</span>
          </div>

          <OptionGroup label="Fuel Type" options={FUEL_TYPES} value={fuel} onChange={setFuel} />
          <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
          <OptionGroup label="Transmission Type" options={TRANSMISSIONS} value={trans} onChange={setTrans} />
          <OptionGroup label="Drive Type" options={DRIVE_TYPES} value={drive} onChange={setDrive} />

          <div className="field">
            <div className="field-label">Exterior Color — {COLORS[colorIdx].name}</div>
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
          <button className="buy-btn" onClick={handleBuy}>Proceed to Buy</button>

              <div className="OnlineBookingBTN">
              <h4>i</h4>
              <p>
                For online booking, click on the "proceed to <br /> virtual
                showroom" button.
              </p>
            </div>
            
        </div>
      </div>

      <div className="specs-wrap">
        <div className="specs-title">Specifications</div>

        <div className="tabs-row">
          {Object.keys(SPEC_DATA).map((tab) => (
            <div key={tab} className={`tab${activeTab === tab ? " active" : ""}`} onClick={() => handleTabChange(tab)}>
              {tab}
            </div>
          ))}
        </div>

        {subKeys.length > 0 && (
          <div className="subtabs-row">
            {subKeys.map((sub) => (
              <div key={sub} className={`subtab${activeSub === sub ? " active" : ""}`} onClick={() => setActiveSub(sub)}>
                {activeTab} - {sub}
              </div>
            ))}
          </div>
        )}

        <div className="spec-grid">
          {groups?._placeholder ? (
            <div className="no-data">
              Detailed specifications for "{activeTab}" aren't included in the source reference — wire this section up when available.
            </div>
          ) : (
            groups && Object.entries(groups).map(([groupName, rows]) => (
              <div key={groupName} className="spec-group">
                <h3>{groupName}</h3>
                {rows.map(([label, val]) => (
                  <div key={label} className="spec-row"><span>{label}</span><span>{val}</span></div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="disclaimer">
        <h2>Disclaimer</h2>
        <ol>
          <li>Spare Tyre Wheel Material is Steel & Spare Tyre Size is 215/60 R17 (43.18 cm).</li>
          <li>Speed Warning Buzzer gives audible warning of Over Speed to Driver. If Vehicle Speed &gt;80 km/h then two beeps will sound every minute; if Vehicle Speed &gt;120 km/h, continuous beeps will sound. This Buzzer does not indicate any Malfunction in Vehicle.</li>
          <li>Application Features & Displays may vary depending on different Operating Systems or Smartphone Devices used. Avoid using the phone while driving for your safety. Apple CarPlay is a registered trademark of Apple Inc. Android Auto is a registered trademark of Google Inc. Bluetooth is a registered trademark of Bluetooth SIG.</li>
          <li>Lithium Ion Battery poses safety & environmental hazard if disposed inappropriately. Do not dispose battery in garbage bin. Always ask an Authorized Dealer for replacing or disposing the battery.</li>
          <li>Some parts of leather-appointed upholstery will contain man-made material.</li>
          <li>As per certification under Rule 115(G) of CMVR 1989.</li>
          <li>Vehicle pictures and specifications detailed on this page may vary between models & equipment. Addition of features may change figures in this chart. Actual colour of the vehicle body & upholstery might differ slightly from images shown. Features are grade specific. The manufacturer reserves the right to alter the details of specifications and equipment without notice.</li>
        </ol>
      </div>
    </div>

    <div>
        <TwebFooter />
    </div>

    </>
  );
}