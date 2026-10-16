import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  Printer,
  Award,
  CheckCircle,
  XCircle,
  UserX,
} from "lucide-react";

import {
  getExamReport,
} from "../services/reportService";

import "../index.css";

const ExamReport = () => {
  const [exams, setExams] = useState([]);

  const [summary, setSummary] = useState({
    totalExams: 0,
    passCount: 0,
    failCount: 0,
    absentCount: 0,
    averagePercentage: 0,
    passPercentage: 0,
  });

  const [pagination, setPagination] =
    useState({
      currentPage: 1,
      totalPages: 1,
      totalExams: 0,
      perPage: 10,
    });

  const [filters, setFilters] = useState({
    search: "",
    academicYear: "",
    semester: "",
    subject: "",
    grade: "",
    resultStatus: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadExams = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const data = await getExamReport({
        ...filters,
        page,
        limit: 10,
      });

      setExams(data.data || []);

      setSummary(
        data.summary || {
          totalExams: 0,
          passCount: 0,
          failCount: 0,
          absentCount: 0,
          averagePercentage: 0,
          passPercentage: 0,
        }
      );

      setPagination(
        data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalExams: 0,
          perPage: 10,
        }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load exam report"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadInitialReport = async () => {
      try {
        const data = await getExamReport({
          search: "",
          academicYear: "",
          semester: "",
          subject: "",
          grade: "",
          resultStatus: "",
          page: 1,
          limit: 10,
        });

        if (active) {
          setExams(data.data || []);
          setSummary(
            data.summary || {
              totalExams: 0,
              passCount: 0,
              failCount: 0,
              absentCount: 0,
              averagePercentage: 0,
              passPercentage: 0,
            }
          );
          setPagination(
            data.pagination || {
              currentPage: 1,
              totalPages: 1,
              totalExams: 0,
              perPage: 10,
            }
          );
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Failed to load exam report"
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
    loadExams(1);
  };

  const handleReset = () => {
    const reset = {
      search: "",
      academicYear: "",
      semester: "",
      subject: "",
      grade: "",
      resultStatus: "",
    };

    setFilters(reset);

    setTimeout(() => {
      loadExams(1);
    }, 0);
  };

  const getResultClass = (status) => {
    if (status === "Pass") {
      return "pass";
    }

    if (status === "Fail") {
      return "fail";
    }

    return "absent";
  };

  return (
    <section className="exam-report-page">
      <div className="exam-report-header">
        <div>
          <p className="exam-report-eyebrow">
            Reports
          </p>

          <h1>Exam & Results Report</h1>

          <p>
            Analyze examination results,
            grades and student performance.
          </p>
        </div>

        <button
          type="button"
          className="exam-report-print-btn"
          onClick={() => window.print()}
        >
          <Printer size={17} />
          Print
        </button>
      </div>

      <div className="exam-report-summary">
        <div className="exam-summary-card">
          <div className="exam-summary-icon">
            <Award size={19} />
          </div>

          <div>
            <span>Total Exams</span>
            <strong>
              {summary.totalExams}
            </strong>
          </div>
        </div>

        <div className="exam-summary-card">
          <div className="exam-summary-icon">
            <CheckCircle size={19} />
          </div>

          <div>
            <span>Passed</span>
            <strong>
              {summary.passCount}
            </strong>
          </div>
        </div>

        <div className="exam-summary-card">
          <div className="exam-summary-icon">
            <XCircle size={19} />
          </div>

          <div>
            <span>Failed</span>
            <strong>
              {summary.failCount}
            </strong>
          </div>
        </div>

        <div className="exam-summary-card">
          <div className="exam-summary-icon">
            <UserX size={19} />
          </div>

          <div>
            <span>Absent</span>
            <strong>
              {summary.absentCount}
            </strong>
          </div>
        </div>

        <div className="exam-summary-card">
          <div className="exam-summary-icon">
            %
          </div>

          <div>
            <span>Average</span>
            <strong>
              {summary.averagePercentage}%
            </strong>
          </div>
        </div>

        <div className="exam-summary-card">
          <div className="exam-summary-icon">
            %
          </div>

          <div>
            <span>Pass Rate</span>
            <strong>
              {summary.passPercentage}%
            </strong>
          </div>
        </div>
      </div>

      <div className="exam-report-filters">
        <form
          onSubmit={handleSearch}
          className="exam-report-search-box"
        >
          <Search size={17} />

          <input
            type="text"
            name="search"
            placeholder="Search student / exam..."
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

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={filters.subject}
          onChange={handleChange}
          className="exam-report-subject"
        />

        <select
          name="grade"
          value={filters.grade}
          onChange={handleChange}
        >
          <option value="">
            All Grades
          </option>

          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>

        <select
          name="resultStatus"
          value={filters.resultStatus}
          onChange={handleChange}
        >
          <option value="">
            All Results
          </option>

          <option value="Pass">
            Pass
          </option>

          <option value="Fail">
            Fail
          </option>

          <option value="Absent">
            Absent
          </option>
        </select>

        <button
          type="submit"
          className="exam-report-search-btn"
        >
          Search
        </button>

        <button
          type="button"
          className="exam-report-reset-btn"
          onClick={handleReset}
        >
          <RefreshCw size={15} />
          Reset
        </button>
      </div>

      <div className="exam-report-card">
        <div className="exam-report-card-header">
          <div>
            <h2>Exam Records</h2>

            <span>
              Total Records:{" "}
              {pagination.totalExams}
            </span>
          </div>
        </div>

        {error && (
          <div className="exam-report-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="exam-report-loading">
            Loading exam records...
          </div>
        ) : (
          <div className="exam-report-table-wrapper">
            <table className="exam-report-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Exam</th>
                  <th>Subject</th>
                  <th>Academic Year</th>
                  <th>Semester</th>
                  <th>Exam Date</th>
                  <th>Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Result</th>
                </tr>
              </thead>

              <tbody>
                {exams.length > 0 ? (
                  exams.map((exam) => {
                    const student =
                      exam.studentId;

                    return (
                      <tr key={exam._id}>
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
                          {exam.examName}
                        </td>

                        <td>
                          {exam.subject}
                        </td>

                        <td>
                          {exam.academicYear}
                        </td>

                        <td>
                          {exam.semester}
                        </td>

                        <td>
                          {exam.examDate
                            ? new Date(
                                exam.examDate
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}
                        </td>

                        <td>
                          {exam.marksObtained}/
                          {exam.totalMarks}
                        </td>

                        <td>
                          {Number(
                            exam.percentage || 0
                          ).toFixed(2)}
                          %
                        </td>

                        <td>
                          <span
                            className={`exam-report-grade grade-${exam.grade
                              .replace("+", "plus")
                              .toLowerCase()}`}
                          >
                            {exam.grade}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`exam-report-result ${getResultClass(
                              exam.resultStatus
                            )}`}
                          >
                            {exam.resultStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="11"
                      className="exam-report-empty"
                    >
                      No exam records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading &&
          pagination.totalPages > 1 && (
            <div className="exam-report-pagination">
              <button
                type="button"
                disabled={
                  pagination.currentPage <= 1
                }
                onClick={() =>
                  loadExams(
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
                  loadExams(
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

export default ExamReport;