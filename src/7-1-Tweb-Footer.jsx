import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import "./7-1-Tweb.css";
import { NavLink } from "react-router-dom";

export default function TwebFooter() {
  return (
    <>
    <div className="toyotaTopBar">
      <div className="toyotaTopContainer">

        <div className="toyotaTopMenu">
          {/* <a href="/about">About Us</a>
           */}
           <NavLink to="/BuyOnline/tweb/BuyOnline/about">About</NavLink>
           <NavLink to="/BuyOnline/tweb/BuyOnline/feedback">Feedback</NavLink>
           <NavLink to="/BuyOnline/tweb/BuyOnline/contactus">Contact Us</NavLink>
        </div>

        <div className="toyotaTopSocial">
          <a href="https://www.facebook.com/ToyotaIndia"><FaFacebookF /></a>
          <a href="https://www.instagram.com/toyota.india/"><FaInstagram /></a>
          <a href="https://twitter.com/Toyota_India"><FaXTwitter /></a>
          <a href="https://www.linkedin.com/company/toyota-kirloskar-motor/"><FaLinkedinIn /></a>
          <a href="https://www.youtube.com/user/ToyotainIndia"><FaYoutube /></a>
          <a href="https://api.whatsapp.com/send/?phone=914071781588&text=Hi&type=phone_number&app_absent=0"><FaWhatsapp /></a>
        </div>

      </div>
    </div>

     <footer className="toyotaFooterBottom">
      <div className="toyotaFooterBottom__wrapper">

        {/* Left Side Links */}
        <div className="toyotaFooterBottom__links">
          <NavLink
            to="/Privacy"
            className="toyotaFooterBottom__link"
          >
            Privacy Policy
          </NavLink>

          <NavLink
            // to="/Accessibility"
            to="/BuyOnline/tweb/HowItWork"
            className="toyotaFooterBottom__link"
          >
            Accessibility
          </NavLink>

          <NavLink
            to="/Term&Condition"
            className="toyotaFooterBottom__link"
          >
            Terms &amp; Conditions
          </NavLink>
        </div>

        {/* Right Side Copyright */}
        <div className="toyotaFooterBottom__copyright">
          © 2000–2023 Toyota Kirloskar Motor. All Rights Reserved.
        </div>

      </div>
    </footer>
    </>
  );
}