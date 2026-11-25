import './7-2-Accessories.css';
import { NavLink } from "react-router-dom";

export default function AccessoriesFooter() {
  return (
    <footer className="tpFooter">

      <div className="tpFooterContainer">

        {/* ================= Left ================= */}

        <div className="tpFooterGrid">

          {/* Column 1 */}

          <div className="tpColumn">

            <h3>Parts Catalog</h3>

            <NavLink to="/">Engine & Transmission</NavLink>

            <NavLink to="/">Brake & Suspension</NavLink>

            <NavLink to="/">Lubricants</NavLink>

            <NavLink to="/">Accessories</NavLink>

            <NavLink to="/">Miscellaneous</NavLink>

          </div>

          {/* Column 2 */}

          <div className="tpColumn">

            <h3>More Results</h3>

            <NavLink to="/">Sign Up</NavLink>

            <NavLink to="/">About Us</NavLink>

            <NavLink to="/">Track Order</NavLink>

            <NavLink to="/">Request Return</NavLink>

            <NavLink to="/">FAQs</NavLink>

          </div>

          {/* Column 3 */}

          <div className="tpColumn">

            <h3>Contact Us</h3>

            <p>voc@toyota-kirloskar.co.in</p>

            <p>1800-309-0001</p>

            <NavLink to="/">Connect Us</NavLink>

            <div className="tpAddress">

              <strong>Toyota Kirloskar Motor</strong>

              <p>
                Plot No.1,
                Bidadi Industrial Area,
                Ramanagar District,
                PIN - 562109,
                Karnataka, India.
              </p>

            </div>

          </div>

          {/* Column 4 */}

          <div className="tpColumn tpImageColumn">
            {/* Prefer a local image placed in public/ for best results. */}

            <NavLink to="/Service/Services/Service_Dealer_Locator">
               <img
              className="tpColumn tpImageColumn"
              src="/chatgpt-image-2026-08-05.png"
              alt="ChatGPT Image Aug 5 2026"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              onError={(e) => {
                // fallback to remote image if local not found
                e.currentTarget.src = 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=900';
              }}
            />
            </NavLink>
  

          </div>

        </div>

        {/* ================= Policies ================= */}

        <div className="tpPolicyRow">

          <div className="tpPolicies">

            <NavLink to="/">Website Usage Policy</NavLink>

            <NavLink to="/">Privacy Policy</NavLink>

            <NavLink to="/">Shipping Policy</NavLink>

            <NavLink to="/">Cancellation & Return</NavLink>

            <NavLink to="/">Terms & Conditions</NavLink>

          </div>

          <div className="tpPayments">

            <span>Secure Payments By</span>

            <div className="tpPayments">

  <span className="tpPayTitle">Secure Payments By</span>

  <div className="tpPayIcons">


        <img
      src="https://cdn.simpleicons.org/visa"
      alt="Visa"
    />
    

    <img
      src="https://cdn.simpleicons.org/paypal"
      alt="PayPal"
    />

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
      alt="MasterCard"
      loading="lazy"
    />

  </div>

</div>

          </div>

        </div>

        {/* ================= Copyright ================= */}

        <div className="tpCopyright">

          Copyright © 2026 Toyota Kirloskar Motor.
          All Rights Reserved

        </div>
      </div>
    </footer>
  );
}
