import { NavLink } from "react-router-dom";
import {
  MapPin,
  Calculator,
  CalendarDays,
  MapPinned,
} from "lucide-react";
import './App.css'

export default function Services() {
  return (
    <div className="services-container">

      <NavLink
        to="/Service/Services/Service_Dealer_Locator"
        className="service-card active"
      >
        <MapPin className="service-icon " />
        <div className="service-text">
          <span>SERVICE DEALER</span>
          <span>LOCATOR</span>
        </div>
      </NavLink>

      <NavLink
        to="/Service/Services/Service_Cost_Calculator"
        className="service-card"
      >
        <Calculator className="service-icon" />
        <div className="service-text">
          <span>SERVICE COST</span>
          <span>CALCULATOR</span>
        </div>
      </NavLink>

      <NavLink
        to="/Service/Services/Book_Service_Calculator"
        className="service-card"
      >
        <CalendarDays className="service-icon" />
        <div className="service-text">
          <span>BOOK SERVICE</span>
          <span>APPOINTMENT</span>
        </div>
      </NavLink>

      <NavLink
        to="/Service/Services/Parts_Distributors"
        className="service-card"
      >
        <MapPinned className="service-icon" />
        <div className="service-text">
          <span>PARTS DISTRIBUTOR</span>
        </div>
      </NavLink>

    </div>
  );
}