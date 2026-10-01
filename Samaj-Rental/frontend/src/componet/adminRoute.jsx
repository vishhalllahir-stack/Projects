import { Navigate } from "react-router-dom";


function AdminRoute({ children }) {

  const token =
    localStorage.getItem("token");

  const userData =
    localStorage.getItem("user");


  /* ==========================================
     CHECK LOGIN
  ========================================== */

  if (!token || !userData) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  /* ==========================================
     PARSE USER DATA
  ========================================== */

  let user;

  try {
    user = JSON.parse(userData);
  } catch (error) {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  /* ==========================================
     CHECK ADMIN ROLE
  ========================================== */

  if (user?.role !== "admin") {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }


  /* ==========================================
     ALLOW ADMIN
  ========================================== */

  return children;
}


export default AdminRoute;