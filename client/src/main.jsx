import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/Router";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast"; // 1. เพิ่ม import ตัวนี้

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 2. วาง Toaster ไว้ข้างๆ RouterProvider */}
    <Toaster position="top-center" reverseOrder={false} />

    <RouterProvider router={router} />
  </StrictMode>,
);
