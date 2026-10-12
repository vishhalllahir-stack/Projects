import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  Printer,
} from "lucide-react";

import { getStudentReport } from "../services/reportService";

import "../index.css";

const StudentReport = () => {
  const [students, setStudents] = useState([]);

  const [pagination, setPagination] =
    useState({
      currentPage: 1,
      totalPages: 1,
      totalStudents: 0,
      perPage: 10,
    });

  const [filters, setFilters] = useState({
    search: "",
    course: "",
    department: "",
    status: "",
    semester: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = async (
    page = 1
  ) => {
    try {
      setLoading(true);
      setError("");

      const data = await getStudentReport({
        ...filters,
        page,
        limit: 10,
      });

      setStudents(data.data || []);

      setPagination(
        data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalStudents: 0,
          perPage: 10,
        }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load student report"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadInitialReport = async () => {
      try {
        const data = await getStudentReport({
          search: "",
          course: "",
          department: "",
          status: "",
          semester: "",
          page: 1,
          limit: 10,
        });

        if (active) {
          setStudents(data.data || []);
          setPagination(
            data.pagination || {
              currentPage: 1,
              totalPages: 1,
              totalStudents: 0,
              perPage: 10,
            }
          );
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Failed to load student report"
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadStudents(1);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      course: "",
      department: "",
      status: "",
      semester: "",
    };

    setFilters(resetFilters);

    setTimeout(() => {
      loadStudents(1);
    }, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="student-report-page">
      <div className="student-report-header">
        <div>
          <p className="student-report-eyebrow">
            Reports
          </p>

          <h1>Student Report</h1>

          <p>
            Search and filter complete student
            information.
          </p>
        </div>

        <button
          type="button"
          className="student-report-print-btn"
          onClick={handlePrint}
        >
          <Printer size={17} />
          Print
        </button>
      </div>

      <div className="student-report-filters">
        <form onSubmit={handleSearch}>
          <div className="student-report-search">
            <Search size={17} />

            <input
              type="text"
              name="search"
              placeholder="Search student..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
        </form>

        <select
          name="course"
          value={filters.course}
          onChange={handleFilterChange}
        >
          <option value="">
            All Courses
          </option>

          <option value="BCA">BCA</option>
          <option value="BBA">BBA</option>
          <option value="MCA">MCA</option>
          <option value="MBA">MBA</option>
        </select>

        <select
          name="department"
          value={filters.department}
          onChange={handleFilterChange}
        >
          <option value="">
            All Departments
          </option>

          <option value="Computer">
            Computer
          </option>

          <option value="Management">
            Management
          </option>

          <option value="Commerce">
            Commerce
          </option>
        </select>

        <select
          name="semester"
          value={filters.semester}
          onChange={handleFilterChange}
        >
          <option value="">
            All Semesters
          </option>

          {[1, 2, 3, 4, 5, 6, 7, 8].map(
            (semester) => (
              <option
                key={semester}
                value={semester}
              >
                Semester {semester}
              </option>
            )
          )}
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
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

          <option value="Graduated">
            Graduated
          </option>
        </select>

        <button
          type="button"
          className="student-report-filter-btn"
          onClick={() => loadStudents(1)}
        >
          Search
        </button>

        <button
          type="button"
          className="student-report-reset-btn"
          onClick={handleReset}
        >
          <RefreshCw size={15} />
          Reset
        </button>
      </div>

      <div className="student-report-card">
        <div className="student-report-card-header">
          <div>
            <h2>Students</h2>

            <span>
              Total:{" "}
              {pagination.totalStudents}
            </span>
          </div>
        </div>

        {error && (
          <div className="student-report-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="student-report-loading">
            Loading students...
          </div>
        ) : (
          <div className="student-report-table-wrapper">
            <table className="student-report-table">
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
                </tr>
              </thead>

              <tbody>
                {students.length > 0 ? (
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
                          className={`student-report-status ${student.status.toLowerCase()}`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="student-report-empty"
                    >
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading &&
          pagination.totalPages > 1 && (
            <div className="student-report-pagination">
              <button
                type="button"
                disabled={
                  pagination.currentPage <= 1
                }
                onClick={() =>
                  loadStudents(
                    pagination.currentPage - 1
                  )
                }
              >
                Previous
              </button>

              <span>
                Page{" "}
                {pagination.currentPage}{" "}
                of {pagination.totalPages}
              </span>

              <button
                type="button"
                disabled={
                  pagination.currentPage >=
                  pagination.totalPages
                }
                onClick={() =>
                  loadStudents(
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

export default StudentReport;