import { create } from "zustand";
import axiosInstance from "../service/api";
import toast from "react-hot-toast";

const useTaskStore = create((set, get) => ({
  // 1. กำหนด State เริ่มต้น
  tasks: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  // 2. ฟังก์ชันดึงข้อมูลงานทั้งหมด (GET /tasks)
  getTasks: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/tasks");
      set({ tasks: res.data });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error(error.response?.data?.message || "Failed to fetch tasks");
    } finally {
      set({ isLoading: false });
    }
  },

  // 3. ฟังก์ชันสร้างงานใหม่ (POST /tasks)
  createTask: async (taskData) => {
    set({ isCreating: true });
    try {
      const res = await axiosInstance.post("/tasks", taskData);
      // นำงานใหม่ไปต่อเติมใน State เดิมให้อัปเดตหน้าเว็บทันที
      set({ tasks: [res.data, ...get().tasks] });
      toast.success("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(error.response?.data?.message || "Failed to create task");
    } finally {
      set({ isCreating: false });
    }
  },

  // 4. ฟังก์ชันอัปเดตงาน (PUT /tasks/:id)
  updateTask: async (id, taskData) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put(`/tasks/${id}`, taskData);
      // หา task ตัวที่ถูกแก้ไข แล้วอัปเดตข้อมูลใน Array ให้ตรงกัน
      set({
        tasks: get().tasks.map((task) => (task._id === id ? res.data : task)),
      });
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(error.response?.data?.message || "Failed to update task");
    } finally {
      set({ isUpdating: false });
    }
  },

  // 5. ฟังก์ชันลบงาน (DELETE /tasks/:id)
  deleteTask: async (id) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      // กรองเอางานที่ถูกลบออกจาก Array หน้าเว็บจะได้หายไปทันที
      set({
        tasks: get().tasks.filter((task) => task._id !== id),
      });
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error.response?.data?.message || "Failed to delete task");
    } finally {
      set({ isDeleting: false });
    }
  },
}));

export default useTaskStore;
