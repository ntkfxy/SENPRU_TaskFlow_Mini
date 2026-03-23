const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

/**
 * =========================
 * REGISTER
 * =========================
 */
const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide fullname, email and password" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email is already existed" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // สร้าง Token
    const token = jwt.sign({ id: user._id, fullName: user.fullName }, secret, {
      expiresIn: "1d",
    });

    // 💡 เปลี่ยนจาก res.cookie เป็นการแนบ token กลับไปใน JSON
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      token: token, // <--- เพิ่มตรงนี้
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error while registering user" });
  }
};

/**
 * =========================
 * LOGIN
 * =========================
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // สร้าง Token
    const token = jwt.sign({ id: user._id, fullName: user.fullName }, secret, {
      expiresIn: "1d",
    });

    // 💡 เปลี่ยนจาก res.cookie เป็นการแนบ token กลับไปใน JSON
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      token: token, // <--- เพิ่มตรงนี้
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error while logging in" });
  }
};

/**
 * =========================
 * GET ME (เปลี่ยนชื่อจาก checkAuth ให้ตรงโจทย์)
 * =========================
 */
const getMe = async (req, res) => {
  try {
    // req.user จะถูกส่งมาจาก Middleware protectedRoute
    // ควรค้นหา User อีกครั้งเผื่อข้อมูลมีการอัปเดต หรือส่ง req.user กลับไปเลยก็ได้
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error while checking auth" });
  }
};

// ตัด logOut และ updateProfile ทิ้งไปเลยครับ ไม่ได้ใช้ในข้อสอบ
module.exports = {
  register,
  login,
  getMe,
};
