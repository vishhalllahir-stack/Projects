import { useEffect, useState } from "react";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";

import {
  getDepartment,
  updateDepartment,
} from "../services/departmentService";

function EditDepartment() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDepartment = async () => {
      try {
        const data = await getDepartment(id);

        setFormData({
          departmentId: data.departmentId || "",
          departmentName: data.departmentName || "",
          departmentCode: data.departmentCode || "",
          headOfDepartment:
            data.headOfDepartment || "",
          description: data.description || "",
          establishedYear:
            data.establishedYear || "",
          status: data.status || "Active",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load department");
      } finally {
        setLoading(false);
      }
    };

    loadDepartment();
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
      await updateDepartment(id, {
        ...formData,
        establishedYear: formData.establishedYear
          ? Number(formData.establishedYear)
          : undefined,
      });

      alert("Department updated successfully");

      navigate("/departments");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
          "Failed to update department"
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Edit Department</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="departmentId"
          placeholder="Department ID"
          value={formData.departmentId}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="departmentName"
          placeholder="Department Name"
          value={formData.departmentName}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="departmentCode"
          placeholder="Department Code"
          value={formData.departmentCode}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="headOfDepartment"
          placeholder="Head of Department"
          value={formData.headOfDepartment}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="establishedYear"
          placeholder="Established Year"
          value={formData.establishedYear}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <br />
        <br />

        <button type="submit">
          Update Department
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

export default EditDepartment;