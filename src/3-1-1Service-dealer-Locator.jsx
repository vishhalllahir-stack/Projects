import { useState } from "react";
import './App.css'
import { MapPin, LocateFixed, ChevronDown } from "lucide-react";
import ToyotaFooter from "./Footer";

export default function Service_Dealer_Locator () {

    
  const locationData = {
    "Andhra Pradesh": [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Nellore",
      "Tirupati",
    ],
    ArunachalPradesh: ["Itanagar", "Tawang", "Pasighat"],
    Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Korba"],
    Goa: ["Panaji", "Margao", "Vasco da Gama"],
    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Jamnagar",
      "Junagadh",
      "Gandhinagar",
      "Anand",
      "Mehsana",
      "Kachchh"
    ],
    Haryana: ["Gurugram", "Faridabad", "Panipat", "Hisar"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"],
    Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Aurangabad",
      "Kolhapur",
    ],
    Manipur: ["Imphal"],
    Meghalaya: ["Shillong"],
    Mizoram: ["Aizawl"],
    Nagaland: ["Kohima", "Dimapur"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
    Punjab: ["Amritsar", "Ludhiana", "Jalandhar"],
    Rajasthan: [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Ajmer",
      "Kota",
    ],
    Sikkim: ["Gangtok"],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Salem",
      "Trichy",
    ],
    Telangana: ["Hyderabad", "Warangal", "Karimnagar"],
    Tripura: ["Agartala"],
    "Uttar Pradesh": [
      "Lucknow",
      "Kanpur",
      "Noida",
      "Agra",
      "Varanasi",
      "Prayagraj",
    ],
    Uttarakhand: ["Dehradun", "Haridwar", "Haldwani"],
    "West Bengal": [
      "Kolkata",
      "Siliguri",
      "Durgapur",
      "Howrah",
    ],

    "Andaman and Nicobar Islands": ["Port Blair"],
    Chandigarh: ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": [
      "Daman",
      "Silvassa",
    ],
    Delhi: ["New Delhi"],
    Jammu: ["Jammu"],
    Kashmir: ["Srinagar"],
    Ladakh: ["Leh"],
    Lakshadweep: ["Kavaratti"],
    Puducherry: ["Puducherry"],
  };

  const [state, setState] = useState("");


    return(
        <>
        
    <div className="dealer-container">

      <div className="dealer-title">

        <MapPin className="pin" size={60} />

        <div>
          <p>
            SELECT THE CLOSEST DEALER IN YOUR
            <br />
            LOCATION
          </p>
        </div>

      </div>

      <div className="select-box">

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Select State*</option>

          {Object.keys(locationData).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <div className="icon-box">
          <ChevronDown color="white" />
        </div>

      </div>

      <div className="select-box">

        <select disabled={!state}>
          <option>Select City*</option>

          {state &&
            locationData[state].map((city) => (
              <option key={city}>{city}</option>
            ))}
        </select>

        <div className="icon-box">
          <ChevronDown color="white" />
        </div>

      </div>

      <div className="current-location">

        <span>OR USE CURRENT LOCATION</span>

        <LocateFixed className="target" size={38} />

      </div>
    </div>
    <div>
      <ToyotaFooter />
    </div>
        </>
    )
}