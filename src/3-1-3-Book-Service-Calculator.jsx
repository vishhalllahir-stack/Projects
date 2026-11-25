import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import './App.css'
import ToyotaFooter from "./Footer";

 const images = [
    "https://static3.toyotabharat.com/images/q-service/new/home/dyk_4(1066x245).webp",
    "https://static3.toyotabharat.com/images/q-service/new/home/dyk_3(1066x245).webp",
    "https://static3.toyotabharat.com/images/q-service/new/home/dyk_2(1066x245).webp",
    "https://static3.toyotabharat.com/images/q-service/new/home/dyk_1(1066x245).webp",
  ];


const models = [
  "Glanza",
  "Taisor",
  "Rumion",
  "Urban Cruiser Hyryder",
  "Fortuner",
  "Fortuner Legender",
  "Hilux",
  "Camry",
  "Innova Crysta",
  "Innova Hycross",
];

const serviceTypes = [
  "Periodic Service",
  "General Service",
  "Body Repair",
  "Wheel Alignment",
  "Wheel Balancing",
  "AC Service",
  "Battery Check",
];

const stateCityData = {
  Gujarat: ["Ahmedabad", "Surat", "Rajkot", "Vadodara"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Rajasthan: ["Jaipur", "Udaipur"],
};

const dealerData = {
  Ahmedabad: ["Infinium Toyota", "Cargo Toyota"],
  Surat: ["Nanavati Toyota"],
  Rajkot: ["Galaxy Toyota"],
  Vadodara: ["Shreeji Toyota"],
  Mumbai: ["Lakozy Toyota"],
  Pune: ["Wasan Toyota"],
  Nagpur: ["Grace Toyota"],
  Jaipur: ["Raj Toyota"],
  Udaipur: ["Udaipur Toyota"],
};

export default function Book_Service_Calculator() {

  const [current, setCurrent] = useState(0);

 


  useEffect(()=> {
    const interval = setInterval(()=> {
      setCurrent((prev)=>(prev + 1)%images.length)
    },3000);
    return () => clearInterval(interval);
  }, []);



  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    vehicle: "",
    model: "",
    service: "",
    state: "",
    city: "",
    dealer: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "state"
        ? { city: "", dealer: "" }
        : {}),
      ...(name === "city"
        ? { dealer: "" }
        : {}),
    }));
  };

  const cities = form.state
    ? stateCityData[form.state]
    : [];

  const dealers = form.city
    ? dealerData[form.city] || []
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.mobile ||
      !form.vehicle ||
      !form.model ||
      !form.service ||
      !form.state ||
      !form.city ||
      !form.dealer ||
      !form.agree
    ) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Service Appointment Booked Successfully!");
    console.log(form);
  };

  return (
    <>
    <div className="main">
    <div className="book-service">
      <div className="book-card">

        <div className="book-header">

          <div className="calendar-box">
            <CalendarDays size={34} />
          </div>

          <div>
            <h2>BOOK SERVICE APPOINTMENT</h2>
            <p>EASY QUICK AND RELIABLE</p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="ENTER NAME"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <br />
          <br />

          <input
            type="tel"
            placeholder="ENTER MOBILE NUMBER*"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
          />
        <br />
        <br />

          <input
            type="email"
            placeholder="ENTER EMAIL"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
                  <br />
          <br />  

          <input
            type="text"
            placeholder="ENTER VEHICLE NUMBER*"
            name="vehicle"
            value={form.vehicle}
            onChange={handleChange}
          />
                  <br />
          <br />  

          {/* MODEL */}

          <div className="select-box">
            <select
              name="model"
              value={form.model}
              onChange={handleChange}
            >
              <option value="">Select Model*</option>

              {models.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <span>
              <ChevronDown size={18} />
            </span>
          </div>

          {/* SERVICE */}

          <div className="select-box">
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
            >
              <option value="">
                Select Service Type*
              </option>

              {serviceTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <span>
              <ChevronDown size={18} />
            </span>
          </div>

          {/* STATE */}

          <div className="select-box">
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
            >
              <option value="">Select State*</option>

              {Object.keys(stateCityData).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <span>
              <ChevronDown size={18} />
            </span>
          </div>

          {/* CITY */}

          <div className="select-box">
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
            >
              <option value="">Select City*</option>

              {cities.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <span>
              <ChevronDown size={18} />
            </span>
          </div>

          {/* DEALER */}

          <div className="select-box">
            <select
              name="dealer"
              value={form.dealer}
              onChange={handleChange}
            >
              <option value="">Select Dealer*</option>

              {dealers.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <span>
              <ChevronDown size={18} />
            </span>
          </div>

          <label className="agree">

            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />

            I hereby agree to receive emails, calls and SMS related to promotional activities and services.

          </label>

          <button type="submit" className="submit-btn">
            SUBMIT
            <ArrowRight size={18} />
          </button>

          <p className="note">
            Please fill the form and submit. Our dealer
            representative will contact you shortly.
          </p>

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