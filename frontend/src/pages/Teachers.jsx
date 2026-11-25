import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeachers, deleteTeacher } from "../services/teacherService";
import "../index.css";

const emptyPagination = {
  currentPage: 1,
  totalPages: 1,
  totalTeachers: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(emptyPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTeachers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getTeachers({ search, status, page, limit: 10 });
      setTeachers(response.data || []);
      setPagination(response.pagination || emptyPagination);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load teachers");
    } finally {
      setLoading(false);
    }
  }, [search, status, page]);

  useEffect(() => {
    const timer = setTimeout(loadTeachers, 250);
    return () => clearTimeout(timer);
  }, [loadTeachers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await deleteTeacher(id);
      await loadTeachers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete teacher");
    }
  };

  return (
    <section className="teachers-page data-page">
      <div className="page-header data-heading">
        <div>
          <p className="page-eyebrow">People</p>
          <h1>Teachers</h1>
          <p>Total Teachers: <strong>{pagination.totalTeachers || 0}</strong></p>
        </div>
        <Link to="/teachers/add" className="add-button">+ Add Teacher</Link>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search ID, name, email, subject..." />
        </div>
        <div className="status-filter">
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button className="clear-button" onClick={() => { setSearch(""); setStatus(""); setPage(1); }}>Clear</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table>
          <thead><tr><th>Teacher ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Department</th><th>Subject</th><th>Experience</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="9" className="empty-state">Loading teachers...</td></tr> : teachers.length === 0 ? <tr><td colSpan="9" className="empty-state">No teachers found</td></tr> : teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.teacherId}</td>
                <td>{teacher.firstName} {teacher.lastName}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.department}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.experience} yrs</td>
                <td><span className={`status ${(teacher.status || "").toLowerCase()}`}>{teacher.status}</span></td>
                <td><div className="action-buttons"><Link to={`/teachers/${teacher._id}`} className="view-btn">View</Link><Link to={`/teachers/edit/${teacher._id}`} className="edit-btn">Edit</Link><button className="delete-btn" onClick={() => handleDelete(teacher._id)}>Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={!pagination.hasPreviousPage} onClick={() => setPage((p) => p - 1)}>← Previous</button>
        <span>Page {pagination.currentPage || page} of {pagination.totalPages || 1}</span>
        <button disabled={!pagination.hasNextPage} onClick={() => setPage((p) => p + 1)}>Next →</button>
      </div>
    </section>
  );
}
