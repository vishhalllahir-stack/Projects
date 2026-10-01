import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";
import Icon from "../componet/Icon";


function Bill() {

  const { id } = useParams();

  const navigate = useNavigate();


  // ==========================================
  // STATES
  // ==========================================

  const [bill, setBill] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [downloading, setDownloading] =
    useState(false);


  // ==========================================
  // LOAD BILL
  // ==========================================

  useEffect(() => {

    let mounted = true;


    const loadBill = async () => {

      try {

        setLoading(true);


        if (!id) {

          if (mounted) {
            setBill(null);
          }

          return;

        }


        const response =
          await API.get(
            `/bills/${id}`
          );


        const data =
          response?.data;


        const billData =
          data?.bill ||
          data;


        if (mounted) {

          setBill(
            billData || null
          );

        }


      } catch (error) {

        console.error(
          "Bill Error:",
          error
        );


        if (mounted) {

          setBill(null);


          alert(
            error?.response?.data?.message ||
              "Bill load કરવામાં error આવી."
          );

        }

      } finally {

        if (mounted) {
          setLoading(false);
        }

      }

    };


    loadBill();


    return () => {
      mounted = false;
    };

  }, [id]);


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


    // MongoDB Date / date-only
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
  // FORMAT MONEY
  // ==========================================

  const formatMoney = (
    amount
  ) => {

    const number =
      Number(amount);


    if (
      !Number.isFinite(number)
    ) {
      return "0";
    }


    return number.toLocaleString(
      "en-IN"
    );

  };


  // ==========================================
  // BOOKING ID
  // ==========================================

  const getBookingId = () => {

    if (!bill) {
      return "-";
    }


    if (
      bill.bookingId?._id
    ) {

      return String(
        bill.bookingId._id
      )
        .slice(-6)
        .toUpperCase();

    }


    if (bill.bookingId) {

      return String(
        bill.bookingId
      )
        .slice(-6)
        .toUpperCase();

    }


    return "-";

  };


  // ==========================================
  // BILL NUMBER
  // ==========================================

  const getBillNumber = () => {

    if (
      bill?.billNumber
    ) {

      return bill.billNumber;

    }


    if (bill?._id) {

      return `BILL-${String(
        bill._id
      )
        .slice(-6)
        .toUpperCase()}`;

    }


    return "SAM-RENTAL-BILL";

  };


  // ==========================================
  // CUSTOMER DATA
  // ==========================================

  const getCustomerName = () => {

    return (
      bill?.customerName ||
      bill?.bookingId?.customerName ||
      "-"
    );

  };


  const getMobile = () => {

    return (
      bill?.mobile ||
      bill?.bookingId?.mobile ||
      "-"
    );

  };


  const getVillage = () => {

    return (
      bill?.village ||
      bill?.bookingId?.village ||
      "-"
    );

  };


  // ==========================================
  // RENTAL DATES
  // ==========================================

  const getBookingDate = () => {

    return (
      bill?.bookingDate ||
      bill?.bookingId?.bookingDate ||
      null
    );

  };


  const getReturnDate = () => {

    return (
      bill?.returnDate ||
      bill?.bookingId?.returnDate ||
      null
    );

  };


  // ==========================================
  // BILL STATUS
  // ==========================================

  const getBillStatus = () => {

    return String(
      bill?.status ||
      bill?.bookingId?.status ||
      "CONFIRMED"
    ).toUpperCase();

  };


  // ==========================================
  // BILL ITEMS
  // ==========================================

  const billItems =
    Array.isArray(
      bill?.items
    )
      ? bill.items
      : [];


  // ==========================================
  // DOWNLOAD PDF
  // ==========================================

  const downloadPDF =
    async () => {

      if (!id) {

        alert(
          "Bill ID મળ્યું નથી."
        );

        return;

      }


      if (downloading) {
        return;
      }


      try {

        setDownloading(true);


        const response =
          await API.get(
            `/bills/${id}/pdf`,
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
          `${getBillNumber()}.pdf`;


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
          "PDF Download Error:",
          error
        );


        alert(
          error?.response?.data?.message ||
            "PDF download કરવામાં error આવી."
        );


      } finally {

        setDownloading(false);

      }

    };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="bill-loading">

        <div className="bill-loader"></div>


        <h3>
          Loading Bill...
        </h3>


        <p>
          તમારું bill તૈયાર કરવામાં આવી રહ્યું છે...
        </p>

      </div>

    );

  }


  // ==========================================
  // BILL NOT FOUND
  // ==========================================

  if (!bill) {

    return (

      <div className="bill-not-found">


        <div className="bill-not-found-icon">

          <Icon
            name="bill"
            size={28}
          />

        </div>


        <h2>
          Bill Not Found
        </h2>


        <p>
          આ booking માટે bill મળ્યું નથી.
        </p>


        <button
          type="button"
          className="bill-action-btn primary"
          onClick={() =>
            navigate(
              "/my-bookings"
            )
          }
        >
          ← My Bookings
        </button>


      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="bill-page">


      {/* =====================================
          TOP BAR
      ===================================== */}

      <div className="bill-topbar">


        <button
          type="button"
          className="bill-back-btn"
          onClick={() =>
            navigate(
              "/my-bookings"
            )
          }
          disabled={downloading}
        >
          ← My Bookings
        </button>


        <button
          type="button"
          className="bill-download-btn"
          onClick={
            downloadPDF
          }
          disabled={downloading}
        >

          {
            downloading
              ? "⏳ Downloading..."
              : "📄 Download PDF"
          }

        </button>


      </div>


      {/* =====================================
          BILL
      ===================================== */}

      <main className="bill-container">


        <div className="bill-paper">


          {/* =================================
              BILL HEADER
          ================================= */}

          <header className="bill-header">


            <div className="bill-brand">


              <div className="bill-logo">

                <Icon
                  name="home"
                  size={17}
                />

              </div>


              <div>

                <h1>
                  Samaj Rental System
                </h1>


                <p>
                  Community Rental Management
                </p>

              </div>


            </div>


            <div className="bill-title">


              <span>
                INVOICE
              </span>


              <h2>
                {getBillNumber()}
              </h2>


            </div>


          </header>


          {/* =================================
              BILL INFORMATION
          ================================= */}

          <section className="bill-meta">


            <div className="bill-meta-box">

              <span>
                Bill Date
              </span>


              <strong>

                {
                  formatDate(
                    bill.generatedAt ||
                    bill.createdAt ||
                    bill.billDate
                  )
                }

              </strong>

            </div>


            <div className="bill-meta-box">

              <span>
                Booking ID
              </span>


              <strong>
                {getBookingId()}
              </strong>

            </div>


            <div className="bill-meta-box">

              <span>
                Status
              </span>


              <strong className="bill-confirmed">

                {getBillStatus()}

              </strong>

            </div>


          </section>


          {/* =================================
              CUSTOMER DETAILS
          ================================= */}

          <section className="bill-customer-section">


            <div className="bill-section-heading">

              <span>
                01
              </span>


              <h3>
                Customer Details
              </h3>

            </div>


            <div className="bill-customer-grid">


              <div>

                <small>
                  Customer Name
                </small>


                <strong>
                  {getCustomerName()}
                </strong>

              </div>


              <div>

                <small>
                  Mobile
                </small>


                <strong>
                  {getMobile()}
                </strong>

              </div>


              <div>

                <small>
                  Village
                </small>


                <strong>
                  {getVillage()}
                </strong>

              </div>


            </div>


          </section>


          {/* =================================
              RENTAL PERIOD
          ================================= */}

          <section className="bill-rental-section">


            <div className="bill-section-heading">

              <span>
                02
              </span>


              <h3>
                Rental Period
              </h3>

            </div>


            <div className="bill-rental-grid">


              <div className="bill-rental-date">


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
                      getBookingDate()
                    )
                  }

                </strong>


              </div>


              <div className="bill-rental-arrow">
                →
              </div>


              <div className="bill-rental-date">


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
                      getReturnDate()
                    )
                  }

                </strong>


              </div>


            </div>


          </section>


          {/* =================================
              RENTAL ITEMS
          ================================= */}

          <section className="bill-items-section">


            <div className="bill-section-heading">

              <span>
                03
              </span>


              <h3>
                Rental Items
              </h3>

            </div>


            <div className="bill-table-wrapper">


              <table className="bill-table">


                <thead>

                  <tr>

                    <th>
                      #
                    </th>

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


                  {billItems.length > 0 ? (

                    billItems.map(
                      (
                        item,
                        index
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


                        const amount =
                          Number.isFinite(
                            storedAmount
                          )
                            ? storedAmount
                            : pricePerDay *
                              quantity;


                        return (

                          <tr
                            key={
                              item?._id ||
                              item?.itemId ||
                              index
                            }
                          >


                            <td>
                              {index + 1}
                            </td>


                            <td>

                              <strong>

                                {
                                  item?.name ||
                                  "Item"
                                }

                              </strong>


                              {item?.category && (

                                <small>
                                  {
                                    item.category
                                  }
                                </small>

                              )}

                            </td>


                            <td>

                              ₹
                              {
                                formatMoney(
                                  pricePerDay
                                )
                              }

                            </td>


                            <td>
                              {quantity}
                            </td>


                            <td>

                              <strong>

                                ₹
                                {
                                  formatMoney(
                                    amount
                                  )
                                }

                              </strong>

                            </td>


                          </tr>

                        );

                      }

                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="5"
                        className="bill-empty-items"
                      >
                        No rental items found.
                      </td>

                    </tr>

                  )}


                </tbody>


              </table>


            </div>


          </section>


          {/* =================================
              TOTAL
          ================================= */}

          <section className="bill-total-section">


            <div className="bill-total-content">


              <span>
                Total Rental Amount
              </span>


              <strong>

                ₹
                {
                  formatMoney(
                    bill.totalAmount
                  )
                }

              </strong>


            </div>


          </section>


          {/* =================================
              NOTES
          ================================= */}

          {(bill?.notes ||
            bill?.bookingId?.notes) && (

            <section className="bill-notes">


              <strong>
                📝 Notes
              </strong>


              <p>
                {
                  bill.notes ||
                  bill.bookingId?.notes
                }
              </p>


            </section>

          )}


          {/* =================================
              FOOTER
          ================================= */}

          <footer className="bill-footer">


            <div>

              <strong>
                Thank you for using
                Samaj Rental System
              </strong>


              <p>
                Community items • Easy booking
                • Digital billing
              </p>

            </div>


            <div className="bill-footer-right">


              <span>
                Generated digitally
              </span>


              <strong>
                ✓ Verified Bill
              </strong>

            </div>


          </footer>


        </div>


      </main>


    </div>

  );

}


export default Bill;