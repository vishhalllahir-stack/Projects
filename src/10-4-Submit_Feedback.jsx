import "./10-1-Contact.css";
import { FaCommentDots, FaCheckSquare } from "react-icons/fa";
import ToyotaFooter from "./Footer";
import { useState } from "react";

export default function SubmitFeedback() {
  const [cars, UseCars] = useState("");
  return (
    <>
      <div className="fbPage">
        {/* ================= HEADER ================= */}

        <section className="fbHeader">
          <div className="fbLogo">
            <FaCommentDots className="fbIcon" />

            <div>
              <h1>FEEDBACK</h1>
              <span>SUBMIT YOUR FEEDBACK</span>
            </div>
          </div>
        </section>

        {/* ================= TOP ================= */}

        <section className="fbTop">
          {/* Left */}

          <div className="fbVehicleForm">
            <select onChange={(event) => UseCars(event.target.value)}>
              <option>Urban Cruiser Taisor</option>
              <option>Fortuner</option>
              <option>Innova Hycross</option>
              <option>Glanza</option>
              <option>Rumion</option>
            </select>

            <input type="text" placeholder="REGISTRATION NO*" />

            <div className="fbRow">
              <select>
                <option>Select State*</option>
              </select>

              <select>
                <option>Select City*</option>
              </select>
            </div>

            <select>
              <option>Select Dealer*</option>
            </select>
          </div>

          {/* Right */}

          <div className="fbVehicleImage">
            <img
              src="https://static3.toyotabharat.com/images/showroom/taisor/png/dual-tone-sportin-red.png"
              alt="Toyota Taisor"
            />
          </div>
        </section>

        {/* ================= FORM ================= */}

        <section className="fbForm">
          <h2>
            <span></span>
            PERSONAL INFORMATION:
            <small> PROVIDE COMPLETE MAILING ADDRESS</small>
          </h2>

          <div className="fbGrid">
            {/* LEFT */}

            <div>
              <div className="fbName">
                <select>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                </select>

                <input type="text" placeholder="NAME*" />
              </div>

              <input type="text" placeholder="ADDRESS LINE 1" />

              <input type="text" placeholder="ADDRESS LINE 2" />

              <input type="text" placeholder="ADDRESS LINE 3" />

              <div className="fbRow">
                <select>
                  <option>Select State*</option>
                </select>

                <select>
                  <option>Select City*</option>
                </select>
              </div>

              <input type="text" placeholder="PINCODE*" />
            </div>

            {/* RIGHT */}

            <div>
              <div className="fbVerify">
                <input type="text" placeholder="MOBILE*" />

                <button>VERIFY</button>
              </div>

              <input type="email" placeholder="EMAIL*" />

              <textarea rows="5" placeholder="GRIEVANCE*"></textarea>

              <label className="fbAgree">
                <FaCheckSquare />

                <span>
                  I hereby agree to receive emails, calls and SMS related to
                  promotional activities and services, by or on behalf of TKM.
                  <a href="/"> Know More</a>
                </span>
              </label>

              <div className="fbSubmit">
                <button>SUBMIT</button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}

          <div className="fbDisclaimer">
            <h4>Disclaimer:</h4>

            <p>
              The information that you submit will not be used or distributed
              for any reason other than to fulfill your request.
            </p>
          </div>
        </section>
      </div>

      <div className="SubmitedForm">{cars}</div>

      <div>
        <ToyotaFooter />
      </div>
    </>
  );
}
