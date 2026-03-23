import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom"; // หรือ react-router
import App from "./App.jsx";
import "./index.css";
import useAuthStore from "../store/useAuthStore";

// นำเข้าหน้าต่างๆ (ถ้าสร้างไฟล์ไว้แล้ว)
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// 🔒 Component ป้องกันหน้าเว็บ: ถ้ายังไม่ล็อกอิน ให้เด้งไปหน้า Login
const ProtectedRoute = ({ children }) => {
  const authUser = useAuthStore((state) => state.authUser);
  if (!authUser) return <Navigate to="/login" replace />;
  return children;
};

// 🔓 Component สำหรับหน้า Login/Register: ถ้าล็อกอินแล้ว ให้เด้งไปหน้าหลักเลย (ไม่ต้องล็อกอินซ้ำ)
const PublicRoute = ({ children }) => {
  const authUser = useAuthStore((state) => state.authUser);
  if (authUser) return <Navigate to="/" replace />;
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // ใช้ App.jsx เป็น Layout หลัก
    children: [
      {
        path: "/",
        // หน้า Dashboard ต้องผ่านด่าน ProtectedRoute ก่อน
        element: <ProtectedRoute></ProtectedRoute>,
      },
      {
        path: "/login",
        // หน้า Login ห้ามคนล็อกอินแล้วเข้า
        element: (
          <PublicRoute>
            {/* <Login /> */}
            <div className="p-10 text-center text-2xl">
              นี่คือหน้า Login (กำลังสร้าง)
            </div>
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            {/* <Register /> */}
            <div className="p-10 text-center text-2xl">
              นี่คือหน้า Register (กำลังสร้าง)
            </div>
          </PublicRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
