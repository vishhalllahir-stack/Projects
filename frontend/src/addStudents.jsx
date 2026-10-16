import { useState } from "react";
import "./index.css";
import { createStudent } from "./services/studentService";

function AddStudent() {
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Male",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "Gujarat",
    course: "",
    department: "",
    semester: 1,
    admissionDate: "",
    parentName: "",
    parentPhone: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      setLoading(true);
      setMessage("");

      await createStudent({
        ...formData,
        semester: Number(formData.semester),
      });

      setMessage("Student added successfully!");

      setFormData({
        studentId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "Male",
        dateOfBirth: "",
        address: "",
        city: "",
        state: "Gujarat",
        course: "",
        department: "",
        semester: 1,
        admissionDate: "",
        parentName: "",
        parentPhone: "",
        status: "Active",
      });
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Student add કરવામાં error આવી."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-page">
      <h1>Add Student</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>

        <h3>Personal Information</h3>

        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
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
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />

        <h3>Contact Information</h3>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />

        <h3>Academic Information</h3>

        <input
          type="text"
          name="course"
          placeholder="Course e.g. BCA"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
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
          type="date"
          name="admissionDate"
          value={formData.admissionDate}
          onChange={handleChange}
        />

        <h3>Parent Information</h3>

        <input
          type="text"
          name="parentName"
          placeholder="Parent Name"
          value={formData.parentName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="parentPhone"
          placeholder="Parent Phone"
          value={formData.parentPhone}
          onChange={handleChange}
        />

        <h3>Status</h3>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Graduated">Graduated</option>
        </select>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Student"}
        </button>
      </form>
    </div>
  );
}

export default AddStudent;