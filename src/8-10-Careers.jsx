import "./8-10-Careers.css";
import ToyotaFooter from "./Footer";


import { useState } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=90",
];

const valueCards = [
  {
    number: "01",
    title: "MUTUAL TRUST",
    text:
      "We believe trust is the foundation of a strong workplace. Every employee is encouraged to respect and support one another.",
  },
  {
    number: "02",
    title: "CONSTANT IMPROVEMENT",
    text:
      "We put forth only the best ideas and efforts and continuously look for better ways of doing things.",
  },
  {
    number: "03",
    title: "TEAMWORK",
    text:
      "We believe in individual efforts and good teamwork to optimize the entire company.",
  },
  {
    number: "04",
    title: "PEOPLE FIRST",
    text:
      "We are committed to developing people and creating an environment where everyone can grow.",
  },
];

function ToyotaCareers() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const scrollToSection = (id) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleTalentSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  };

  return (
    <>
    <div className="tkm-careers">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="tkm-header">

        <div className="tkm-header-inner">

          <a
            href="#home"
            className="tkm-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            <span className="tkm-logo-symbol">
              <span></span>
              <span></span>
              <span></span>
            </span>

            <span className="tkm-logo-text">
              TOYOTA
            </span>
          </a>


          <nav
            className={
              menuOpen
                ? "tkm-nav open"
                : "tkm-nav"
            }
          >

            <button
              onClick={() => scrollToSection("home")}
            >
              HOME
            </button>

            <button
              onClick={() => scrollToSection("employees")}
            >
              OUR EMPLOYEES
            </button>

            <button
              onClick={() => scrollToSection("toyota-way")}
            >
              TOYOTA WAY
            </button>

            <button
              onClick={() => scrollToSection("talent")}
            >
              TALENT COMMUNITY
            </button>

            <button
              onClick={() => scrollToSection("fraud")}
            >
              FRAUD ALERT
            </button>

            <a
              href="https://careers.toyotabharat.com/viewalljobs/"
              target="_blank"
              rel="noreferrer"
              className="tkm-nav-job"
            >
              VIEW JOBS
            </a>

          </nav>


          <button
            className="tkm-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
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
        className="tkm-hero"
        id="home"
      >

        <div className="tkm-hero-image">

          <img
            src={heroImages[0]}
            alt="Toyota employees"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85";
            }}
          />

        </div>


        <div className="tkm-hero-overlay"></div>


        <div className="tkm-hero-content">

          <div className="tkm-hero-line"></div>

          <p>
            CAREERS AT TOYOTA KIRLOSKAR MOTOR
          </p>

          <h1>
            OUR MOST
            <br />
            <strong>VALUABLE ASSET</strong>
          </h1>

          <span className="tkm-hero-subtitle">
            OUR EMPLOYEES
          </span>

          <button
            className="tkm-hero-button"
            onClick={() => scrollToSection("employees")}
          >
            EXPLORE
            <span>→</span>
          </button>

        </div>


        <div className="tkm-scroll">

          <span>
            SCROLL TO EXPLORE
          </span>

          <div className="tkm-scroll-line"></div>

        </div>

      </section>


      {/* =====================================================
          EMPLOYEES
      ====================================================== */}

      <section
        className="tkm-employees"
        id="employees"
      >

        <div className="tkm-container">

          <div className="tkm-section-label">
            <span></span>
            OUR MOST VALUABLE ASSET
          </div>


          <div className="tkm-two-column">

            <div>

              <h2>
                Our
                <br />
                <strong>Employees</strong>
              </h2>

            </div>


            <div className="tkm-copy">

              <p className="tkm-lead">
                At Toyota, the philosophy of
                <strong>
                  {" "}Mutual Trust and Respect
                </strong>
                {" "}is at the core.
              </p>

              <p>
                Our employees are vital and inevitably
                the most valuable asset. We aim to
                provide a stable employment and
                world-class working conditions balanced
                with the progress of the company.
              </p>

              <p>
                We believe that people are the key to
                achieving sustainable growth. Our
                workplace encourages every individual
                to contribute ideas, develop skills and
                work together towards a common goal.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TOYOTA WAY
      ====================================================== */}

      <section
        className="tkm-toyota-way"
        id="toyota-way"
      >

        <div className="tkm-container">

          <div className="tkm-section-label light">
            <span></span>
            THE TOYOTA WAY
          </div>


          <div className="tkm-way-heading">

            <h2>
              The company's
              <br />
              fundamental <strong>DNA</strong>
            </h2>

            <p>
              The Toyota Way enables us to transcend
              language and nationality.
            </p>

          </div>


          <div className="tkm-pillars">

            <div className="tkm-pillar">

              <div className="tkm-pillar-number">
                01
              </div>

              <div>

                <h3>
                  CONSTANT
                  <br />
                  IMPROVEMENT
                </h3>

                <p>
                  We put forth only the best ideas
                  and efforts.
                </p>

              </div>

            </div>


            <div className="tkm-pillar">

              <div className="tkm-pillar-number">
                02
              </div>

              <div>

                <h3>
                  PEOPLE,
                  <br />
                  A PRIORITY
                </h3>

                <p>
                  We firmly believe in individual
                  efforts and good teamwork.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HR FOCUS
      ====================================================== */}

      <section className="tkm-focus">

        <div className="tkm-container">

          <div className="tkm-focus-heading">

            <span>
              HUMAN RESOURCE MANAGEMENT
            </span>

            <h2>
              Building a workplace
              <br />
              where <strong>people thrive.</strong>
            </h2>

          </div>


          <div className="tkm-focus-grid">

            {valueCards.map((card) => (

              <article
                className="tkm-focus-card"
                key={card.number}
              >

                <div className="tkm-focus-number">
                  {card.number}
                </div>

                <div className="tkm-focus-icon">
                  +
                </div>

                <h3>
                  {card.title}
                </h3>

                <p>
                  {card.text}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          EMPLOYEE IMAGE BAND
      ====================================================== */}

      <section className="tkm-image-band">

        <img
          src={heroImages[1]}
          alt="Toyota team working together"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85";
          }}
        />

        <div className="tkm-image-band-overlay"></div>

        <div className="tkm-image-band-content">

          <span>
            ONE TEAM
          </span>

          <h2>
            Together we create
            <br />
            <strong>better mobility.</strong>
          </h2>

        </div>

      </section>


      {/* =====================================================
          TALENT COMMUNITY
      ====================================================== */}

      <section
        className="tkm-talent"
        id="talent"
      >

        <div className="tkm-container">

          <div className="tkm-talent-inner">

            <div className="tkm-section-label">
              <span></span>
              JOIN OUR TALENT COMMUNITY
            </div>


            <h2>
              Stay connected
              <br />
              with <strong>Toyota.</strong>
            </h2>


            <p>
              Stay connected by joining our network!
              Enter your email and tell us a bit about
              yourself, and we'll keep you informed about
              upcoming events and opportunities that
              match your interests.
            </p>


            <form
              className="tkm-talent-form"
              onSubmit={handleTalentSubmit}
            >

              <div className="tkm-email-box">

                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>


              <button type="submit">
                JOIN
                <span>→</span>
              </button>

            </form>


            {submitted && (

              <div className="tkm-success">
                Thank you for joining our Talent
                Community.
              </div>

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          FRAUD ALERT
      ====================================================== */}

      <section
        className="tkm-fraud"
        id="fraud"
      >

        <div className="tkm-container">

          <div className="tkm-fraud-heading">

            <div className="tkm-warning-icon">
              !
            </div>

            <div>

              <span>
                IMPORTANT NOTICE
              </span>

              <h2>
                Beware of fraudulent
                <br />
                recruitment communication
              </h2>

            </div>

          </div>


          <div className="tkm-fraud-content">

            <div className="tkm-fraud-date">
              21st Aug 2024
            </div>


            <div>

              <p>
                Our attention has been drawn to a
                situation wherein certain members of
                the public have received communications
                / messages claiming to be for job
                interviews/offers at Toyota Kirloskar
                Motor Private Limited (Toyota) and later
                demanding money for accepting their
                applications.
              </p>

              <p>
                These messages appear to be circulated
                through WhatsApp, emails and other
                social media platforms.
              </p>

              <p>
                Members of the public are hereby informed
                that <strong>
                  Toyota does not ask or collect any
                  amounts of money from job applicants
                  at any stage of the recruitment process.
                </strong>
              </p>

              <p>
                We strongly advise and caution the public
                to understand the factual position and
                not to apply or pay any money to any person
                based on these fraudulent recruitment
                communications / messages.
              </p>

              <p>
                If you require further confirmation as to
                whether recruitment related communications
                are genuine, please contact Toyota Kirloskar
                Motor Pvt. Ltd. through the official
                Toyota website.
              </p>

            </div>

          </div>


          <div className="tkm-fraud-divider"></div>


          <div className="tkm-fraud-old">

            <strong>
              02nd Feb 2021
            </strong>

            <p>
              Toyota also cautions potential applicants
              against fraudulent recruitment communications
              claiming to represent Toyota Motor Asia
              Pacific Pte Ltd and/or Toyota Kirloskar
              Motor Pvt Ltd and requesting deposits for
              interviews, travel or employment passes.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          JOB CTA
      ====================================================== */}

      <section className="tkm-job-cta">

        <div className="tkm-job-cta-overlay"></div>

        <div className="tkm-job-cta-content">

          <span>
            BUILD YOUR FUTURE WITH TOYOTA
          </span>

          <h2>
            Find your next
            <br />
            <strong>opportunity.</strong>
          </h2>

          <a
            href="https://careers.toyotabharat.com/viewalljobs/"
            target="_blank"
            rel="noreferrer"
          >
            VIEW ALL JOBS
            <span>→</span>
          </a>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="tkm-footer">

        <div className="tkm-footer-top">

          <div className="tkm-container">

            <div className="tkm-footer-grid">

              <div className="tkm-footer-brand">

                <div className="tkm-footer-logo">
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
                  href="#employees"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("employees");
                  }}
                >
                  Our Employees
                </a>

                <a
                  href="#toyota-way"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("toyota-way");
                  }}
                >
                  Toyota Way
                </a>

                <a
                  href="#talent"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("talent");
                  }}
                >
                  Talent Community
                </a>

              </div>


              <div>

                <h3>
                  CAREERS
                </h3>

                <a
                  href="https://careers.toyotabharat.com/viewalljobs/"
                  target="_blank"
                  rel="noreferrer"
                >
                  View All Jobs
                </a>

                <a
                  href="#fraud"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("fraud");
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

          </div>

        </div>


        <div className="tkm-footer-bottom">

          <div className="tkm-container">

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

export default ToyotaCareers;
