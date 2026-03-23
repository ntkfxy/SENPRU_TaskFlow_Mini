const express = require("express");
const router = express.Router();
// แนะนำให้ตั้งชื่อไฟล์เป็น authController เพื่อความสื่อความหมายครับ
const authController = require("../controllers/user.controller");
const { protectedRoute } = require("../middlewares/auth.middleware");

// POST /auth/register - สมัครสมาชิก
router.post("/register", authController.register);

// POST /auth/login - เข้าสู่ระบบ
router.post("/login", authController.login);

// GET /auth/me - ดึงข้อมูลผู้ใช้ที่ล็อกอิน (เปลี่ยนจาก /check เป็น /me)
router.get("/me", protectedRoute, authController.getMe);

module.exports = router;
