import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  Printer,
  IndianRupee,
} from "lucide-react";

import {
  getFeeReport,
} from "../services/reportService";

import "../index.css";

const FeeReport = () => {
  const [fees, setFees] = useState([]);

  const [summary, setSummary] = useState({
    totalFees: 0,
    paidAmount: 0,
    pendingAmount: 0,
    totalRecords: 0,
  });

  const [pagination, setPagination] =
    useState({
      currentPage: 1,
      totalPages: 1,
      totalFees: 0,
      perPage: 10,
    });

  const [filters, setFilters] = useState({
    search: "",
    academicYear: "",
    semester: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFees = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const data = await getFeeReport({
        ...filters,
        page,
        limit: 10,
      });

      setFees(data.data || []);

      setSummary(
        data.summary || {
          totalFees: 0,
          paidAmount: 0,
          pendingAmount: 0,
          totalRecords: 0,
        }
      );

      setPagination(
        data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalFees: 0,
          perPage: 10,
        }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load fee report"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadInitialReport = async () => {
      try {
        const data = await getFeeReport({
          search: "",
          academicYear: "",
          semester: "",
          status: "",
          page: 1,
          limit: 10,
        });

        if (active) {
          setFees(data.data || []);
          setSummary(
            data.summary || {
              totalFees: 0,
              paidAmount: 0,
              pendingAmount: 0,
              totalRecords: 0,
            }
          );
          setPagination(
            data.pagination || {
              currentPage: 1,
              totalPages: 1,
              totalFees: 0,
              perPage: 10,
            }
          );
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Failed to load fee report"
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadInitialReport();

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadFees(1);
  };

  const handleReset = () => {
    const reset = {
      search: "",
      academicYear: "",
      semester: "",
      status: "",
    };

    setFilters(reset);

    setTimeout(() => {
      loadFees(1);
    }, 0);
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  return (
    <section className="fee-report-page">
      <div className="fee-report-header">
        <div>
          <p className="fee-report-eyebrow">
            Reports
          </p>

          <h1>Fees Report</h1>

          <p>
            View student fee collection and
            pending payment details.
          </p>
        </div>

        <button
          type="button"
          className="fee-report-print-btn"
          onClick={() => window.print()}
        >
          <Printer size={17} />
          Print
        </button>
      </div>

      <div className="fee-report-summary">
        <div className="fee-summary-card">
          <div className="fee-summary-icon">
            <IndianRupee size={19} />
          </div>

          <div>
            <span>Total Fees</span>
            <strong>
              {formatCurrency(summary.totalFees)}
            </strong>
          </div>
        </div>

        <div className="fee-summary-card">
          <div className="fee-summary-icon">
            <IndianRupee size={19} />
          </div>

          <div>
            <span>Paid Amount</span>
            <strong>
              {formatCurrency(summary.paidAmount)}
            </strong>
          </div>
        </div>

        <div className="fee-summary-card">
          <div className="fee-summary-icon">
            <IndianRupee size={19} />
          </div>

          <div>
            <span>Pending Amount</span>
            <strong>
              {formatCurrency(
                summary.pendingAmount
              )}
            </strong>
          </div>
        </div>

        <div className="fee-summary-card">
          <div className="fee-summary-icon">
            #
          </div>

          <div>
            <span>Total Records</span>
            <strong>
              {summary.totalRecords}
            </strong>
          </div>
        </div>
      </div>

      <div className="fee-report-filters">
        <form
          onSubmit={handleSearch}
          className="fee-report-search-box"
        >
          <Search size={17} />

          <input
            type="text"
            name="search"
            placeholder="Search student..."
            value={filters.search}
            onChange={handleChange}
          />
        </form>

        <select
          name="academicYear"
          value={filters.academicYear}
          onChange={handleChange}
        >
          <option value="">
            All Academic Years
          </option>

          <option value="2025-2026">
            2025-2026
          </option>

          <option value="2026-2027">
            2026-2027
          </option>

          <option value="2027-2028">
            2027-2028
          </option>
        </select>

        <select
          name="semester"
          value={filters.semester}
          onChange={handleChange}
        >
          <option value="">
            All Semesters
          </option>

          {Array.from(
            { length: 8 },
            (_, index) => index + 1
          ).map((semester) => (
            <option
              key={semester}
              value={semester}
            >
              Semester {semester}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Partial">
            Partial
          </option>

          <option value="Paid">
            Paid
          </option>
        </select>

        <button
          type="submit"
          className="fee-report-search-btn"
        >
          Search
        </button>

        <button
          type="button"
          className="fee-report-reset-btn"
          onClick={handleReset}
        >
          <RefreshCw size={15} />
          Reset
        </button>
      </div>

      <div className="fee-report-card">
        <div className="fee-report-card-header">
          <div>
            <h2>Fee Records</h2>

            <span>
              Total Records:{" "}
              {pagination.totalFees}
            </span>
          </div>
        </div>

        {error && (
          <div className="fee-report-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="fee-report-loading">
            Loading fee records...
          </div>
        ) : (
          <div className="fee-report-table-wrapper">
            <table className="fee-report-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Department</th>
                  <th>Academic Year</th>
                  <th>Semester</th>
                  <th>Total Fees</th>
                  <th>Paid</th>
                  <th>Remaining</th>
                  <th>Payment Date</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {fees.length > 0 ? (
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
                        <td>
                          {student?.studentId ||
                            "-"}
                        </td>

                        <td>
                          {student
                            ? `${student.firstName} ${student.lastName}`
                            : "-"}
                        </td>

                        <td>
                          {student?.course ||
                            "-"}
                        </td>

                        <td>
                          {student?.department ||
                            "-"}
                        </td>

                        <td>
                          {fee.academicYear}
                        </td>

                        <td>
                          {fee.semester}
                        </td>

                        <td>
                          {formatCurrency(
                            fee.totalFees
                          )}
                        </td>

                        <td>
                          {formatCurrency(
                            fee.paidAmount
                          )}
                        </td>

                        <td>
                          {formatCurrency(
                            remaining
                          )}
                        </td>

                        <td>
                          {fee.paymentDate
                            ? new Date(
                                fee.paymentDate
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}
                        </td>

                        <td>
                          {fee.paymentMethod ||
                            "-"}
                        </td>

                        <td>
                          <span
                            className={`fee-report-status ${fee.status.toLowerCase()}`}
                          >
                            {fee.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="12"
                      className="fee-report-empty"
                    >
                      No fee records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading &&
          pagination.totalPages > 1 && (
            <div className="fee-report-pagination">
              <button
                type="button"
                disabled={
                  pagination.currentPage <= 1
                }
                onClick={() =>
                  loadFees(
                    pagination.currentPage - 1
                  )
                }
              >
                Previous
              </button>

              <span>
                Page{" "}
                {pagination.currentPage} of{" "}
                {pagination.totalPages}
              </span>

              <button
                type="button"
                disabled={
                  pagination.currentPage >=
                  pagination.totalPages
                }
                onClick={() =>
                  loadFees(
                    pagination.currentPage + 1
                  )
                }
              >
                Next
              </button>
            </div>
          )}
      </div>
    </section>
  );
};

export default FeeReport;