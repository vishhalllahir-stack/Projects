import { useEffect, useState } from "react";
import "../index.css";
import { Link, useParams } from "react-router-dom";

import { getExam } from "../services/examService";

const ExamDetails = () => {
  const { id } = useParams();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadExam = async () => {
      try {
        const data = await getExam(id);
        setExam(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load examination");
      } finally {
        setLoading(false);
      }
    };

    loadExam();
  }, [id]);

  if (loading) {
    return <div>Loading exam details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!exam) {
    return <div>Exam not found</div>;
  }

  return (
    <div className="details-page">
      <div className="page-header">
        <div>
          <h1>Examination Details</h1>
          <p>View complete examination result</p>
        </div>

        <Link
          to={`/exams/edit/${exam._id}`}
          className="btn-primary"
        >
          Edit Result
        </Link>
      </div>

      <div className="details-card">
        <h2>Student Information</h2>

        <div className="details-grid">
          <div>
            <strong>Student ID</strong>
            <p>{exam.studentId?.studentId || "N/A"}</p>
          </div>

          <div>
            <strong>Student Name</strong>
            <p>
              {exam.studentId
                ? `${exam.studentId.firstName} ${exam.studentId.lastName}`
                : "N/A"}
            </p>
          </div>

          <div>
            <strong>Email</strong>
            <p>{exam.studentId?.email || "N/A"}</p>
          </div>

          <div>
            <strong>Course</strong>
            <p>{exam.studentId?.course || "N/A"}</p>
          </div>

          <div>
            <strong>Department</strong>
            <p>{exam.studentId?.department || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="details-card">
        <h2>Examination Information</h2>

        <div className="details-grid">
          <div>
            <strong>Exam Name</strong>
            <p>{exam.examName}</p>
          </div>

          <div>
            <strong>Subject</strong>
            <p>{exam.subject}</p>
          </div>

          <div>
            <strong>Academic Year</strong>
            <p>{exam.academicYear}</p>
          </div>

          <div>
            <strong>Semester</strong>
            <p>{exam.semester}</p>
          </div>

          <div>
            <strong>Exam Date</strong>
            <p>
              {exam.examDate
                ? new Date(exam.examDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="details-card">
        <h2>Result</h2>

        <div className="result-box">
          <div>
            <strong>Marks</strong>
            <p>
              {exam.marksObtained} / {exam.totalMarks}
            </p>
          </div>

          <div>
            <strong>Percentage</strong>
            <p>{exam.percentage}%</p>
          </div>

          <div>
            <strong>Grade</strong>
            <p>{exam.grade}</p>
          </div>

          <div>
            <strong>Status</strong>
            <p>{exam.resultStatus}</p>
          </div>
        </div>

        {exam.remarks && (
          <div>
            <strong>Remarks</strong>
            <p>{exam.remarks}</p>
          </div>
        )}
      </div>

      <Link to="/exams">
        ← Back to Examinations
      </Link>
    </div>
  );
};

export default ExamDetails;