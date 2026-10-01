import { Link, useNavigate } from "react-router-dom";
import Icon from "../componet/Icon";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">

      {/* =====================================
          BACKGROUND DECORATIONS
      ===================================== */}

      <div className="not-found-background-circle circle-one"></div>

      <div className="not-found-background-circle circle-two"></div>

      <div className="not-found-background-circle circle-three"></div>


      {/* =====================================
          FLOATING DECORATIVE ITEMS
      ===================================== */}

      <div className="not-found-floating-icon floating-one">
        <Icon name="archive" size={20} />
      </div>

      <div className="not-found-floating-icon floating-two">
        <Icon name="calendar" size={19} />
      </div>

      <div className="not-found-floating-icon floating-three">
        <Icon name="cart" size={20} />
      </div>


      {/* =====================================
          MAIN CARD
      ===================================== */}

      <div className="not-found-card">


        {/* ===================================
            TOP BADGE
        =================================== */}

        <div className="not-found-badge">

          <span className="not-found-badge-dot"></span>

          Samaj Rental System

        </div>


        {/* ===================================
            404 NUMBER
        =================================== */}

        <div
          className="not-found-number"
          aria-label="404 Page Not Found"
        >

          <span>4</span>


          <div className="not-found-box">

            <div className="not-found-box-inner">

              <div className="not-found-box-icon">

                <Icon
                  name="home"
                  size={32}
                />

              </div>

            </div>

          </div>


          <span>4</span>

        </div>


        {/* ===================================
            SEARCH ICON
        =================================== */}

        <div className="not-found-icon">

          <Icon
            name="search"
            size={27}
          />

        </div>


        {/* ===================================
            TITLE
        =================================== */}

        <h1>
          Page Not Found
        </h1>


        <p className="not-found-title">

          Oops! આ page મળ્યું નથી.

        </p>


        <p className="not-found-description">

          તમે જે page શોધી રહ્યા છો તે હાલમાં ઉપલબ્ધ નથી.
          URL ખોટો હોઈ શકે છે, page move કરવામાં આવ્યું હોઈ શકે છે
          અથવા page remove થઈ ગયું હોઈ શકે છે.

        </p>


        {/* ===================================
            ACTION BUTTONS
        =================================== */}

        <div className="not-found-actions">


          <Link
            to="/"
            className="not-found-btn not-found-primary"
          >

            <Icon
              name="home"
              size={17}
            />

            Go Home

          </Link>


          <button
            type="button"
            className="not-found-btn not-found-secondary"
            onClick={() => navigate(-1)}
          >

            <span>
              ←
            </span>

            Go Back

          </button>


        </div>


        {/* ===================================
            QUICK LINK
        =================================== */}

        <Link
          to="/items"
          className="not-found-rental-link"
        >

          <span className="not-found-rental-icon">

            <Icon
              name="archive"
              size={18}
            />

          </span>


          <span>

            Browse Rental Items

            <small>
              ઘરનાં વાસણ અને કિચન સામાન જુઓ
            </small>

          </span>


          <span className="not-found-arrow">
            →
          </span>

        </Link>


        {/* ===================================
            HELP MESSAGE
        =================================== */}

        <div className="not-found-help">

          <div className="not-found-help-icon">
            💡
          </div>


          <p>

            જો તમે rental item શોધી રહ્યા છો,
            તો{" "}

            <Link to="/items">
              Rental Items
            </Link>{" "}

            page પર જઈને બધા available items જુઓ.

          </p>

        </div>


        {/* ===================================
            FOOTER
        =================================== */}

        <div className="not-found-footer">

          <span>
            Samaj Rental
          </span>

          <span className="not-found-footer-dot">
            •
          </span>

          <span>
            Easy Booking
          </span>

          <span className="not-found-footer-dot">
            •
          </span>

          <span>
            Digital Billing
          </span>

        </div>


      </div>

    </div>
  );
}

export default NotFound;