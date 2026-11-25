import './10-1-Contact.css'

import { FaExclamationTriangle } from "react-icons/fa";

export default function Careers() {
  return (
    <div className="error404">

      <div className="error404Card">

        <h2 className="error404Logo">
          TOYOTA
        </h2>

        <div className="error404Icon">
          <FaExclamationTriangle />
        </div>

        <h1 className="error404Title">
          404
        </h1>

        <h3 className="error404SubTitle">
          Oops... page not found.
        </h3>

        <p className="error404Text">
          The requested URL is not found in this server.
        </p>

        <a href="/ContactIcon" className="error404Btn">
          Back to Home
        </a>

      </div>

    </div>
  );
}