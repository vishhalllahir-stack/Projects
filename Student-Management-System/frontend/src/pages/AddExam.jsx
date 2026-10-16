import { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

import { getStudents } from "../services/studentService";
import { createExam } from "../services/examService";

const AddExam = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    examName: "",
    subject: "",
    academicYear: "",
    semester: "",
    examDate: "",
    marksObtained: "",
    totalMarks: "",
    remarks: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load students");
      }
    };

    loadStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      Number(formData.marksObtained) >
      Number(formData.totalMarks)
    ) {
      setError(
        "Marks obtained cannot be greater than total marks"
      );
      return;
    }

    try {
      await createExam({
        ...formData,
        semester: Number(formData.semester),
        marksObtained: Number(formData.marksObtained),
        totalMarks: Number(formData.totalMarks),
      });

      alert("Exam result added successfully");

      navigate("/exams");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to create exam result"
      );
    }
  };

  return (
    <div className="form-page">
      <h1>Add Examination Result</h1>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student</label>

          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Student
            </option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.studentId} -{" "}
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Exam Name</label>

          <input
            type="text"
            name="examName"
            value={formData.examName}
            onChange={handleChange}
            placeholder="Semester 3 Final Exam"
            required
          />
        </div>

        <div className="form-group">
          <label>Subject</label>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="JavaScript"
            required
          />
        </div>

        <div className="form-group">
          <label>Academic Year</label>

          <input
            type="text"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            placeholder="2026-27"
            required
          />
        </div>

        <div className="form-group">
          <label>Semester</label>

          <input
            type="number"
            name="semester"
            min="1"
            value={formData.semester}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Exam Date</label>

          <input
            type="date"
            name="examDate"
            value={formData.examDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Marks Obtained</label>

          <input
            type="number"
            name="marksObtained"
            min="0"
            value={formData.marksObtained}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Total Marks</label>

          <input
            type="number"
            name="totalMarks"
            min="1"
            value={formData.totalMarks}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Remarks</label>

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Enter remarks"
          />
        </div>

        <button type="submit">
          Save Result
        </button>

        <button
          type="button"
          onClick={() => navigate("/exams")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddExam;