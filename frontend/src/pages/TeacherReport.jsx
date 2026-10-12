import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  Printer,
} from "lucide-react";

import {
  getTeacherReport,
} from "../services/reportService";

import "../index.css";

const TeacherReport = () => {
  const [teachers, setTeachers] = useState([]);

  const [pagination, setPagination] =
    useState({
      currentPage: 1,
      totalPages: 1,
      totalTeachers: 0,
      perPage: 10,
    });

  const [filters, setFilters] = useState({
    search: "",
    department: "",
    subject: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTeachers = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const data = await getTeacherReport({
        ...filters,
        page,
        limit: 10,
      });

      setTeachers(data.data || []);

      setPagination(
        data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalTeachers: 0,
          perPage: 10,
        }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load teacher report"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadInitialReport = async () => {
      try {
        const data = await getTeacherReport({
          search: "",
          department: "",
          subject: "",
          status: "",
          page: 1,
          limit: 10,
        });

        if (active) {
          setTeachers(data.data || []);
          setPagination(
            data.pagination || {
              currentPage: 1,
              totalPages: 1,
              totalTeachers: 0,
              perPage: 10,
            }
          );
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Failed to load teacher report"
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
    loadTeachers(1);
  };

  const handleReset = () => {
    const reset = {
      search: "",
      department: "",
      subject: "",
      status: "",
    };

    setFilters(reset);

    setTimeout(() => {
      loadTeachers(1);
    }, 0);
  };

  return (
    <section className="teacher-report-page">
      <div className="teacher-report-header">
        <div>
          <p className="teacher-report-eyebrow">
            Reports
          </p>

          <h1>Teacher Report</h1>

          <p>
            Search and filter complete teacher
            information.
          </p>
        </div>

        <button
          type="button"
          className="teacher-report-print-btn"
          onClick={() => window.print()}
        >
          <Printer size={17} />
          Print
        </button>
      </div>

      <div className="teacher-report-filters">
        <form
          onSubmit={handleSearch}
          className="teacher-report-search-box"
        >
          <Search size={17} />

          <input
            type="text"
            name="search"
            placeholder="Search teacher..."
            value={filters.search}
            onChange={handleChange}
          />
        </form>

        <select
          name="department"
          value={filters.department}
          onChange={handleChange}
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

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={filters.subject}
          onChange={handleChange}
          className="teacher-report-subject"
        />

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
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

        <button
          type="button"
          className="teacher-report-search-btn"
          onClick={() => loadTeachers(1)}
        >
          Search
        </button>

        <button
          type="button"
          className="teacher-report-reset-btn"
          onClick={handleReset}
        >
          <RefreshCw size={15} />
          Reset
        </button>
      </div>

      <div className="teacher-report-card">
        <div className="teacher-report-card-header">
          <div>
            <h2>Teachers</h2>

            <span>
              Total:{" "}
              {pagination.totalTeachers}
            </span>
          </div>
        </div>

        {error && (
          <div className="teacher-report-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="teacher-report-loading">
            Loading teachers...
          </div>
        ) : (
          <div className="teacher-report-table-wrapper">
            <table className="teacher-report-table">
              <thead>
                <tr>
                  <th>Teacher ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Qualification</th>
                  <th>Experience</th>
                  <th>Department</th>
                  <th>Subject</th>
                  <th>Salary</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {teachers.length > 0 ? (
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
                        {teacher.experience}
                      </td>

                      <td>
                        {teacher.department}
                      </td>

                      <td>
                        {teacher.subject}
                      </td>

                      <td>
                        ₹
                        {Number(
                          teacher.salary || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>
                        <span
                          className={`teacher-report-status ${teacher.status.toLowerCase()}`}
                        >
                          {teacher.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="teacher-report-empty"
                    >
                      No teachers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading &&
          pagination.totalPages > 1 && (
            <div className="teacher-report-pagination">
              <button
                type="button"
                disabled={
                  pagination.currentPage <= 1
                }
                onClick={() =>
                  loadTeachers(
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
                  loadTeachers(
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

export default TeacherReport;