import { useCallback, useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import {
  getStudents,
  deleteStudent,
} from "../services/studentService";
import './students.css'

const Students = () => {
  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalStudents: 0,
    perPage: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getStudents({
        search,
        status,
        page,
        limit,
      });

      setError("");
      setStudents(response.data || []);
      setPagination(
        response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalStudents: 0,
          perPage: 10,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          "Failed to load students"
      );
    } finally {
      setLoading(false);
    }
  }, [search, status, page, limit]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetchStudents();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [fetchStudents]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);

      // Reload current page
      fetchStudents();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete student"
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setPage(1);
  };

  return (
    <div className="students-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>
            Total Students:{" "}
            <strong>{pagination.totalStudents}</strong>
          </p>
        </div>

        <Link
          to="/students/add"
          className="add-button"
        >
          + Add Student
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="filter-section">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by ID, name, email, phone, course..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="status-filter">
          <select
            value={status}
            onChange={handleStatus}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Graduated">Graduated</option>
          </select>
        </div>

        <button
          onClick={clearFilters}
          className="clear-button"
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
          Loading students...
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="table-container">
            <table>

              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {students.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student._id}>

                      <td>
                        {student.studentId}
                      </td>

                      <td>
                        {student.firstName}{" "}
                        {student.lastName}
                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        {student.phone}
                      </td>

                      <td>
                        {student.course}
                      </td>

                      <td>
                        {student.department}
                      </td>

                      <td>
                        {student.semester}
                      </td>

                      <td>
                        <span
                          className={`status ${student.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {student.status}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">

                          <Link
                            to={`/students/${student._id}`}
                            className="view-btn"
                          >
                            View
                          </Link>

                          <Link
                            to={`/students/edit/${student._id}`}
                            className="edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(student._id)
                            }
                            className="delete-btn"
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
                disabled={!pagination.hasPreviousPage}
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
              >
                ← Previous
              </button>

              <div className="page-numbers">

                {Array.from(
                  {
                    length: pagination.totalPages,
                  },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() =>
                      setPage(pageNumber)
                    }
                    className={
                      page === pageNumber
                        ? "active"
                        : ""
                    }
                  >
                    {pageNumber}
                  </button>
                ))}

              </div>

              <button
                disabled={!pagination.hasNextPage}
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
              >
                Next →
              </button>

            </div>
          )}

          {/* Page Information */}
          <div className="pagination-info">
            Page {pagination.currentPage} of{" "}
            {pagination.totalPages} —{" "}
            {pagination.totalStudents} students
          </div>
        </>
      )}

    </div>
  );
};

export default Students;