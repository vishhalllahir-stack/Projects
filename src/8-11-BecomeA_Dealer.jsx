import "./8-11-BeacomDealer.css";
import ToyotaFooter from "./Footer";

import { useState } from "react";


const dealerImages = {
  hero:
    "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=2000&q=90",

  business:
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1600&q=90",

  customer:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=90",

  showroom:
    "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1800&q=90",
};

function BecomeDealer() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
    <div className="bd-page">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="bd-header">

        <div className="bd-header-inner">

          <a
            href="#top"
            className="bd-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("top");
            }}
          >
            <div className="bd-logo-mark">
              <span className="bd-oval bd-oval-1"></span>
              <span className="bd-oval bd-oval-2"></span>
              <span className="bd-oval bd-oval-3"></span>
            </div>

            <span className="bd-logo-text">
              TOYOTA
            </span>
          </a>


          <nav
            className={
              menuOpen
                ? "bd-nav bd-nav-open"
                : "bd-nav"
            }
          >

            <button
              onClick={() => scrollTo("about")}
            >
              BECOME A DEALER
            </button>

            <button
              onClick={() => scrollTo("why-toyota")}
            >
              WHY TOYOTA
            </button>

            <button
              onClick={() => scrollTo("requirements")}
            >
              WHAT WE SEEK
            </button>

            <button
              onClick={() => scrollTo("fraud")}
            >
              FRAUD ALERT
            </button>

            <a
              href="https://www.toyotabharat.com/dealer-application/"
              className="bd-nav-apply"
              target="_blank"
              rel="noreferrer"
            >
              APPLY NOW
            </a>

          </nav>


          <button
            className="bd-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>

      </header>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="bd-hero"
        id="top"
      >

        <img
          src={dealerImages.hero}
          alt="Toyota dealership"
          className="bd-hero-image"
        />

        <div className="bd-hero-overlay"></div>


        <div className="bd-hero-content">

          <div className="bd-red-line"></div>

          <span className="bd-small-title">
            TOYOTA KIRLOSKAR MOTOR
          </span>

          <h1>
            Become
            <br />
            <strong>a Dealer</strong>
          </h1>

          <p>
            Grow with the global leader
          </p>

          <button
            className="bd-hero-btn"
            onClick={() => scrollTo("about")}
          >
            EXPLORE
            <span>↓</span>
          </button>

        </div>


        <div className="bd-hero-scroll">
          SCROLL TO EXPLORE
          <span></span>
        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section
        className="bd-intro"
        id="about"
      >

        <div className="bd-container">

          <div className="bd-section-tag">
            <span></span>
            BECOME A TOYOTA DEALER
          </div>


          <div className="bd-intro-grid">

            <div className="bd-intro-heading">

              <h2>
                Grow with
                <br />
                the <strong>global</strong>
                <br />
                leader
              </h2>

            </div>


            <div className="bd-intro-copy">

              <p className="bd-big-text">
                As a Toyota dealer, you'll be putting
                your business name next to a world
                leader.
              </p>

              <p>
                Admired for its legendary
                <strong>
                  {" "}Quality, Durability and Reliability
                  (QDR)
                </strong>
                , Toyota has always advanced the
                standard in automobile technology.
              </p>

              <p>
                The result is a range of highly regarded
                and sought after automobiles designed to
                delight customers with a unique motoring
                experience.
              </p>

              <p>
                Toyota promises its customers to deliver
                the QDR experience in all stages.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          VEHICLES STRIP
      ====================================================== */}

      <section className="bd-vehicle-strip">

        <div className="bd-container">

          <div className="bd-strip-heading">

            <span>
              TOYOTA INDIA
            </span>

            <h2>
              A trusted name
              <br />
              in <strong>mobility</strong>
            </h2>

          </div>


          <div className="bd-model-list">

            <div>GLANZA</div>
            <div>RUMION</div>
            <div>HYRYDER</div>
            <div>INNOVA</div>
            <div>HILUX</div>
            <div>FORTUNER</div>
            <div>VELLFIRE</div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY TOYOTA
      ====================================================== */}

      <section
        className="bd-why"
        id="why-toyota"
      >

        <div className="bd-container">

          <div className="bd-section-tag">
            <span></span>
            WHY PARTNER WITH TOYOTA
          </div>


          <div className="bd-why-grid">

            <div>

              <h2>
                A partnership
                <br />
                built on
                <br />
                <strong>trust.</strong>
              </h2>

            </div>


            <div className="bd-why-copy">

              <p className="bd-big-text">
                With Toyota's expertise in dealer
                training and world-class infrastructure
                support, you'll experience the same
                delight as our customers.
              </p>

              <p>
                Together, we aim to consistently deliver
                on our promise of putting
                <strong> Customer First.</strong>
              </p>

            </div>

          </div>


          <div className="bd-feature-grid">

            <article className="bd-feature">

              <div className="bd-feature-number">
                01
              </div>

              <div className="bd-feature-icon">
                Q
              </div>

              <h3>
                QUALITY
              </h3>

              <p>
                A globally respected philosophy of
                delivering quality at every stage.
              </p>

            </article>


            <article className="bd-feature">

              <div className="bd-feature-number">
                02
              </div>

              <div className="bd-feature-icon">
                T
              </div>

              <h3>
                TRAINING
              </h3>

              <p>
                Dealer training and capability building
                supported by Toyota expertise.
              </p>

            </article>


            <article className="bd-feature">

              <div className="bd-feature-number">
                03
              </div>

              <div className="bd-feature-icon">
                C
              </div>

              <h3>
                CUSTOMER FIRST
              </h3>

              <p>
                A common commitment to consistently
                create customer delight.
              </p>

            </article>


            <article className="bd-feature">

              <div className="bd-feature-number">
                04
              </div>

              <div className="bd-feature-icon">
                S
              </div>

              <h3>
                SUPPORT
              </h3>

              <p>
                World-class infrastructure and business
                support for dealer partners.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          IMAGE SECTION
      ====================================================== */}

      <section className="bd-image-section">

        <img
          src={dealerImages.showroom}
          alt="Automotive showroom"
        />

        <div className="bd-image-overlay"></div>

        <div className="bd-image-content">

          <span>
            ONE PARTNERSHIP
          </span>

          <h2>
            Together, we create
            <br />
            <strong>Customer Delight.</strong>
          </h2>

        </div>

      </section>


      {/* =====================================================
          WHAT WE SEEK
      ====================================================== */}

      <section
        className="bd-requirements"
        id="requirements"
      >

        <div className="bd-container">

          <div className="bd-section-tag">
            <span></span>
            WHAT WE SEEK
          </div>


          <div className="bd-requirements-grid">

            <div>

              <h2>
                Are you ready
                <br />
                to become a
                <br />
                <strong>Toyota partner?</strong>
              </h2>

            </div>


            <div className="bd-requirements-copy">

              <p className="bd-big-text">
                Passionate candidates ready to explore
                automobiles, having a customer first
                approach and are willing to invest.
              </p>

              <p>
                Prior experience is not essential.
              </p>


              <div className="bd-check-list">

                <div>
                  <span>✓</span>
                  Passion for automobiles
                </div>

                <div>
                  <span>✓</span>
                  Customer-first approach
                </div>

                <div>
                  <span>✓</span>
                  Willingness to invest
                </div>

                <div>
                  <span>✓</span>
                  Commitment to Toyota values
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BUSINESS IMAGE
      ====================================================== */}

      <section className="bd-business">

        <div className="bd-business-image">

          <img
            src={dealerImages.business}
            alt="Business partnership"
          />

        </div>


        <div className="bd-business-content">

          <span>
            YOUR BUSINESS. OUR EXPERIENCE.
          </span>

          <h2>
            Build your
            <br />
            <strong>future with Toyota.</strong>
          </h2>

          <p>
            Join a global automotive leader and
            become part of a network committed to
            quality, reliability and customer delight.
          </p>

        </div>

      </section>


      {/* =====================================================
          FRAUD ALERT
      ====================================================== */}

      <section
        className="bd-fraud"
        id="fraud"
      >

        <div className="bd-container">

          <div className="bd-fraud-title">

            <div className="bd-warning">
              !
            </div>

            <div>

              <span>
                IMPORTANT NOTICE
              </span>

              <h2>
                Beware of fraudulent
                <br />
                new dealer applications
              </h2>

            </div>

          </div>


          <div className="bd-fraud-content">

            <div className="bd-fraud-date">
              03rd Jan 2025
            </div>


            <div>

              <p className="bd-fraud-lead">
                Our official website for application is
                <strong>
                  {" "}toyotabharat.com/become-dealer.
                </strong>
              </p>

              <p>
                Our attention has been drawn to a
                situation wherein certain members of
                the public have received communications,
                messages or publications of websites
                presenting as genuine websites for
                applying to become a New Dealer Partner
                of Toyota Kirloskar Motor Private Limited.
              </p>

              <p>
                These communications may seek personal
                details and demand money for accepting
                applications for new dealerships.
              </p>

              <p>
                Members of the public are hereby informed
                that Toyota does
                <strong>
                  {" "}not seek or collect any amounts
                  of money
                </strong>
                {" "}from New Dealer applicants at any
                stage of the New Dealer recruitment
                process.
              </p>

              <p>
                We strongly advise and caution the public
                not to apply or pay any money to any
                person based on fraudulent Dealer
                application communications or messages.
              </p>

              <p>
                If you require further confirmation as to
                whether any New Dealer recruitment
                communication is genuine, please contact
                Toyota through the official website.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          APPLY CTA
      ====================================================== */}

      <section className="bd-apply">

        <div className="bd-apply-overlay"></div>

        <div className="bd-apply-content">

          <div className="bd-red-line"></div>

          <span>
            BECOME A TOYOTA DEALER
          </span>

          <h2>
            Ready to take the
            <br />
            <strong>next step?</strong>
          </h2>

          <p>
            Submit your application through the
            official Toyota dealer application portal.
          </p>

          <a
            href="https://www.toyotabharat.com/dealer-application/"
            target="_blank"
            rel="noreferrer"
            className="bd-apply-button"
          >
            ONLINE DEALER APPLICATION
            <span>→</span>
          </a>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bd-footer">

        <div className="bd-container">

          <div className="bd-footer-grid">

            <div>

              <div className="bd-footer-logo">
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
                QUICK LINKS
              </h3>

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("about");
                }}
              >
                Become a Dealer
              </a>

              <a
                href="#why-toyota"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("why-toyota");
                }}
              >
                Why Toyota
              </a>

              <a
                href="#requirements"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("requirements");
                }}
              >
                What We Seek
              </a>

            </div>


            <div>

              <h3>
                APPLICATION
              </h3>

              <a
                href="https://www.toyotabharat.com/dealer-application/"
                target="_blank"
                rel="noreferrer"
              >
                Online Application
              </a>

              <a
                href="#fraud"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("fraud");
                }}
              >
                Fraud Alert
              </a>

            </div>


            <div>

              <h3>
                TOYOTA INDIA
              </h3>

              <a
                href="https://www.toyotabharat.com/"
                target="_blank"
                rel="noreferrer"
              >
                Toyota Bharat
              </a>

            </div>

          </div>


          <div className="bd-footer-bottom">

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

export default BecomeDealer;

