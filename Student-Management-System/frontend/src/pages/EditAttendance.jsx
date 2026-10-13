import { useEffect, useState } from "react";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAttendanceById,
  updateAttendance,
} from "../services/attendanceService";

function EditAttendance() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    status: "Present",
    subject: "",
    semester: "",
    remarks: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const data = await getAttendanceById(id);

        setFormData({
          date: data.date
            ? new Date(data.date)
                .toISOString()
                .split("T")[0]
            : "",
          status: data.status || "Present",
          subject: data.subject || "",
          semester: data.semester || "",
          remarks: data.remarks || "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAttendance(id, {
        ...formData,
        semester: Number(formData.semester),
      });

      alert("Attendance updated successfully");

      navigate("/attendance");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
          "Failed to update attendance"
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Edit Attendance</h1>

      <form onSubmit={handleSubmit}>
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
          value={formData.remarks}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Update Attendance
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

export default EditAttendance;