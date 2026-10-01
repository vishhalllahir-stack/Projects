import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../componet/NavBar";
import Icon from "../componet/Icon";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(userData);

      if (user.role !== "admin") {
        navigate("/dashboard");
        return;
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    fetchDashboardData();
  }, [navigate]);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/admin/stats");

      setStats(response.data);
    } catch (err) {
      console.error("Admin Dashboard Error:", err);

      setError(
        err.response?.data?.message ||
          "Dashboard data load કરવામાં problem આવી."
      );
    } finally {
      setLoading(false);
    }
  }

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    return `admin-status admin-status-${status || "default"}`;
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="admin-loading-page">
          <div className="admin-loader">⏳</div>

          <h2>Dashboard Loading...</h2>

          <p>Admin dashboard data load થઈ રહ્યો છે.</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <div className="admin-error-page">
          <div className="admin-error-icon"><Icon name="alert" size={28} /></div>

          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button
            className="admin-retry-button"
            onClick={fetchDashboardData}
          >
            🔄 Try Again
          </button>
        </div>
      </>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="page admin-page">
      <Navbar />

      <main className="admin-container">

        {/* HEADER */}
        <section className="admin-page-header">
          <div>
            <span className="admin-badge">
              ADMIN PANEL
            </span>

            <h1 className="admin-title">
              Dashboard
            </h1>

            <p className="admin-subtitle">
              Samaj Rental System નું complete
              management overview.
            </p>
          </div>

          <button
            className="admin-refresh-button"
            onClick={fetchDashboardData}
          >
            🔄 Refresh
          </button>
        </section>

        {/* STAT CARDS */}
        <section className="admin-stats-grid">

          <div className="admin-stat-card admin-stat-blue">
            <div className="admin-stat-icon">
              <Icon name="users" size={24} />
            </div>

            <div>
              <p className="admin-stat-label">
                Total Users
              </p>

              <h2 className="admin-stat-value">
                {stats.users?.total || 0}
              </h2>

              <span className="admin-stat-info">
                Registered community members
              </span>
            </div>
          </div>

          <div className="admin-stat-card admin-stat-green">
            <div className="admin-stat-icon">
              <Icon name="package" size={24} />
            </div>

            <div>
              <p className="admin-stat-label">
                Rental Items
              </p>

              <h2 className="admin-stat-value">
                {stats.items?.total || 0}
              </h2>

              <span className="admin-stat-info">
                Items available in system
              </span>
            </div>
          </div>

          <div className="admin-stat-card admin-stat-orange">
            <div className="admin-stat-icon">
              <Icon name="clipboard" size={24} />
            </div>

            <div>
              <p className="admin-stat-label">
                Total Bookings
              </p>

              <h2 className="admin-stat-value">
                {stats.bookings?.total || 0}
              </h2>

              <span className="admin-stat-info">
                All booking records
              </span>
            </div>
          </div>

          <div className="admin-stat-card admin-stat-purple">
            <div className="admin-stat-icon">
              <Icon name="wallet" size={24} />
            </div>

            <div>
              <p className="admin-stat-label">
                Total Income
              </p>

              <h2 className="admin-stat-value">
                ₹{formatMoney(stats.income?.total)}
              </h2>

              <span className="admin-stat-info">
                Confirmed + completed bookings
              </span>
            </div>
          </div>

        </section>

        {/* BOOKING OVERVIEW */}
        <section className="admin-section-card">

          <div className="admin-section-header">
            <div>
              <h2 className="admin-section-title">
                Booking Overview
              </h2>

              <p className="admin-section-description">
                Current booking status summary.
              </p>
            </div>

            <button
              className="admin-outline-button"
              onClick={() => navigate("/admin/bookings")}
            >
              View All Bookings →
            </button>
          </div>

          <div className="admin-status-grid">

            <div className="admin-status-card admin-status-card-pending">
              <span className="admin-status-icon">
                ⏳
              </span>

              <div>
                <span className="admin-status-label">
                  Pending
                </span>

                <strong>
                  {stats.bookings?.pending || 0}
                </strong>
              </div>
            </div>

            <div className="admin-status-card admin-status-card-confirmed">
              <span className="admin-status-icon">
                <Icon name="check" size={18} />
              </span>

              <div>
                <span className="admin-status-label">
                  Confirmed
                </span>

                <strong>
                  {stats.bookings?.confirmed || 0}
                </strong>
              </div>
            </div>

            <div className="admin-status-card admin-status-card-completed">
              <span className="admin-status-icon">
                <Icon name="trophy" size={18} />
              </span>

              <div>
                <span className="admin-status-label">
                  Completed
                </span>

                <strong>
                  {stats.bookings?.completed || 0}
                </strong>
              </div>
            </div>

            <div className="admin-status-card admin-status-card-cancelled">
              <span className="admin-status-icon">
                <Icon name="close" size={18} />
              </span>

              <div>
                <span className="admin-status-label">
                  Cancelled
                </span>

                <strong>
                  {stats.bookings?.cancelled || 0}
                </strong>
              </div>
            </div>

          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="admin-quick-section">

          <div className="admin-section-header">
            <div>
              <h2 className="admin-section-title">
                Quick Actions
              </h2>

              <p className="admin-section-description">
                Frequently used admin management options.
              </p>
            </div>
          </div>

          <div className="admin-quick-grid">

            <button
              className="admin-quick-card"
              onClick={() => navigate("/admin/items")}
            >
              <div className="admin-quick-icon admin-quick-blue">
                <Icon name="package" size={20} />
              </div>

              <div>
                <h3>Manage Items</h3>

                <p>
                  Add, edit અને delete rental items.
                </p>
              </div>

              <span className="admin-arrow">
                →
              </span>
            </button>

            <button
              className="admin-quick-card"
              onClick={() => navigate("/admin/bookings")}
            >
              <div className="admin-quick-icon admin-quick-green">
                <Icon name="clipboard" size={20} />
              </div>

              <div>
                <h3>Manage Bookings</h3>

                <p>
                  Booking approve, cancel અને complete કરો.
                </p>
              </div>

              <span className="admin-arrow">
                →
              </span>
            </button>

            <button
              className="admin-quick-card"
              onClick={() => navigate("/admin/users")}
            >
              <div className="admin-quick-icon admin-quick-purple">
                <Icon name="users" size={20} />
              </div>

              <div>
                <h3>Manage Users</h3>

                <p>
                  Users અને admin roles manage કરો.
                </p>
              </div>

              <span className="admin-arrow">
                →
              </span>
            </button>

          </div>
        </section>

        {/* RECENT DATA */}
        <section className="admin-bottom-grid">

          {/* RECENT BOOKINGS */}
          <div className="admin-panel">

            <div className="admin-panel-header">
              <div>
                <h2 className="admin-panel-title">
                  Recent Bookings
                </h2>

                <p className="admin-panel-description">
                  Latest rental booking activity.
                </p>
              </div>

              <button
                className="admin-small-button"
                onClick={() => navigate("/admin/bookings")}
              >
                View All
              </button>
            </div>

            {stats.recentBookings?.length === 0 ? (
              <div className="admin-empty-box">
                <span><Icon name="clipboard" size={16} /></span>
                <p>No bookings found.</p>
              </div>
            ) : (
              <div className="admin-booking-list">

                {stats.recentBookings?.map((booking) => (
                  <div
                    key={booking._id}
                    className="admin-booking-row"
                  >

                    <div className="admin-booking-avatar">
                      {booking.customerName
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        booking.userId?.name
                          ?.charAt(0)
                          ?.toUpperCase() ||
                        "U"}
                    </div>

                    <div className="admin-booking-info">
                      <strong>
                        {booking.customerName ||
                          booking.userId?.name ||
                          "Unknown User"}
                      </strong>

                      <span>
                        {booking.village ||
                          booking.userId?.village ||
                          "Unknown Village"}
                      </span>

                      <small>
                        {formatDate(booking.bookingDate)}
                      </small>
                    </div>

                    <div className="admin-booking-amount">
                      <strong>
                        ₹{formatMoney(booking.totalAmount)}
                      </strong>

                      <span className={getStatusClass(booking.status)}>
                        {booking.status}
                      </span>
                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* RECENT USERS */}
          <div className="admin-panel">

            <div className="admin-panel-header">
              <div>
                <h2 className="admin-panel-title">
                  Recent Users
                </h2>

                <p className="admin-panel-description">
                  Recently registered community users.
                </p>
              </div>

              <button
                className="admin-small-button"
                onClick={() => navigate("/admin/users")}
              >
                View All
              </button>
            </div>

            {stats.recentUsers?.length === 0 ? (
              <div className="admin-empty-box">
                <span><Icon name="users" size={16} /></span>
                <p>No users found.</p>
              </div>
            ) : (
              <div className="admin-user-list">

                {stats.recentUsers?.map((user) => (
                  <div
                    key={user._id}
                    className="admin-user-row"
                  >

                    <div className="admin-user-avatar">
                      {user.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </div>

                    <div className="admin-user-info">
                      <strong>
                        {user.name}
                      </strong>

                      <span>
                        {user.email}
                      </span>

                      <small>
                        <Icon name="location" size={14} /> {user.village}
                      </small>
                    </div>

                    <div className="admin-user-date">
                      {formatDate(user.createdAt)}
                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </section>

        {/* ADMIN INFO */}
        <section className="admin-info-banner">

          <div className="admin-info-icon">
            <Icon name="shield" size={22} />
          </div>

          <div className="admin-info-content">
            <h3>
              Admin Control Center
            </h3>

            <p>
              અહીંથી તમે community users, rental
              items અને bookings નું complete
              management કરી શકો છો.
            </p>
          </div>

          <button
            className="admin-info-button"
            onClick={() => navigate("/admin/items")}
          >
            Manage System →
          </button>

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;