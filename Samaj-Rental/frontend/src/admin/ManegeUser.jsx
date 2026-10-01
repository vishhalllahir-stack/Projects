import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Icon from "../componet/Icon";

function ManageUser() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // ==========================================
  // LOAD USERS
  // ==========================================

  const loadUsers = async (
    showLoading = true
  ) => {
    try {
      if (showLoading) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const response = await API.get(
        "/admin/users"
      );

      const data = response?.data;

      const userList = Array.isArray(data)
        ? data
        : Array.isArray(data?.users)
          ? data.users
          : [];

      setUsers(userList);
    } catch (error) {
      console.error(
        "Users Error:",
        error
      );

      setUsers([]);

      alert(
        error.response?.data?.message ||
          "Users load કરવામાં error આવી."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==========================================
  // PAGE LOAD
  // ==========================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers();
  }, []);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // GET INITIAL
  // ==========================================

  const getInitial = (name) => {
    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return "U";
    }

    return name
      .trim()
      .charAt(0)
      .toUpperCase();
  };

  // ==========================================
  // FILTER USERS
  // ==========================================

  const filteredUsers = useMemo(() => {
    const searchText =
      search.toLowerCase().trim();

    return users.filter((user) => {
      const name =
        user?.name?.toLowerCase() || "";

      const email =
        user?.email?.toLowerCase() || "";

      const mobile =
        String(
          user?.mobile || ""
        ).toLowerCase();

      const village =
        user?.village?.toLowerCase() ||
        "";

      const userId =
        String(
          user?._id || ""
        ).toLowerCase();

      const matchesSearch =
        !searchText ||
        name.includes(searchText) ||
        email.includes(searchText) ||
        mobile.includes(searchText) ||
        village.includes(searchText) ||
        userId.includes(searchText);

      const matchesRole =
        roleFilter === "all" ||
        user?.role === roleFilter;

      return (
        matchesSearch &&
        matchesRole
      );
    });
  }, [
    users,
    search,
    roleFilter,
  ]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const statistics = useMemo(() => {
    const admins = users.filter(
      (user) =>
        user?.role === "admin"
    ).length;

    const normalUsers = users.filter(
      (user) =>
        user?.role !== "admin"
    ).length;

    return {
      total: users.length,
      admins,
      users: normalUsers,
    };
  }, [users]);

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("all");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="manage-user-loading">

        <div className="manage-user-loader"></div>

        <h3>
          Loading users...
        </h3>

        <p>
          Please wait...
        </p>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="manage-user-page">

      <div className="manage-user-container">

        {/* ===============================
            HEADER
        =============================== */}

        <div className="manage-user-header">

          <div>

            <span className="manage-user-eyebrow">
              ADMIN PANEL
            </span>

            <h1>
              Manage Users
            </h1>

            <p>
              સમાજમાં registered થયેલા
              બધા users અહીંથી manage કરો.
            </p>

          </div>

          <div className="manage-user-header-actions">

            <button
              type="button"
              className="manage-user-btn secondary"
              onClick={() =>
                navigate("/admin")
              }
            >
              ← Dashboard
            </button>

            <button
              type="button"
              className="manage-user-btn primary"
              onClick={() =>
                loadUsers(false)
              }
              disabled={refreshing}
            >
              {refreshing
                ? "⏳ Loading..."
                : "↻ Refresh"}
            </button>

          </div>

        </div>

        {/* ===============================
            STATISTICS
        =============================== */}

        <div className="manage-user-stats">

          {/* TOTAL */}

          <button
            type="button"
            className="manage-user-stat-card total"
            onClick={() =>
              setRoleFilter("all")
            }
          >

            <div className="manage-user-stat-icon">

              <Icon
                name="users"
                size={24}
              />

            </div>

            <div>

              <span>
                Total Users
              </span>

              <strong>
                {statistics.total}
              </strong>

            </div>

          </button>

          {/* NORMAL USERS */}

          <button
            type="button"
            className="manage-user-stat-card normal"
            onClick={() =>
              setRoleFilter("user")
            }
          >

            <div className="manage-user-stat-icon">

              <Icon
                name="user"
                size={20}
              />

            </div>

            <div>

              <span>
                Users
              </span>

              <strong>
                {statistics.users}
              </strong>

            </div>

          </button>

          {/* ADMINS */}

          <button
            type="button"
            className="manage-user-stat-card admin"
            onClick={() =>
              setRoleFilter("admin")
            }
          >

            <div className="manage-user-stat-icon">

              <Icon
                name="shield"
                size={20}
              />

            </div>

            <div>

              <span>
                Admins
              </span>

              <strong>
                {statistics.admins}
              </strong>

            </div>

          </button>

        </div>

        {/* ===============================
            FILTER
        =============================== */}

        <div className="manage-user-filter">

          <div className="manage-user-search">

            <span>
              <Icon
                name="search"
                size={17}
              />
            </span>

            <input
              type="text"
              placeholder="Search name, email, mobile or village..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          <select
            className="manage-user-select"
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(
                e.target.value
              )
            }
          >

            <option value="all">
              All Roles
            </option>

            <option value="user">
              Users
            </option>

            <option value="admin">
              Admins
            </option>

          </select>

          <div className="manage-user-result">

            Showing{" "}

            <strong>
              {filteredUsers.length}
            </strong>{" "}

            of{" "}

            <strong>
              {users.length}
            </strong>

          </div>

        </div>

        {/* ===============================
            EMPTY
        =============================== */}

        {filteredUsers.length ===
        0 ? (

          <div className="manage-user-empty">

            <div className="manage-user-empty-icon">

              <Icon
                name="user"
                size={20}
              />

            </div>

            <h2>
              No users found
            </h2>

            <p>
              Search અથવા filter પ્રમાણે
              કોઈ user મળ્યો નથી.
            </p>

            {(search ||
              roleFilter !== "all") && (
              <button
                type="button"
                className="manage-user-btn primary"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          /* ===============================
             USER GRID
          =============================== */

          <div className="manage-user-grid">

            {filteredUsers.map(
              (user) => {

                const isAdmin =
                  user?.role ===
                  "admin";

                return (
                  <div
                    className="manage-user-card"
                    key={
                      user?._id
                    }
                  >

                    {/* =================
                        USER TOP
                    ================= */}

                    <div className="manage-user-card-top">

                      <div className="manage-user-avatar">
                        {getInitial(
                          user?.name
                        )}
                      </div>

                      <div className="manage-user-main">

                        <h2>
                          {user?.name ||
                            "Unknown User"}
                        </h2>

                        <span>
                          {isAdmin
                            ? "Administrator"
                            : "Community User"}
                        </span>

                      </div>

                      <div
                        className={
                          isAdmin
                            ? "manage-user-role admin"
                            : "manage-user-role user"
                        }
                      >
                        {isAdmin
                          ? "ADMIN"
                          : "USER"}
                      </div>

                    </div>

                    {/* =================
                        USER INFORMATION
                    ================= */}

                    <div className="manage-user-info">

                      <div className="manage-user-info-row">

                        <span>

                          <Icon
                            name="mail"
                            size={14}
                          />

                          Email

                        </span>

                        <strong>
                          {user?.email ||
                            "-"}
                        </strong>

                      </div>

                      <div className="manage-user-info-row">

                        <span>

                          <Icon
                            name="phone"
                            size={14}
                          />

                          Mobile

                        </span>

                        <strong>
                          {user?.mobile ||
                            "-"}
                        </strong>

                      </div>

                      <div className="manage-user-info-row">

                        <span>

                          <Icon
                            name="location"
                            size={14}
                          />

                          Village

                        </span>

                        <strong>
                          {user?.village ||
                            "-"}
                        </strong>

                      </div>

                      <div className="manage-user-info-row">

                        <span>

                          <Icon
                            name="calendar"
                            size={14}
                          />

                          Joined

                        </span>

                        <strong>
                          {formatDate(
                            user?.createdAt
                          )}
                        </strong>

                      </div>

                    </div>

                    {/* =================
                        USER ID
                    ================= */}

                    <div className="manage-user-id">

                      <span>
                        User ID
                      </span>

                      <code>
                        {user?._id ||
                          "-"}
                      </code>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default ManageUser;