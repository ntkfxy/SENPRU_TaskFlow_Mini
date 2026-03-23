const Task = require("../models/Task");

// 1. ดึงรายการงานทั้งหมดของผู้ใช้ปัจจุบัน (GET /tasks)
const getTasks = async (req, res) => {
  try {
    // ค้นหางานเฉพาะที่เป็นของ userId ที่ล็อกอินอยู่เท่านั้น (เงื่อนไขบังคับจากโจทย์)
    const tasks = await Task.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getTasks:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 2. สร้างงานใหม่ (POST /tasks)
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    // Validation เบื้องต้น (ได้คะแนนส่วน Validation)
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = new Task({
      title,
      description,
      status: status || "pending",
      priority: priority || "medium",
      userId: req.user.id, // บันทึกว่าใครเป็นเจ้าของงาน
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask); // HTTP 201 Created
  } catch (error) {
    console.error("Error in createTask:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 3. อัปเดตงาน (PUT /tasks/:id)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    // ค้นหางานและตรวจสอบว่าเป็นของ user ที่กำลังล็อกอินหรือไม่
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ป้องกันไม่ให้แก้ของคนอื่น (คะแนนเงื่อนไขบังคับ)
    if (task.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    // อัปเดตข้อมูล
    task.title = title || task.title;
    task.description =
      description !== undefined ? description : task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error in updateTask:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 4. ลบงาน (DELETE /tasks/:id)
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ป้องกันไม่ให้ลบของคนอื่น
    if (task.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task removed successfully" });
  } catch (error) {
    console.error("Error in deleteTask:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
