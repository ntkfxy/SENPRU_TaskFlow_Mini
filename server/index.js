const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// นำเข้า Router
const AuthRouter = require("./routers/user.router");
const TaskRouter = require("./routers/task.router");

dotenv.config();

// ใช้ Express ปกติ ไม่ต้องดึงจาก lib/socket แล้วครับ
const app = express();

const DB_URL = process.env.DB_URL;
// อนุญาตให้รับค่าจาก Vercel ตอน Deploy, ถ้าไม่มีให้ใช้ localhost
const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT || 5000;

// 1. Middleware: จัดการ JSON (เอา limit 50mb ออกได้เพราะเราไม่ได้อัปโหลดรูปแล้ว)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// เอา cookieParser ออกได้เลย เพราะเราเปลี่ยนไปใช้ Token ผ่าน Header แล้ว

// 2. Middleware: CORS
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true, // อนุญาตให้ส่ง Header Authorization
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // ต้องมี Authorization
  }),
);

// 3. เส้นทางทดสอบ (Root Route)
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SE NPRU TaskFlow Mini API</h1>"); // แก้ชื่อให้ตรงโปรเจกต์
});

// 4. ประกาศใช้งาน Router (ปรับ Path ให้ตรงตามโจทย์ข้อ 3A เป๊ะๆ)
// - POST /auth/register
// - POST /auth/login
// - GET /auth/me
app.use("/api/v1/auth", AuthRouter);

// - GET, POST, PUT, DELETE /tasks
app.use("/api/v1/tasks", TaskRouter);

// 5. การเชื่อมต่อฐานข้อมูล
if (!DB_URL) {
  console.error("DB_URL is missing. Please set it in your .env file.");
} else {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error.message);
    });
}

// ใช้ app.listen แทน server.listen
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
