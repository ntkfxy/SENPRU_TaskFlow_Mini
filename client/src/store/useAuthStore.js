import { create } from "zustand";
import api from "../service/api";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  token: localStorage.getItem("token") || null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isRegistering: false,

  // 1. ตรวจสอบสถานะการล็อกอิน
  checkAuth: async () => {
    try {
      const res = await api.get("/auth/me");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null, token: null });
      localStorage.removeItem("token");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // 2. สมัครสมาชิก
  register: async (data) => {
    set({ isRegistering: true });
    try {
      const res = await api.post("/auth/register", data);
      set({ authUser: res.data, token: res.data.token });
      localStorage.setItem("token", res.data.token); // เก็บ Token
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    } finally {
      set({ isRegistering: false });
    }
  },

  // 3. เข้าสู่ระบบ
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await api.post("/auth/login", data);
      set({ authUser: res.data, token: res.data.token });
      localStorage.setItem("token", res.data.token); // เก็บ Token
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // 4. ออกจากระบบ
  logout: () => {
    set({ authUser: null, token: null });
    localStorage.removeItem("token"); // ลบ Token
    toast.success("Logged out successfully");
  },
}));

export default useAuthStore;
