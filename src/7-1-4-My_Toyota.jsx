import "./7-1-Tweb.css";
import TwebFooter from "./7-1-Tweb-Footer";
import { useState } from "react";


export default function MyToyota() {
  const [mobile, setMobile] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agree || agree >= 10) {
      alert("Please accept the terms.");
      return;
    }

    alert("OTP Sent Successfully!");
  };

  return (
    <>
    <div className="toyotaSignInPage">
      <div className="toyotaSignInCard">

        <h2 className="toyotaSignInTitle">MY Toyota</h2>

        <p className="toyotaSignInSubtitle">
          If you have an account, sign in with your Mobile Number.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="toyotaSignInField">
            <label>
              Email Address/ Mobile Number <span>*</span>
            </label>

            <input
              type="text"
              placeholder="Type here"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <p className="toyotaSignInOTP">
            ** The OTP will be sent to your registered email and
            <br />
            mobile number.
          </p>

          <label className="toyotaSignInCheck">

            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />

            <span>
              I hereby agree to receive emails, calls and SMS related
              to promotional activities and services, by or on behalf
              of TKM.
              <a href="/"> Know More</a>
            </span>

          </label>

          <button type="submit" className="toyotaOTPButton">
            Get OTP
          </button>

        </form>

        <div className="toyotaDivider"></div>

        <h2 className="toyotaCreateTitle">
          Sign Up
        </h2>

        <p className="toyotaCreateText">
          Create an account to save your selections.
        </p>

        <button className="toyotaCreateButton">
          Create Your Account
        </button>

      </div>
    </div>

    <div>
        <TwebFooter />
    </div>
    </>
  );
}