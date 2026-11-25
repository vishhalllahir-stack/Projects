import AdminUsers from "./pages/AdminUsers";

import { useEffect, useState } from "react";
import "./index.css";
import {
  Navigate,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronDown,
  FileText,
  GraduationCap,
  House,
  IndianRupee,
  LogOut,
  Menu,
  Moon,
  Settings as SettingsIcon,
  Sun,
  UsersRound,
  UserRound,
  X,
} from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Course from "./pages/Course";
import Attendance from "./pages/Attendance";
import Exams from "./pages/Exams";
import Fees from "./pages/Fees";
import Reports from "./pages/Reports";
import Setting from "./pages/Setting";
import AddStudent from "./pages/AddStudent";
import "./App.css";
import "./uiux.css";
import { useAuth } from "./context/useAuth.js";

import StudentDetails from "./pages/StudentDetails";
import EditStudent from "./pages/EditStudent";

import Departments from "./pages/Departments";
import AddDepartment from "./pages/AddDepartment";

import DepartmentDetails from "./pages/DepartmentDetails";
import EditDepartment from "./pages/EditDepartment";

import MarkAttendance from "./pages/MarkAttendance";
import AttendanceDetails from "./pages/AttendanceDetails";
import EditAttendance from "./pages/EditAttendance";

import AddFee from "./pages/AddFee";
import FeeDetails from "./pages/FeeDetails";
import EditFee from "./pages/EditFee";

import AddExam from "./pages/AddExam";

import ExamDetails from "./pages/ExamDetials";
import EditExam from "./pages/EditExam";

import Register from "./pages/Register";
import RoleRoute from "./components/RoleRoute";
import AttendanceReport from "./pages/AttendanceReport";
import EditTeacher from "./pages/EditTeacher";
import TeacherForm from "./pages/TeacherForm";
import CourseForm from "./pages/CourseForm";
import CourseDetails from "./pages/CourseDetails";
import TeacherDetails from "./pages/TeachersDetails";


import AdminUserForm from "./pages/AdminUserForm";
import StudentReport from "./pages/StudentReport";

import TeacherReport from "./pages/TeacherReport";
import ExamReport from "./pages/ExamReport";
import FeeReport from "./pages/FeeReport";



export default function App() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 901px)").matches,
  );
  const [menuOpen, setMenuOpen] = useState(
    () => window.matchMedia("(min-width: 901px)").matches,
  );
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(
    () => localStorage.getItem("studentHubTheme") === "dark",
  );
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading: authLoading, logout } = useAuth();
  const isPublicAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const handleViewportChange = (event) => {
      setIsDesktop(event.matches);
      setMenuOpen(event.matches);
    };

    desktopQuery.addEventListener("change", handleViewportChange);
    return () => desktopQuery.removeEventListener("change", handleViewportChange);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setProfileOpen(false);
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = menuOpen && !isDesktop ? "hidden" : "";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isDesktop, menuOpen]);

  const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: House },
  { label: "Students", to: "/students", icon: UserRound },
  { label: "Teachers", to: "/teachers", icon: UsersRound },
  { label: "Courses", to: "/courses", icon: BookOpen },
  { label: "Departments", to: "/departments", icon: Building2 },
  { label: "Attendance", to: "/attendance", icon: CalendarDays },
  { label: "Exams", to: "/exams", icon: FileText },
  { label: "Fees", to: "/fees", icon: IndianRupee },
  { label: "Reports", to: "/reports", icon: BarChart3 },
  { label: "Settings", to: "/settings", icon: SettingsIcon },
  ...(user?.role === "admin"
    ? [
        {
          label: "User Management",
          to: "/admin/users",
          icon: UsersRound,
        },
      ]
    : []),
];
  const closeMenus = () => {
    setMenuOpen(isDesktop);
    setProfileOpen(false);
    setNotificationsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenus();
    navigate("/login", { replace: true });
  };

  const toggleTheme = () => {
    setDarkTheme((isDark) => {
      const nextTheme = !isDark;
      localStorage.setItem("studentHubTheme", nextTheme ? "dark" : "light");
      return nextTheme;
    });
  };

  if (authLoading) {
    return (
      <div className="app-loading-screen">
        <div className="app-loading-card">
          <span className="app-loading-spinner" />
          <strong>StudentHub</strong>
          <span>Loading your workspace...</span>
        </div>
      </div>
    );
  }

  if (!user && !isPublicAuthPage) {
    return <Navigate to="/login" replace />;
  }
  if (user && isPublicAuthPage) {
    return <Navigate to="/dashboard" replace />;
  }
  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";
  return (
    <div
      className={`app-shell ${menuOpen ? "sidebar-open" : ""} ${darkTheme ? "dark-theme" : ""}`}
    >
      {!isPublicAuthPage && (
        <>
          <aside className={`sidebar ${menuOpen ? "is-open" : ""}`}>
            <NavLink className="brand" to="/dashboard" onClick={closeMenus}>
              <span className="brand-mark">
                <GraduationCap size={24} strokeWidth={2} />
              </span>
              <span className="brand-copy">
                <strong>
                  Student<span>Hub</span>
                </strong>
                <small>Management system</small>
              </span>
            </NavLink>
            <p className="sidebar-label">Main menu</p>
            <nav className="nav-links" aria-label="Main navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={closeMenus}
                >
                  <span className="nav-icon" aria-hidden="true">
                    <item.icon size={16} strokeWidth={2} />
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
            <button
              className="sidebar-logout"
              type="button"
              onClick={handleLogout}
            >
              <LogOut size={16} strokeWidth={2} aria-hidden="true" /> Log out
            </button>
          </aside>
          {menuOpen && !isDesktop && (
            <button
              className="sidebar-overlay"
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenus}
            />
          )}
          <header
            className={`topbar header-navbar ${menuOpen ? "sidebar-open" : ""}`}
          >
            <button
              className="menu-toggle"
              type="button"
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X size={20} strokeWidth={2} />
              ) : (
                <Menu size={20} strokeWidth={2} />
              )}
            </button>
            <div className="topbar-spacer" />
            <button
              className="notification-button"
              type="button"
              aria-label="View notifications"
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen((open) => !open)}
            >
              <Bell size={18} strokeWidth={2} aria-hidden="true" />
              <i />
            </button>
            {notificationsOpen && (
              <div className="notification-menu">
                <strong>Notifications</strong>
                <p>Welcome to StudentHub.</p>
                <NavLink to="/students" onClick={closeMenus}>
                  Review student records →
                </NavLink>
                <NavLink to="/fees" onClick={closeMenus}>
                  Check pending fees →
                </NavLink>
              </div>
            )}
            <button
              className="theme-header-button"
              type="button"
              onClick={toggleTheme}
              aria-label={
                darkTheme ? "Switch to light theme" : "Switch to dark theme"
              }
              aria-pressed={darkTheme}
            >
              {darkTheme ? (
                <Sun size={18} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Moon size={18} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
            <div className="profile-wrapper">
              <button
                className="profile-button"
                type="button"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((open) => !open)}
              >
                <span className="avatar">{initials}</span>
                <span className="profile-details">
                  <strong className="profile-name">{user.name}</strong>
                  <small>{user.email}</small>
                </span>
                <ChevronDown
                  className="chevron"
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
              {profileOpen && (
                <div className="profile-menu">
                  <button
                    type="button"
                    onClick={() => {
                      closeMenus();
                      navigate("/settings");
                    }}
                  >
                    My profile
                  </button>
                  <button type="button" onClick={handleLogout}>
                    Log out
                  </button>
                </div>
              )}
            </div>
          </header>
        </>
      )}

      <main
        className={
          isPublicAuthPage
            ? "login-page-content"
            : `page-content ${menuOpen ? "sidebar-open" : ""}`
        }
      >
        <Routes>
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
          />



          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teachers/add" element={<TeacherForm />} />
          <Route path="/teachers/edit/:id" element={<EditTeacher />} />
          <Route path="/teachers/:id" element={<TeacherDetails />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
          <Route path="/courses/add" element={<CourseForm />} />
          <Route path="/courses/edit/:id" element={<CourseForm />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/add" element={<AddDepartment />} />
          <Route path="/departments/edit/:id" element={<EditDepartment />} />
          <Route path="/departments/:id" element={<DepartmentDetails />} />
          <Route path="/attendance/add" element={<MarkAttendance />} />
          <Route path="/attendance/edit/:id" element={<EditAttendance />} />
          <Route path="/attendance/:id" element={<AttendanceDetails />} />
          <Route path="/fees/add" element={<AddFee />} />
          <Route path="/fees/:id" element={<FeeDetails />} />
          <Route path="/fees/edit/:id" element={<EditFee />} />
          <Route path="/exams/add" element={<AddExam />} />
          <Route path="/exams/:id" element={<ExamDetails />} />
          <Route path="/exams/edit/:id" element={<EditExam />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/add" element={<AdminUserForm />} />
            <Route
              path="/admin/users/edit/:id"
              element={<AdminUserForm />}
            />
          </Route>
          <Route element={<RoleRoute allowedRoles={["admin", "teacher"]} />}>
            <Route path="/teacher/attendance" element={<Attendance />} />
            <Route path="/teacher/exams" element={<Exams />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={["student"]} />}>
            <Route path="/my-results" element={<Exams />} />
            <Route path="/my-attendance" element={<Attendance />} />
          </Route>
          <Route path="/attendance-report" element={<AttendanceReport />} />
          <Route path="/reports/students" element={<StudentReport />} />
          <Route path="/reports/teachers" element={<TeacherReport />} />
          <Route path="/reports/fees" element={<FeeReport />} />
          <Route path="/reports/exams" element={<ExamReport />} />
          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
          />
        </Routes>

      </main>
    </div>
  );
}
