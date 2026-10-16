import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

import { createDepartment } from "../services/departmentService";

function AddDepartment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    departmentId: "",
    departmentName: "",
    departmentCode: "",
    headOfDepartment: "",
    description: "",
    establishedYear: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDepartment({
        ...formData,
        establishedYear: formData.establishedYear
          ? Number(formData.establishedYear)
          : undefined,
      });

      alert("Department created successfully");

      navigate("/departments");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
          "Failed to create department"
      );
    }
  };

  return (
    <div>
      <h1>Add Department</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="departmentId"
          placeholder="Department ID"
          value={formData.departmentId}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="departmentName"
          placeholder="Department Name"
          value={formData.departmentName}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="departmentCode"
          placeholder="Department Code"
          value={formData.departmentCode}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="headOfDepartment"
          placeholder="Head of Department"
          value={formData.headOfDepartment}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="establishedYear"
          placeholder="Established Year"
          value={formData.establishedYear}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <br /><br />

        <button type="submit">
          Add Department
        </button>

        {" "}

        <button
          type="button"
          onClick={() => navigate("/departments")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddDepartment;