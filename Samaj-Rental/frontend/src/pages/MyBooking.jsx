import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Icon from "../componet/Icon";


function MyBooking() {

  const navigate = useNavigate();


  // ==========================================
  // STATES
  // ==========================================

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [downloadingBill, setDownloadingBill] =
    useState(null);


  // ==========================================
  // LOAD BOOKINGS
  // ==========================================

  useEffect(() => {

    let mounted = true;


    const loadBookings = async () => {

      try {

        setLoading(true);


        const response =
          await API.get("/bookings/my");


        const bookingData =
          Array.isArray(response?.data)
            ? response.data
            : Array.isArray(
                response?.data?.bookings
              )
            ? response.data.bookings
            : [];


        if (mounted) {
          setBookings(bookingData);
        }


      } catch (error) {

        console.error(
          "Bookings Error:",
          error
        );


        if (mounted) {

          alert(
            error?.response?.data?.message ||
              "Bookings load કરવામાં error આવી."
          );


          setBookings([]);

        }

      } finally {

        if (mounted) {
          setLoading(false);
        }

      }

    };


    loadBookings();


    return () => {
      mounted = false;
    };

  }, []);


  // ==========================================
  // RENTAL DAYS
  // ==========================================

  const getRentalDays = (
    booking
  ) => {

    if (
      !booking?.bookingDate ||
      !booking?.returnDate
    ) {
      return 1;
    }


    const start =
      new Date(
        `${String(
          booking.bookingDate
        ).slice(0, 10)}T00:00:00`
      );


    const end =
      new Date(
        `${String(
          booking.returnDate
        ).slice(0, 10)}T00:00:00`
      );


    if (
      Number.isNaN(
        start.getTime()
      ) ||
      Number.isNaN(
        end.getTime()
      )
    ) {
      return 1;
    }


    const difference =
      end.getTime() -
      start.getTime();


    const days = Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    );


    return Math.max(
      days,
      1
    );

  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (
    date
  ) => {

    if (!date) {
      return "-";
    }


    const value =
      String(date);


    // Date-only value
    if (
      /^\d{4}-\d{2}-\d{2}$/.test(
        value
      )
    ) {

      const [
        year,
        month,
        day
      ] =
        value.split("-");


      return `${day}/${month}/${year}`;

    }


    const parsedDate =
      new Date(date);


    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
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
  // FORMAT PRICE
  // ==========================================

  const formatPrice = (
    amount
  ) => {

    const value =
      Number(amount);


    return Number.isFinite(value)
      ? value.toLocaleString(
          "en-IN"
        )
      : "0";

  };


  // ==========================================
  // GET SAFE BOOKING ID
  // ==========================================

  const getBookingId = (
    booking
  ) => {

    return (
      booking?._id ||
      booking?.id ||
      null
    );

  };


  // ==========================================
  // GET BILL ID
  // ==========================================

  const getBillId = (
    booking
  ) => {

    if (!booking?.billId) {
      return null;
    }


    // If populated object
    if (
      typeof booking.billId ===
      "object"
    ) {

      return (
        booking.billId._id ||
        booking.billId.id ||
        null
      );

    }


    return String(
      booking.billId
    );

  };


  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (
    status
  ) => {

    switch (
      String(
        status || ""
      ).toLowerCase()
    ) {

      case "confirmed":
        return "booking-status confirmed";


      case "completed":
        return "booking-status completed";


      case "cancelled":
        return "booking-status cancelled";


      default:
        return "booking-status pending";

    }

  };


  // ==========================================
  // STATUS TEXT
  // ==========================================

  const getStatusText = (
    status
  ) => {

    if (!status) {
      return "PENDING";
    }


    return String(
      status
    ).toUpperCase();

  };


  // ==========================================
  // DOWNLOAD BILL
  // ==========================================

  const downloadBill = async (
    billId,
    billNumber
  ) => {

    if (!billId) {

      alert(
        "Bill હજુ available નથી."
      );

      return;

    }


    if (downloadingBill) {
      return;
    }


    try {

      setDownloadingBill(
        billId
      );


      const response =
        await API.get(
          `/bills/${billId}/pdf`,
          {
            responseType:
              "blob",
          }
        );


      if (
        !response?.data
      ) {

        throw new Error(
          "Empty PDF response"
        );

      }


      const blob =
        new Blob(
          [response.data],
          {
            type:
              "application/pdf",
          }
        );


      const url =
        window.URL.createObjectURL(
          blob
        );


      const link =
        document.createElement(
          "a"
        );


      link.href = url;


      link.download =
        `${
          billNumber ||
          "samaj-rental-bill"
        }.pdf`;


      document.body.appendChild(
        link
      );


      link.click();


      link.remove();


      window.URL.revokeObjectURL(
        url
      );


    } catch (error) {

      console.error(
        "Bill Download Error:",
        error
      );


      alert(
        error?.response?.data?.message ||
          "Bill download કરવામાં error આવી."
      );


    } finally {

      setDownloadingBill(
        null
      );

    }

  };


  // ==========================================
  // TOTAL ITEMS
  // ==========================================

  const totalItemsRented =
    bookings.reduce(
      (
        total,
        booking
      ) => {

        const items =
          Array.isArray(
            booking?.items
          )
            ? booking.items
            : [];


        return (
          total +
          items.reduce(
            (
              sum,
              item
            ) => {

              const quantity =
                Number(
                  item?.quantity
                );


              return (
                sum +
                (
                  Number.isFinite(
                    quantity
                  )
                    ? quantity
                    : 0
                )
              );

            },
            0
          )
        );

      },
      0
    );


  // ==========================================
  // TOTAL AMOUNT
  // ==========================================

  const totalAmount =
    bookings.reduce(
      (
        total,
        booking
      ) => {

        const amount =
          Number(
            booking?.totalAmount
          );


        return (
          total +
          (
            Number.isFinite(
              amount
            )
              ? amount
              : 0
          )
        );

      },
      0
    );


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="my-booking-loading">

        <div className="my-booking-loader"></div>


        <h3>
          Loading bookings...
        </h3>


        <p>
          તમારી bookings લાવવામાં આવી રહી છે...
        </p>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="my-booking-page">


      {/* =====================================
          HERO
      ===================================== */}

      <section className="my-booking-hero">


        <div className="my-booking-hero-content">


          <span className="my-booking-badge">

            <Icon
              name="clipboard"
              size={23}
            />{" "}

            Rental History

          </span>


          <h1>
            My Bookings
          </h1>


          <p>
            તમારી બધી rental bookings અહીં જુઓ
          </p>


        </div>


        <div className="my-booking-hero-actions">


          <button
            type="button"
            className="my-booking-btn secondary"
            onClick={() =>
              navigate("/items")
            }
          >

            <Icon
              name="cart"
              size={17}
            />{" "}

            Browse Items

          </button>


          <button
            type="button"
            className="my-booking-btn secondary"
            onClick={() =>
              navigate("/dashboard")
            }
          >

            <Icon
              name="home"
              size={17}
            />{" "}

            Dashboard

          </button>


        </div>


      </section>


      {/* =====================================
          CONTENT
      ===================================== */}

      <main className="my-booking-container">


        {/* ===================================
            SUMMARY
        =================================== */}

        <div className="my-booking-summary">


          {/* TOTAL BOOKINGS */}

          <div className="summary-box">

            <span>

              <Icon
                name="clipboard"
                size={18}
              />

            </span>


            <div>

              <small>
                Total Bookings
              </small>


              <strong>
                {bookings.length}
              </strong>

            </div>

          </div>


          {/* TOTAL ITEMS */}

          <div className="summary-box">

            <span>

              <Icon
                name="package"
                size={18}
              />

            </span>


            <div>

              <small>
                Total Items Rented
              </small>


              <strong>
                {totalItemsRented}
              </strong>

            </div>

          </div>


          {/* TOTAL AMOUNT */}

          <div className="summary-box">

            <span>

              <Icon
                name="wallet"
                size={18}
              />

            </span>


            <div>

              <small>
                Total Amount
              </small>


              <strong>

                ₹
                {formatPrice(
                  totalAmount
                )}

              </strong>

            </div>

          </div>


        </div>


        {/* ===================================
            EMPTY
        =================================== */}

        {bookings.length === 0 ? (

          <div className="my-booking-empty">


            <div className="empty-icon">

              <Icon
                name="clipboard"
                size={20}
              />

            </div>


            <h2>
              No bookings yet
            </h2>


            <p>
              તમે હજુ સુધી કોઈ item book કર્યો નથી.
            </p>


            <button
              type="button"
              className="my-booking-btn primary"
              onClick={() =>
                navigate("/items")
              }
            >
              Browse Rental Items
            </button>


          </div>

        ) : (


          /* =================================
             BOOKING LIST
          ================================= */

          <div className="my-booking-list">


            {bookings.map(
              (booking, index) => {


                const rentalDays =
                  getRentalDays(
                    booking
                  );


                const items =
                  Array.isArray(
                    booking?.items
                  )
                    ? booking.items
                    : [];


                const bookingId =
                  getBookingId(
                    booking
                  );


                const displayBookingId =
                  bookingId
                    ? String(
                        bookingId
                      )
                        .slice(-6)
                        .toUpperCase()
                    : String(
                        index + 1
                      );


                const billId =
                  getBillId(
                    booking
                  );


                return (

                  <article
                    className="my-booking-card"
                    key={
                      bookingId ||
                      `booking-${index}`
                    }
                  >


                    {/* =========================
                        CARD HEADER
                    ========================= */}

                    <div className="booking-card-header">


                      <div>

                        <span className="booking-number">
                          BOOKING
                        </span>


                        <h2>
                          #
                          {
                            displayBookingId
                          }
                        </h2>


                        <p>
                          Booked on{" "}

                          {
                            formatDate(
                              booking?.createdAt
                            )
                          }

                        </p>

                      </div>


                      <span
                        className={getStatusClass(
                          booking?.status
                        )}
                      >

                        {
                          getStatusText(
                            booking?.status
                          )
                        }

                      </span>


                    </div>


                    {/* =========================
                        CUSTOMER INFORMATION
                    ========================= */}

                    <div className="booking-info-grid">


                      {/* CUSTOMER */}

                      <div className="booking-info-card">


                        <span>

                          <Icon
                            name="user"
                            size={15}
                          />

                        </span>


                        <div>

                          <small>
                            Customer
                          </small>


                          <strong>
                            {
                              booking?.customerName ||
                              "-"
                            }
                          </strong>

                        </div>


                      </div>


                      {/* MOBILE */}

                      <div className="booking-info-card">


                        <span>

                          <Icon
                            name="phone"
                            size={15}
                          />

                        </span>


                        <div>

                          <small>
                            Mobile
                          </small>


                          <strong>
                            {
                              booking?.mobile ||
                              "-"
                            }
                          </strong>

                        </div>


                      </div>


                      {/* VILLAGE */}

                      <div className="booking-info-card">


                        <span>

                          <Icon
                            name="location"
                            size={15}
                          />

                        </span>


                        <div>

                          <small>
                            Village
                          </small>


                          <strong>
                            {
                              booking?.village ||
                              "-"
                            }
                          </strong>

                        </div>


                      </div>


                      {/* DURATION */}

                      <div className="booking-info-card">


                        <span>

                          <Icon
                            name="clock"
                            size={15}
                          />

                        </span>


                        <div>

                          <small>
                            Rental Duration
                          </small>


                          <strong>

                            {rentalDays}{" "}

                            Day
                            {
                              rentalDays >
                              1
                                ? "s"
                                : ""
                            }

                          </strong>

                        </div>


                      </div>


                    </div>


                    {/* =========================
                        DATE
                    ========================= */}

                    <div className="booking-date-card">


                      <div>

                        <span>

                          <Icon
                            name="calendar"
                            size={15}
                          />{" "}

                          Booking Date

                        </span>


                        <strong>

                          {
                            formatDate(
                              booking?.bookingDate
                            )
                          }

                        </strong>

                      </div>


                      <div className="booking-date-arrow">
                        →
                      </div>


                      <div>

                        <span>

                          <Icon
                            name="calendar"
                            size={15}
                          />{" "}

                          Return Date

                        </span>


                        <strong>

                          {
                            formatDate(
                              booking?.returnDate
                            )
                          }

                        </strong>

                      </div>


                    </div>


                    {/* =========================
                        NOTES
                    ========================= */}

                    {booking?.notes && (

                      <div className="booking-notes-display">

                        <strong>
                          Notes:
                        </strong>


                        <span>
                          {booking.notes}
                        </span>

                      </div>

                    )}


                    {/* =========================
                        ITEMS
                    ========================= */}

                    <div className="booking-items">


                      <div className="booking-section-heading">


                        <h3>

                          <Icon
                            name="package"
                            size={17}
                          />{" "}

                          Rented Items

                        </h3>


                        <span>

                          {items.length}{" "}

                          item
                          {
                            items.length >
                            1
                              ? "s"
                              : ""
                          }

                        </span>


                      </div>


                      {items.length === 0 ? (

                        <p>
                          No items found.
                        </p>

                      ) : (

                        <div className="booking-table-wrapper">


                          <table className="booking-table">


                            <thead>

                              <tr>

                                <th>
                                  Item
                                </th>

                                <th>
                                  Price / Day
                                </th>

                                <th>
                                  Quantity
                                </th>

                                <th>
                                  Amount
                                </th>

                              </tr>

                            </thead>


                            <tbody>


                              {items.map(
                                (
                                  item,
                                  itemIndex
                                ) => {


                                  const pricePerDay =
                                    Number(
                                      item?.pricePerDay
                                    ) || 0;


                                  const quantity =
                                    Number(
                                      item?.quantity
                                    ) || 0;


                                  const storedAmount =
                                    Number(
                                      item?.amount
                                    );


                                  const itemAmount =
                                    Number.isFinite(
                                      storedAmount
                                    )
                                      ? storedAmount
                                      : pricePerDay *
                                        quantity *
                                        rentalDays;


                                  return (

                                    <tr
                                      key={
                                        item?.itemId ||
                                        `${bookingId}-item-${itemIndex}`
                                      }
                                    >


                                      <td>

                                        <strong>
                                          {
                                            item?.name ||
                                            "Rental Item"
                                          }
                                        </strong>

                                      </td>


                                      <td>

                                        ₹
                                        {
                                          formatPrice(
                                            pricePerDay
                                          )
                                        }

                                      </td>


                                      <td>

                                        <span className="quantity-badge">

                                          {
                                            quantity
                                          }

                                        </span>

                                      </td>


                                      <td>

                                        <strong>

                                          ₹
                                          {
                                            formatPrice(
                                              itemAmount
                                            )
                                          }

                                        </strong>

                                      </td>


                                    </tr>

                                  );

                                }
                              )}


                            </tbody>


                          </table>


                        </div>

                      )}


                    </div>


                    {/* =========================
                        FOOTER
                    ========================= */}

                    <div className="booking-card-footer">


                      <div className="booking-total">


                        <span>
                          Total Amount
                        </span>


                        <strong>

                          ₹
                          {
                            formatPrice(
                              booking?.totalAmount
                            )
                          }

                        </strong>


                      </div>


                      <div className="booking-bill-area">


                        {billId ? (

                          <button
                            type="button"
                            className="download-bill-btn"
                            onClick={() =>
                              downloadBill(
                                billId,
                                `BILL-${String(
                                  billId
                                ).slice(
                                  -8
                                )}`
                              )
                            }
                            disabled={
                              downloadingBill ===
                              billId
                            }
                          >

                            {
                              downloadingBill ===
                              billId ? (
                                <>
                                  ⏳ Downloading...
                                </>
                              ) : (
                                <>
                                  📄 Download Bill
                                </>
                              )
                            }

                          </button>

                        ) : (

                          <div className="bill-pending">

                            {
                              String(
                                booking?.status ||
                                ""
                              ).toLowerCase() ===
                              "cancelled"
                                ? "Booking cancelled."
                                : "⏳ Bill will be available after confirmation."
                            }

                          </div>

                        )}


                      </div>


                    </div>


                  </article>

                );

              }
            )}


          </div>

        )}


      </main>


    </div>

  );

}


export default MyBooking;