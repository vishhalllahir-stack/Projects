import { NavLink } from "react-router-dom";
// import "./App.css";
import './3-0-Services.css';

export default function Service() {
  return (
    <>
      <div className="All-Services">
        <NavLink to="/Service/Services" className='nav-class'>Services</NavLink>
        <NavLink to="/Service/owners-manual" className='nav-class'>Owner Manual</NavLink>
        <NavLink to="/Service/warranty" className='nav-class'>Warranty</NavLink>
        <NavLink to="/Service/safety-recall" className='nav-class'>Safaty Recall</NavLink>
      </div>
    </>
  );
}
