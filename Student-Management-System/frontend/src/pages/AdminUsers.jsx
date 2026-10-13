import { useCallback, useEffect, useState } from "react";
import "../index.css";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ShieldCheck,
  Users,
  GraduationCap,
  UserRound,
} from "lucide-react";

import {
  getUsers,
  deleteUser,
} from "../services/adminService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
  });

  const [summary, setSummary] = useState({
    admin: 0,
    teacher: 0,
    student: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getUsers({
        search,
        role,
        status,
        page,
        limit: 10,
      });

      setError("");
      setUsers(response.data || []);

      setPagination(
        response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalUsers: 0,
        }
      );

      setSummary(
        response.summary || {
          admin: 0,
          teacher: 0,
          student: 0,
        }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  }, [search, role, status, page]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      loadUsers();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadUsers]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(id);
      await loadUsers();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete user"
      );
    }
  };

  const getRoleClass = (userRole) => {
    return `admin-users-role ${userRole}`;
  };

  const getStatusClass = (userStatus) => {
    return `admin-users-status ${
      userStatus === "Active"
        ? "active"
        : "inactive"
    }`;
  };

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <div>
          <span className="admin-users-kicker">
            Administration
          </span>

          <h1>User Management</h1>

          <p>
            Manage administrators, teachers and
            students from one place.
          </p>
        </div>

        <button
          className="admin-users-add-btn"
          type="button"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="admin-users-summary">
        <div className="admin-summary-card">
          <div className="admin-summary-icon">
            <Users size={20} />
          </div>

          <div>
            <span>Total Users</span>
            <strong>
              {pagination.totalUsers || 0}
            </strong>
          </div>
        </div>

        <div className="admin-summary-card">
          <div className="admin-summary-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <span>Admins</span>
            <strong>{summary.admin}</strong>
          </div>
        </div>

        <div className="admin-summary-card">
          <div className="admin-summary-icon">
            <GraduationCap size={20} />
          </div>

          <div>
            <span>Teachers</span>
            <strong>{summary.teacher}</strong>
          </div>
        </div>

        <div className="admin-summary-card">
          <div className="admin-summary-icon">
            <UserRound size={20} />
          </div>

          <div>
            <span>Students</span>
            <strong>{summary.student}</strong>
          </div>
        </div>
      </div>

      <div className="admin-users-filter-card">
        <div className="admin-search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search name, email or phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">
            Inactive
          </option>
        </select>
      </div>

      {error && (
        <div className="admin-users-error">
          {error}
        </div>
      )}

      <div className="admin-users-table-card">
        <div className="admin-users-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="admin-users-empty"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="admin-users-empty"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="admin-user-name">
                        <div className="admin-user-avatar">
                          {item.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>{item.name}</strong>
                      </div>
                    </td>

                    <td>{item.email}</td>

                    <td>
                      {item.phone || "-"}
                    </td>

                    <td>
                      <span
                        className={getRoleClass(
                          item.role
                        )}
                      >
                        {item.role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={getStatusClass(
                          item.status
                        )}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {item.createdAt
                        ? new Date(
                            item.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <div className="admin-user-actions">
                        <button
                          type="button"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-users-pagination">
          <button
            type="button"
            disabled={
              !pagination.hasPreviousPage
            }
            onClick={() =>
              setPage((current) =>
                Math.max(current - 1, 1)
              )
            }
          >
            Previous
          </button>

          <span>
            Page {pagination.currentPage} of{" "}
            {pagination.totalPages}
          </span>

          <button
            type="button"
            disabled={
              !pagination.hasNextPage
            }
            onClick={() =>
              setPage((current) =>
                current + 1
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;