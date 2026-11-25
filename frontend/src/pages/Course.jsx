import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

import {
  getCourses,
  deleteCourse,
} from "../services/courseServices";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCourses: 0,
    perPage: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCourses({
        search,
        status,
        page,
        limit,
      });

      setError("");
      setCourses(response.data || []);

      setPagination(
        response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalCourses: 0,
          perPage: 10,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load courses"
      );
    } finally {
      setLoading(false);
    }
  }, [search, status, page, limit]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetchCourses();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [fetchCourses]);

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
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete course"
      );
    }
  };

  return (
    <div className="courses-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Courses</h1>

          <p>
            Total Courses:{" "}
            <strong>
              {pagination.totalCourses}
            </strong>
          </p>
        </div>

        <Link
          to="/courses/add"
          className="add-button"
        >
          + Add Course
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="filter-section">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search course ID, name, code, department..."
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
          Loading courses...
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Course Code</th>
                  <th>Department</th>
                  <th>Duration</th>
                  <th>Semesters</th>
                  <th>Fees</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {courses.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No courses found
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course._id}>

                      <td>
                        {course.courseId}
                      </td>

                      <td>
                        {course.courseName}
                      </td>

                      <td>
                        {course.courseCode}
                      </td>

                      <td>
                        {course.department}
                      </td>

                      <td>
                        {course.duration} years
                      </td>

                      <td>
                        {course.semesters}
                      </td>

                      <td>
                        ₹{course.fees}
                      </td>

                      <td>
                        <span
                          className={`status ${course.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {course.status}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">

                          <Link
                            to={`/courses/${course._id}`}
                            className="view-btn"
                          >
                            View
                          </Link>

                          <Link
                            to={`/courses/edit/${course._id}`}
                            className="edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                course._id
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
            {pagination.totalCourses} courses
          </div>

        </>
      )}

    </div>
  );
};

export default Courses;