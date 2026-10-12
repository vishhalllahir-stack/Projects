import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getTeachers,
  deleteTeacher,
} from "../services/teacherService";
import "../index.css"

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalTeachers: 0,
    perPage: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTeachers({
        search,
        status,
        page,
        limit,
      });

      setError("");
      setTeachers(response.data || []);

      setPagination(
        response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalTeachers: 0,
          perPage: 10,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load teachers"
      );
    } finally {
      setLoading(false);
    }
  }, [search, status, page, limit]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetchTeachers();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [fetchTeachers]);

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
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTeacher(id);
      fetchTeachers();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete teacher"
      );
    }
  };

  return (
    <div className="teachers-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Teachers</h1>

          <p>
            Total Teachers:{" "}
            <strong>
              {pagination.totalTeachers}
            </strong>
          </p>
        </div>

        <Link
          to="/teachers/add"
          className="add-button"
        >
          + Add Teacher
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="filter-section">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search ID, name, email, phone, subject..."
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
          Loading teachers...
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Teacher ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Qualification</th>
                  <th>Department</th>
                  <th>Subject</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {teachers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="10"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No teachers found
                    </td>
                  </tr>
                ) : (
                  teachers.map((teacher) => (
                    <tr key={teacher._id}>

                      <td>
                        {teacher.teacherId}
                      </td>

                      <td>
                        {teacher.firstName}{" "}
                        {teacher.lastName}
                      </td>

                      <td>
                        {teacher.email}
                      </td>

                      <td>
                        {teacher.phone}
                      </td>

                      <td>
                        {teacher.qualification}
                      </td>

                      <td>
                        {teacher.department}
                      </td>

                      <td>
                        {teacher.subject}
                      </td>

                      <td>
                        {teacher.experience} years
                      </td>

                      <td>
                        <span
                          className={`status ${teacher.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {teacher.status}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">

                          <Link
                            to={`/teachers/${teacher._id}`}
                            className="view-btn"
                          >
                            View
                          </Link>

                          <Link
                            to={`/teachers/edit/${teacher._id}`}
                            className="edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                teacher._id
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
            {pagination.totalTeachers} teachers
          </div>

        </>
      )}

    </div>
  );
};

export default Teachers;