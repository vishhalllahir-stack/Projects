import { useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";

import {
  getExams,
  deleteExam,
} from "../services/examService";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getExams()
      .then((data) => {
        if (active) {
          setExams(data);
          setError("");
        }
      })
      .catch((error) => {
        console.error(error);
        if (active) setError("Failed to load examinations");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exam result?"
    );

    if (!confirmDelete) return;

    try {
      await deleteExam(id);

      setExams((prev) =>
        prev.filter((exam) => exam._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete exam");
    }
  };

  if (loading) {
    return <div>Loading examinations...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Examinations & Results</h1>
          <p>Manage student examinations and results</p>
        </div>

        <Link to="/exams/add" className="btn-primary">
          + Add Result
        </Link>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Exam</th>
              <th>Subject</th>
              <th>Semester</th>
              <th>Marks</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Result</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.length === 0 ? (
              <tr>
                <td colSpan="9">
                  No examination records found.
                </td>
              </tr>
            ) : (
              exams.map((exam) => (
                <tr key={exam._id}>
                  <td>
                    {exam.studentId
                      ? `${exam.studentId.firstName} ${exam.studentId.lastName}`
                      : "N/A"}
                  </td>

                  <td>{exam.examName}</td>

                  <td>{exam.subject}</td>

                  <td>{exam.semester}</td>

                  <td>
                    {exam.marksObtained} / {exam.totalMarks}
                  </td>

                  <td>{exam.percentage}%</td>

                  <td>
                    <strong>{exam.grade}</strong>
                  </td>

                  <td>
                    <span
                      className={
                        exam.resultStatus === "Pass"
                          ? "status-pass"
                          : exam.resultStatus === "Fail"
                          ? "status-fail"
                          : "status-absent"
                      }
                    >
                      {exam.resultStatus}
                    </span>
                  </td>

                  <td>
                    <Link
                      to={`/exams/${exam._id}`}
                    >
                      View
                    </Link>

                    {" | "}

                    <Link
                      to={`/exams/edit/${exam._id}`}
                    >
                      Edit
                    </Link>

                    {" | "}

                    <button
                      onClick={() =>
                        handleDelete(exam._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exams;