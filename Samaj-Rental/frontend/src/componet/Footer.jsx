import { Link } from "react-router-dom";
import Icon from "./Icon";


function Footer() {

  const currentYear =
    new Date().getFullYear();


  return (
    <footer className="site-footer">

      {/* ======================================
          FOOTER TOP
      ====================================== */}

      <div className="footer-top">


        {/* ====================================
            BRAND
        ==================================== */}

        <div className="footer-brand footer-card">

          <div className="footer-logo">

            <div className="footer-logo-icon">
              <Icon
                name="home"
                size={22}
              />
            </div>


            <div>

              <h2>
                Samaj Rental
              </h2>

              <span>
                સમાજની વસ્તુઓ, સરળ Rent
              </span>

            </div>

          </div>


          <p>
            Samaj Rental System સમાજની
            જરૂરિયાતોને ધ્યાનમાં રાખીને
            બનાવવામાં આવેલું સરળ digital
            platform છે. ઘર સેટ કરવા માટે
            જરૂરી વાસણો, Kitchen Items અને
            અન્ય જરૂરી વસ્તુઓ સરળતાથી
            શોધો અને book કરો.
          </p>


          <div className="footer-trust-row">

            <span className="footer-badge">
              <Icon
                name="badgeCheck"
                size={15}
              />

              Trusted Community Service
            </span>


            <span className="footer-social-link">
              <Icon
                name="sparkles"
                size={15}
              />

              Made for Samaj
            </span>

          </div>

        </div>


        {/* ====================================
            QUICK LINKS
        ==================================== */}

        <div className="footer-column footer-card">

          <h3>
            સમાજ માટે
          </h3>


          <div className="footer-links">

            <Link to="/dashboard">
              સમાજનું Dashboard
            </Link>

            <Link to="/items">
              બધી Rental વસ્તુઓ
            </Link>

            <Link to="/cart">
              મારી Cart
            </Link>

            <Link to="/my-bookings">
              મારી Bookings
            </Link>

          </div>


          <Link
            to="/items"
            className="footer-cta-link"
          >
            આજે જ Rental શરૂ કરો

            <Icon
              name="send"
              size={14}
            />

          </Link>

        </div>


        {/* ====================================
            SERVICES
        ==================================== */}

        <div className="footer-column footer-card">

          <h3>
            અમારી સેવાઓ
          </h3>


          <div className="footer-links">

            <Link to="/items">
              જમવાના વાસણ
            </Link>

            <Link to="/items">
              રસોઈના વાસણ
            </Link>

            <Link to="/items">
              કાપવા-સમારવાના સાધનો
            </Link>

            <Link to="/items">
              Kitchen Electronics
            </Link>

            <Link to="/items">
              ડબ્બા અને Storage
            </Link>

            <Link to="/items">
              રસોડાની સફાઈ
            </Link>

          </div>


          <p className="footer-column-note">
            સમાજની વસ્તુઓનો યોગ્ય ઉપયોગ,
            પારદર્શક booking અને સૌ માટે
            સરળ rental સેવા.
          </p>

        </div>


        {/* ====================================
            CONTACT
        ==================================== */}

        <div className="footer-column footer-card">

          <h3>
            સમાજ સંપર્ક
          </h3>


          <div className="footer-contact">


            {/* Location */}

            <div className="footer-contact-item">

              <span className="footer-contact-icon">
                <Icon
                  name="location"
                  size={16}
                />
              </span>


              <div>

                <strong>
                  Location
                </strong>

                <p>
                  સમાજ કાર્યાલય,
                  તમારું ગામ, ગુજરાત
                </p>

              </div>

            </div>


            {/* Phone */}

            <div className="footer-contact-item">

              <span className="footer-contact-icon">
                <Icon
                  name="phone"
                  size={16}
                />
              </span>


              <div>

                <strong>
                  Phone
                </strong>

                <a href="tel:+919876543210">
                  +91 98765 43210
                </a>

              </div>

            </div>


            {/* Email */}

            <div className="footer-contact-item">

              <span className="footer-contact-icon">
                <Icon
                  name="mail"
                  size={16}
                />
              </span>


              <div>

                <strong>
                  Email
                </strong>

                <a href="mailto:support@samajrental.com">
                  support@samajrental.com
                </a>

              </div>

            </div>


            {/* Service Time */}

            <div className="footer-contact-item">

              <span className="footer-contact-icon">
                <Icon
                  name="clock"
                  size={16}
                />
              </span>


              <div>

                <strong>
                  સેવા સમય
                </strong>

                <p>
                  સોમવારથી શનિવાર ·
                  સવારે 9 થી સાંજે 7
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ======================================
          FOOTER BOTTOM
      ====================================== */}

      <div className="footer-bottom">


        <div className="footer-copyright">

          © {currentYear}{" "}

          <strong>
            Samaj Rental System
          </strong>

          . All rights reserved.

        </div>


        <div className="footer-bottom-links">

          <span>
            Privacy Policy
          </span>

          <span>
            Terms & Conditions
          </span>

        </div>


        {/* Back To Top */}

        <button
          type="button"
          className="footer-top-button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          aria-label="Back to top"
        >

          <Icon
            name="send"
            size={16}
          />

        </button>

      </div>

    </footer>
  );
}


export default Footer;