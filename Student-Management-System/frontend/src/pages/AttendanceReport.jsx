import { useCallback, useEffect, useState } from "react";
import "../index.css";

import {
  getAttendanceReport,
} from "../services/attendanceReportService";

import { getStudents } from "../services/studentService";

const AttendanceReport = () => {
  const [students, setStudents] = useState([]);
  const [report, setReport] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  // Load report
  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAttendanceReport({
          studentId,
          subject,
          semester,
          startDate,
          endDate,
        });

      setError("");
      setReport(response.data || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load attendance report"
      );
    } finally {
      setLoading(false);
    }
  }, [studentId, subject, semester, startDate, endDate]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetchReport();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [fetchReport]);

  const clearFilters = () => {
    setStudentId("");
    setSubject("");
    setSemester("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="attendance-report-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Attendance Report</h1>

          <p>
            Students:{" "}
            <strong>{report.length}</strong>
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-section">

        <div className="filter-item">
          <label>Student</label>

          <select
            value={studentId}
            onChange={(e) =>
              setStudentId(e.target.value)
            }
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

        <div className="filter-item">
          <label>Subject</label>

          <input
            type="text"
            placeholder="Subject..."
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
          />
        </div>

        <div className="filter-item">
          <label>Semester</label>

          <select
            value={semester}
            onChange={(e) =>
              setSemester(e.target.value)
            }
          >
            <option value="">
              All Semesters
            </option>

            {[1, 2, 3, 4, 5, 6, 7, 8].map(
              (number) => (
                <option
                  key={number}
                  value={number}
                >
                  Semester {number}
                </option>
              )
            )}
          </select>
        </div>

        <div className="filter-item">
          <label>From Date</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
          />
        </div>

        <div className="filter-item">
          <label>To Date</label>

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
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
          Generating report...
        </div>
      ) : (
        <>
          {/* Report Table */}
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Total</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Late</th>
                  <th>Leave</th>
                  <th>Percentage</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {report.length === 0 ? (
                  <tr>
                    <td
                      colSpan="11"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No attendance data found
                    </td>
                  </tr>
                ) : (
                  report.map((student) => (
                    <tr key={student.studentId}>

                      <td>
                        {student.studentCode}
                      </td>

                      <td>
                        {student.studentName}
                      </td>

                      <td>
                        {student.course}
                      </td>

                      <td>
                        {student.semester}
                      </td>

                      <td>
                        {student.totalClasses}
                      </td>

                      <td>
                        {student.present}
                      </td>

                      <td>
                        {student.absent}
                      </td>

                      <td>
                        {student.late}
                      </td>

                      <td>
                        {student.leave}
                      </td>

                      <td>
                        <strong>
                          {
                            student.attendancePercentage
                          }
                          %
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`report-status ${student.attendanceStatus.toLowerCase()}`}
                        >
                          {student.attendanceStatus}
                        </span>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>
        </>
      )}

    </div>
  );
};

export default AttendanceReport;