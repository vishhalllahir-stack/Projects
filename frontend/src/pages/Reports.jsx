import { useEffect, useState } from "react";
import {
  Users,
  UserRound,
  BookOpen,
  Building2,
  CalendarCheck,
  IndianRupee,
  FileText,
  RefreshCw,
} from "lucide-react";

import { getReportSummary } from "../services/reportService";

import "../index.css";

const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const Reports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadReport = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data = await getReportSummary();

      setReport(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load reports"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      loadReport();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <section className="reports-page">
        <div className="reports-loading">
          Loading reports...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="reports-page">
        <div className="reports-error">
          <p>{error}</p>

          <button
            type="button"
            onClick={() => loadReport()}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="reports-page">
      <div className="reports-header">
        <div>
          <p className="reports-eyebrow">
            Analytics
          </p>

          <h1>Reports</h1>

          <p className="reports-description">
            View complete academic and management
            statistics.
          </p>
        </div>

        <button
          type="button"
          className="reports-refresh-btn"
          onClick={() => loadReport(true)}
          disabled={refreshing}
        >
          <RefreshCw
            size={17}
            className={
              refreshing
                ? "reports-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {/* Main Summary */}
      <div className="reports-summary-grid">
        <article className="report-summary-card">
          <div className="report-summary-icon">
            <Users size={22} />
          </div>

          <div>
            <span>Total Students</span>
            <strong>
              {report.students.total}
            </strong>
            <small>
              {report.students.active} active
            </small>
          </div>
        </article>

        <article className="report-summary-card">
          <div className="report-summary-icon">
            <UserRound size={22} />
          </div>

          <div>
            <span>Total Teachers</span>
            <strong>
              {report.teachers.total}
            </strong>
            <small>
              {report.teachers.active} active
            </small>
          </div>
        </article>

        <article className="report-summary-card">
          <div className="report-summary-icon">
            <BookOpen size={22} />
          </div>

          <div>
            <span>Total Courses</span>
            <strong>
              {report.courses.total}
            </strong>
            <small>
              {report.courses.active} active
            </small>
          </div>
        </article>

        <article className="report-summary-card">
          <div className="report-summary-icon">
            <Building2 size={22} />
          </div>

          <div>
            <span>Departments</span>
            <strong>
              {report.departments.total}
            </strong>
            <small>
              {report.departments.active} active
            </small>
          </div>
        </article>
      </div>

      {/* Students */}
      <div className="reports-section-grid">
        <article className="reports-panel">
          <div className="reports-panel-header">
            <div>
              <h2>Student Report</h2>
              <p>
                Current student status overview
              </p>
            </div>

            <Users size={20} />
          </div>

          <div className="report-stat-list">
            <div>
              <span>Total Students</span>
              <strong>
                {report.students.total}
              </strong>
            </div>

            <div>
              <span>Active</span>
              <strong>
                {report.students.active}
              </strong>
            </div>

            <div>
              <span>Inactive</span>
              <strong>
                {report.students.inactive}
              </strong>
            </div>

            <div>
              <span>Graduated</span>
              <strong>
                {report.students.graduated}
              </strong>
            </div>
          </div>
        </article>

        {/* Teachers */}
        <article className="reports-panel">
          <div className="reports-panel-header">
            <div>
              <h2>Teacher Report</h2>
              <p>
                Current teacher status overview
              </p>
            </div>

            <UserRound size={20} />
          </div>

          <div className="report-stat-list">
            <div>
              <span>Total Teachers</span>
              <strong>
                {report.teachers.total}
              </strong>
            </div>

            <div>
              <span>Active</span>
              <strong>
                {report.teachers.active}
              </strong>
            </div>

            <div>
              <span>Inactive</span>
              <strong>
                {report.teachers.inactive}
              </strong>
            </div>
          </div>
        </article>
      </div>

      {/* Attendance + Fees */}
      <div className="reports-section-grid">
        <article className="reports-panel">
          <div className="reports-panel-header">
            <div>
              <h2>Attendance Report</h2>
              <p>
                Overall attendance statistics
              </p>
            </div>

            <CalendarCheck size={20} />
          </div>

          <div className="report-percentage">
            <strong>
              {report.attendance.percentage}%
            </strong>

            <span>Overall Attendance</span>
          </div>

          <div className="report-stat-list">
            <div>
              <span>Total Records</span>
              <strong>
                {report.attendance.total}
              </strong>
            </div>

            <div>
              <span>Present</span>
              <strong>
                {report.attendance.present}
              </strong>
            </div>

            <div>
              <span>Absent</span>
              <strong>
                {report.attendance.absent}
              </strong>
            </div>

            <div>
              <span>Late</span>
              <strong>
                {report.attendance.late}
              </strong>
            </div>

            <div>
              <span>Leave</span>
              <strong>
                {report.attendance.leave}
              </strong>
            </div>
          </div>
        </article>

        <article className="reports-panel">
          <div className="reports-panel-header">
            <div>
              <h2>Fees Report</h2>
              <p>
                Overall fee collection status
              </p>
            </div>

            <IndianRupee size={20} />
          </div>

          <div className="fee-report-main">
            <span>Total Fees</span>

            <strong>
              {formatCurrency(
                report.fees.total
              )}
            </strong>
          </div>

          <div className="report-stat-list">
            <div>
              <span>Paid</span>
              <strong>
                {formatCurrency(
                  report.fees.paid
                )}
              </strong>
            </div>

            <div>
              <span>Pending</span>
              <strong>
                {formatCurrency(
                  report.fees.pending
                )}
              </strong>
            </div>
          </div>
        </article>
      </div>

      {/* Exam Report */}
      <article className="reports-panel reports-exam-panel">
        <div className="reports-panel-header">
          <div>
            <h2>Exam & Result Report</h2>
            <p>
              Overall examination performance
            </p>
          </div>

          <FileText size={20} />
        </div>

        <div className="exam-report-grid">
          <div>
            <span>Total Exams</span>
            <strong>
              {report.exams.total}
            </strong>
          </div>

          <div>
            <span>Passed</span>
            <strong>
              {report.exams.pass}
            </strong>
          </div>

          <div>
            <span>Failed</span>
            <strong>
              {report.exams.fail}
            </strong>
          </div>

          <div>
            <span>Absent</span>
            <strong>
              {report.exams.absent}
            </strong>
          </div>

          <div>
            <span>Average</span>
            <strong>
              {report.exams.averagePercentage}%
            </strong>
          </div>

          <div>
            <span>Pass Rate</span>
            <strong>
              {report.exams.passPercentage}%
            </strong>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Reports;