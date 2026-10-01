import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";
import { getErrorMessage } from "../services/errorHandelr";
import Icon from "../componet/Icon";


function Register() {

  const navigate = useNavigate();


  /* ==========================================
     FORM STATE
  ========================================== */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    village: "",
  });


  const [loading, setLoading] =
    useState(false);


  /* ==========================================
     HANDLE INPUT
  ========================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    /* Mobile માં માત્ર numbers */

    if (name === "mobile") {

      const onlyNumbers =
        value
          .replace(/\D/g, "")
          .slice(0, 10);


      setFormData((prev) => ({
        ...prev,
        mobile: onlyNumbers,
      }));

      return;
    }


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  /* ==========================================
     SUBMIT
  ========================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (loading) {
      return;
    }


    /* ========================================
       CLEAN DATA
    ======================================== */

    const name =
      formData.name.trim();

    const email =
      formData.email
        .trim()
        .toLowerCase();

    const mobile =
      formData.mobile.trim();

    const password =
      formData.password;

    const village =
      formData.village.trim();


    /* ========================================
       FRONTEND VALIDATION
    ======================================== */

    if (name.length < 2) {

      alert(
        "Full name must contain at least 2 characters."
      );

      return;
    }


    if (!email) {

      alert(
        "Please enter your email."
      );

      return;
    }


    if (!/^\d{10}$/.test(mobile)) {

      alert(
        "Mobile number must be exactly 10 digits."
      );

      return;
    }


    if (password.length < 6) {

      alert(
        "Password must contain at least 6 characters."
      );

      return;
    }


    if (village.length < 2) {

      alert(
        "Please enter your village name."
      );

      return;
    }


    try {

      setLoading(true);


      /* ======================================
         API REQUEST
      ====================================== */

      const response =
        await API.post(
          "/auth/register",
          {
            name,
            email,
            mobile,
            password,
            village,
          }
        );


      /* ======================================
         SUCCESS
      ====================================== */

      alert(
        response?.data?.message ||
        "Registration successful. Please login."
      );


      navigate("/login", {
        replace: true,
      });


    } catch (error) {

      alert(
        getErrorMessage(
          error,
          "Registration failed. Please try again."
        )
      );


    } finally {

      setLoading(false);

    }

  };


  return (
    <main className="auth-page register-page">


      {/* ======================================
          BACKGROUND
      ====================================== */}

      <div
        className="auth-background-shape auth-shape-one"
      ></div>

      <div
        className="auth-background-shape auth-shape-two"
      ></div>


      <section className="auth-container">


        {/* ====================================
            LEFT SIDE
        ==================================== */}

        <div className="auth-info register-info">


          <div className="auth-logo">

            <Icon
              name="home"
              size={34}
            />

          </div>


          <span className="auth-badge">
            JOIN YOUR COMMUNITY
          </span>


          <h1>

            Create

            <br />

            <span>
              Your Account
            </span>

          </h1>


          <p>
            Account બનાવો અને તમારા સમાજની
            available rental વસ્તુઓની booking
            શરૂ કરો.
          </p>


          {/* BENEFITS */}

          <div className="auth-benefits">


            <div className="auth-benefit">

              <span>
                <Icon
                  name="utensils"
                  size={19}
                />
              </span>

              <p>
                Utensils & Kitchen Items
              </p>

            </div>


            <div className="auth-benefit">

              <span>
                <Icon
                  name="archive"
                  size={19}
                />
              </span>

              <p>
                Storage & Kitchen Essentials
              </p>

            </div>


            <div className="auth-benefit">

              <span>
                <Icon
                  name="bill"
                  size={19}
                />
              </span>

              <p>
                Digital Rental Billing
              </p>

            </div>


          </div>

        </div>


        {/* ====================================
            REGISTER CARD
        ==================================== */}

        <div className="auth-card register-card">


          {/* CARD HEADER */}

          <div className="auth-card-header">


            <div className="auth-card-icon register-icon">

              <Icon
                name="user"
                size={26}
              />

            </div>


            <h2>
              Create Account
            </h2>


            <p>
              તમારી details enter કરો
            </p>

          </div>


          {/* ==================================
              REGISTER FORM
          ================================== */}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >


            {/* NAME */}

            <div className="form-group">

              <label htmlFor="register-name">
                Full Name
              </label>


              <div className="input-wrapper">

                <span>

                  <Icon
                    name="user"
                    size={17}
                  />

                </span>


                <input
                  id="register-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="register-email">
                Email Address
              </label>


              <div className="input-wrapper">

                <span>

                  <Icon
                    name="mail"
                    size={17}
                  />

                </span>


                <input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  maxLength={150}
                  required
                />

              </div>

            </div>


            {/* MOBILE */}

            <div className="form-group">

              <label htmlFor="register-mobile">
                Mobile Number
              </label>


              <div className="input-wrapper">

                <span>

                  <Icon
                    name="phone"
                    size={17}
                  />

                </span>


                <input
                  id="register-mobile"
                  name="mobile"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter 10 digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  autoComplete="tel"
                  maxLength={10}
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label htmlFor="register-password">
                Password
              </label>


              <div className="input-wrapper">

                <span>

                  <Icon
                    name="lock"
                    size={17}
                  />

                </span>


                <input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={6}
                  maxLength={100}
                  required
                />

              </div>

            </div>


            {/* VILLAGE */}

            <div className="form-group">

              <label htmlFor="register-village">
                Village
              </label>


              <div className="input-wrapper">

                <span>

                  <Icon
                    name="location"
                    size={17}
                  />

                </span>


                <input
                  id="register-village"
                  name="village"
                  type="text"
                  placeholder="Enter your village"
                  value={formData.village}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  minLength={2}
                  maxLength={100}
                  required
                />

              </div>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-submit-button register-submit"
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}


              {!loading && (
                <span>
                  →
                </span>
              )}

            </button>


          </form>


          {/* DIVIDER */}

          <div className="auth-divider">

            <span>
              OR
            </span>

          </div>


          {/* LOGIN */}

          <p className="auth-bottom-text">

            Already have an account?

            {" "}

            <Link to="/login">
              Login
            </Link>

          </p>


          {/* HOME */}

          <Link
            to="/"
            className="auth-home-link"
          >
            ← Back to Home
          </Link>


        </div>

      </section>

    </main>
  );
}


export default Register;