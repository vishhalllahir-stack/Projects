import { Link } from "react-router-dom";
import Icon from "./Icon";

function Itemcard({ item }) {
  const itemId = item?._id || item?.id || "";

  const available = Number(item?.availableQuantity ?? 0);
  const total = Number(item?.totalQuantity ?? 0);
  const price = Number(item?.pricePerDay ?? 0);

  const isAvailable =
    item?.isAvailable !== false && available > 0;

  const imageUrl =
    typeof item?.image === "string"
      ? item.image.trim()
      : "";

  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";

    const fallback =
      event.currentTarget.parentElement?.querySelector(
        ".rental-item-image-fallback"
      );

    if (fallback) {
      fallback.style.display = "flex";
    }
  };

  return (
    <article className="rental-item-card">
      {/* ================= IMAGE ================= */}
      <Link
        to={`/items/${itemId}`}
        className="rental-item-image-link"
      >
        <div className="rental-item-image">

          {imageUrl ? (
            <img
              src={imageUrl}
              alt={item?.name || "Rental item"}
              className="rental-item-real-image"
              onError={handleImageError}
            />
          ) : null}

          {/* IMAGE FALLBACK */}
          <div
            className="rental-item-image-fallback"
            style={{
              display: imageUrl ? "none" : "flex",
            }}
          >
            <Icon name="package" size={48} />
            <span>No Image</span>
          </div>

          {/* AVAILABILITY */}
          <span
            className={`rental-item-availability ${
              isAvailable
                ? "available"
                : "unavailable"
            }`}
          >
            {isAvailable
              ? "Available"
              : "Unavailable"}
          </span>
        </div>
      </Link>

      {/* ================= CONTENT ================= */}
      <div className="rental-item-content">

        {/* CATEGORY */}
        <div className="rental-item-category">
          {item?.category || "Rental Item"}
        </div>

        {/* NAME */}
        <h3 className="rental-item-name">
          {item?.name || "Unnamed Item"}
        </h3>

        {/* DESCRIPTION */}
        <p className="rental-item-description">
          {item?.description ||
            "Community rental item"}
        </p>

        {/* PRICE */}
        <div className="rental-item-price">
          <strong>
            ₹{price}
          </strong>

          <span>
            / Day
          </span>
        </div>

        {/* ================= STOCK ================= */}
        <div className="rental-item-stock">

          <span>
            <Icon
              name="package"
              size={16}
            />

            <span>Total Stock</span>

            <strong>
              {total}
            </strong>
          </span>

          <span>
            <Icon
              name="check"
              size={16}
            />

            <span>Available</span>

            <strong>
              {available}
            </strong>
          </span>

        </div>

        {/* ================= BUTTON ================= */}

        {isAvailable ? (
          <Link
            to={`/items/${itemId}`}
            className="rental-item-book-btn"
          >
            <Icon
              name="calendar"
              size={17}
            />

            <span>
              View Details &amp; Book
            </span>
          </Link>
        ) : (
          <button
            type="button"
            className="rental-item-book-btn rental-item-disabled-btn"
            disabled
          >
            <Icon
              name="close"
              size={17}
            />

            <span>
              Currently Unavailable
            </span>
          </button>
        )}

      </div>
    </article>
  );
}

export default Itemcard;