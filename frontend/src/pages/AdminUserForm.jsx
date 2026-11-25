import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import "../index.css";

import {
  createUser,
  getUser,
  updateUser,
} from "../services/adminService";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "student",
  phone: "",
  status: "Active",
};

const AdminUserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(
    isEditMode
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;

    const loadUser = async () => {
      try {
        setPageLoading(true);

        const response = await getUser(id);

        const user = response.data;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          password: "",
          role: user.role || "student",
          phone: user.phone || "",
          status: user.status || "Active",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load user"
        );
      } finally {
        setPageLoading(false);
      }
    };

    loadUser();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!isEditMode && !formData.password) {
      setError("Password is required");
      return;
    }

    if (
      formData.password &&
      formData.password.length < 6
    ) {
      setError(
        "Password must be at least 6 characters"
      );
      return;
    }

    try {
      setLoading(true);

      const data = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        phone: formData.phone.trim(),
        status: formData.status,
      };

      // Password only when provided
      if (formData.password) {
        data.password = formData.password;
      }

      if (isEditMode) {
        await updateUser(id, data);
      } else {
        await createUser({
          ...data,
          password: formData.password,
        });
      }

      navigate("/admin/users");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save user"
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="admin-user-form-loading">
        Loading user...
      </div>
    );
  }

  return (
    <div className="admin-user-form-page">
      <div className="admin-user-form-header">
        <div>
          <span className="admin-user-form-kicker">
            Administration
          </span>

          <h1>
            {isEditMode
              ? "Edit User"
              : "Add New User"}
          </h1>

          <p>
            {isEditMode
              ? "Update user account information."
              : "Create a new system user account."}
          </p>
        </div>

        <button
          type="button"
          className="admin-user-back-btn"
          onClick={() =>
            navigate("/admin/users")
          }
        >
          <ArrowLeft size={17} />
          Back
        </button>
      </div>

      <form
        className="admin-user-form-card"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="admin-user-form-error">
            {error}
          </div>
        )}

        <div className="admin-user-form-grid">
          <div className="admin-user-field">
            <label htmlFor="name">
              Full Name *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="admin-user-field">
            <label htmlFor="email">
              Email *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="admin-user-field">
            <label htmlFor="phone">
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="admin-user-field">
            <label htmlFor="password">
              Password {isEditMode ? "" : "*"}
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder={
                isEditMode
                  ? "Leave blank to keep current password"
                  : "Minimum 6 characters"
              }
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="admin-user-field">
            <label htmlFor="role">
              Role *
            </label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">
                Student
              </option>

              <option value="teacher">
                Teacher
              </option>

              <option value="admin">
                Admin
              </option>
            </select>
          </div>

          <div className="admin-user-field">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
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
          </div>
        </div>

        <div className="admin-user-form-footer">
          <button
            type="button"
            className="admin-user-cancel-btn"
            onClick={() =>
              navigate("/admin/users")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="admin-user-save-btn"
            disabled={loading}
          >
            <Save size={17} />

            {loading
              ? "Saving..."
              : isEditMode
              ? "Update User"
              : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUserForm;