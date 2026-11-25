import { useEffect, useState } from "react";
import "../index.css";
import { Link, useParams } from "react-router-dom";

import {
  getAttendanceById,
} from "../services/attendanceService";

function AttendanceDetails() {
  const { id } = useParams();

  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const data = await getAttendanceById(id);
        setAttendance(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!attendance) {
    return <h2>Attendance not found</h2>;
  }

  return (
    <div>
      <h1>Attendance Details</h1>

      <p>
        <strong>Student:</strong>{" "}
        {attendance.studentId
          ? `${attendance.studentId.firstName} ${attendance.studentId.lastName}`
          : "Unknown"}
      </p>

      <p>
        <strong>Student ID:</strong>{" "}
        {attendance.studentId?.studentId || "-"}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(attendance.date).toLocaleDateString()}
      </p>

      <p>
        <strong>Subject:</strong>{" "}
        {attendance.subject}
      </p>

      <p>
        <strong>Semester:</strong>{" "}
        {attendance.semester}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {attendance.status}
      </p>

      <p>
        <strong>Remarks:</strong>{" "}
        {attendance.remarks || "-"}
      </p>

      <Link to="/attendance">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default AttendanceDetails;