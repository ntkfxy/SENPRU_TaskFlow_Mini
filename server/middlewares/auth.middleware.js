const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

require("dotenv").config();

// Middleware สำหรับตรวจสอบ JWT token และดึงข้อมูล user จาก token มาเก็บไว้ใน req.user
const protectedRoute = async (req, res, next) => {
  try {
    let token;

    // 1. ตรวจสอบว่ามี Header Authorization และขึ้นต้นด้วยคำว่า Bearer หรือไม่
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // ดึง token ออกมาจาก string "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. ถ้าไม่มี token ให้ส่ง response 401 Unauthorized
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // 3. ถ้ามี token ให้ verify token ด้วย secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. ถ้า token ถูกต้อง ให้ดึงข้อมูล user จาก database โดยใช้ userId ที่ได้จาก token
    const user = await UserModel.findById(decoded.id).select("-password");

    // ถ้าไม่เจอ user
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // 5. แนบข้อมูล user เข้ากับ request เพื่อให้ Controller ถัดไปเรียกใช้ได้
    req.user = user;
    next();
  } catch (error) {
    // ดักจับ Error กรณี Token หมดอายุ หรือไม่ถูกต้อง
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Token expired" });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error while checking auth" });
  }
};

const authMiddleware = {
  protectedRoute,
};
module.exports = authMiddleware;
