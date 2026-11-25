import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import {
  getDepartments,
  deleteDepartment,
} from "../services/departmentService";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDepartments: 0,
    perPage: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDepartments({
        search,
        status,
        page,
        limit,
      });

      setError("");
      setDepartments(response.data || []);

      setPagination(
        response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalDepartments: 0,
          perPage: 10,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load departments"
      );
    } finally {
      setLoading(false);
    }
  }, [search, status, page, limit]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetchDepartments();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [fetchDepartments]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setPage(1);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDepartment(id);
      fetchDepartments();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete department"
      );
    }
  };

  return (
    <div className="departments-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Departments</h1>

          <p>
            Total Departments:{" "}
            <strong>
              {pagination.totalDepartments}
            </strong>
          </p>
        </div>

        <Link
          to="/departments/add"
          className="add-button"
        >
          + Add Department
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="filter-section">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search ID, name, code, HOD..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="status-filter">
          <select
            value={status}
            onChange={handleStatus}
          >
            <option value="">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        <button
          className="clear-button"
          onClick={clearFilters}
        >
          Clear
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="loading">
          Loading departments...
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Department ID</th>
                  <th>Department Name</th>
                  <th>Department Code</th>
                  <th>Head of Department</th>
                  <th>Established Year</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {departments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No departments found
                    </td>
                  </tr>
                ) : (
                  departments.map((department) => (
                    <tr key={department._id}>

                      <td>
                        {department.departmentId}
                      </td>

                      <td>
                        {department.departmentName}
                      </td>

                      <td>
                        {department.departmentCode}
                      </td>

                      <td>
                        {department.headOfDepartment ||
                          "—"}
                      </td>

                      <td>
                        {department.establishedYear ||
                          "—"}
                      </td>

                      <td>
                        <span
                          className={`status ${department.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {department.status}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">

                          <Link
                            to={`/departments/${department._id}`}
                            className="view-btn"
                          >
                            View
                          </Link>

                          <Link
                            to={`/departments/edit/${department._id}`}
                            className="edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                department._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

          {/* Pagination */}
          {pagination.totalPages > 0 && (
            <div className="pagination">

              <button
                disabled={
                  !pagination.hasPreviousPage
                }
                onClick={() =>
                  setPage(
                    (prev) => prev - 1
                  )
                }
              >
                ← Previous
              </button>

              <div className="page-numbers">

                {Array.from(
                  {
                    length:
                      pagination.totalPages,
                  },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={
                      page === pageNumber
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setPage(pageNumber)
                    }
                  >
                    {pageNumber}
                  </button>
                ))}

              </div>

              <button
                disabled={
                  !pagination.hasNextPage
                }
                onClick={() =>
                  setPage(
                    (prev) => prev + 1
                  )
                }
              >
                Next →
              </button>

            </div>
          )}

          <div className="pagination-info">
            Page{" "}
            {pagination.currentPage} of{" "}
            {pagination.totalPages} —{" "}
            {pagination.totalDepartments} departments
          </div>

        </>
      )}

    </div>
  );
};

export default Departments;