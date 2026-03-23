import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
console.log("API Base URL:", baseURL);

// ใช้ design pattern ชื่อ singleton
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // ปิดไว้ได้เลยครับ เพราะเราส่ง Token ผ่าน Header แล้ว ไม่ได้ใช้ Cookie
});

// 🌟 เพิ่ม Interceptor: ดักจับก่อนที่ Request จะถูกส่งออกไป
instance.interceptors.request.use(
  (config) => {
    // ไปค้นกระเป๋า (localStorage) ว่ามี Token ไหม
    const token = localStorage.getItem("token");
    if (token) {
      // ถ้ามี ให้แนบใส่ Header ไปด้วย
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
