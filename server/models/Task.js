const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TaskSchema = new Schema(
  {
    // ชื่อหัวข้องาน (บังคับต้องมี ตามที่โจทย์ไกด์ว่า title)
    title: {
      type: String,
      required: true,
    },
    // รายละเอียดงาน (มีหรือไม่มีก็ได้)
    description: {
      type: String,
    },
    // สถานะของงาน (ตามที่โจทย์ไกด์ว่า status)
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"], // กำหนดค่าที่ยอมรับได้
      default: "pending",
    },
    // ความสำคัญของงาน (ตามที่โจทย์ไกด์ว่า priority)
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    // เจ้าของงาน (เชื่อมกับ User ID ของคนที่ล็อกอิน)
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }, // เก็บ createdAt, updatedAt อัตโนมัติ (ดีมากครับ เก็บไว้เลย)
);

const Task = model("Task", TaskSchema);
module.exports = Task;
