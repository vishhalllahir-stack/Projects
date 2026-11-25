import { useCallback, useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
  RotateCcw,
} from "lucide-react";

import {
  getExams,
  deleteExam,
} from "../services/examService";


function Exams() {
  const [exams, setExams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [resultStatus, setResultStatus] =
    useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalExams: 0,
    perPage: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [summary, setSummary] = useState({
    totalExams: 0,
    passCount: 0,
    failCount: 0,
    absentCount: 0,
    averagePercentage: 0,
    passPercentage: 0,
  });

  // =========================================
  // LOAD EXAMS
  // =========================================

  const loadExams = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getExams({
        search,
        academicYear,
        semester,
        subject,
        grade,
        resultStatus,
        page,
        limit: 10,
      });

      setError("");
      setExams(response.data || []);

      setPagination(
        response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalExams: 0,
          perPage: 10,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );

      setSummary(
        response.summary || {
          totalExams: 0,
          passCount: 0,
          failCount: 0,
          absentCount: 0,
          averagePercentage: 0,
          passPercentage: 0,
        }
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load exams"
      );
    } finally {
      setLoading(false);
    }
  }, [
    search,
    academicYear,
    semester,
    subject,
    grade,
    resultStatus,
    page,
  ]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      loadExams();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadExams]);

  // =========================================
  // DELETE EXAM
  // =========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exam record?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteExam(id);

      alert(
        "Exam record deleted successfully"
      );

      if (
        exams.length === 1 &&
        page > 1
      ) {
        setPage((prev) => prev - 1);
      } else {
        loadExams();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete exam"
      );
    }
  };

  // =========================================
  // CLEAR FILTERS
  // =========================================

  const clearFilters = () => {
    setSearch("");
    setAcademicYear("");
    setSemester("");
    setSubject("");
    setGrade("");
    setResultStatus("");
    setPage(1);
  };

  // =========================================
  // FORMAT PERCENTAGE
  // =========================================

  const formatPercentage = (value) => {
    return `${Number(value || 0).toFixed(2)}%`;
  };

  // =========================================
  // RESULT STATUS CLASS
  // =========================================

  const getResultClass = (status) => {
    if (status === "Pass") {
      return "exam-result pass";
    }

    if (status === "Absent") {
      return "exam-result absent";
    }

    return "exam-result fail";
  };

  // =========================================
  // GRADE CLASS
  // =========================================

  const getGradeClass = (gradeValue) => {
    if (
      gradeValue === "A+" ||
      gradeValue === "A"
    ) {
      return "exam-grade excellent";
    }

    if (
      gradeValue === "B+" ||
      gradeValue === "B"
    ) {
      return "exam-grade good";
    }

    if (gradeValue === "C") {
      return "exam-grade average";
    }

    if (gradeValue === "D") {
      return "exam-grade pass";
    }

    return "exam-grade fail";
  };

  return (
    <section className="exams-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="exams-header">
        <div>
          <p className="exams-eyebrow">
            ACADEMIC MANAGEMENT
          </p>

          <h1>Exams & Results</h1>

          <p className="exams-description">
            Manage examinations, marks, grades
            and student results.
          </p>
        </div>

        <Link
          to="/exams/add"
          className="exams-add-button"
        >
          <Plus size={18} />
          Add Exam
        </Link>
      </div>

      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div className="exams-error">
          {error}
        </div>
      )}

      {/* =====================================
          SUMMARY
      ===================================== */}

      <div className="exam-summary-grid">

        <div className="exam-summary-card total">
          <div className="exam-card-icon">
            #
          </div>

          <div>
            <p>Total Exams</p>
            <h2>
              {summary.totalExams}
            </h2>
          </div>
        </div>

        <div className="exam-summary-card pass">
          <div className="exam-card-icon">
            ✓
          </div>

          <div>
            <p>Passed</p>
            <h2>
              {summary.passCount}
            </h2>
          </div>
        </div>

        <div className="exam-summary-card fail">
          <div className="exam-card-icon">
            !
          </div>

          <div>
            <p>Failed</p>
            <h2>
              {summary.failCount}
            </h2>
          </div>
        </div>

        <div className="exam-summary-card absent">
          <div className="exam-card-icon">
            A
          </div>

          <div>
            <p>Absent</p>
            <h2>
              {summary.absentCount}
            </h2>
          </div>
        </div>

        <div className="exam-summary-card average">
          <div className="exam-card-icon">
            %
          </div>

          <div>
            <p>Average</p>
            <h2>
              {formatPercentage(
                summary.averagePercentage
              )}
            </h2>
          </div>
        </div>

        <div className="exam-summary-card pass-rate">
          <div className="exam-card-icon">
            ↑
          </div>

          <div>
            <p>Pass Rate</p>
            <h2>
              {formatPercentage(
                summary.passPercentage
              )}
            </h2>
          </div>
        </div>

      </div>

      {/* =====================================
          FILTERS
      ===================================== */}

      <div className="exams-filter-card">

        <div className="exams-filter-title">
          <h3>
            Search & Filters
          </h3>

          <button
            type="button"
            className="exams-clear-button"
            onClick={clearFilters}
          >
            <RotateCcw size={15} />
            Clear
          </button>
        </div>

        <div className="exams-filter-grid">

          {/* Search */}

          <div className="exams-search-wrapper">
            <Search size={18} />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search student, exam, subject..."
            />
          </div>

          {/* Academic Year */}

          <select
            value={academicYear}
            onChange={(e) => {
              setAcademicYear(
                e.target.value
              );
              setPage(1);
            }}
          >
            <option value="">
              All Academic Years
            </option>

            <option value="2026-2027">
              2026-2027
            </option>

            <option value="2025-2026">
              2025-2026
            </option>

            <option value="2024-2025">
              2024-2025
            </option>
          </select>

          {/* Semester */}

          <select
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value);
              setPage(1);
            }}
          >
            <option value="">
              All Semesters
            </option>

            {[1, 2, 3, 4, 5, 6, 7, 8].map(
              (sem) => (
                <option
                  key={sem}
                  value={sem}
                >
                  Semester {sem}
                </option>
              )
            )}
          </select>

          {/* Subject */}

          <input
            className="exams-subject-input"
            type="text"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setPage(1);
            }}
            placeholder="Subject"
          />

          {/* Grade */}

          <select
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              setPage(1);
            }}
          >
            <option value="">
              All Grades
            </option>

            <option value="A+">
              A+
            </option>

            <option value="A">
              A
            </option>

            <option value="B+">
              B+
            </option>

            <option value="B">
              B
            </option>

            <option value="C">
              C
            </option>

            <option value="D">
              D
            </option>

            <option value="F">
              F
            </option>
          </select>

          {/* Result */}

          <select
            value={resultStatus}
            onChange={(e) => {
              setResultStatus(
                e.target.value
              );
              setPage(1);
            }}
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

        </div>
      </div>

      {/* =====================================
          TABLE
      ===================================== */}

      <div className="exams-table-card">

        <div className="exams-table-header">
          <div>
            <h3>
              Examination Records
            </h3>

            <p>
              {pagination.totalExams} total
              records
            </p>
          </div>
        </div>

        <div className="exams-table-wrapper">

          <table className="exams-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Exam</th>
                <th>Subject</th>
                <th>Year</th>
                <th>Semester</th>
                <th>Marks</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th>Result</th>
                <th>Exam Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="11"
                    className="exams-empty"
                  >
                    Loading exams...
                  </td>
                </tr>
              ) : exams.length === 0 ? (
                <tr>
                  <td
                    colSpan="11"
                    className="exams-empty"
                  >
                    No exam records found.
                  </td>
                </tr>
              ) : (
                exams.map((exam) => {

                  const student =
                    exam.studentId;

                  return (
                    <tr key={exam._id}>

                      {/* Student */}

                      <td>
                        <div className="exam-student">

                          <strong>
                            {student
                              ? `${student.firstName} ${student.lastName}`
                              : "Unknown Student"}
                          </strong>

                          <span>
                            {student?.studentId ||
                              "-"}
                          </span>

                        </div>
                      </td>

                      {/* Exam */}

                      <td>
                        <strong>
                          {exam.examName ||
                            "-"}
                        </strong>
                      </td>

                      {/* Subject */}

                      <td>
                        {exam.subject || "-"}
                      </td>

                      {/* Year */}

                      <td>
                        {exam.academicYear ||
                          "-"}
                      </td>

                      {/* Semester */}

                      <td>
                        {exam.semester
                          ? `Sem ${exam.semester}`
                          : "-"}
                      </td>

                      {/* Marks */}

                      <td>
                        <strong>
                          {exam.marksObtained ??
                            0}
                        </strong>
                        {" / "}
                        {exam.totalMarks ??
                          0}
                      </td>

                      {/* Percentage */}

                      <td>
                        <strong>
                          {formatPercentage(
                            exam.percentage
                          )}
                        </strong>
                      </td>

                      {/* Grade */}

                      <td>
                        <span
                          className={getGradeClass(
                            exam.grade
                          )}
                        >
                          {exam.grade || "-"}
                        </span>
                      </td>

                      {/* Result */}

                      <td>
                        <span
                          className={getResultClass(
                            exam.resultStatus
                          )}
                        >
                          {exam.resultStatus ||
                            "-"}
                        </span>
                      </td>

                      {/* Date */}

                      <td>
                        {exam.examDate
                          ? new Date(
                              exam.examDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "-"}
                      </td>

                      {/* Actions */}

                      <td>

                        <div className="exams-actions">

                          <Link
                            to={`/exams/${exam._id}`}
                            className="exam-action view"
                            title="View"
                          >
                            <Eye size={16} />
                          </Link>

                          <Link
                            to={`/exams/edit/${exam._id}`}
                            className="exam-action edit"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </Link>

                          <button
                            type="button"
                            className="exam-action delete"
                            title="Delete"
                            onClick={() =>
                              handleDelete(
                                exam._id
                              )
                            }
                          >
                            <Trash2
                              size={16}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })
              )}

            </tbody>

          </table>

        </div>

        {/* =====================================
            PAGINATION
        ===================================== */}

        <div className="exams-pagination">

          <span>
            Page{" "}
            {pagination.currentPage} of{" "}
            {pagination.totalPages}
          </span>

          <div>

            <button
              type="button"
              disabled={
                !pagination.hasPreviousPage ||
                loading
              }
              onClick={() =>
                setPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
            >
              Previous
            </button>

            <button
              type="button"
              disabled={
                !pagination.hasNextPage ||
                loading
              }
              onClick={() =>
                setPage((prev) =>
                  prev + 1
                )
              }
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Exams;