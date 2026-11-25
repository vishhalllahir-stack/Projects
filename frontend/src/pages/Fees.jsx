import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
  RotateCcw,
} from "lucide-react";

import {
  getFees,
  deleteFee,
} from "../services/feeService";


function Fees() {
  // -----------------------------
  // STATE
  // -----------------------------
  const [fees, setFees] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalFees: 0,
    perPage: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [summary, setSummary] = useState({
    totalFees: 0,
    paidAmount: 0,
    pendingAmount: 0,
    totalRecords: 0,
  });

  // -----------------------------
  // LOAD FEES
  // -----------------------------
  const loadFees = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getFees({
        search,
        academicYear,
        semester,
        status,
        page,
        limit: 10,
      });

      setError("");
      setFees(response.data || []);

      setPagination(
        response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalFees: 0,
          perPage: 10,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );

      setSummary(
        response.summary || {
          totalFees: 0,
          paidAmount: 0,
          pendingAmount: 0,
          totalRecords: 0,
        }
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load fees"
      );
    } finally {
      setLoading(false);
    }
  }, [
    search,
    academicYear,
    semester,
    status,
    page,
  ]);

  // -----------------------------
  // LOAD ON FILTER CHANGE
  // -----------------------------
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      loadFees();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadFees]);

  // -----------------------------
  // DELETE FEE
  // -----------------------------
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fee record?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteFee(id);

      alert("Fee record deleted successfully");

      // If last record of page is deleted
      if (
        fees.length === 1 &&
        page > 1
      ) {
        setPage(page - 1);
      } else {
        loadFees();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete fee"
      );
    }
  };

  // -----------------------------
  // CLEAR FILTERS
  // -----------------------------
  const clearFilters = () => {
    setSearch("");
    setAcademicYear("");
    setSemester("");
    setStatus("");
    setPage(1);
  };

  // -----------------------------
  // SEARCH CHANGE
  // -----------------------------
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // -----------------------------
  // FORMAT CURRENCY
  // -----------------------------
  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  // -----------------------------
  // STATUS CLASS
  // -----------------------------
  const getStatusClass = (statusValue) => {
    if (statusValue === "Paid") {
      return "fee-status paid";
    }

    if (statusValue === "Partial") {
      return "fee-status partial";
    }

    return "fee-status pending";
  };

  return (
    <section className="fees-page">

      {/* =================================
          PAGE HEADER
      ================================= */}
      <div className="fees-header">
        <div>
          <p className="fees-eyebrow">
            FINANCE MANAGEMENT
          </p>

          <h1>Fees Management</h1>

          <p className="fees-description">
            Track student fees, payments and
            outstanding balances.
          </p>
        </div>

        <Link
          to="/fees/add"
          className="fees-add-button"
        >
          <Plus size={18} />
          Add Fee
        </Link>
      </div>

      {/* =================================
          ERROR
      ================================= */}
      {error && (
        <div className="fees-error">
          {error}
        </div>
      )}

      {/* =================================
          SUMMARY CARDS
      ================================= */}
      <div className="fees-summary-grid">

        <div className="fees-summary-card total">
          <div className="fees-card-icon">
            ₹
          </div>

          <div>
            <p>Total Fees</p>

            <h2>
              {formatCurrency(
                summary.totalFees
              )}
            </h2>
          </div>
        </div>

        <div className="fees-summary-card paid">
          <div className="fees-card-icon">
            ✓
          </div>

          <div>
            <p>Paid Amount</p>

            <h2>
              {formatCurrency(
                summary.paidAmount
              )}
            </h2>
          </div>
        </div>

        <div className="fees-summary-card pending">
          <div className="fees-card-icon">
            !
          </div>

          <div>
            <p>Pending Amount</p>

            <h2>
              {formatCurrency(
                summary.pendingAmount
              )}
            </h2>
          </div>
        </div>

        <div className="fees-summary-card records">
          <div className="fees-card-icon">
            #
          </div>

          <div>
            <p>Total Records</p>

            <h2>
              {summary.totalRecords}
            </h2>
          </div>
        </div>

      </div>

      {/* =================================
          FILTER SECTION
      ================================= */}
      <div className="fees-filter-card">

        <div className="fees-filter-title">
          <h3>Search & Filters</h3>

          <button
            type="button"
            className="fees-clear-button"
            onClick={clearFilters}
          >
            <RotateCcw size={15} />
            Clear
          </button>
        </div>

        <div className="fees-filter-grid">

          {/* Search */}
          <div className="fees-input-wrapper">
            <Search size={18} />

            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search student, year, transaction..."
            />
          </div>

          {/* Academic Year */}
          <select
            value={academicYear}
            onChange={(e) => {
              setAcademicYear(e.target.value);
              setPage(1);
            }}
          >
            <option value="">
              All Academic Years
            </option>

            <option value="2026-2027">
              2026-2027
            </option>

            <option value="2025-2026">
              2025-2026
            </option>

            <option value="2024-2025">
              2024-2025
            </option>
          </select>

          {/* Semester */}
          <select
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value);
              setPage(1);
            }}
          >
            <option value="">
              All Semesters
            </option>

            {[1, 2, 3, 4, 5, 6, 7, 8].map(
              (sem) => (
                <option
                  key={sem}
                  value={sem}
                >
                  Semester {sem}
                </option>
              )
            )}
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">
              All Status
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Partial">
              Partial
            </option>

            <option value="Pending">
              Pending
            </option>
          </select>

        </div>
      </div>

      {/* =================================
          TABLE
      ================================= */}
      <div className="fees-table-card">

        <div className="fees-table-header">
          <div>
            <h3>Fee Records</h3>

            <p>
              {pagination.totalFees} total
              records
            </p>
          </div>
        </div>

        <div className="fees-table-wrapper">

          <table className="fees-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Academic Year</th>
                <th>Semester</th>
                <th>Total Fees</th>
                <th>Paid</th>
                <th>Remaining</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="fees-empty"
                  >
                    Loading fees...
                  </td>
                </tr>
              ) : fees.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="fees-empty"
                  >
                    No fee records found.
                  </td>
                </tr>
              ) : (
                fees.map((fee) => {

                  const student =
                    fee.studentId;

                  const remaining =
                    Math.max(
                      Number(
                        fee.totalFees || 0
                      ) -
                        Number(
                          fee.paidAmount || 0
                        ),
                      0
                    );

                  return (
                    <tr key={fee._id}>

                      {/* Student */}
                      <td>
                        <div className="fee-student">

                          <strong>
                            {student
                              ? `${student.firstName} ${student.lastName}`
                              : "Unknown Student"}
                          </strong>

                          <span>
                            {student?.studentId ||
                              "-"}
                          </span>

                        </div>
                      </td>

                      {/* Academic Year */}
                      <td>
                        {fee.academicYear ||
                          "-"}
                      </td>

                      {/* Semester */}
                      <td>
                        {fee.semester
                          ? `Semester ${fee.semester}`
                          : "-"}
                      </td>

                      {/* Total */}
                      <td>
                        <strong>
                          {formatCurrency(
                            fee.totalFees
                          )}
                        </strong>
                      </td>

                      {/* Paid */}
                      <td className="paid-text">
                        {formatCurrency(
                          fee.paidAmount
                        )}
                      </td>

                      {/* Remaining */}
                      <td className="remaining-text">
                        {formatCurrency(
                          remaining
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={getStatusClass(
                            fee.status
                          )}
                        >
                          {fee.status}
                        </span>
                      </td>

                      {/* Payment Method */}
                      <td>
                        {fee.paymentMethod ||
                          "-"}
                      </td>

                      {/* Actions */}
                      <td>

                        <div className="fees-actions">

                          <Link
                            to={`/fees/${fee._id}`}
                            className="fee-action view"
                            title="View"
                          >
                            <Eye size={16} />
                          </Link>

                          <Link
                            to={`/fees/edit/${fee._id}`}
                            className="fee-action edit"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </Link>

                          <button
                            type="button"
                            className="fee-action delete"
                            title="Delete"
                            onClick={() =>
                              handleDelete(
                                fee._id
                              )
                            }
                          >
                            <Trash2
                              size={16}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })
              )}

            </tbody>

          </table>

        </div>

        {/* =================================
            PAGINATION
        ================================= */}
        <div className="fees-pagination">

          <span>
            Page{" "}
            {pagination.currentPage} of{" "}
            {pagination.totalPages}
          </span>

          <div>

            <button
              type="button"
              disabled={
                !pagination.hasPreviousPage ||
                loading
              }
              onClick={() =>
                setPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
            >
              Previous
            </button>

            <button
              type="button"
              disabled={
                !pagination.hasNextPage ||
                loading
              }
              onClick={() =>
                setPage((prev) =>
                  prev + 1
                )
              }
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Fees;