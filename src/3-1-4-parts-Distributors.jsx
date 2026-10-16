import { useState } from "react";
import "./App.css";
import { MapPin, LocateFixed } from "lucide-react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "650px",
};

const center = {
  lat: 22.9734,
  lng: 78.6569,
};

const dealers = [
  {
    id: 1,
    name: "Toyota Ahmedabad",
    state: "Gujarat",
    city: "Ahmedabad",
    address: "SG Highway, Ahmedabad",
    phone: "9876543210",
    lat: 23.0395,
    lng: 72.566,
  },
  {
    id: 2,
    name: "Toyota Surat",
    state: "Gujarat",
    city: "Surat",
    address: "Adajan, Surat",
    phone: "9999999999",
    lat: 21.1702,
    lng: 72.8311,
  },
  {
    id: 3,
    name: "Toyota Mumbai",
    state: "Maharashtra",
    city: "Mumbai",
    address: "Andheri, Mumbai",
    phone: "8888888888",
    lat: 19.076,
    lng: 72.8777,
  },
];





const indiaData = {
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Tirupati"
  ],

  "Arunachal Pradesh": [
    "Itanagar",
    "Naharlagun",
    "Pasighat",
    "Tawang"
  ],

  Assam: [
    "Guwahati",
    "Silchar",
    "Dibrugarh",
    "Jorhat",
    "Tezpur"
  ],

  Bihar: [
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Darbhanga"
  ],

  Chhattisgarh: [
    "Raipur",
    "Bilaspur",
    "Durg",
    "Korba",
    "Rajnandgaon"
  ],

  Goa: [
    "Panaji",
    "Margao",
    "Vasco da Gama",
    "Mapusa"
  ],

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
    "Morbi",
    "Kachchh"
  ],

  Haryana: [
    "Gurugram",
    "Faridabad",
    "Panipat",
    "Karnal",
    "Hisar"
  ],

  "Himachal Pradesh": [
    "Shimla",
    "Solan",
    "Mandi",
    "Dharamshala"
  ],

  Jharkhand: [
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro"
  ],

  Karnataka: [
    "Bengaluru",
    "Mysuru",
    "Hubli",
    "Mangaluru",
    "Belagavi"
  ],

  Kerala: [
    "Kochi",
    "Thiruvananthapuram",
    "Kozhikode",
    "Thrissur"
  ],

  "Madhya Pradesh": [
    "Bhopal",
    "Indore",
    "Jabalpur",
    "Gwalior",
    "Ujjain"
  ],

  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Thane"
  ],

  Manipur: [
    "Imphal",
    "Thoubal",
    "Bishnupur"
  ],

  Meghalaya: [
    "Shillong",
    "Tura",
    "Jowai"
  ],

  Mizoram: [
    "Aizawl",
    "Lunglei",
    "Champhai"
  ],

  Nagaland: [
    "Kohima",
    "Dimapur",
    "Mokokchung"
  ],

  Odisha: [
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Puri"
  ],

  Punjab: [
    "Amritsar",
    "Ludhiana",
    "Jalandhar",
    "Patiala"
  ],

  Rajasthan: [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Ajmer",
    "Kota"
  ],

  Sikkim: [
    "Gangtok",
    "Namchi",
    "Geyzing"
  ],

  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Trichy"
  ],

  Telangana: [
    "Hyderabad",
    "Warangal",
    "Karimnagar",
    "Nizamabad"
  ],

  Tripura: [
    "Agartala",
    "Udaipur"
  ],

  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Agra",
    "Noida",
    "Varanasi",
    "Prayagraj",
    "Meerut"
  ],

  Uttarakhand: [
    "Dehradun",
    "Haridwar",
    "Haldwani",
    "Roorkee"
  ],

  "West Bengal": [
    "Kolkata",
    "Howrah",
    "Durgapur",
    "Siliguri"
  ],

  Delhi: [
    "New Delhi",
    "Dwarka",
    "Rohini",
    "Karol Bagh"
  ],

  Chandigarh: ["Chandigarh"],

  Puducherry: [
    "Puducherry",
    "Karaikal",
    "Yanam"
  ],

  Lakshadweep: [
    "Kavaratti",
    "Agatti"
  ],

  Ladakh: [
    "Leh",
    "Kargil"
  ],

  Jammu: [
    "Jammu",
    "Kathua"
  ],

  Kashmir: [
    "Srinagar",
    "Anantnag",
    "Baramulla"
  ],

  Andaman: [
    "Port Blair"
  ],

  Dadra: [
    "Silvassa"
  ],

  Daman: [
    "Daman",
    "Diu"
  ]
};


export default function PartsDistributor() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [selectedDealer, setSelectedDealer] = useState(null);

  const states = Object.keys(indiaData);

  const cities = state ? indiaData[state] : [];

  const filteredDealers = dealers.filter((dealer) => {
    return (
      (state === "" || dealer.state === state) &&
      (city === "" || dealer.city === city)
    );
  });

  const currentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        alert(
          `Latitude: ${position.coords.latitude}
Longitude: ${position.coords.longitude}`
        );
      },
      () => {
        alert("Unable to get location.");
      }
    );
  };

  return (
    <>
      <div className="parts">

        <div className="title">
          <MapPin className="mapPin" size={50}/>
          <div>
            <h2>PARTS DISTRIBUTOR</h2>
            <p>Select the closest distributor in your location</p>
          </div>
        </div>

        <select
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setCity("");
          }}
        >
          <option value="">Select State</option>

          {states.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select City</option>

          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button onClick={currentLocation}>
          OR USE CURRENT LOCATION
          <LocateFixed size={20} />
        </button>
      </div>

      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={5}
        >
          {filteredDealers.map((dealer) => (
            <Marker
              key={dealer.id}
              position={{
                lat: dealer.lat,
                lng: dealer.lng,
              }}
              onClick={() => setSelectedDealer(dealer)}
            />
          ))}

          {selectedDealer && (
            <InfoWindow
              position={{
                lat: selectedDealer.lat,
                lng: selectedDealer.lng,
              }}
              onCloseClick={() => setSelectedDealer(null)}
            >
              <div>
                <h3>{selectedDealer.name}</h3>

                <p>
                  <strong>State:</strong> {selectedDealer.state}
                </p>

                <p>
                  <strong>City:</strong> {selectedDealer.city}
                </p>

                <p>
                  <strong>Address:</strong> {selectedDealer.address}
                </p>

                <p>
                  <strong>Phone:</strong> {selectedDealer.phone}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
}