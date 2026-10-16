

import {
  Phone,
  MessageSquareText,
  Truck,
  Send,
  ExternalLink,
} from "lucide-react";

import "./10-1-Contact.css";
import ToyotaFooter from "./Footer";
import contactIllustration from "../../ChatGPT Image Jul 11, 2026, 10_38_34 AM.png";
import { NavLink } from "react-router-dom";

export default function ContactIncon() {
  return (
    <>
      <section className="toyotaContactWrapper">

        {/* Hero Section */}
        <div className="toyotaHeroArea">

          <div className="toyotaHeroImageBox">
            <img
              src={contactIllustration}
              alt="Toyota Contact"
              className="toyotaHeroImage"
            />
          </div>

          <div className="toyotaHeroText">
            <h1>CONTACT TOYOTA</h1>

            <p>
              We are always ready to help you with enquiries, assistance,
              roadside support and valuable feedback.
            </p>
          </div>

        </div>

        {/* Intro */}
        <div className="toyotaIntroContent">

          <h2>We're Here For You</h2>

          <p>
            Customer satisfaction is our highest priority. Whether you need
            support, wish to provide feedback, or require roadside assistance,
            our dedicated Toyota team is available to serve you quickly and
            efficiently.
          </p>

        </div>

        {/* Cards */}
        <div className="toyotaSupportGrid">

          {/* Card 1 */}
          <div className="toyotaSupportCard">

            <div className="toyotaIconCircle">
              <Phone size={48} strokeWidth={1.8} />
            </div>

            <div className="toyotaCardBody">

              <h3>Talk To Toyota</h3>

              <span className="toyotaSmallTitle">
                Available 24 × 7
              </span>

              <h4>
                1800 309 0001
              </h4>

              <small>Toll Free Number</small>

              <h4>
                080 4505 9000
              </h4>

              <a href="mailto:voc@toyota-kirloskar.co.in">
                voc@toyota-kirloskar.co.in
              </a>

            </div>

          </div>

          {/* Card 2 */}
          <div className="toyotaSupportCard">

            <div className="toyotaIconCircle">
              <MessageSquareText size={48} strokeWidth={1.8} />
            </div>

            <div className="toyotaCardBody">

              <h3>Feedback & Queries</h3>

              <p>
                Tell us your experience or send us any question.
              </p>

              <button >
                 <NavLink to="/SubmitFeedback">Submit Feedback</NavLink>
                <ExternalLink size={18} />
              </button>

            </div>

          </div>

          {/* Card 3 */}
          <div className="toyotaSupportCard">

            <div className="toyotaIconCircle">
              <Truck size={48} strokeWidth={1.8} />
            </div>

            <div className="toyotaCardBody">

              <h3>Roadside Assistance</h3>

              <span className="toyotaSmallTitle">
                Emergency Support
              </span>

              <h4>1800 102 5001</h4>

              <small>Toll Free Number</small>

              <h4>0124 235 5001</h4>

            </div>

          </div>

          {/* Card 4 */}
          <div className="toyotaSupportCard">

            <div className="toyotaIconCircle">
              <Send size={48} strokeWidth={1.8} />
            </div>

            <div className="toyotaCardBody">

              <h3>Other Touch Points</h3>

              <NavLink to="/BecomeDealer">
                Beacome A Dealer
                <ExternalLink size={16} />
              </NavLink>

              <NavLink to="/Careers">
              Careers
                <ExternalLink size={16} />
              </NavLink>

              <NavLink to="/Testimonials">
                Testimonials
                <ExternalLink size={16} />
              </NavLink>

            </div>

          </div>

        </div>

      </section>

      <ToyotaFooter />
    </>
  );
}