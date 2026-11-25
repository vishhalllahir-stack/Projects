import "./8-12-SpeakUppolicy.css";
import ToyotaFooter from "./Footer";


import  { useState } from "react";

const reviewImage =
  "https://static3.toyotabharat.com/images/who-reviews.jpg";

function WBP() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
    <div className="wbp-page">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="wbp-header">

        <div className="wbp-header-inner">

          <a href="/" className="wbp-logo">
            <div className="wbp-logo-symbol">
              <span className="wbp-logo-v1"></span>
              <span className="wbp-logo-v2"></span>
              <span className="wbp-logo-v3"></span>
            </div>

            <span className="wbp-logo-name">
              TOYOTA
            </span>
          </a>


          <nav className="wbp-main-nav">

            <a href="/">
              PRODUCTS
            </a>

            <a href="/">
              SHOPPING TOOLS
            </a>

            <a href="/">
              Q SERVICE
            </a>

            <a href="/">
              T-CARE
            </a>

            <a
              href="/toyota-in-india/"
              className="wbp-active"
            >
              TOYOTA IN INDIA
            </a>

          </nav>


          <div className="wbp-header-actions">

            <a href="/find-a-dealer/">
              FIND A DEALER
            </a>

            <a href="/test-drive/">
              TEST DRIVE
            </a>

            <button className="wbp-search">
              🔍
            </button>

          </div>

        </div>

      </header>


      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="wbp-breadcrumb">

        <div className="wbp-container">

          <a href="/">
            Home
          </a>

          <span>/</span>

          <a href="/toyota-in-india/">
            Toyota in India
          </a>

          <span>/</span>

          <strong>
            Speak-up Policy
          </strong>

        </div>

      </div>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="wbp-hero">

        <div className="wbp-container">

          <div className="wbp-hero-content">

            <div className="wbp-red-line"></div>

            <span className="wbp-eyebrow">
              TOYOTA KIRLOSKAR MOTOR
            </span>

            <h1>
              Speak-up
              <br />
              <strong>Policy</strong>
            </h1>

            <p>
              Formerly Whistle Blower Policy
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          TITLE
      ====================================================== */}

      <section className="wbp-title-section">

        <div className="wbp-container">

          <div className="wbp-section-label">
            <span></span>
            SPEAK-UP POLICY
          </div>

          <h2>
            Speak up.
            <br />
            <strong>Speak without fear.</strong>
          </h2>

          <p className="wbp-intro-text">
            Toyota Kirloskar Motor has a well-established
            Speak-up Policy to ensure that employees,
            dealers and vendors can report unethical
            behaviour or concerns without fear.
          </p>

        </div>

      </section>


      {/* =====================================================
          WHAT DOES NOT FALL UNDER POLICY
      ====================================================== */}

      <section className="wbp-exclusions">

        <div className="wbp-container">

          <div className="wbp-section-label">
            <span></span>
            POLICY SCOPE
          </div>

          <div className="wbp-two-column">

            <div>

              <h2>
                What does
                <br />
                <strong>not</strong> fall under
                <br />
                Speak-up Policy?
              </h2>

            </div>


            <div className="wbp-exclusion-list">

              <article>

                <div className="wbp-card-number">
                  01
                </div>

                <div>

                  <h3>
                    HR Issues
                  </h3>

                  <p>
                    Transfer • Salary • Transfer •
                    Canteen Food • Commutation •
                    Attendance issues.
                  </p>

                </div>

              </article>


              <article>

                <div className="wbp-card-number">
                  02
                </div>

                <div>

                  <h3>
                    Daily management issues
                  </h3>

                  <p>
                    Argument with superior •
                    Misunderstanding with a colleague •
                    Mobile usage by co passengers /
                    driver.
                  </p>

                </div>

              </article>


              <article>

                <div className="wbp-card-number">
                  03
                </div>

                <div>

                  <h3>
                    Outside issues
                  </h3>

                  <p>
                    Personal issues • Public Matters •
                    Customer Complaints.
                  </p>

                  <a
                    href="/contact-us/"
                    className="wbp-inline-link"
                  >
                    Customer complaints →
                  </a>

                </div>

              </article>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW TO LODGE
      ====================================================== */}

      <section className="wbp-lodge">

        <div className="wbp-container">

          <div className="wbp-section-label">
            <span></span>
            REPORTING CHANNELS
          </div>

          <h2>
            How to lodge
            <br />
            <strong>a complaint?</strong>
          </h2>


          <div className="wbp-contact-grid">

            {/* DROP BOX */}

            <article className="wbp-contact-card">

              <div className="wbp-contact-icon">
                01
              </div>

              <h3>
                Drop Boxes
              </h3>

              <p>
                Placed at different TKM locations
                at Bidadi.
              </p>

            </article>


            {/* POST BOX */}

            <article className="wbp-contact-card">

              <div className="wbp-contact-icon">
                02
              </div>

              <h3>
                Dedicated Post-box
              </h3>

              <p>
                Toyota Kirloskar Motor
                (Ombudsman)
                <br />
                PO Box No. - 27
                <br />
                Ramanagara - 562159
              </p>

            </article>


            {/* HOTLINE */}

            <article className="wbp-contact-card">

              <div className="wbp-contact-icon">
                03
              </div>

              <h3>
                Toll-free Hotline
              </h3>

              <a
                href="tel:18003000019"
                className="wbp-phone"
              >
                1800 3000 0019
              </a>

            </article>


            {/* EMAIL */}

            <article className="wbp-contact-card">

              <div className="wbp-contact-icon">
                04
              </div>

              <h3>
                Dedicated Email-Id
              </h3>

              <a
                href="mailto:complaint@tkmombudsman.com"
                className="wbp-email"
              >
                complaint@
                <br />
                tkmombudsman.com
              </a>

            </article>


            {/* ONLINE */}

            <article className="wbp-contact-card wbp-online-card">

              <div className="wbp-contact-icon">
                05
              </div>

              <h3>
                Online Complaint
              </h3>

              <a
                href="https://www.toyota-kirloskar-corporategovernance.com/"
                target="_blank"
                rel="noreferrer"
                className="wbp-online-link"
              >
                Visit Online Portal
                <span>→</span>
              </a>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW REPORT IS REVIEWED
      ====================================================== */}

      <section className="wbp-review">

        <div className="wbp-review-image">

          <img
            src={reviewImage}
            alt="Who receives and reviews the report"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

        </div>


        <div className="wbp-review-content">

          <div className="wbp-section-label wbp-light-label">
            <span></span>
            REPORT REVIEW PROCESS
          </div>

          <h2>
            Who receives
            <br />
            & reviews the
            <br />
            <strong>report?</strong>
          </h2>

          <div className="wbp-independent">

            <span className="wbp-red-number">
              01
            </span>

            <div>

              <h3>
                Independent Authority (IA)
              </h3>

              <ul>

                <li>
                  IA is one of the leading professional
                  audit and investigation agencies.
                </li>

                <li>
                  No relationship with TKM.
                </li>

                <li>
                  IA will prepare the flash report &
                  submit to Chairman (MD) of Ethics
                  Committee (EC).
                </li>

                <li>
                  Chairman will give direction to
                  Corporate Compliance Division (CCD)
                  whether to proceed with investigation.
                </li>

                <li>
                  If yes to proceed, CCD will investigate
                  & submit the report to EC.
                </li>

                <li>
                  EC will review the report & decide on
                  the next course of action.
                </li>

              </ul>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GLOBAL SPEAKUP
      ====================================================== */}

      <section className="wbp-global">

        <div className="wbp-container">

          <div className="wbp-global-box">

            <div>

              <span>
                TOYOTA GLOBAL
              </span>

              <h2>
                Toyota Global
                <br />
                <strong>Speakup Line</strong>
              </h2>

            </div>


            <div className="wbp-global-links">

              <a href="mailto:speakup@toyota.com">
                <small>
                  EMAIL
                </small>

                speakup@toyota.com
              </a>


              <a
                href="https://www.toyotaglobalspeakup.com/"
                target="_blank"
                rel="noreferrer"
              >
                <small>
                  WEB
                </small>

                toyotaglobalspeakup.com
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="wbp-faq">

        <div className="wbp-container">

          <div className="wbp-section-label">
            <span></span>
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h2>
            Speak-up Policy
            <br />
            <strong>FAQ</strong>
          </h2>


          <div className="wbp-faq-list">

            <div className="wbp-faq-item">

              <button
                onClick={() => toggleFaq(0)}
              >

                <span>
                  Can I meet Independent Authority
                  personally?
                </span>

                <b>
                  {openFaq === 0 ? "−" : "+"}
                </b>

              </button>


              <div
                className={
                  openFaq === 0
                    ? "wbp-faq-answer open"
                    : "wbp-faq-answer"
                }
              >
                <p>
                  If your contact details are given
                  you may be called for evidence.
                </p>
              </div>

            </div>


            <div className="wbp-faq-item">

              <button
                onClick={() => toggleFaq(1)}
              >

                <span>
                  Is disclosure of identity compulsory?
                </span>

                <b>
                  {openFaq === 1 ? "−" : "+"}
                </b>

              </button>


              <div
                className={
                  openFaq === 1
                    ? "wbp-faq-answer open"
                    : "wbp-faq-answer"
                }
              >
                <p>
                  Not compulsory. However, if identity
                  is disclosed, investigation becomes
                  easier.
                </p>
              </div>

            </div>


            <div className="wbp-faq-item">

              <button
                onClick={() => toggleFaq(2)}
              >

                <span>
                  Is there any risk to whistle blower?
                </span>

                <b>
                  {openFaq === 2 ? "−" : "+"}
                </b>

              </button>


              <div
                className={
                  openFaq === 2
                    ? "wbp-faq-answer open"
                    : "wbp-faq-answer"
                }
              >
                <p>
                  TKM has a non-retaliation policy as
                  per which interest of the whistleblower
                  will be protected.
                </p>
              </div>

            </div>


            <div className="wbp-faq-item">

              <button
                onClick={() => toggleFaq(3)}
              >

                <span>
                  I have an issue with Toyota
                  Product / Services, can I raise
                  concern through Speak Up Policy?
                </span>

                <b>
                  {openFaq === 3 ? "−" : "+"}
                </b>

              </button>


              <div
                className={
                  openFaq === 3
                    ? "wbp-faq-answer open"
                    : "wbp-faq-answer"
                }
              >

                <p>
                  Customers are requested to share
                  their concern through dedicated email
                  ID{" "}
                  <strong>
                    voc@toyota-kirloskar.co.in
                  </strong>
                  {" "}or call on{" "}
                  <strong>
                    1800 309 0001
                  </strong>
                  {" "}for resolution.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      <section className="wbp-bottom-cta">

        <div className="wbp-container">

          <div className="wbp-cta-inner">

            <div>

              <span>
                HAVE A CONCERN?
              </span>

              <h2>
                Speak up.
                <br />
                <strong>We listen.</strong>
              </h2>

            </div>


            <a
              href="https://www.toyota-kirloskar-corporategovernance.com/"
              target="_blank"
              rel="noreferrer"
              className="wbp-cta-button"
            >
              LODGE A COMPLAINT
              <span>→</span>
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="wbp-footer">

        <div className="wbp-container">

          <div className="wbp-footer-top">

            <div>

              <div className="wbp-footer-logo">
                TOYOTA
              </div>

              <p>
                Toyota Kirloskar Motor
                <br />
                Private Limited
              </p>

            </div>


            <div>

              <h3>
                TOYOTA IN INDIA
              </h3>

              <a href="/toyota-in-india/about/">
                About Us
              </a>

              <a href="/toyota-in-india/environment/">
                Environment
              </a>

              <a href="/toyota-in-india/social-contribution/">
                Social Contribution
              </a>

            </div>


            <div>

              <h3>
                QUICK LINKS
              </h3>

              <a href="/find-a-dealer/">
                Find a Dealer
              </a>

              <a href="/test-drive/">
                Test Drive
              </a>

              <a href="/contact-us/">
                Contact Us
              </a>

            </div>


            <div>

              <h3>
                POLICY
              </h3>

              <a href="/toyota-in-india/wbp/">
                Speak-up Policy
              </a>

              <a href="/privacy-policy/">
                Privacy Policy
              </a>

              <a href="/terms-conditions/">
                Terms & Conditions
              </a>

            </div>

          </div>


          <div className="wbp-footer-bottom">

            <span>
              © Toyota Kirloskar Motor Private Limited
            </span>

            <span>
              All Rights Reserved
            </span>

          </div>

        </div>

      </footer>

    </div>
    
    <div>
    <ToyotaFooter />
    </div>
    </>
  );
}

export default WBP;
