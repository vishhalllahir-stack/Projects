import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStudent,
  updateStudent,
} from "./services/studentService";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const response = await getStudent(id);
        setFormData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateStudent(id, {
        ...formData,
        semester: Number(formData.semester),
      });

      alert("Student updated successfully");

      navigate(`/students/${id}`);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Student update failed"
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!formData) {
    return <h2>Student not found</h2>;
  }

  return (
    <div className="edit-student">
      <h1>Edit Student</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          placeholder="Student ID"
          required
        />

        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />

        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Course"
          required
        />

        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />

        <select
          name="semester"
          value={formData.semester}
          onChange={handleChange}
        >
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
          <option value="5">Semester 5</option>
          <option value="6">Semester 6</option>
        </select>

        <input
          name="city"
          value={formData.city || ""}
          onChange={handleChange}
          placeholder="City"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Graduated">Graduated</option>
        </select>

        <button type="submit">
          Update Student
        </button>
      </form>
    </div>
  );
}

export default EditStudent;