import { useNavigate } from "react-router-dom";
import Icon from "../componet/Icon";


function Dashboard() {

  const navigate = useNavigate();


  /* ==========================================
     GET USER
  ========================================== */

  let user = null;

  try {

    const userData =
      localStorage.getItem("user");

    user = userData
      ? JSON.parse(userData)
      : null;

  } catch (error) {

    user = null;

  }


  /* ==========================================
     LOGOUT
  ========================================== */

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });

  };


  /* ==========================================
     USER DATA
  ========================================== */

  const userName =
    user?.name || "User";

  const avatarLetter =
    userName
      .charAt(0)
      .toUpperCase();


  return (
    <div className="page dashboard-page">


      {/* ======================================
          HERO SECTION
      ====================================== */}

      <section className="dashboard-hero">


        {/* WELCOME */}

        <div className="dashboard-welcome">

          <span className="dashboard-badge">

            <Icon
              name="home"
              size={18}
            />

            Samaj Rental System

          </span>


          <h1>

            Welcome,{" "}

            <span>
              {userName}
            </span>

            {" "}👋

          </h1>


          <p>
            Manage your community rentals
            easily from your dashboard.
          </p>

        </div>


        {/* ====================================
            USER INFORMATION CARD
        ==================================== */}

        <div className="dashboard-user-card">


          {/* AVATAR */}

          <div className="dashboard-avatar">

            {avatarLetter}

          </div>


          {/* USER DETAILS */}

          <div className="dashboard-user-details">

            <h2>
              {userName}
            </h2>


            {/* EMAIL */}

            <div className="dashboard-info-row">

              <span>

                <Icon
                  name="mail"
                  size={16}
                />

              </span>

              <p>
                {user?.email ||
                  "No email available"}
              </p>

            </div>


            {/* MOBILE */}

            <div className="dashboard-info-row">

              <span>

                <Icon
                  name="phone"
                  size={16}
                />

              </span>

              <p>
                {user?.mobile ||
                  "No mobile available"}
              </p>

            </div>


            {/* VILLAGE */}

            <div className="dashboard-info-row">

              <span>

                <Icon
                  name="location"
                  size={16}
                />

              </span>

              <p>
                {user?.village ||
                  "Village not available"}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================
          DASHBOARD CONTENT
      ====================================== */}

      <section className="dashboard-content">


        {/* SECTION HEADING */}

        <div className="dashboard-section-heading">

          <div>

            <span>
              QUICK ACTIONS
            </span>

            <h2>
              What would you like to do?
            </h2>

          </div>

        </div>


        {/* ====================================
            ACTION GRID
        ==================================== */}

        <div className="dashboard-action-grid">


          {/* ==================================
              RENTAL ITEMS
          ================================== */}

          <div
            className="dashboard-action-card dashboard-items-card"
            onClick={() =>
              navigate("/items")
            }
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                navigate("/items");
              }

            }}
          >

            <div className="dashboard-action-icon">

              <Icon
                name="cart"
                size={26}
              />

            </div>


            <h3>
              Rental Items
            </h3>


            <p>
              Browse available Samaj items
              and select the items you want
              to rent.
            </p>


            <button
              type="button"
              className="dashboard-action-button"
              onClick={(event) => {

                event.stopPropagation();

                navigate("/items");

              }}
            >
              View Items →
            </button>

          </div>


          {/* ==================================
              CART
          ================================== */}

          <div
            className="dashboard-action-card dashboard-cart-card"
            onClick={() =>
              navigate("/cart")
            }
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                navigate("/cart");
              }

            }}
          >

            <div className="dashboard-action-icon">

              <Icon
                name="bag"
                size={26}
              />

            </div>


            <h3>
              My Cart
            </h3>


            <p>
              Check your selected rental
              items and continue with
              your booking.
            </p>


            <button
              type="button"
              className="dashboard-action-button"
              onClick={(event) => {

                event.stopPropagation();

                navigate("/cart");

              }}
            >
              Open Cart →
            </button>

          </div>


          {/* ==================================
              MY BOOKINGS
          ================================== */}

          <div
            className="dashboard-action-card dashboard-booking-card"
            onClick={() =>
              navigate("/my-bookings")
            }
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                navigate("/my-bookings");
              }

            }}
          >

            <div className="dashboard-action-icon">

              <Icon
                name="calendar"
                size={26}
              />

            </div>


            <h3>
              My Bookings
            </h3>


            <p>
              View your previous and current
              rental bookings and their status.
            </p>


            <button
              type="button"
              className="dashboard-action-button"
              onClick={(event) => {

                event.stopPropagation();

                navigate("/my-bookings");

              }}
            >
              View Bookings →
            </button>

          </div>

        </div>


        {/* ======================================
            LOGOUT
        ====================================== */}

        <div className="dashboard-logout-area">

          <button
            type="button"
            className="dashboard-logout-button"
            onClick={logout}
          >
            🚪 Logout
          </button>

        </div>

      </section>

    </div>
  );
}


export default Dashboard;