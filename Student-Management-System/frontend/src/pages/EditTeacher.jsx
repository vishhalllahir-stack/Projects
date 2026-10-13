import { useEffect, useState } from "react";
import "../index.css";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getTeacher,
  updateTeacher,
} from "../services/teacherService";

function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeacher = async () => {
      try {
        const response = await getTeacher(id);

        setFormData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTeacher();
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
      await updateTeacher(id, {
        ...formData,
        experience: Number(
          formData.experience
        ),
        salary: Number(formData.salary),
      });

      alert(
        "Teacher updated successfully!"
      );

      navigate(`/teachers/${id}`);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Teacher update failed"
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!formData) {
    return <h2>Teacher not found</h2>;
  }

  return (
    <div className="edit-teacher">

      <h1>Edit Teacher</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          required
        />

        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <input
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          min="0"
        />

        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          min="0"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>

        <button type="submit">
          Update Teacher
        </button>

      </form>

    </div>
  );
}

export default EditTeacher;