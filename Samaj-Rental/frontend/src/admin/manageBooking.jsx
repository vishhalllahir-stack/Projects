import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Icon from "../componet/Icon";

function ManageBooking() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ==========================================
  // LOAD ALL ADMIN BOOKINGS
  // ==========================================

  const loadBookings = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/bookings/admin/all"
      );

      const data = response?.data;

      const bookingList = Array.isArray(data)
        ? data
        : Array.isArray(data?.bookings)
          ? data.bookings
          : [];

      setBookings(bookingList);
    } catch (error) {
      console.error(
        "Admin Booking Error:",
        error
      );

      setBookings([]);

      alert(
        error.response?.data?.message ||
          "Bookings load કરવામાં error આવી."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD ON PAGE LOAD
  // ==========================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadBookings();
  }, []);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // FORMAT MONEY
  // ==========================================

  const formatMoney = (value) => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "0";
    }

    return number.toLocaleString("en-IN");
  };

  // ==========================================
  // RENTAL DAYS
  // ==========================================

  const getRentalDays = (booking) => {
    if (
      !booking?.bookingDate ||
      !booking?.returnDate
    ) {
      return 0;
    }

    const start = new Date(
      booking.bookingDate
    );

    const end = new Date(
      booking.returnDate
    );

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return 0;
    }

    const difference =
      end.getTime() - start.getTime();

    if (difference <= 0) {
      return 1;
    }

    return Math.max(
      1,
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24)
      )
    );
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "admin-booking-status confirmed";

      case "completed":
        return "admin-booking-status completed";

      case "cancelled":
        return "admin-booking-status cancelled";

      case "pending":
      default:
        return "admin-booking-status pending";
    }
  };

  // ==========================================
  // UPDATE BOOKING STATUS
  // ==========================================

  const updateStatus = async (
    id,
    status
  ) => {
    if (!id) {
      alert("Booking ID મળ્યું નથી.");
      return;
    }

    const actionText =
      status === "confirmed"
        ? "confirm"
        : status === "cancelled"
          ? "cancel"
          : status === "completed"
            ? "complete"
            : "update";

    const isConfirmed =
      window.confirm(
        `Are you sure you want to ${actionText} this booking?`
      );

    if (!isConfirmed) {
      return;
    }

    try {
      setUpdatingId(id);

      await API.put(
        `/bookings/admin/${id}/status`,
        {
          status,
        }
      );

      alert(
        `Booking ${status} successfully.`
      );

      await loadBookings();
    } catch (error) {
      console.error(
        "Booking Status Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Booking status update કરવામાં error આવી."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // SEARCH + STATUS FILTER
  // ==========================================

  const filteredBookings = useMemo(() => {
    const searchText =
      search.toLowerCase().trim();

    return bookings.filter(
      (booking) => {
        const customerName =
          booking?.customerName
            ?.toLowerCase() || "";

        const mobile =
          String(
            booking?.mobile || ""
          ).toLowerCase();

        const village =
          booking?.village
            ?.toLowerCase() || "";

        const bookingId =
          String(
            booking?._id || ""
          ).toLowerCase();

        const matchesSearch =
          !searchText ||
          customerName.includes(
            searchText
          ) ||
          mobile.includes(
            searchText
          ) ||
          village.includes(
            searchText
          ) ||
          bookingId.includes(
            searchText
          );

        const matchesStatus =
          statusFilter === "all" ||
          booking?.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );
  }, [
    bookings,
    search,
    statusFilter,
  ]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const statistics = useMemo(() => {
    const total = bookings.length;

    const pending =
      bookings.filter(
        (booking) =>
          booking?.status ===
          "pending"
      ).length;

    const confirmed =
      bookings.filter(
        (booking) =>
          booking?.status ===
          "confirmed"
      ).length;

    const completed =
      bookings.filter(
        (booking) =>
          booking?.status ===
          "completed"
      ).length;

    const cancelled =
      bookings.filter(
        (booking) =>
          booking?.status ===
          "cancelled"
      ).length;

    const totalAmount =
      bookings.reduce(
        (sum, booking) => {
          const amount = Number(
            booking?.totalAmount || 0
          );

          return (
            sum +
            (Number.isFinite(amount)
              ? amount
              : 0)
          );
        },
        0
      );

    return {
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      totalAmount,
    };
  }, [bookings]);

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-booking-page">

        <div className="admin-booking-loading">

          <div className="admin-booking-loader">
            ⏳
          </div>

          <h2>
            Loading Bookings...
          </h2>

          <p>
            Please wait while bookings
            are loading.
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="admin-booking-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="admin-booking-header">

        <div>

          <span className="admin-booking-badge">
            ADMIN PANEL
          </span>

          <h1>
            Manage Bookings
          </h1>

          <p>
            સમાજની બધી rental bookings
            અહીંથી manage કરો.
          </p>

        </div>

        <div className="admin-booking-header-actions">

          <button
            type="button"
            className="admin-booking-secondary-btn"
            onClick={() =>
              navigate("/admin")
            }
          >
            ← Dashboard
          </button>

          <button
            type="button"
            className="admin-booking-primary-btn"
            onClick={loadBookings}
            disabled={loading}
          >
            ↻ Refresh
          </button>

        </div>

      </header>

      {/* ======================================
          MAIN
      ====================================== */}

      <main className="admin-booking-container">

        {/* ====================================
            STATISTICS
        ==================================== */}

        <section className="admin-booking-stats">

          <div className="admin-booking-stat-card total">

            <span className="admin-booking-stat-icon">
              <Icon
                name="clipboard"
                size={22}
              />
            </span>

            <div>

              <span>
                Total Bookings
              </span>

              <strong>
                {statistics.total}
              </strong>

            </div>

          </div>

          <div className="admin-booking-stat-card pending">

            <span className="admin-booking-stat-icon">
              ⏳
            </span>

            <div>

              <span>
                Pending
              </span>

              <strong>
                {statistics.pending}
              </strong>

            </div>

          </div>

          <div className="admin-booking-stat-card confirmed">

            <span className="admin-booking-stat-icon">
              <Icon
                name="check"
                size={18}
              />
            </span>

            <div>

              <span>
                Confirmed
              </span>

              <strong>
                {statistics.confirmed}
              </strong>

            </div>

          </div>

          <div className="admin-booking-stat-card completed">

            <span className="admin-booking-stat-icon">
              <Icon
                name="trophy"
                size={18}
              />
            </span>

            <div>

              <span>
                Completed
              </span>

              <strong>
                {statistics.completed}
              </strong>

            </div>

          </div>

          <div className="admin-booking-stat-card cancelled">

            <span className="admin-booking-stat-icon">
              <Icon
                name="close"
                size={18}
              />
            </span>

            <div>

              <span>
                Cancelled
              </span>

              <strong>
                {statistics.cancelled}
              </strong>

            </div>

          </div>

          <div className="admin-booking-stat-card amount">

            <span className="admin-booking-stat-icon">
              <Icon
                name="wallet"
                size={18}
              />
            </span>

            <div>

              <span>
                Total Amount
              </span>

              <strong>
                ₹
                {formatMoney(
                  statistics.totalAmount
                )}
              </strong>

            </div>

          </div>

        </section>

        {/* ====================================
            FILTERS
        ==================================== */}

        <section className="admin-booking-filter-card">

          <div className="admin-booking-search">

            <span>
              <Icon
                name="search"
                size={18}
              />
            </span>

            <input
              type="text"
              placeholder="Customer, mobile, village અથવા booking ID search કરો..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          <div className="admin-booking-status-filter">

            <label>
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >

              <option value="all">
                All Bookings
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="confirmed">
                Confirmed
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="cancelled">
                Cancelled
              </option>

            </select>

          </div>

        </section>

        {/* ====================================
            RESULT COUNT
        ==================================== */}

        <div className="admin-booking-result-info">

          <strong>
            {filteredBookings.length}
          </strong>

          <span>
            booking
            {filteredBookings.length !==
            1
              ? "s"
              : ""}{" "}
            found
          </span>

        </div>

        {/* ====================================
            EMPTY STATE
        ==================================== */}

        {filteredBookings.length ===
        0 ? (

          <div className="admin-booking-empty">

            <div className="admin-booking-empty-icon">
              📭
            </div>

            <h2>
              No Bookings Found
            </h2>

            <p>
              Search અથવા filter પ્રમાણે
              કોઈ booking મળતી નથી.
            </p>

            {(search ||
              statusFilter !==
                "all") && (
              <button
                type="button"
                className="admin-booking-primary-btn"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          /* ==================================
             BOOKING LIST
          ================================== */

          <section className="admin-booking-list">

            {filteredBookings.map(
              (booking) => {

                const rentalDays =
                  getRentalDays(
                    booking
                  );

                const bookingItems =
                  Array.isArray(
                    booking?.items
                  )
                    ? booking.items
                    : [];

                const bookingAmount =
                  Number(
                    booking?.totalAmount ||
                      0
                  );

                const isUpdating =
                  updatingId ===
                  booking?._id;

                return (
                  <article
                    key={booking?._id}
                    className="admin-booking-card"
                  >

                    {/* ====================
                        BOOKING TOP
                    ==================== */}

                    <div className="admin-booking-card-top">

                      <div>

                        <span className="admin-booking-id-label">
                          BOOKING ID
                        </span>

                        <h2>
                          #
                          {booking?._id
                            ? String(
                                booking._id
                              )
                                .slice(-8)
                                .toUpperCase()
                            : "--------"}
                        </h2>

                        <p>
                          Created:{" "}
                          {formatDate(
                            booking?.createdAt
                          )}
                        </p>

                      </div>

                      <span
                        className={getStatusClass(
                          booking?.status
                        )}
                      >
                        {String(
                          booking?.status ||
                            "pending"
                        ).toUpperCase()}
                      </span>

                    </div>

                    {/* ====================
                        CUSTOMER
                    ==================== */}

                    <div className="admin-booking-section">

                      <h3>

                        <Icon
                          name="user"
                          size={16}
                        />

                        Customer Details

                      </h3>

                      <div className="admin-booking-info-grid">

                        <div className="admin-booking-info-box">

                          <span>
                            Customer Name
                          </span>

                          <strong>
                            {booking?.customerName ||
                              "-"}
                          </strong>

                        </div>

                        <div className="admin-booking-info-box">

                          <span>
                            Mobile
                          </span>

                          <strong>
                            {booking?.mobile ||
                              "-"}
                          </strong>

                        </div>

                        <div className="admin-booking-info-box">

                          <span>
                            Village
                          </span>

                          <strong>
                            {booking?.village ||
                              "-"}
                          </strong>

                        </div>

                        <div className="admin-booking-info-box">

                          <span>
                            Rental Days
                          </span>

                          <strong>
                            {rentalDays} Day
                            {rentalDays !==
                            1
                              ? "s"
                              : ""}
                          </strong>

                        </div>

                      </div>

                    </div>

                    {/* ====================
                        RENTAL DATES
                    ==================== */}

                    <div className="admin-booking-dates">

                      <div>

                        <span>

                          <Icon
                            name="calendar"
                            size={15}
                          />

                          Booking Date

                        </span>

                        <strong>
                          {formatDate(
                            booking?.bookingDate
                          )}
                        </strong>

                      </div>

                      <div className="admin-booking-date-arrow">
                        →
                      </div>

                      <div>

                        <span>
                          🔄 Return Date
                        </span>

                        <strong>
                          {formatDate(
                            booking?.returnDate
                          )}
                        </strong>

                      </div>

                    </div>

                    {/* ====================
                        ITEMS
                    ==================== */}

                    <div className="admin-booking-section">

                      <h3>

                        <Icon
                          name="cart"
                          size={16}
                        />

                        Rental Items

                      </h3>

                      {bookingItems.length >
                      0 ? (

                        <div className="admin-booking-table-wrapper">

                          <table className="admin-booking-table">

                            <thead>

                              <tr>

                                <th>
                                  Item
                                </th>

                                <th>
                                  Category
                                </th>

                                <th>
                                  Quantity
                                </th>

                                <th>
                                  Price / Day
                                </th>

                                <th>
                                  Amount
                                </th>

                              </tr>

                            </thead>

                            <tbody>

                              {bookingItems.map(
                                (
                                  item,
                                  index
                                ) => {

                                  const quantity =
                                    Number(
                                      item?.quantity ||
                                        0
                                    );

                                  const price =
                                    Number(
                                      item?.pricePerDay ||
                                        0
                                    );

                                  const calculatedAmount =
                                    price *
                                    quantity *
                                    Math.max(
                                      rentalDays,
                                      1
                                    );

                                  const amount =
                                    Number(
                                      item?.amount ??
                                        calculatedAmount
                                    );

                                  return (
                                    <tr
                                      key={
                                        item?._id ||
                                        item?.itemId?._id ||
                                        item?.itemId ||
                                        index
                                      }
                                    >

                                      <td>

                                        <strong>
                                          {item?.name ||
                                            item?.itemName ||
                                            item?.itemId?.name ||
                                            "Rental Item"}
                                        </strong>

                                      </td>

                                      <td>
                                        {item?.category ||
                                          item?.itemId?.category ||
                                          "-"}
                                      </td>

                                      <td>
                                        {quantity}
                                      </td>

                                      <td>
                                        ₹
                                        {formatMoney(
                                          price
                                        )}
                                      </td>

                                      <td>

                                        <strong>
                                          ₹
                                          {formatMoney(
                                            amount
                                          )}
                                        </strong>

                                      </td>

                                    </tr>
                                  );
                                }
                              )}

                            </tbody>

                          </table>

                        </div>

                      ) : (

                        <p className="admin-booking-no-items">
                          No item information
                          available.
                        </p>

                      )}

                    </div>

                    {/* ====================
                        NOTES
                    ==================== */}

                    {booking?.notes && (

                      <div className="admin-booking-notes">

                        <strong>
                          📝 Notes
                        </strong>

                        <p>
                          {booking.notes}
                        </p>

                      </div>

                    )}

                    {/* ====================
                        BOTTOM
                    ==================== */}

                    <div className="admin-booking-card-bottom">

                      <div className="admin-booking-total">

                        <span>
                          Total Amount
                        </span>

                        <strong>
                          ₹
                          {formatMoney(
                            Number.isFinite(
                              bookingAmount
                            )
                              ? bookingAmount
                              : 0
                          )}
                        </strong>

                      </div>

                      {/* STATUS ACTIONS */}

                      <div className="admin-booking-actions">

                        {booking?.status ===
                          "pending" && (
                          <>

                            <button
                              type="button"
                              className="admin-booking-action confirm"
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "confirmed"
                                )
                              }
                              disabled={
                                isUpdating
                              }
                            >
                              {isUpdating
                                ? "..."
                                : "✓ Confirm"}
                            </button>

                            <button
                              type="button"
                              className="admin-booking-action cancel"
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "cancelled"
                                )
                              }
                              disabled={
                                isUpdating
                              }
                            >
                              ✕ Cancel
                            </button>

                          </>
                        )}

                        {booking?.status ===
                          "confirmed" && (
                          <>

                            <button
                              type="button"
                              className="admin-booking-action complete"
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "completed"
                                )
                              }
                              disabled={
                                isUpdating
                              }
                            >
                              {isUpdating
                                ? "..."
                                : "✓ Complete"}
                            </button>

                            <button
                              type="button"
                              className="admin-booking-action cancel"
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "cancelled"
                                )
                              }
                              disabled={
                                isUpdating
                              }
                            >
                              ✕ Cancel
                            </button>

                          </>
                        )}

                        {booking?.status ===
                          "completed" && (

                          <span className="admin-booking-final-status">
                            ✓ Booking Completed
                          </span>

                        )}

                        {booking?.status ===
                          "cancelled" && (

                          <span className="admin-booking-final-status cancelled">
                            ✕ Booking Cancelled
                          </span>

                        )}

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </section>

        )}

      </main>

    </div>
  );
}

export default ManageBooking;