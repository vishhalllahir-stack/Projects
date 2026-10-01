import {
  Routes,
  Route,
} from "react-router-dom";


/* =========================
   USER PAGES
========================= */

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import ItemDetails from "./pages/ItemsDetails";
import Cart from "./pages/Cart";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBooking";
import Bill from "./pages/Bill";
import NotFound from "./pages/NotFound";


/* =========================
   ADMIN PAGES
========================= */

import AdminDashboard from "./admin/AdminDashboard";
import ManageItems from "./admin/ManageItems";
import ManageBookings from "./admin/manageBooking";
import ManageUsers from "./admin/ManegeUser";
import ManageBills from "./admin/ManageBill";


/* =========================
   ROUTE PROTECTION
========================= */

import ProtectedRoute from "./componet/ProtectRoute";
import AdminRoute from "./componet/adminRoute";


/* =========================
   LAYOUT
========================= */

import Layout from "./componet/Layout";


function App() {
  return (
    <Routes>

      {/* =================================================
          PUBLIC ROUTES
      ================================================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =================================================
          USER ROUTES
      ================================================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/items"
        element={
          <ProtectedRoute>
            <Layout>
              <Items />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/items/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <ItemDetails />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Layout>
              <Cart />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <Layout>
              <Booking />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <Layout>
              <MyBookings />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/bill/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <Bill />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* =================================================
          ADMIN ROUTES
      ================================================= */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Layout>
              <AdminDashboard />
            </Layout>
          </AdminRoute>
        }
      />


      <Route
        path="/admin/items"
        element={
          <AdminRoute>
            <Layout>
              <ManageItems />
            </Layout>
          </AdminRoute>
        }
      />


      <Route
        path="/admin/bookings"
        element={
          <AdminRoute>
            <Layout>
              <ManageBookings />
            </Layout>
          </AdminRoute>
        }
      />


      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <Layout>
              <ManageUsers />
            </Layout>
          </AdminRoute>
        }
      />


      <Route
        path="/admin/bills"
        element={
          <AdminRoute>
            <Layout>
              <ManageBills />
            </Layout>
          </AdminRoute>
        }
      />


      {/* =================================================
          404 NOT FOUND
      ================================================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}


export default App;