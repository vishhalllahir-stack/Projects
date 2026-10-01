import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ManageBill = () => {
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [downloadingId, setDownloadingId] =
    useState(null);
  const [error, setError] = useState("");

  /* ================================
     LOAD BILLS
  ================================= */

  const loadBills = async (
    showLoading = true
  ) => {
    try {
      if (showLoading) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      const response =
        await API.get("/admin/bills");

      const data = response?.data;

      const billList = Array.isArray(data)
        ? data
        : Array.isArray(data?.bills)
          ? data.bills
          : [];

      setBills(billList);
    } catch (error) {
      console.error(
        "Load Bills Error:",
        error
      );

      setBills([]);

      setError(
        error.response?.data?.message ||
          "Failed to load bills"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /* ================================
     PAGE LOAD
  ================================= */

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadBills();
  }, []);

  /* ================================
     SEARCH
  ================================= */

  const filteredBills = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) {
      return bills;
    }

    return bills.filter((bill) => {
      const customerName =
        String(
          bill?.customerName || ""
        ).toLowerCase();

      const mobile =
        String(
          bill?.mobile || ""
        ).toLowerCase();

      const village =
        String(
          bill?.village || ""
        ).toLowerCase();

      const billNumber =
        String(
          bill?.billNumber || ""
        ).toLowerCase();

      const bookingId =
        String(
          bill?.bookingId?._id ||
            bill?.bookingId ||
            ""
        ).toLowerCase();

      return (
        customerName.includes(value) ||
        mobile.includes(value) ||
        village.includes(value) ||
        billNumber.includes(value) ||
        bookingId.includes(value)
      );
    });
  }, [bills, search]);

  /* ================================
     DATE FORMAT
  ================================= */

  const formatDate = (date) => {
    if (!date) return "-";

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

  /* ================================
     MONEY FORMAT
  ================================= */

  const formatMoney = (amount) => {
    const value = Number(amount);

    if (!Number.isFinite(value)) {
      return "0";
    }

    return value.toLocaleString(
      "en-IN"
    );
  };

  /* ================================
     DOWNLOAD PDF
  ================================= */

  const downloadPDF = async (
    id,
    billNumber
  ) => {
    if (!id) {
      alert("Bill ID not found.");
      return;
    }

    try {
      setDownloadingId(id);

      const response =
        await API.get(
          `/admin/bills/${id}/pdf`,
          {
            responseType: "blob",
          }
        );

      const blob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${billNumber || "bill"}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Download PDF Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to download PDF"
      );
    } finally {
      setDownloadingId(null);
    }
  };

  /* ================================
     STATISTICS
  ================================= */

  const totalBills =
    bills.length;

  const totalAmount = bills.reduce(
    (sum, bill) => {
      const amount =
        Number(
          bill?.totalAmount || 0
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

  /* ================================
     CLEAR SEARCH
  ================================= */

  const clearSearch = () => {
    setSearch("");
  };

  /* ================================
     UI
  ================================= */

  return (
    <div className="admin-page">

      <div className="admin-container">

        {/* =========================
            HEADER
        ========================== */}

        <div className="admin-page-header">

          <div>

            <span className="admin-eyebrow">
              ADMIN PANEL
            </span>

            <h1>
              Manage Bills
            </h1>

            <p>
              View and download customer
              rental bills.
            </p>

          </div>

          <div className="admin-header-actions">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                navigate("/admin")
              }
            >
              Dashboard
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                loadBills(false)
              }
              disabled={refreshing}
            >
              {refreshing
                ? "Loading..."
                : "Refresh"}
            </button>

          </div>

        </div>

        {/* =========================
            STATS
        ========================== */}

        <div className="admin-stats-grid">

          <div className="admin-stat-card">

            <span>
              Total Bills
            </span>

            <strong>
              {totalBills}
            </strong>

          </div>

          <div className="admin-stat-card">

            <span>
              Total Revenue
            </span>

            <strong>
              ₹{formatMoney(
                totalAmount
              )}
            </strong>

          </div>

        </div>

        {/* =========================
            SEARCH
        ========================== */}

        <div className="admin-toolbar">

          <input
            type="text"
            placeholder="Search bill, customer, mobile or village..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="admin-search"
          />

          <span className="admin-result-count">

            {filteredBills.length}{" "}
            {filteredBills.length === 1
              ? "bill"
              : "bills"}

          </span>

          {search && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearSearch}
            >
              Clear
            </button>
          )}

        </div>

        {/* =========================
            ERROR
        ========================== */}

        {error && (

          <div className="admin-error">

            <span>
              {error}
            </span>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                loadBills()
              }
            >
              Retry
            </button>

          </div>

        )}

        {/* =========================
            LOADING
        ========================== */}

        {loading ? (

          <div className="admin-loading">
            Loading bills...
          </div>

        ) : filteredBills.length === 0 ? (

          /* =========================
             EMPTY
          ========================== */

          <div className="admin-empty">

            <h3>
              No Bills Found
            </h3>

            <p>
              {search
                ? "There are no bills matching your search."
                : "There are no bills available."}
            </p>

            {search && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={clearSearch}
              >
                Clear Search
              </button>
            )}

          </div>

        ) : (

          /* =========================
             BILLS LIST
          ========================== */

          <div className="admin-bills-list">

            {filteredBills.map(
              (bill, billIndex) => {

                const user =
                  bill?.userId &&
                  typeof bill.userId ===
                    "object"
                    ? bill.userId
                    : {};

                const billItems =
                  Array.isArray(
                    bill?.items
                  )
                    ? bill.items
                    : [];

                const billId =
                  bill?._id ||
                  `bill-${billIndex}`;

                const isDownloading =
                  downloadingId ===
                  bill?._id;

                return (
                  <div
                    className="admin-bill-card"
                    key={billId}
                  >

                    {/* =================
                        BILL HEADER
                    ================= */}

                    <div className="admin-bill-header">

                      <div>

                        <span className="admin-bill-label">
                          BILL NUMBER
                        </span>

                        <h2>
                          {bill?.billNumber ||
                            "N/A"}
                        </h2>

                      </div>

                      <div className="admin-bill-date">

                        {formatDate(
                          bill?.generatedAt
                        )}

                      </div>

                    </div>

                    {/* =================
                        CUSTOMER
                    ================= */}

                    <div className="admin-bill-customer">

                      <div>

                        <strong>
                          Customer
                        </strong>

                        <p>
                          {bill?.customerName ||
                            "-"}
                        </p>

                      </div>

                      <div>

                        <strong>
                          Mobile
                        </strong>

                        <p>
                          {bill?.mobile ||
                            user?.mobile ||
                            "-"}
                        </p>

                      </div>

                      <div>

                        <strong>
                          Village
                        </strong>

                        <p>
                          {bill?.village ||
                            user?.village ||
                            "-"}
                        </p>

                      </div>

                      <div>

                        <strong>
                          Email
                        </strong>

                        <p>
                          {user?.email ||
                            bill?.email ||
                            "-"}
                        </p>

                      </div>

                    </div>

                    {/* =================
                        RENTAL
                    ================= */}

                    <div className="admin-bill-rental">

                      <div>

                        <span>
                          Booking Date
                        </span>

                        <strong>
                          {formatDate(
                            bill?.bookingDate
                          )}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Return Date
                        </span>

                        <strong>
                          {formatDate(
                            bill?.returnDate
                          )}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Items
                        </span>

                        <strong>
                          {billItems.length}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Total
                        </span>

                        <strong>
                          ₹
                          {formatMoney(
                            bill?.totalAmount
                          )}
                        </strong>

                      </div>

                    </div>

                    {/* =================
                        ITEMS
                    ================= */}

                    <div className="admin-bill-items">

                      <h3>
                        Rental Items
                      </h3>

                      {billItems.length ===
                      0 ? (

                        <p>
                          No rental items found.
                        </p>

                      ) : (

                        <div className="admin-table-wrap">

                          <table>

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

                              {billItems.map(
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

                                  const amount =
                                    Number(
                                      item?.amount ??
                                        price *
                                          quantity
                                    );

                                  return (
                                    <tr
                                      key={
                                        item?.itemId?._id ||
                                        item?.itemId ||
                                        index
                                      }
                                    >

                                      <td>
                                        {item?.name ||
                                          "-"}
                                      </td>

                                      <td>
                                        ₹
                                        {formatMoney(
                                          price
                                        )}
                                      </td>

                                      <td>
                                        {quantity}
                                      </td>

                                      <td>
                                        ₹
                                        {formatMoney(
                                          amount
                                        )}
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

                    {/* =================
                        FOOTER
                    ================= */}

                    <div className="admin-bill-footer">

                      <strong>
                        Total Amount: ₹
                        {formatMoney(
                          bill?.totalAmount
                        )}
                      </strong>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          downloadPDF(
                            bill?._id,
                            bill?.billNumber
                          )
                        }
                        disabled={
                          isDownloading
                        }
                      >
                        {isDownloading
                          ? "Downloading..."
                          : "Download PDF"}
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
};

export default ManageBill;