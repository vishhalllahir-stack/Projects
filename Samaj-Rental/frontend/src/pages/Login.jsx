import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";
import { getErrorMessage } from "../services/errorHandelr";
import Icon from "../componet/Icon";


function Login() {

  const navigate = useNavigate();


  /* ==========================================
     FORM STATE
  ========================================== */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  /* ==========================================
     LOGIN
  ========================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (loading) {
      return;
    }


    const cleanEmail =
      email.trim().toLowerCase();

    const cleanPassword =
      password;


    if (!cleanEmail || !cleanPassword) {
      alert(
        "Please enter email and password."
      );

      return;
    }


    try {

      setLoading(true);


      const response =
        await API.post(
          "/auth/login",
          {
            email: cleanEmail,
            password: cleanPassword,
          }
        );


      /* ======================================
         CHECK RESPONSE
      ====================================== */

      const token =
        response?.data?.token;

      const loggedInUser =
        response?.data?.user;


      if (!token || !loggedInUser) {

        throw new Error(
          "Invalid login response from server."
        );

      }


      /* ======================================
         SAVE LOGIN DATA
      ====================================== */

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          loggedInUser
        )
      );


      /* ======================================
         REDIRECT BY ROLE
      ====================================== */

      if (
        loggedInUser.role ===
        "admin"
      ) {

        navigate("/admin", {
          replace: true,
        });

      } else {

        navigate("/dashboard", {
          replace: true,
        });

      }

    } catch (error) {

      alert(
        getErrorMessage(
          error,
          "Login failed. Please check your email and password."
        )
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <main className="auth-page">


      {/* ======================================
          BACKGROUND SHAPES
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

        <div className="auth-info login-info">


          <div className="auth-logo">

            <Icon
              name="home"
              size={34}
            />

          </div>


          <span className="auth-badge">
            SAMAJ RENTAL SYSTEM
          </span>


          <h1>

            Welcome

            <br />

            <span>
              Back!
            </span>

          </h1>


          <p>
            તમારા સમાજની rental વસ્તુઓ
            સરળતાથી શોધો, book કરો અને
            manage કરો.
          </p>


          {/* BENEFITS */}

          <div className="auth-benefits">


            <div className="auth-benefit">

              <span>
                ✓
              </span>

              <p>
                Easy & Fast Booking
              </p>

            </div>


            <div className="auth-benefit">

              <span>
                ✓
              </span>

              <p>
                Check Item Availability
              </p>

            </div>


            <div className="auth-benefit">

              <span>
                ✓
              </span>

              <p>
                Get Digital Bills
              </p>

            </div>

          </div>

        </div>


        {/* ====================================
            LOGIN CARD
        ==================================== */}

        <div className="auth-card">


          {/* CARD HEADER */}

          <div className="auth-card-header">

            <div className="auth-card-icon">

              <Icon
                name="key"
                size={26}
              />

            </div>


            <h2>
              Login
            </h2>


            <p>
              તમારા account માં login કરો
            </p>

          </div>


          {/* ==================================
              LOGIN FORM
          ================================== */}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >


            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="login-email">
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
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  autoComplete="email"
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label htmlFor="login-password">
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
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  autoComplete="current-password"
                  required
                />

              </div>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >

              {loading
                ? "Logging in..."
                : "Login"}

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


          {/* REGISTER */}

          <p className="auth-bottom-text">

            Account નથી?

            {" "}

            <Link to="/register">
              Create Account
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


export default Login;