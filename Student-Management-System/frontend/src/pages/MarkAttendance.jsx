import { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

import { getStudents } from "../services/studentService";
import { createAttendance } from "../services/attendanceService";

function MarkAttendance() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    date: new Date().toISOString().split("T")[0],
    status: "Present",
    subject: "",
    semester: "",
    remarks: "",
  });

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load students");
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

    if (!formData.studentId) {
      alert("Please select a student");
      return;
    }

    try {
      const selectedStudent = students.find(
        (student) => (student.id || student._id) === formData.studentId
      );

      await createAttendance({
        ...formData,
        student: selectedStudent?.name ||
          `${selectedStudent?.firstName || ""} ${selectedStudent?.lastName || ""}`.trim(),
        semester: Number(formData.semester),
      });

      alert("Attendance marked successfully");

      navigate("/attendance");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
          "Failed to mark attendance"
      );
    }
  };

  return (
    <div>
      <h1>Mark Attendance</h1>

      <form onSubmit={handleSubmit}>
        <label>Student</label>
        <br />

        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option
              key={student.id || student._id}
              value={student.id || student._id}
            >
              {student.studentId ? `${student.studentId} - ` : ""}
              {student.name || `${student.firstName || ""} ${student.lastName || ""}`.trim()}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Date</label>
        <br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <label>Subject</label>
        <br />

        <input
          type="text"
          name="subject"
          placeholder="Enter subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <label>Semester</label>
        <br />

        <input
          type="number"
          name="semester"
          min="1"
          max="12"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <label>Status</label>
        <br />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
          <option value="Leave">Leave</option>
        </select>

        <br />
        <br />

        <label>Remarks</label>
        <br />

        <textarea
          name="remarks"
          placeholder="Enter remarks"
          value={formData.remarks}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Mark Attendance
        </button>

        {" "}

        <button
          type="button"
          onClick={() => navigate("/attendance")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default MarkAttendance;