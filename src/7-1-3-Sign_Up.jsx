import TwebFooter from "./7-1-Tweb-Footer";
import "./7-1-Tweb.css";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    prefix: "MR",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Sign Up Successfully!");
  };

  return (
    <>
    <div className="toyotaSignupPage">
      <div className="toyotaSignupCard">
        <h1 className="toyotaSignupTitle">Sign Up</h1>

        <p className="toyotaSignupSubtitle">
          Create an account to save your selections.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="toyotaSignupRow">
            <div className="toyotaSignupField toyotaSignupSmall">
              <label>
                Name Prefix <span>*</span>
              </label>

              <select
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
              >
                <option>MR</option>
                <option>MS</option>
                <option>MRS</option>
                <option>DR</option>
              </select>
            </div>

            <div className="toyotaSignupField">
              <label>
                First Name <span>*</span>
              </label>

              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="toyotaSignupField">
            <label>
              Last Name <span>*</span>
            </label>

            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="toyotaSignupField">
            <label>
              Email <span>*</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="toyotaSignupField">
            <label>
              Mobile Number <span>*</span>
            </label>

            <input
              type="tel"
              name="mobile"
              placeholder="Type here"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <p className="toyotaSignupOtp">
            ** The OTP will be sent to your above registered
            <br />
            email and mobile number.
          </p>

          <label className="toyotaSignupCheckbox">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />

            <span>
              I hereby agree to receive emails, calls and SMS related to
              promotional activities and services, by or on behalf of TKM.
              <a href="/"> Know More</a>
            </span>
          </label>

          <button className="toyotaSignupBtn" type="submit">
            Sign Up
          </button>
        </form>

        <div className="toyotaSignupDivider"></div>

        <h2 className="toyotaMyToyotaTitle">MY Toyota</h2>

        <p className="toyotaMyToyotaText">
          If you have an account, sign in with your Mobile Number.
        </p>

        <button className="toyotaSigninBtn">
          Sign In
        </button>
      </div>
    </div>


    <div>
        <TwebFooter />
    </div>
    </>
  );
}