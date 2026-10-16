import {
  FaChrome,
  FaFirefox,
  FaInternetExplorer,
} from "react-icons/fa";

import './10-1-Contact.css'
import ToyotaFooter from "./Footer";

export default function BeacomeDealer () {

    return(
        <>
         <div className="dealerPage">

      {/* Hero */}
      <section className="dealerHero">
        <div className="dealerHeroContent">
          <h1>Become a Dealer</h1>
        </div>
      </section>

      {/* Red Heading */}
      <div className="dealerTitleBar">
        Become a Dealer
      </div>

      {/* Content */}
      <section className="dealerContainer">

        <h2>Grow with the global leader</h2>

        <p>
          As a Toyota dealer, you'll be putting your business name next to a
          world leader. Admired for its legendary Quality, Durability and
          Reliability (QDR), Toyota has always advanced the standard in
          automobile technology.
        </p>

        <p>
          The result is a range of highly regarded automobiles including
          Glanza, Rumion, Urban Cruiser Hyryder, Innova Crysta, Innova
          Hycross, Hilux, Fortuner, Legender and Camry.
        </p>

        <p>
          Each vehicle is designed to delight customers with a unique motoring
          experience and Toyota promises its customers to deliver QDR
          experience in every stage.
        </p>

        <p>
          With Toyota's expertise in dealer training and world-class
          infrastructure support, you'll experience the same delight as our
          customers. Together, we aim to consistently deliver on our promise
          of putting "Customer First".
        </p>

        <h2 className="dealerHeading">
          Partner with one of the leading car manufacturers in the world
        </h2>

        <h3>What we seek ?</h3>

        <p>
          Passionate candidates ready to explore automobiles, having a
          customer first approach and are willing to invest.
          Prior experience is not essential.
        </p>

        {/* Alert */}

        <div className="dealerAlert">

          <h2>
            BEWARE OF FRAUDULENT NEW DEALER APPLICATION EMAILS /
            COMMUNICATION / WEBSITES.
          </h2>

          <button className="redBtn">
            KNOW MORE
          </button>

        </div>

        <hr />

        {/* Buttons */}

        <div className="dealerButtons">

          <button className="applyBtn">
            ONLINE DEALER APPLICATION FORM »
          </button>

          <div className="reportBox">

            <span>
              To report any unethical practices
            </span>

            <button className="blackBtn">
              CLICK HERE
            </button>

          </div>

        </div>

        <hr />

        {/* Browser */}

        <div className="browserSupport">

          <h4>
            Supported Browsers for Online Application
          </h4>

          <div className="browserIcons">

            <span>
              <FaChrome color="#DB4437" />
              Chrome
            </span>

            <span>
              <FaFirefox color="#FF7139" />
              Firefox
            </span>

            <span>
              <FaInternetExplorer color="#00A4EF" />
              IE Version 11 and above
            </span>

          </div>

        </div>

      </section>

    </div>


    <div>
      <ToyotaFooter />
    </div>
        </>
    )
}