import { useState, useEffect } from "react";
import './App.css'
import { ChevronDown, ArrowRight, Calculator } from "lucide-react";
import ToyotaFooter from "./Footer";


  const images = [
    "https://static3.toyotabharat.com/images/q-service/new/home/dyk_4(1066x245).webp",
    "https://static3.toyotabharat.com/images/q-service/new/home/dyk_3(1066x245).webp",
    "https://static3.toyotabharat.com/images/q-service/new/home/dyk_2(1066x245).webp",
    "https://static3.toyotabharat.com/images/q-service/new/home/dyk_1(1066x245).webp",
  ];


const serviceData = {
  Ahmedabad: [
    { model: "Glanza", fuel: ["Petrol", "CNG"] },
    { model: "Taisor", fuel: ["Petrol", "CNG"] },
    { model: "Rumion", fuel: ["Petrol", "CNG"] },
    { model: "Urban Cruiser Hyryder", fuel: ["Petrol", "Hybrid", "CNG"] },
    { model: "Fortuner", fuel: ["Diesel", "Petrol"] },
    { model: "Fortuner Legender", fuel: ["Diesel"] },
    { model: "Hilux", fuel: ["Diesel"] },
    { model: "Camry", fuel: ["Hybrid"] },
    { model: "Innova Crysta", fuel: ["Diesel"] },
    { model: "Innova Hycross", fuel: ["Petrol", "Hybrid"] },
  ],

  Surat: [
    { model: "Glanza", fuel: ["Petrol", "CNG"] },
    { model: "Hyryder", fuel: ["Petrol", "Hybrid"] },
    { model: "Fortuner", fuel: ["Diesel", "Petrol"] },
    { model: "Camry", fuel: ["Hybrid"] },
  ],

  Vadodara: [
    { model: "Rumion", fuel: ["Petrol", "CNG"] },
    { model: "Hilux", fuel: ["Diesel"] },
    { model: "Fortuner", fuel: ["Diesel", "Petrol"] },
  ],

  Rajkot: [
    { model: "Glanza", fuel: ["Petrol", "CNG"] },
    { model: "Taisor", fuel: ["Petrol", "CNG"] },
    { model: "Hyryder", fuel: ["Petrol", "Hybrid"] },
  ],
};

const kilometerList = [
  "1000 KM",
  "5000 KM",
  "10000 KM",
  "15000 KM",
  "20000 KM",
  "25000 KM",
  "30000 KM",
  "35000 KM",
  "40000 KM",
  "45000 KM",
  "50000 KM",
  "60000 KM",
  "70000 KM",
  "80000 KM",
  "90000 KM",
  "100000 KM",
];

export default function Service_Cost_Calculator() {

  const [current, setCurrent] = useState(0);


      useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  const [city, setCity] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [km, setKm] = useState("");

  const [errors, setErrors] = useState({});

  const models = city ? serviceData[city] : [];

  const fuels =
    city && model
      ? models.find((car) => car.model === model)?.fuel || []
      : [];

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = {};

    if (!city) obj.city = "Please select city";
    if (!model) obj.model = "Please select model";
    if (!fuel) obj.fuel = "Please select fuel type";
    if (!km) obj.km = "Please select kilometer";

    setErrors(obj);

    if (Object.keys(obj).length === 0) {
      alert(
        `City : ${city}
Model : ${model}
Fuel : ${fuel}
Kilometer : ${km}`
      );
    }
  };


  return (
    <>
  <div className="service-wrapper">

    {/* LEFT SIDE */}
    <div className="scc-container">
      <div className="scc-card">

        <div className="scc-title">
          <div className="icon">
            <Calculator size={40} />
          </div>

          <div>
            <h2>SERVICE COST</h2>
            <h2>CALCULATOR</h2>
            <p>SELECT THE OPTIONS BELOW TO CALCULATE</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* City */}
          <div className="field">
            <div className="select-box">
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setModel("");
                  setFuel("");
                }}
              >
                <option value="">Select City*</option>

                {Object.keys(serviceData).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <span>
                <ChevronDown />
              </span>
            </div>

            <small>{errors.city}</small>
          </div>

          {/* Model */}

          <div className="field">
            <div className="select-box">
              <select
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                  setFuel("");
                }}
              >
                <option value="">Select Model*</option>

                {models.map((car) => (
                  <option key={car.model}>{car.model}</option>
                ))}
              </select>

              <span>
                <ChevronDown />
              </span>
            </div>

            <small>{errors.model}</small>
          </div>

          {/* Fuel */}

          <div className="field">
            <div className="select-box">
              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
              >
                <option value="">Select Fuel Type*</option>

                {fuels.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <span>
                <ChevronDown />
              </span>
            </div>

            <small>{errors.fuel}</small>
          </div>

          {/* KM */}

          <div className="field">
            <div className="select-box">
              <select
                value={km}
                onChange={(e) => setKm(e.target.value)}
              >
                <option value="">Select Kilometer*</option>

                {kilometerList.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <span>
                <ChevronDown />
              </span>
            </div>

            <small>{errors.km}</small>
          </div>

          <button className="submit-btn">
            SUBMIT
            <ArrowRight size={18} />
          </button>

        </form>
      </div>
    </div>

    {/* RIGHT SIDE */}

    <div className="dyk-section">

      <div className="slider-image">
        <img src={images[current]} alt="" />
      </div>

      <div className="dyk-content">

        <h1>Did you know?</h1>

        <p>
          The founder of Toyota Motor Corporation actually spells his name
          T-O-Y-O-D-A. Kiichiro Toyoda, to be exact. The spelling of the
          company name was changed to Toyota because when it is written in
          Katakana it only takes 8 strokes to write.
        </p>

        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={current === index ? "active" : ""}
            ></span>
          ))}
        </div>

      </div>

    </div>

  </div>

  <div>
    <ToyotaFooter />
  </div>
  </>
);
}