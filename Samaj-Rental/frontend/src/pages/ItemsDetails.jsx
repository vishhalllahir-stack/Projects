import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import API from "../services/api";
import { getErrorMessage } from "../services/errorHandelr";
import Icon from "../componet/Icon";

function ItemsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ==========================================
     STATE
  ========================================== */

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [bookingDate, setBookingDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [imageError, setImageError] = useState(false);

  /* ==========================================
     TODAY
  ========================================== */

  const today = new Date()
    .toISOString()
    .split("T")[0];

  /* ==========================================
     FETCH ITEM
  ========================================== */

  const fetchItem = async () => {
    try {
      setLoading(true);

      const response = await API.get(`/items/${id}`);

      const itemData =
        response?.data?.item ||
        response?.data;

      if (!itemData) {
        throw new Error("Item data not found.");
      }

      setItem(itemData);

      // New item load થાય ત્યારે image error reset
      setImageError(false);

    } catch (error) {
      console.error(
        "Item Details Error:",
        error
      );

      alert(
        getErrorMessage(
          error,
          "Failed to load item details"
        )
      );

      navigate("/items", {
        replace: true,
      });

    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
     LOAD ITEM
  ========================================== */

  useEffect(() => {
    if (!id) {
      navigate("/items", {
        replace: true,
      });

      return;
    }

    fetchItem();
  }, [id]);

  /* ==========================================
     INCREASE QUANTITY
  ========================================== */

  const increaseQuantity = () => {
    if (!item) {
      return;
    }

    const availableQuantity =
      Number(
        item.availableQuantity || 0
      );

    setQuantity((prev) =>
      prev < availableQuantity
        ? prev + 1
        : prev
    );
  };

  /* ==========================================
     DECREASE QUANTITY
  ========================================== */

  const decreaseQuantity = () => {
    setQuantity((prev) =>
      prev > 1
        ? prev - 1
        : 1
    );
  };

  /* ==========================================
     BOOKING DATE
  ========================================== */

  const handleBookingDateChange = (value) => {
    setBookingDate(value);

    /*
      Booking date બદલાય ત્યારે
      invalid return date clear કરો.
    */

    if (
      returnDate &&
      value &&
      returnDate <= value
    ) {
      setReturnDate("");
    }
  };

  /* ==========================================
     NEXT DAY
  ========================================== */

  const getNextDay = (dateString) => {
    if (!dateString) {
      return today;
    }

    const date = new Date(
      `${dateString}T00:00:00`
    );

    if (Number.isNaN(date.getTime())) {
      return today;
    }

    date.setDate(
      date.getDate() + 1
    );

    return date
      .toISOString()
      .split("T")[0];
  };

  /* ==========================================
     RETURN DATE
  ========================================== */

  const handleReturnDateChange = (value) => {
    if (
      bookingDate &&
      value <= bookingDate
    ) {
      alert(
        "Return Date, Booking Date કરતાં આગળની હોવી જોઈએ."
      );

      setReturnDate("");

      return;
    }

    setReturnDate(value);
  };

  /* ==========================================
     ADD TO CART
  ========================================== */

  const handleAddToCart = () => {
    if (!item) {
      return;
    }

    const availableQuantity =
      Number(
        item.availableQuantity || 0
      );

    /* STOCK */

    if (
      availableQuantity <= 0 ||
      item.isAvailable === false
    ) {
      alert(
        "આ વસ્તુ હાલમાં Available નથી."
      );

      return;
    }

    /* QUANTITY */

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > availableQuantity
    ) {
      alert(
        "કૃપા કરીને Available Quantity મુજબ quantity પસંદ કરો."
      );

      return;
    }

    /* DATES */

    if (
      !bookingDate ||
      !returnDate
    ) {
      alert(
        "કૃપા કરીને Booking Date અને Return Date પસંદ કરો."
      );

      return;
    }

    /* BOOKING DATE */

    if (bookingDate < today) {
      alert(
        "Booking Date આજની તારીખથી પહેલાની હોઈ શકતી નથી."
      );

      return;
    }

    /* RETURN DATE */

    if (returnDate <= bookingDate) {
      alert(
        "Return Date, Booking Date કરતાં આગળની હોવી જોઈએ."
      );

      return;
    }

    /* ========================================
       GET CART
    ======================================== */

    let existingCart = [];

    try {
      const storedCart =
        localStorage.getItem("cart");

      if (storedCart) {
        const parsedCart =
          JSON.parse(storedCart);

        if (
          Array.isArray(parsedCart)
        ) {
          existingCart =
            parsedCart;
        }
      }
    } catch (error) {
      console.error(
        "Cart Parse Error:",
        error
      );

      existingCart = [];
    }

    /* ========================================
       CART ITEM
    ======================================== */

    const cartItem = {
      itemId: item._id,

      name: item.name,

      category:
        item.category || "",

      description:
        item.description || "",

      pricePerDay:
        Number(
          item.pricePerDay || 0
        ),

      image:
        item.image || "",

      quantity:
        Number(quantity),

      bookingDate,

      returnDate,

      availableQuantity,
    };

    /* ========================================
       CHECK EXISTING ITEM
    ======================================== */

    const existingIndex =
      existingCart.findIndex(
        (cartItem) =>
          String(
            cartItem?.itemId
          ) ===
          String(item._id)
      );

    /* UPDATE */

    if (existingIndex !== -1) {
      existingCart[
        existingIndex
      ] = cartItem;
    } else {
      /* ADD */

      existingCart.push(
        cartItem
      );
    }

    /* ========================================
       SAVE CART
    ======================================== */

    localStorage.setItem(
      "cart",
      JSON.stringify(
        existingCart
      )
    );

    alert(
      "Item Cart માં successfully add થઈ ગઈ છે."
    );

    navigate("/cart");
  };

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {
    return (
      <div className="item-details-loading">
        <div className="item-details-loader"></div>

        <h2>
          Item Details Loading...
        </h2>

        <p>
          વસ્તુની માહિતી load થઈ રહી છે...
        </p>
      </div>
    );
  }

  /* ==========================================
     ITEM NOT FOUND
  ========================================== */

  if (!item) {
    return (
      <div className="item-details-not-found">
        <div>😕</div>

        <h2>
          Item મળી નથી
        </h2>

        <p>
          તમે જે વસ્તુ શોધી રહ્યા છો
          તે મળી નથી.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/items")
          }
        >
          ← Back to Items
        </button>
      </div>
    );
  }

  /* ==========================================
     STOCK
  ========================================== */

  const availableQuantity =
    Number(
      item.availableQuantity || 0
    );

  const totalQuantity =
    Number(
      item.totalQuantity || 0
    );

  const pricePerDay =
    Number(
      item.pricePerDay || 0
    );

  const outOfStock =
    availableQuantity <= 0 ||
    item.isAvailable === false;

  /* ==========================================
     IMAGE
  ========================================== */

  const imageUrl =
    typeof item.image === "string"
      ? item.image.trim()
      : "";

  const showImage =
    imageUrl && !imageError;

  /* ==========================================
     RETURN MIN DATE
  ========================================== */

  const minimumReturnDate =
    bookingDate
      ? getNextDay(bookingDate)
      : today;

  /* ==========================================
     UI
  ========================================== */

  return (
    <div className="page item-details-page">

      {/* =====================================
          BACK BUTTON
      ===================================== */}

      <button
        type="button"
        className="item-details-back"
        onClick={() =>
          navigate("/items")
        }
      >
        ← Back to Items
      </button>

      {/* =====================================
          MAIN
      ===================================== */}

      <section className="item-details-container">

        {/* =================================
            IMAGE
        ================================= */}

        <div className="item-details-image-section">

          <div className="item-details-image-box">

            {/* REAL IMAGE */}

            {showImage ? (
              <img
                src={imageUrl}
                alt={
                  item.name ||
                  "Rental item"
                }
                className="item-details-image"
                onError={() => {
                  console.error(
                    "Image failed to load:",
                    imageUrl
                  );

                  setImageError(true);
                }}
              />
            ) : (
              /* FALLBACK */

              <div className="item-details-no-image">

                <Icon
                  name="package"
                  size={60}
                />

                <span>
                  Image unavailable
                </span>

              </div>
            )}

            {/* STOCK BADGE */}

            <span
              className={`item-details-stock ${
                outOfStock
                  ? "item-details-stock-out"
                  : "item-details-stock-in"
              }`}
            >
              {outOfStock
                ? "Out of Stock"
                : "Available"}
            </span>

          </div>

        </div>

        {/* =================================
            INFO
        ================================= */}

        <div className="item-details-info">

          {/* CATEGORY */}

          <span className="item-details-category">
            {item.category}
          </span>

          {/* NAME */}

          <h1 className="item-details-title">
            {item.name}
          </h1>

          {/* DESCRIPTION */}

          <p className="item-details-description">
            {item.description ||
              "સમાજની ઉપયોગી વસ્તુ"}
          </p>

          {/* PRICE */}

          <div className="item-details-price">

            <span>
              ₹{pricePerDay}
            </span>

            <small>
              / Day
            </small>

          </div>

          {/* STOCK */}

          <div className="item-details-stock-box">

            <div>

              <span>

                <Icon
                  name="package"
                  size={15}
                />

                Total Quantity

              </span>

              <strong>
                {totalQuantity}
              </strong>

            </div>

            <div>

              <span>

                <Icon
                  name="check"
                  size={15}
                />

                Available

              </span>

              <strong>
                {availableQuantity}
              </strong>

            </div>

          </div>

          {/* =================================
              BOOKING AREA
          ================================= */}

          {!outOfStock && (
            <>

              {/* QUANTITY */}

              <div className="item-details-field">

                <label>
                  Quantity
                </label>

                <div className="quantity-control">

                  <button
                    type="button"
                    onClick={
                      decreaseQuantity
                    }
                    disabled={
                      quantity <= 1
                    }
                  >
                    −
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={
                      increaseQuantity
                    }
                    disabled={
                      quantity >=
                      availableQuantity
                    }
                  >
                    +
                  </button>

                </div>

                <small>
                  Maximum available:{" "}
                  {availableQuantity}
                </small>

              </div>

              {/* DATES */}

              <div className="item-details-date-grid">

                {/* BOOKING DATE */}

                <div className="item-details-field">

                  <label>

                    <Icon
                      name="calendar"
                      size={15}
                    />

                    Booking Date

                  </label>

                  <input
                    type="date"
                    value={bookingDate}
                    min={today}
                    onChange={(e) =>
                      handleBookingDateChange(
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* RETURN DATE */}

                <div className="item-details-field">

                  <label>

                    <Icon
                      name="calendar"
                      size={15}
                    />

                    Return Date

                  </label>

                  <input
                    type="date"
                    value={returnDate}
                    min={
                      minimumReturnDate
                    }
                    onChange={(e) =>
                      handleReturnDateChange(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* ADD CART */}

              <button
                type="button"
                className="item-details-add-cart"
                onClick={
                  handleAddToCart
                }
              >

                <Icon
                  name="cart"
                  size={17}
                />

                Add to Cart

              </button>

              <p className="item-details-note">
                Date અને quantity select કર્યા
                પછી item Cart માં add થશે.
              </p>

            </>
          )}

          {/* =================================
              OUT OF STOCK
          ================================= */}

          {outOfStock && (
            <div className="item-details-unavailable">

              <strong>
                હાલમાં આ વસ્તુ ઉપલબ્ધ નથી.
              </strong>

              <p>
                કૃપા કરીને બીજી વસ્તુ પસંદ કરો.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/items")
                }
              >
                Browse Other Items
              </button>

            </div>
          )}

        </div>

      </section>

    </div>
  );
}

export default ItemsDetails;