import { useCallback, useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";

import {
  getAttendance,
  deleteAttendance,
} from "../services/attendanceService";

import { getStudents } from "../services/studentService";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalAttendance: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load students
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await getStudents({
          limit: 1000,
        });

        setStudents(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadStudents();
  }, []);

  // Load attendance
  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAttendance({
        studentId,
        subject,
        status,
        startDate,
        endDate,
        page,
        limit,
      });

      setError("");
      setAttendance(response.data || []);

      setPagination(
        response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalAttendance: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load attendance"
      );
    } finally {
      setLoading(false);
    }
  }, [studentId, subject, status, startDate, endDate, page, limit]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetchAttendance();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [fetchAttendance]);

  const handleStudent = (e) => {
    setStudentId(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleSubject = (e) => {
    setSubject(e.target.value);
    setPage(1);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
    setPage(1);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setStudentId("");
    setSubject("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAttendance(id);
      fetchAttendance();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete attendance"
      );
    }
  };

  const getStatusClass = (value) => {
    return value.toLowerCase();
  };

  return (
    <div className="attendance-page">

      {/* Header */}
      <div className="page-header">

        <div>
          <h1>Attendance</h1>

          <p>
            Total Records:{" "}
            <strong>
              {pagination.totalAttendance}
            </strong>
          </p>
        </div>

        <Link
          to="/attendance/add"
          className="add-button"
        >
          + Mark Attendance
        </Link>

      </div>

      {/* Filters */}
      <div className="filter-section">

        {/* Student */}
        <div className="filter-item">
          <label>Student</label>

          <select
            value={studentId}
            onChange={handleStudent}
          >
            <option value="">
              All Students
            </option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.studentId} -{" "}
                {student.firstName}{" "}
                {student.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="filter-item">
          <label>Subject</label>

          <input
            type="text"
            placeholder="Search subject..."
            value={subject}
            onChange={handleSubject}
          />
        </div>

        {/* Status */}
        <div className="filter-item">
          <label>Status</label>

          <select
            value={status}
            onChange={handleStatus}
          >
            <option value="">
              All Status
            </option>

            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>

            <option value="Late">
              Late
            </option>

            <option value="Leave">
              Leave
            </option>
          </select>
        </div>

        {/* Start Date */}
        <div className="filter-item">
          <label>From Date</label>

          <input
            type="date"
            value={startDate}
            onChange={handleStartDate}
          />
        </div>

        {/* End Date */}
        <div className="filter-item">
          <label>To Date</label>

          <input
            type="date"
            value={endDate}
            onChange={handleEndDate}
          />
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
          Loading attendance...
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Subject</th>
                  <th>Semester</th>
                  <th>Status</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {attendance.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  attendance.map((record) => (
                    <tr key={record._id}>

                      <td>
                        {new Date(
                          record.date
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        {record.studentId
                          ?.studentId || "—"}
                      </td>

                      <td>
                        {record.studentId
                          ? `${record.studentId.firstName} ${record.studentId.lastName}`
                          : "—"}
                      </td>

                      <td>
                        {record.studentId
                          ?.course || "—"}
                      </td>

                      <td>
                        {record.subject}
                      </td>

                      <td>
                        {record.semester}
                      </td>

                      <td>
                        <span
                          className={`attendance-status ${getStatusClass(
                            record.status
                          )}`}
                        >
                          {record.status}
                        </span>
                      </td>

                      <td>
                        {record.remarks || "—"}
                      </td>

                      <td>
                        <div className="action-buttons">

                          <Link
                            to={`/attendance/${record._id}`}
                            className="view-btn"
                          >
                            View
                          </Link>

                          <Link
                            to={`/attendance/edit/${record._id}`}
                            className="edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                record._id
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
            {pagination.totalPages}
          </div>
        </>
      )}

    </div>
  );
};

export default Attendance;