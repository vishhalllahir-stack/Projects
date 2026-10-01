import { useEffect, useState } from "react";
import API from "../services/api";
import Icon from "../componet/Icon";

function ManageItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    pricePerDay: "",
    totalQuantity: "",
    image: "",
  });

  // =========================
  // FETCH ITEMS
  // =========================
  const fetchItems = async () => {
    try {
      const response = await API.get("/items");

      const data = response?.data;

      const itemList = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
          ? data.items
          : [];

      setItems(itemList);
    } catch (error) {
      console.error("Fetch Items Error:", error);

      setItems([]);

      alert(
        error.response?.data?.message ||
          "Failed to load items"
      );
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  }, []);

  // =========================
  // FORM CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      description: "",
      pricePerDay: "",
      totalQuantity: "",
      image: "",
    });

    setEditingId(null);
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const categoryName = form.category.trim();
    const description = form.description.trim();
    const image = form.image.trim();

    const pricePerDay = Number(
      form.pricePerDay
    );

    const totalQuantity = Number(
      form.totalQuantity
    );

    // Required validation
    if (
      !name ||
      !categoryName ||
      form.pricePerDay === "" ||
      form.totalQuantity === ""
    ) {
      alert(
        "Please fill all required fields."
      );
      return;
    }

    // Price validation
    if (
      !Number.isFinite(pricePerDay) ||
      pricePerDay < 0
    ) {
      alert(
        "Price valid હોવી જોઈએ."
      );
      return;
    }

    // Quantity validation
    if (
      !Number.isInteger(totalQuantity) ||
      totalQuantity < 1
    ) {
      alert(
        "Total quantity 1 અથવા તેનાથી વધારે હોવી જોઈએ."
      );
      return;
    }

    try {
      const itemData = {
        name,
        category: categoryName,
        description,
        pricePerDay,
        totalQuantity,
        image,
      };

      if (editingId) {
        await API.put(
          `/items/${editingId}`,
          itemData
        );

        alert(
          "Item updated successfully."
        );
      } else {
        await API.post(
          "/items",
          itemData
        );

        alert(
          "Item added successfully."
        );
      }

      resetForm();

      await fetchItems();
    } catch (error) {
      console.error(
        "Item Save Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Operation failed."
      );
    }
  };

  // =========================
  // EDIT ITEM
  // =========================
  const handleEdit = (item) => {
    setEditingId(item._id);

    setForm({
      name: item.name || "",
      category: item.category || "",
      description:
        item.description || "",
      pricePerDay:
        item.pricePerDay ?? "",
      totalQuantity:
        item.totalQuantity ?? "",
      image: item.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE ITEM
  // =========================
  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid item ID.");
      return;
    }

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this item?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      const response =
        await API.delete(
          `/items/${id}`
        );

      alert(
        response.data?.message ||
          "Item deleted successfully."
      );

      // If deleted item was being edited
      if (editingId === id) {
        resetForm();
      }

      await fetchItems();
    } catch (error) {
      console.error(
        "Delete Item Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete item."
      );
    }
  };

  // =========================
  // CATEGORIES
  // =========================
  const categories = [
    ...new Set(
      items
        .map(
          (item) =>
            item?.category?.trim()
        )
        .filter(Boolean)
    ),
  ].sort((a, b) =>
    a.localeCompare(b)
  );

  // =========================
  // FILTER ITEMS
  // =========================
  const searchText =
    search.toLowerCase().trim();

  const filteredItems =
    items.filter((item) => {
      const name =
        item?.name?.toLowerCase() || "";

      const description =
        item?.description?.toLowerCase() ||
        "";

      const itemCategory =
        item?.category?.toLowerCase() ||
        "";

      const matchesSearch =
        !searchText ||
        name.includes(searchText) ||
        description.includes(searchText) ||
        itemCategory.includes(searchText);

      const matchesCategory =
        category === "all" ||
        item?.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  // =========================
  // FORMAT MONEY
  // =========================
  const formatMoney = (value) => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "0";
    }

    return number.toLocaleString(
      "en-IN"
    );
  };

  // =========================
  // FORMAT NUMBER
  // =========================
  const formatNumber = (value) => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "0";
    }

    return number.toLocaleString(
      "en-IN"
    );
  };

  return (
    <div className="page admin-page manage-items-page">

      <main className="manage-items-container">

        {/* =========================
            HEADER
        ========================= */}

        <section className="manage-items-header">

          <div>

            <span className="manage-items-badge">
              ADMIN • INVENTORY
            </span>

            <h1 className="manage-items-title">
              Manage Items
            </h1>

            <p className="manage-items-subtitle">
              Community rental items add,
              update, search અને manage કરો.
            </p>

          </div>

          <div className="manage-items-count">

            <strong>
              {items.length}
            </strong>

            <span>
              Total Items
            </span>

          </div>

        </section>

        {/* =========================
            ADD / EDIT FORM
        ========================= */}

        <section className="manage-item-form-card">

          <div className="manage-form-header">

            <div className="manage-form-icon">

              <Icon
                name={
                  editingId
                    ? "pencil"
                    : "package"
                }
                size={22}
              />

            </div>

            <div>

              <h2>
                {editingId
                  ? "Edit Rental Item"
                  : "Add New Rental Item"}
              </h2>

              <p>
                {editingId
                  ? "Item information update કરો."
                  : "નવું rental item system માં add કરો."}
              </p>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="manage-item-form"
          >

            {/* NAME */}

            <div className="manage-form-group">

              <label>
                Item Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Example: Steel Plate"
                value={form.name}
                onChange={handleChange}
                maxLength="100"
              />

            </div>

            {/* CATEGORY */}

            <div className="manage-form-group">

              <label>
                Category <span>*</span>
              </label>

              <input
                type="text"
                name="category"
                placeholder="Example: જમવાના વાસણ"
                value={form.category}
                onChange={handleChange}
                maxLength="100"
              />

            </div>

            {/* PRICE */}

            <div className="manage-form-group">

              <label>
                Price Per Day (₹){" "}
                <span>*</span>
              </label>

              <input
                type="number"
                name="pricePerDay"
                placeholder="Example: 5"
                value={form.pricePerDay}
                onChange={handleChange}
                min="0"
                step="0.01"
              />

            </div>

            {/* QUANTITY */}

            <div className="manage-form-group">

              <label>
                Total Quantity{" "}
                <span>*</span>
              </label>

              <input
                type="number"
                name="totalQuantity"
                placeholder="Example: 100"
                value={form.totalQuantity}
                onChange={handleChange}
                min="1"
                step="1"
              />

            </div>

            {/* DESCRIPTION */}

            <div className="manage-form-group manage-form-full">

              <label>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Enter item description..."
                value={form.description}
                onChange={handleChange}
                rows="4"
                maxLength="500"
              />

              <small>
                {form.description.length}/500
              </small>

            </div>

            {/* IMAGE */}

            <div className="manage-form-group manage-form-full">

              <label>
                Image URL
              </label>

              <input
                type="url"
                name="image"
                placeholder="https://example.com/item-image.jpg"
                value={form.image}
                onChange={handleChange}
              />

              <small>
                Full image URL આપો.
                Local image path જરૂરી નથી.
              </small>

            </div>

            {/* BUTTONS */}

            <div className="manage-form-actions">

              <button
                type="submit"
                className="manage-submit-button"
              >
                {editingId
                  ? "✓ Update Item"
                  : "+ Add Item"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="manage-cancel-button"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}

            </div>

          </form>

        </section>

        {/* =========================
            SEARCH / FILTER
        ========================= */}

        <section className="manage-filter-card">

          <div className="manage-filter-title">

            <div className="manage-filter-icon">
              <Icon
                name="search"
                size={18}
              />
            </div>

            <div>

              <h2>
                Find Items
              </h2>

              <p>
                Search અને category પ્રમાણે
                filter કરો.
              </p>

            </div>

          </div>

          <div className="manage-filter-controls">

            <div className="manage-search-box">

              <span>
                <Icon
                  name="search"
                  size={16}
                />
              </span>

              <input
                type="text"
                placeholder="Search by name, category or description..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <select
              className="manage-category-select"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              <option value="all">
                All Categories
              </option>

              {categories.map(
                (categoryName) => (
                  <option
                    key={categoryName}
                    value={categoryName}
                  >
                    {categoryName}
                  </option>
                )
              )}

            </select>

          </div>

        </section>

        {/* =========================
            RESULT HEADER
        ========================= */}

        <div className="manage-results-header">

          <div>

            <h2>
              Rental Items
            </h2>

            <p>
              Showing{" "}
              <strong>
                {filteredItems.length}
              </strong>{" "}
              of {items.length} items
            </p>

          </div>

          {(search ||
            category !== "all") && (
            <button
              type="button"
              className="manage-clear-filter"
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
            >
              Clear Filters
            </button>
          )}

        </div>

        {/* =========================
            ITEMS
        ========================= */}

        {filteredItems.length === 0 ? (

          <section className="manage-empty-state">

            <div className="manage-empty-icon">

              <Icon
                name="package"
                size={32}
              />

            </div>

            <h2>
              No Items Found
            </h2>

            <p>
              Search/filter change કરો
              અથવા નવું rental item add કરો.
            </p>

          </section>

        ) : (

          <section className="manage-items-grid">

            {filteredItems.map(
              (item) => {

                const totalQuantity =
                  Number(
                    item?.totalQuantity || 0
                  );

                const availableQuantity =
                  Number(
                    item?.availableQuantity ?? 0
                  );

                const isAvailable =
                  item?.isAvailable !== false &&
                  availableQuantity > 0;

                return (
                  <article
                    key={item._id}
                    className="manage-item-card"
                  >

                    {/* =================
                        IMAGE
                    ================= */}

                    <div className="manage-item-image-wrapper">

                      {item?.image ? (

                        <img
                          src={item.image}
                          alt={
                            item?.name ||
                            "Rental item"
                          }
                          className="manage-item-image"
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";

                            const fallback =
                              e.currentTarget
                                .nextElementSibling;

                            if (fallback) {
                              fallback.style.display =
                                "flex";
                            }
                          }}
                        />

                      ) : null}

                      <div
                        className="manage-item-no-image"
                        style={{
                          display: item?.image
                            ? "none"
                            : "flex",
                        }}
                      >
                        <Icon
                          name="package"
                          size={30}
                        />
                      </div>

                      <span className="manage-item-category">
                        {item?.category ||
                          "Uncategorized"}
                      </span>

                      <span
                        className={
                          isAvailable
                            ? "manage-availability available"
                            : "manage-availability unavailable"
                        }
                      >
                        {isAvailable
                          ? "Available"
                          : "Unavailable"}
                      </span>

                    </div>

                    {/* =================
                        CONTENT
                    ================= */}

                    <div className="manage-item-content">

                      <h2>
                        {item?.name ||
                          "Unnamed Item"}
                      </h2>

                      <p className="manage-item-description">

                        {item?.description ||
                          "No description available."}

                      </p>

                      <div className="manage-item-details">

                        <div>

                          <span>
                            Price / Day
                          </span>

                          <strong>
                            ₹
                            {formatMoney(
                              item?.pricePerDay
                            )}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Total
                          </span>

                          <strong>
                            {formatNumber(
                              totalQuantity
                            )}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Available
                          </span>

                          <strong>
                            {formatNumber(
                              availableQuantity
                            )}
                          </strong>

                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="manage-item-actions">

                        <button
                          type="button"
                          className="manage-edit-button"
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          <Icon
                            name="pencil"
                            size={15}
                          />

                          Edit
                        </button>

                        <button
                          type="button"
                          className="manage-delete-button"
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                        >
                          <Icon
                            name="trash"
                            size={15}
                          />

                          Delete
                        </button>

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

export default ManageItems;