const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const request = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  let response;
  try { response = await fetch(`${BASE_URL}${url}`, { ...options, headers }); }
  catch { throw new Error("Could not connect to the API. Check that the backend is running."); }
  const body = await response.json().catch(() => null);
  if (response.status === 401) { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.assign("/login"); }
  if (!response.ok) throw new Error(body?.message || "Request failed");
  return body?.data ?? body;
};

export const api = {
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  dashboard: () => request("/dashboard/stats"),
  list: (resource) => request(`/${resource}`),
  create: (resource, body) => request(`/${resource}`, { method: "POST", body: JSON.stringify(body) }),
  update: (resource, id, body) => request(`/${resource}/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (resource, id) => request(`/${resource}/${id}`, { method: "DELETE" }),
};
