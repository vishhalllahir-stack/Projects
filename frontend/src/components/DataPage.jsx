import { useCallback, useEffect, useMemo, useState } from "react";
import "../index.css";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { api } from "../api";

export default function DataPage({
  resource,
  eyebrow,
  title,
  description,
  fields,
  columns,
}) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const fetchRecords = useCallback(() => api.list(resource), [resource]);
  const load = useCallback(() => {
    setLoading(true);
    return fetchRecords()
      .then((data) => {
        setItems(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [fetchRecords]);
  useEffect(() => {
    let active = true;
    fetchRecords()
      .then((data) => {
        if (active) {
          setItems(data);
          setError("");
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fetchRecords]);
  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          (!query ||
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(query.toLowerCase()),
            )) &&
          (status === "All" || item.status === status),
      ),
    [items, query, status],
  );
  const pages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const visibleItems = filteredItems.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (editing) await api.update(resource, editing.id, form);
      else await api.create(resource, form);
      setOpen(false);
      setEditing(null);
      setForm({});
      setPage(1);
      load();
    } catch (err) {
      setError(err.message);
    }
  };
  const remove = async (id) => {
    if (window.confirm("Delete this record?")) {
      try {
        await api.remove(resource, id);
        load();
      } catch (err) {
        setError(err.message);
      }
    }
  };
  const startEdit = (item) => {
    setEditing(item);
    setForm(item);
    setOpen(true);
  };
  return (
    <section className="data-page">
      <div className="data-heading">
        <div>
          <p className="page-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button
          className="primary-button"
          onClick={() => {
            setEditing(null);
            setForm({});
            setOpen(true);
          }}
        >
          <Plus size={17} /> Add record
        </button>
      </div>
      {error && <p className="data-error">{error}</p>}
      <div className="data-card">
        <div className="data-toolbar">
          <input
            className="search-input"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder={`Search ${title.toLowerCase()}...`}
            aria-label={`Search ${title}`}
          />{" "}
          <select
            className="filter-select"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
          >
            <option>All</option>
            <option>Active</option>
            <option>Paid</option>
            <option>Present</option>
            <option>Scheduled</option>
            <option>Absent</option>
            <option>Pending</option>
          </select>
          <span className="record-count">{filteredItems.length} records</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="empty-state">
                    Loading records...
                  </td>
                </tr>
              ) : visibleItems.length ? (
                visibleItems.map((item) => (
                  <tr key={item.id}>
                    {columns.map((column) => (
                      <td key={column.key}>{item[column.key] || "—"}</td>
                    ))}
                    <td>
                      <div className="table-actions">
                        <button
                          aria-label="Edit"
                          onClick={() => startEdit(item)}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          aria-label="Delete"
                          onClick={() => remove(item.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="empty-state">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>
            Page {page} of {pages}
          </span>
          <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <button disabled={page === pages} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-heading">
              <h2>{editing ? "Edit record" : "Add record"}</h2>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={submit}>
              {fields.map((field) => (
                <label className="data-field" key={field.key}>
                  {field.label}
                  {field.options ? (
                    <select
                      required={field.required !== false}
                      value={form[field.key] || ""}
                      onChange={(event) =>
                        setForm({ ...form, [field.key]: event.target.value })
                      }
                    >
                      <option value="">
                        Select {field.label.toLowerCase()}
                      </option>
                      {field.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      required={field.required !== false}
                      type={field.type || "text"}
                      value={form[field.key] || ""}
                      onChange={(event) =>
                        setForm({ ...form, [field.key]: event.target.value })
                      }
                      placeholder={field.placeholder || field.label}
                    />
                  )}
                </label>
              ))}
              <button className="primary-button" type="submit">
                {editing ? "Save changes" : "Create record"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
