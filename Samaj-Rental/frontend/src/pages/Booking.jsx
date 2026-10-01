import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { getErrorMessage } from "../services/errorHandelr";
import Icon from "../componet/Icon";


function Booking() {

  const navigate = useNavigate();


  // ==========================================
  // LOAD USER SAFELY
  // ==========================================

  const user = (() => {

    try {

      const savedUser =
        localStorage.getItem("user");


      if (!savedUser) {
        return null;
      }


      return JSON.parse(savedUser);

    } catch (error) {

      console.error(
        "User data error:",
        error
      );

      return null;

    }

  })();


  // ==========================================
  // LOAD CART SAFELY
  // ==========================================

  const [cart] = useState(() => {

    try {

      const savedCart =
        localStorage.getItem("cart");


      if (!savedCart) {
        return [];
      }


      const parsedCart =
        JSON.parse(savedCart);


      return Array.isArray(parsedCart)
        ? parsedCart
        : [];

    } catch (error) {

      console.error(
        "Cart loading error:",
        error
      );

      return [];

    }

  });


  // ==========================================
  // FORM STATE
  // ==========================================

  const [customerName, setCustomerName] =
    useState(user?.name || "");


  const [mobile, setMobile] =
    useState(user?.mobile || "");


  const [village, setVillage] =
    useState(user?.village || "");


  const [notes, setNotes] =
    useState("");


  const [submitting, setSubmitting] =
    useState(false);


  // ==========================================
  // RENTAL DAYS
  // ==========================================

  const getRentalDays = (
    bookingDate,
    returnDate
  ) => {

    if (
      !bookingDate ||
      !returnDate
    ) {
      return 1;
    }


    const start = new Date(
      `${bookingDate}T00:00:00`
    );


    const end = new Date(
      `${returnDate}T00:00:00`
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


    return days > 0
      ? days
      : 1;

  };


  // ==========================================
  // TODAY
  // ==========================================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  // ==========================================
  // FORMAT PRICE
  // ==========================================

  const formatPrice = (
    amount
  ) => {

    return Number(
      amount || 0
    ).toLocaleString("en-IN");

  };


  // ==========================================
  // BOOKING SUMMARY
  // ==========================================

  const bookingSummary =
    useMemo(() => {

      let totalAmount = 0;
      let totalQuantity = 0;


      cart.forEach((item) => {

        const rentalDays =
          getRentalDays(
            item.bookingDate,
            item.returnDate
          );


        const pricePerDay =
          Number(
            item.pricePerDay
          ) || 0;


        const quantity =
          Number(
            item.quantity
          ) || 0;


        const amount =
          pricePerDay *
          quantity *
          rentalDays;


        totalAmount += amount;

        totalQuantity += quantity;

      });


      return {
        totalAmount,
        totalQuantity,
      };

    }, [cart]);


  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {

    return (

      <div className="booking-empty">


        <div className="booking-empty-icon">

          <Icon
            name="cart"
            size={26}
          />

        </div>


        <h2>
          Cart is Empty
        </h2>


        <p>
          Booking કરવા માટે પહેલા કોઈ
          rental item પસંદ કરો.
        </p>


        <button
          type="button"
          onClick={() =>
            navigate("/items")
          }
        >
          Browse Items
        </button>


      </div>

    );

  }


  // ==========================================
  // CONFIRM BOOKING
  // ==========================================

  const handleConfirmBooking =
    async (event) => {

      event.preventDefault();


      if (submitting) {
        return;
      }


      // ========================================
      // CUSTOMER NAME
      // ========================================

      const cleanName =
        customerName.trim();


      if (!cleanName) {

        alert(
          "કૃપા કરીને તમારું નામ આપો."
        );

        return;

      }


      if (cleanName.length < 2) {

        alert(
          "નામ ઓછામાં ઓછું 2 charactersનું હોવું જોઈએ."
        );

        return;

      }


      // ========================================
      // MOBILE
      // ========================================

      const cleanMobile =
        mobile
          .replace(/\D/g, "")
          .slice(0, 10);


      if (
        !/^\d{10}$/.test(
          cleanMobile
        )
      ) {

        alert(
          "કૃપા કરીને valid 10 digit mobile number આપો."
        );

        return;

      }


      // ========================================
      // VILLAGE
      // ========================================

      const cleanVillage =
        village.trim();


      if (!cleanVillage) {

        alert(
          "કૃપા કરીને village આપો."
        );

        return;

      }


      if (cleanVillage.length < 2) {

        alert(
          "Village name ઓછામાં ઓછું 2 charactersનું હોવું જોઈએ."
        );

        return;

      }


      // ========================================
      // NOTES
      // ========================================

      const cleanNotes =
        notes.trim();


      if (cleanNotes.length > 500) {

        alert(
          "Notes maximum 500 characters હોવા જોઈએ."
        );

        return;

      }


      // ========================================
      // CART CHECK
      // ========================================

      if (cart.length === 0) {

        alert(
          "Cart empty છે."
        );

        navigate("/items");

        return;

      }


      // ========================================
      // CHECK ITEM IDs
      // ========================================

      const invalidItem =
        cart.some(
          (item) =>
            !item?.itemId
        );


      if (invalidItem) {

        alert(
          "Cart માં invalid item છે. કૃપા કરીને ફરીથી item add કરો."
        );

        navigate("/cart");

        return;

      }


      // ========================================
      // DATE
      // ========================================

      const firstBookingDate =
        cart[0].bookingDate;


      const firstReturnDate =
        cart[0].returnDate;


      if (
        !firstBookingDate ||
        !firstReturnDate
      ) {

        alert(
          "Booking Date અને Return Date જરૂરી છે."
        );

        navigate("/cart");

        return;

      }


      // ========================================
      // BOOKING DATE PAST CHECK
      // ========================================

      if (
        firstBookingDate < today
      ) {

        alert(
          "Booking Date આજની તારીખથી પહેલાની હોઈ શકતી નથી."
        );

        navigate("/cart");

        return;

      }


      // ========================================
      // SAME DATE CHECK
      // ========================================

      const sameDates =
        cart.every(
          (item) =>
            item.bookingDate ===
              firstBookingDate &&
            item.returnDate ===
              firstReturnDate
        );


      if (!sameDates) {

        alert(
          "બધા rental items માટે Booking Date અને Return Date same હોવી જોઈએ."
        );

        navigate("/cart");

        return;

      }


      // ========================================
      // DATE ORDER
      // ========================================

      const bookingDateObject =
        new Date(
          `${firstBookingDate}T00:00:00`
        );


      const returnDateObject =
        new Date(
          `${firstReturnDate}T00:00:00`
        );


      if (
        Number.isNaN(
          bookingDateObject.getTime()
        ) ||
        Number.isNaN(
          returnDateObject.getTime()
        )
      ) {

        alert(
          "Invalid booking date."
        );

        navigate("/cart");

        return;

      }


      if (
        returnDateObject <=
        bookingDateObject
      ) {

        alert(
          "Return Date, Booking Date કરતાં આગળની હોવી જોઈએ."
        );

        navigate("/cart");

        return;

      }


      // ========================================
      // QUANTITY CHECK
      // ========================================

      const invalidQuantity =
        cart.some((item) => {

          const quantity =
            Number(
              item.quantity
            );


          const available =
            Number(
              item.availableQuantity
            );


          return (
            !Number.isInteger(
              quantity
            ) ||
            quantity < 1 ||
            (
              available > 0 &&
              quantity > available
            )
          );

        });


      if (invalidQuantity) {

        alert(
          "કોઈ એક item ની quantity valid નથી."
        );

        navigate("/cart");

        return;

      }


      // ========================================
      // DUPLICATE ITEM CHECK
      // ========================================

      const itemIds =
        cart.map(
          (item) =>
            String(item.itemId)
        );


      const hasDuplicateItems =
        new Set(itemIds).size !==
        itemIds.length;


      if (hasDuplicateItems) {

        alert(
          "Cart માં duplicate item છે. કૃપા કરીને Cart check કરો."
        );

        navigate("/cart");

        return;

      }


      // ========================================
      // SUBMIT
      // ========================================

      try {

        setSubmitting(true);


        const bookingData = {

          customerName:
            cleanName,

          mobile:
            cleanMobile,

          village:
            cleanVillage,

          items:
            cart.map((item) => ({
              itemId:
                item.itemId,

              quantity:
                Number(
                  item.quantity
                ),
            })),

          bookingDate:
            firstBookingDate,

          returnDate:
            firstReturnDate,

          notes:
            cleanNotes,

        };


        const response =
          await API.post(
            "/bookings",
            bookingData
          );


        // ======================================
        // CLEAR CART
        // ======================================

        localStorage.removeItem(
          "cart"
        );


        // ======================================
        // SUCCESS
        // ======================================

        alert(
          response?.data?.message ||
          "Booking successfully created."
        );


        navigate(
          "/my-bookings",
          {
            replace: true,
          }
        );


      } catch (error) {

        console.error(
          "Booking Error:",
          error
        );


        alert(
          getErrorMessage(
            error,
            "Booking create failed"
          )
        );


      } finally {

        setSubmitting(false);

      }

    };


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="page booking-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <section className="booking-header">


        <div>

          <span>
            SAMAJ RENTAL SYSTEM
          </span>


          <h1>

            <Icon
              name="calendar"
              size={19}
            />{" "}

            Confirm Your Booking

          </h1>


          <p>
            તમારી booking details check
            કરીને booking confirm કરો.
          </p>

        </div>


        <button
          type="button"
          className="booking-back-button"
          onClick={() =>
            navigate("/cart")
          }
          disabled={submitting}
        >
          ← Back to Cart
        </button>


      </section>


      {/* =====================================
          MAIN FORM
      ===================================== */}

      <form
        className="booking-layout"
        onSubmit={
          handleConfirmBooking
        }
      >


        {/* ===================================
            LEFT SIDE
        =================================== */}

        <div className="booking-main">


          {/* =================================
              CUSTOMER INFORMATION
          ================================= */}

          <section className="booking-card">


            <div className="booking-card-heading">


              <div className="booking-card-number">
                01
              </div>


              <div>

                <span>
                  CUSTOMER INFORMATION
                </span>


                <h2>
                  Customer Details
                </h2>

              </div>


            </div>


            <div className="booking-form-grid">


              {/* NAME */}

              <div className="booking-field">

                <label htmlFor="customerName">
                  Full Name *
                </label>


                <input
                  id="customerName"
                  type="text"
                  value={
                    customerName
                  }
                  onChange={(e) =>
                    setCustomerName(
                      e.target.value
                    )
                  }
                  placeholder="તમારું નામ"
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  disabled={
                    submitting
                  }
                  required
                />

              </div>


              {/* MOBILE */}

              <div className="booking-field">

                <label htmlFor="mobile">
                  Mobile Number *
                </label>


                <input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => {

                    const value =
                      e.target.value
                        .replace(
                          /\D/g,
                          ""
                        )
                        .slice(
                          0,
                          10
                        );


                    setMobile(value);

                  }}
                  placeholder="10 digit mobile number"
                  maxLength={10}
                  inputMode="numeric"
                  autoComplete="tel"
                  disabled={
                    submitting
                  }
                  required
                />

              </div>


              {/* VILLAGE */}

              <div className="booking-field">

                <label htmlFor="village">
                  Village *
                </label>


                <input
                  id="village"
                  type="text"
                  value={village}
                  onChange={(e) =>
                    setVillage(
                      e.target.value
                    )
                  }
                  placeholder="તમારું ગામ"
                  minLength={2}
                  maxLength={100}
                  disabled={
                    submitting
                  }
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="booking-field">

                <label htmlFor="email">
                  Email
                </label>


                <input
                  id="email"
                  type="email"
                  value={
                    user?.email ||
                    ""
                  }
                  disabled
                  readOnly
                />

              </div>


            </div>

          </section>


          {/* =================================
              BOOKING DATES
          ================================= */}

          <section className="booking-card">


            <div className="booking-card-heading">


              <div className="booking-card-number">
                02
              </div>


              <div>

                <span>
                  RENTAL PERIOD
                </span>


                <h2>
                  Booking Dates
                </h2>

              </div>


            </div>


            <div className="booking-date-summary">


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
                    cart[0]
                      .bookingDate ||
                    "-"
                  }
                </strong>

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
                    cart[0]
                      .returnDate ||
                    "-"
                  }
                </strong>

              </div>


              <div>

                <span>

                  <Icon
                    name="clock"
                    size={15}
                  />{" "}

                  Duration

                </span>


                <strong>

                  {
                    getRentalDays(
                      cart[0]
                        .bookingDate,
                      cart[0]
                        .returnDate
                    )
                  }{" "}

                  {
                    getRentalDays(
                      cart[0]
                        .bookingDate,
                      cart[0]
                        .returnDate
                    ) === 1
                      ? "Day"
                      : "Days"
                  }

                </strong>

              </div>


            </div>


            <p className="booking-date-note">

              હાલમાં Cart માં રહેલી તમામ
              વસ્તુઓ માટે આ rental period
              ઉપયોગ થશે.

            </p>


          </section>


          {/* =================================
              RENTAL ITEMS
          ================================= */}

          <section className="booking-card">


            <div className="booking-card-heading">


              <div className="booking-card-number">
                03
              </div>


              <div>

                <span>
                  RENTAL ITEMS
                </span>


                <h2>
                  Your Items
                </h2>

              </div>


            </div>


            <div className="booking-items-list">


              {cart.map((item) => {


                const rentalDays =
                  getRentalDays(
                    item.bookingDate,
                    item.returnDate
                  );


                const pricePerDay =
                  Number(
                    item.pricePerDay
                  ) || 0;


                const quantity =
                  Number(
                    item.quantity
                  ) || 0;


                const itemTotal =
                  pricePerDay *
                  quantity *
                  rentalDays;


                return (

                  <div
                    className="booking-item"
                    key={item.itemId}
                  >


                    {/* IMAGE */}

                    <div className="booking-item-image">


                      {item.image ? (

                        <img
                          src={item.image}
                          alt={
                            item.name ||
                            "Rental item"
                          }
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <span>

                          <Icon
                            name="package"
                            size={28}
                          />

                        </span>

                      )}


                    </div>


                    {/* INFO */}

                    <div className="booking-item-info">


                      <span>

                        {
                          item.category ||
                          "Rental Item"
                        }

                      </span>


                      <h3>

                        {
                          item.name ||
                          "Unnamed Item"
                        }

                      </h3>


                      <p>

                        ₹
                        {
                          formatPrice(
                            pricePerDay
                          )
                        }

                        {" × "}

                        {quantity}

                        {" × "}

                        {rentalDays}{" "}

                        {
                          rentalDays === 1
                            ? "Day"
                            : "Days"
                        }

                      </p>


                    </div>


                    {/* TOTAL */}

                    <strong className="booking-item-total">

                      ₹
                      {
                        formatPrice(
                          itemTotal
                        )
                      }

                    </strong>


                  </div>

                );

              })}


            </div>


          </section>


          {/* =================================
              NOTES
          ================================= */}

          <section className="booking-card">


            <div className="booking-card-heading">


              <div className="booking-card-number">
                04
              </div>


              <div>

                <span>
                  OPTIONAL
                </span>


                <h2>
                  Additional Notes
                </h2>

              </div>


            </div>


            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value.slice(
                    0,
                    500
                  )
                )
              }
              placeholder="કોઈ ખાસ માહિતી હોય તો અહીં લખો..."
              rows={4}
              className="booking-notes"
              disabled={
                submitting
              }
              maxLength={500}
            />


            <small>
              {notes.length}/500
            </small>


          </section>


        </div>


        {/* ===================================
            RIGHT SUMMARY
        =================================== */}

        <aside className="booking-summary">


          <div className="booking-summary-top">


            <span>
              BOOKING SUMMARY
            </span>


            <h2>
              Order Total
            </h2>


          </div>


          {/* DIFFERENT ITEMS */}

          <div className="booking-summary-row">


            <span>
              Different Items
            </span>


            <strong>
              {cart.length}
            </strong>


          </div>


          {/* TOTAL QUANTITY */}

          <div className="booking-summary-row">


            <span>
              Total Quantity
            </span>


            <strong>
              {
                bookingSummary.totalQuantity
              }
            </strong>


          </div>


          <div className="booking-summary-divider"></div>


          {/* FINAL TOTAL */}

          <div className="booking-final-total">


            <span>
              Estimated Total
            </span>


            <strong>

              ₹
              {
                formatPrice(
                  bookingSummary.totalAmount
                )
              }

            </strong>


          </div>


          {/* INFORMATION */}

          <div className="booking-confirm-info">


            <span>
              ✓ Availability will be checked
            </span>


            <span>
              ✓ Final amount calculated by
              server
            </span>


            <span>
              ✓ Booking saved in MongoDB
            </span>


          </div>


          {/* CONFIRM */}

          <button
            type="submit"
            className="booking-confirm-button"
            disabled={
              submitting
            }
          >

            {
              submitting
                ? "Booking Creating..."
                : "✓ Confirm Booking"
            }

          </button>


          {/* BACK */}

          <button
            type="button"
            className="booking-cancel-button"
            onClick={() =>
              navigate("/cart")
            }
            disabled={
              submitting
            }
          >
            ← Return to Cart
          </button>


        </aside>


      </form>


    </div>

  );

}


export default Booking;