import { useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";

import { getDashboardStats } from "../services/DashboardService";
import {
  Users,
  UserRoundCheck,
  BookOpen,
  Building2,
  RefreshCw,
  ArrowUpRight,
  IndianRupee,
  CalendarCheck2,
  ClipboardList,
  UserPlus,
} from "lucide-react";
import campusStudents from "../assets/campus-students.jpg";
import campusClassroom from "../assets/campus-classroom.jpg";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const result =
        await getDashboardStats();

      setData(result);
      setError("");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      loadDashboard();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-message" role="alert">{error}</div>
        <button type="button" className="refresh-btn" onClick={loadDashboard}>
          <RefreshCw size={15} aria-hidden="true" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Student Management System
          </p>
        </div>

        <button onClick={loadDashboard} className="refresh-btn">
          <RefreshCw size={15} aria-hidden="true" />
          Refresh Data
        </button>
      </div>

      <section className="dashboard-welcome" aria-label="Campus welcome">
        <div className="dashboard-welcome-copy">
          <span className="dashboard-welcome-eyebrow">Your campus at a glance</span>
          <h2>Every student&apos;s journey starts here.</h2>
          <p>Keep your people, classes, and campus life connected in one place.</p>
        </div>
        <div className="dashboard-welcome-gallery" aria-label="Students learning together">
          <img className="dashboard-welcome-main-image" src={campusStudents} alt="Students collaborating in a campus library" />
          <img className="dashboard-welcome-detail-image" src={campusClassroom} alt="Students learning together in a classroom" />
        </div>
      </section>

      <section
        className="dashboard-campus-story"
        aria-label="Campus overview"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(33, 27, 45, .94) 0%, rgba(48, 40, 63, .84) 52%, rgba(48, 40, 63, .28) 100%), url("${campusClassroom}")`,
        }}
      >
        <div className="dashboard-campus-story-copy">
          <span className="dashboard-welcome-eyebrow">A connected campus</span>
          <h2>More clarity for every part of student life.</h2>
          <p>
            Follow {data.statistics.totalStudents} students and{" "}
            {data.statistics.totalTeachers} teachers across{" "}
            {data.statistics.totalCourses} courses and{" "}
            {data.statistics.totalDepartments} departments. Keep academic
            records, attendance, and results easy to find.
          </p>
          <div className="dashboard-campus-links">
            <Link to="/students">Student records <ArrowUpRight size={14} /></Link>
            <Link to="/courses">Explore courses <ArrowUpRight size={14} /></Link>
            <Link to="/attendance">View attendance <ArrowUpRight size={14} /></Link>
          </div>
        </div>
      </section>

      <section className="dashboard-actions-section" aria-labelledby="dashboard-actions-title">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-welcome-eyebrow">Get things done</span>
            <h2 id="dashboard-actions-title">Quick actions</h2>
            <p>Jump straight to a common campus task.</p>
          </div>
        </div>
        <div className="dashboard-actions-grid">
          <Link className="dashboard-action-card" to="/students/add">
            <span className="dashboard-action-icon dashboard-action-icon-students"><UserPlus size={20} /></span>
            <span className="dashboard-action-copy"><strong>Add a student</strong><small>Create a student record</small></span>
            <ArrowUpRight className="dashboard-action-arrow" size={17} />
          </Link>
          <Link className="dashboard-action-card" to="/attendance/add">
            <span className="dashboard-action-icon dashboard-action-icon-attendance"><CalendarCheck2 size={20} /></span>
            <span className="dashboard-action-copy"><strong>Mark attendance</strong><small>Record today&apos;s attendance</small></span>
            <ArrowUpRight className="dashboard-action-arrow" size={17} />
          </Link>
          <Link className="dashboard-action-card" to="/exams/add">
            <span className="dashboard-action-icon dashboard-action-icon-exams"><ClipboardList size={20} /></span>
            <span className="dashboard-action-copy"><strong>Add an exam</strong><small>Schedule an assessment</small></span>
            <ArrowUpRight className="dashboard-action-arrow" size={17} />
          </Link>
          <Link className="dashboard-action-card" to="/fees/add">
            <span className="dashboard-action-icon dashboard-action-icon-fees"><IndianRupee size={20} /></span>
            <span className="dashboard-action-copy"><strong>Record a fee</strong><small>Update a student&apos;s fees</small></span>
            <ArrowUpRight className="dashboard-action-arrow" size={17} />
          </Link>
        </div>
      </section>

      {/* Statistics */}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><Users size={22} /></div>

          <div>
            <h3>
              {data.statistics.totalStudents}
            </h3>

            <p>Total Students</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><UserRoundCheck size={22} /></div>

          <div>
            <h3>
              {data.statistics.totalTeachers}
            </h3>

            <p>Total Teachers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><BookOpen size={22} /></div>

          <div>
            <h3>
              {data.statistics.totalCourses}
            </h3>

            <p>Total Courses</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><Building2 size={22} /></div>

          <div>
            <h3>
              {data.statistics.totalDepartments}
            </h3>

            <p>Departments</p>
          </div>
        </div>
      </div>

      {/* Attendance + Fees */}

      <div className="dashboard-two-column">
        <div className="dashboard-card">
          <div className="dashboard-card-heading">
            <div>
              <span className="dashboard-card-kicker"><CalendarCheck2 size={13} /> Attendance</span>
              <h2>Attendance Overview</h2>
            </div>
            <span className="dashboard-mini-icon"><CalendarCheck2 size={17} /></span>
          </div>

          <div className="dashboard-number">
            {data.attendance.percentage}%
          </div>
          <div className="dashboard-progress" aria-label={`Attendance ${data.attendance.percentage}%`}>
            <span style={{ width: `${Math.min(Math.max(Number(data.attendance.percentage) || 0, 0), 100)}%` }} />
          </div>

          <p>
            Present:{" "}
            {data.attendance.present}
          </p>

          <p>
            Total Records:{" "}
            {data.attendance.total}
          </p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-heading">
            <div>
              <span className="dashboard-card-kicker"><IndianRupee size={13} /> Finance</span>
              <h2>Fee Summary</h2>
            </div>
            <span className="dashboard-mini-icon"><IndianRupee size={17} /></span>
          </div>

          <div className="fee-row">
            <span>Total Fees</span>

            <strong>
              ₹{data.fees.totalFees}
            </strong>
          </div>

          <div className="fee-row">
            <span>Paid</span>

            <strong>
              ₹{data.fees.paidFees}
            </strong>
          </div>

          <div className="fee-row">
            <span>Pending</span>

            <strong>
              ₹{data.fees.pendingFees}
            </strong>
          </div>
        </div>
      </div>

      {/* Recent Students */}

      <div className="dashboard-card">
        <div className="dashboard-card-heading">
          <div>
            <span className="dashboard-card-kicker"><Users size={13} /> Students</span>
            <h2>Recent Students</h2>
          </div>
          <Link className="dashboard-link-button" to="/students">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.recentStudents.length ===
              0 ? (
                <tr>
                  <td colSpan="6">
                    No students found
                  </td>
                </tr>
              ) : (
                data.recentStudents.map(
                  (student) => (
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
                        {student.course}
                      </td>

                      <td>
                        {student.department}
                      </td>

                      <td>
                        {student.status}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Exams */}

      <div className="dashboard-card">
        <div className="dashboard-card-heading">
          <div>
            <span className="dashboard-card-kicker"><ClipboardList size={13} /> Academics</span>
            <h2>Recent Examination Results</h2>
          </div>
          <span className="dashboard-mini-icon"><ClipboardList size={17} /></span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Exam</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th>Result</th>
              </tr>
            </thead>

            <tbody>
              {data.recentExams.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    No exam records found
                  </td>
                </tr>
              ) : (
                data.recentExams.map(
                  (exam) => (
                    <tr key={exam._id}>
                      <td>
                        {exam.studentId
                          ? `${exam.studentId.firstName} ${exam.studentId.lastName}`
                          : "N/A"}
                      </td>

                      <td>
                        {exam.examName}
                      </td>

                      <td>
                        {exam.subject}
                      </td>

                      <td>
                        {exam.marksObtained}/
                        {exam.totalMarks}
                      </td>

                      <td>
                        {exam.percentage}%
                      </td>

                      <td>
                        {exam.grade}
                      </td>

                      <td>
                        {exam.resultStatus}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;