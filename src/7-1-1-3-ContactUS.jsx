
import { Link } from "react-router-dom";
import TwebFooter from "./7-1-Tweb-Footer";
import './7-1-1-3-ContactUS.css'
import { FaPhoneVolume, FaRegComments, FaExternalLinkAlt } from "react-icons/fa";
import contactIllustration from "../../ChatGPT Image Jul 11, 2026, 10_38_34 AM.png";



export default function ContactUs() {
  return (
    <>
    <div className="toyotaContactPage">

      {/* ================= HEADER ================= */}
      <section className="toyotaContactHeader">

        <div className="toyotaContactHeading">

          <div className="toyotaContactMainIcon">
            <div className="toyotaContactEnvelope">


                  <div className="toyotaHeroImageBox">
                          <img
                            src={contactIllustration}
                            alt="Toyota Contact"
                            className="toyotaHeroImage"
                          />
                        </div>
            </div>
          </div>

          <div className="toyotaContactHeadingText">
            <h1>CONTACT US</h1>
            <span>ENQUIRY. FEEDBACK. ASSISTANCE</span>
          </div>

        </div>

      </section>


      {/* ================= DESCRIPTION ================= */}
      <section className="toyotaContactDescription">

        <p>
          Your complete satisfaction is of primary importance to us. Should you
          ever have questions or comments about your Toyota vehicle, we suggest
          you follow these steps
          <br />
          so your concerns can be addressed as quickly and efficiently as possible.
        </p>

      </section>


      {/* ================= CONTACT CONTENT ================= */}
      <section className="toyotaContactContent">

        {/* ================= TALK TO TOYOTA ================= */}
        <div className="toyotaContactBox">

          <div className="toyotaContactIconArea">

            <FaPhoneVolume className="toyotaPhoneIcon" />

            <div className="toyotaIconLine"></div>

          </div>


          <div className="toyotaContactDetails">

            <h2>Talk to Toyota</h2>

            <p className="toyotaContactSubText">
              24x7 Call us for enquiry/ feedback at
            </p>

            <p className="toyotaContactPhone">
              <strong>1800 889 8182</strong>
              <span> (Toll Free Number)</span>
            </p>

            <p className="toyotaContactEmail">
              <strong>Write to us at </strong>

              <a href="mailto:tweb@toyota-kirloskar.co.in">
                tweb@toyota-kirloskar.co.in
              </a>
            </p>

          </div>

        </div>


        {/* ================= VERTICAL DIVIDER ================= */}
        <div className="toyotaContactDivider"></div>


        {/* ================= FEEDBACK ================= */}
        <div className="toyotaContactBox">

          <div className="toyotaContactIconArea">

            <FaRegComments className="toyotaFeedbackIcon" />

            <div className="toyotaIconLine"></div>

          </div>


          <div className="toyotaContactDetails">

            <h2>Feedback/ Queries</h2>

            <p className="toyotaContactSubText">
              Express your grievances and feedback to us
            </p>

            <Link
              to="/BuyOnline/tweb/BuyOnline/feedback"
              className="toyotaFeedbackLink"
            >
              SUBMIT YOUR FEEDBACK
              <FaExternalLinkAlt />
            </Link>

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

    