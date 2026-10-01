import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../componet/Icon";

function Cart() {
  const navigate = useNavigate();

  // ==========================================
  // LOAD CART SAFELY
  // ==========================================

  const [cart, setCart] = useState(() => {
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
  // SAVE CART
  // ==========================================

  const saveCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

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
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
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
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = (
    itemId
  ) => {
    const updatedCart = cart.map(
      (item) => {
        if (
          String(item.itemId) !==
          String(itemId)
        ) {
          return item;
        }

        const currentQuantity =
          Number(item.quantity) || 1;

        const availableQuantity =
          Number(
            item.availableQuantity
          ) || 0;

        if (
          availableQuantity <= 0 ||
          currentQuantity >=
            availableQuantity
        ) {
          return item;
        }

        return {
          ...item,
          quantity:
            currentQuantity + 1,
        };
      }
    );

    saveCart(updatedCart);
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = (
    itemId
  ) => {
    const updatedCart = cart
      .map((item) => {
        if (
          String(item.itemId) !==
          String(itemId)
        ) {
          return item;
        }

        const currentQuantity =
          Number(item.quantity) || 1;

        return {
          ...item,
          quantity: Math.max(
            currentQuantity - 1,
            1
          ),
        };
      });

    saveCart(updatedCart);
  };

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const removeItem = (
    itemId
  ) => {
    const updatedCart =
      cart.filter(
        (item) =>
          String(item.itemId) !==
          String(itemId)
      );

    saveCart(updatedCart);
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = () => {
    if (cart.length === 0) {
      return;
    }

    const confirmClear =
      window.confirm(
        "શું તમે આખું Cart ખાલી કરવા માંગો છો?"
      );

    if (!confirmClear) {
      return;
    }

    saveCart([]);
  };

  // ==========================================
  // TOTAL CALCULATION
  // ==========================================

  const cartSummary =
    useMemo(() => {
      let totalAmount = 0;
      let totalItems = 0;

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
          Number(item.quantity) || 0;

        const itemTotal =
          pricePerDay *
          quantity *
          rentalDays;

        totalAmount += itemTotal;
        totalItems += quantity;
      });

      return {
        totalAmount,
        totalItems,
      };
    }, [cart]);

  // ==========================================
  // CHECK BOOKING DATES
  // ==========================================

  const checkBookingDates = () => {
    if (cart.length === 0) {
      return false;
    }

    const firstBookingDate =
      cart[0].bookingDate;

    const firstReturnDate =
      cart[0].returnDate;

    if (
      !firstBookingDate ||
      !firstReturnDate
    ) {
      alert(
        "કૃપા કરીને બધા items માટે Booking Date અને Return Date પસંદ કરો."
      );

      return false;
    }

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
        "બધા items માટે Booking Date અને Return Date same હોવી જોઈએ."
      );

      return false;
    }

    if (
      firstReturnDate <=
      firstBookingDate
    ) {
      alert(
        "Return Date, Booking Date કરતાં આગળની હોવી જોઈએ."
      );

      return false;
    }

    return true;
  };

  // ==========================================
  // PROCEED TO BOOKING
  // ==========================================

  const handleProceedToBooking =
    () => {
      if (cart.length === 0) {
        alert("Cart empty છે.");
        return;
      }

      if (!checkBookingDates()) {
        return;
      }

      navigate("/booking");
    };

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
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {
    return (
      <div className="page cart-page">

        {/* HEADER */}

        <section className="cart-header">

          <div>

            <span className="cart-small-title">
              SAMAJ RENTAL
            </span>

            <h1>
              <Icon
                name="cart"
                size={24}
              />{" "}
              Your Cart
            </h1>

            <p>
              તમે પસંદ કરેલી rental
              વસ્તુઓ અહીં છે.
            </p>

          </div>


          <button
            type="button"
            className="cart-back-button"
            onClick={() =>
              navigate("/items")
            }
          >
            ← Continue Shopping
          </button>

        </section>


        {/* EMPTY CART */}

        <section className="cart-empty">

          <div className="cart-empty-icon">

            <Icon
              name="cart"
              size={34}
            />

          </div>


          <h2>
            Your Cart is Empty
          </h2>


          <p>
            હજુ સુધી કોઈ rental item
            પસંદ કરવામાં આવી નથી.
          </p>


          <button
            type="button"
            onClick={() =>
              navigate("/items")
            }
          >
            Browse Rental Items
          </button>

        </section>

      </div>
    );
  }

  // ==========================================
  // MAIN CART
  // ==========================================

  return (
    <div className="page cart-page">

      {/* HEADER */}

      <section className="cart-header">

        <div>

          <span className="cart-small-title">
            SAMAJ RENTAL
          </span>

          <h1>

            <Icon
              name="cart"
              size={24}
            />{" "}

            Your Cart

          </h1>


          <p>
            તમે પસંદ કરેલી rental
            વસ્તુઓ અહીં છે.
          </p>

        </div>


        <button
          type="button"
          className="cart-back-button"
          onClick={() =>
            navigate("/items")
          }
        >
          ← Continue Shopping
        </button>

      </section>


      {/* CART CONTENT */}

      <section className="cart-layout">


        {/* ====================================
            ITEMS
        ==================================== */}

        <div className="cart-items-section">


          <div className="cart-items-top">

            <h2>

              Selected Items{" "}

              <span>
                {cart.length}
              </span>

            </h2>


            <button
              type="button"
              className="cart-clear-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          </div>


          <div className="cart-items-list">

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
                Math.max(
                  Number(
                    item.quantity
                  ) || 1,
                  1
                );


              const availableQuantity =
                Number(
                  item.availableQuantity
                ) || 0;


              const itemTotal =
                pricePerDay *
                quantity *
                rentalDays;


              const maxStockReached =
                availableQuantity > 0 &&
                quantity >=
                  availableQuantity;


              return (

                <article
                  key={item.itemId}
                  className="cart-item-card"
                >


                  {/* IMAGE */}

                  <div className="cart-item-image-box">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={
                          item.name ||
                          "Rental item"
                        }
                        className="cart-item-image"

                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />

                    ) : (

                      <div className="cart-item-no-image">

                        <Icon
                          name="package"
                          size={28}
                        />

                      </div>

                    )}

                  </div>


                  {/* DETAILS */}

                  <div className="cart-item-details">


                    <span className="cart-item-category">

                      {item.category ||
                        "Rental Item"}

                    </span>


                    <h3>

                      {item.name ||
                        "Unnamed Item"}

                    </h3>


                    <p>

                      {item.description ||
                        "સમાજની ઉપયોગી વસ્તુ"}

                    </p>


                    {/* PRICE */}

                    <div className="cart-item-price">

                      ₹
                      {formatPrice(
                        pricePerDay
                      )}

                      <small>
                        {" "}
                        / Day / Item
                      </small>

                    </div>


                    {/* DATES */}

                    <div className="cart-item-dates">


                      <div>

                        <span>

                          <Icon
                            name="calendar"
                            size={15}
                          />{" "}
                          Booking

                        </span>


                        <strong>
                          {item.bookingDate ||
                            "-"}
                        </strong>

                      </div>


                      <div>

                        <span>

                          <Icon
                            name="calendar"
                            size={15}
                          />{" "}
                          Return

                        </span>


                        <strong>
                          {item.returnDate ||
                            "-"}
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

                          {rentalDays}{" "}

                          {rentalDays === 1
                            ? "Day"
                            : "Days"}

                        </strong>

                      </div>


                    </div>


                    {/* QUANTITY */}

                    <div className="cart-item-bottom">


                      <div className="cart-quantity">


                        <span>
                          Quantity
                        </span>


                        <div className="cart-quantity-control">


                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item.itemId
                              )
                            }
                            disabled={
                              quantity <= 1
                            }
                            aria-label={`Decrease ${item.name}`}
                          >
                            −
                          </button>


                          <strong>
                            {quantity}
                          </strong>


                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item.itemId
                              )
                            }
                            disabled={
                              maxStockReached
                            }
                            aria-label={`Increase ${item.name}`}
                          >
                            +
                          </button>


                        </div>


                        {availableQuantity >
                          0 && (

                          <small>

                            Available:{" "}

                            {
                              availableQuantity
                            }

                          </small>

                        )}

                      </div>


                      {/* TOTAL */}

                      <div className="cart-item-total">

                        <span>
                          Item Total
                        </span>


                        <strong>

                          ₹
                          {formatPrice(
                            itemTotal
                          )}

                        </strong>

                      </div>


                    </div>


                    {/* STOCK MESSAGE */}

                    {maxStockReached && (

                      <small>
                        Maximum available
                        quantity reached.
                      </small>

                    )}


                    {/* REMOVE */}

                    <button
                      type="button"
                      className="cart-remove-button"
                      onClick={() =>
                        removeItem(
                          item.itemId
                        )
                      }
                    >

                      <Icon
                        name="trash"
                        size={15}
                      />{" "}

                      Remove Item

                    </button>


                  </div>

                </article>

              );

            })}

          </div>

        </div>


        {/* ====================================
            SUMMARY
        ==================================== */}

        <aside className="cart-summary">


          <div className="cart-summary-header">

            <span>
              ORDER SUMMARY
            </span>


            <h2>
              Booking Summary
            </h2>

          </div>


          <div className="cart-summary-row">

            <span>
              Different Items
            </span>


            <strong>
              {cart.length}
            </strong>

          </div>


          <div className="cart-summary-row">

            <span>
              Total Quantity
            </span>


            <strong>
              {cartSummary.totalItems}
            </strong>

          </div>


          <div className="cart-summary-divider"></div>


          <div className="cart-total-row">

            <span>
              Estimated Total
            </span>


            <strong>

              ₹
              {formatPrice(
                cartSummary.totalAmount
              )}

            </strong>

          </div>


          <p className="cart-summary-note">

            Final amount booking confirm
            કરતી વખતે server પર ફરીથી
            calculate થશે.

          </p>


          {/* PROCEED */}

          <button
            type="button"
            className="cart-booking-button"
            onClick={
              handleProceedToBooking
            }
          >
            Proceed to Booking →
          </button>


          {/* ADD MORE */}

          <button
            type="button"
            className="cart-shopping-button"
            onClick={() =>
              navigate("/items")
            }
          >
            + Add More Items
          </button>


        </aside>

      </section>

    </div>
  );
}

export default Cart;