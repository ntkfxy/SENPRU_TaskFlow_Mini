import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit, CheckCircle2, Clock, Loader2 } from "lucide-react";
import useTaskStore from "../store/useTaskStore";

const HomePage = () => {
  const { tasks, isLoading, getTasks, createTask, updateTask, deleteTask } =
    useTaskStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
  });

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const openModal = (task = null) => {
    if (task) {
      setEditingId(task._id);
      setFormData(task);
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateTask(editingId, formData);
    } else {
      await createTask(formData);
    }

    setIsModalOpen(false);
  };

  // 🎨 color mapping (pony pastel)
  const statusColor = {
    pending: "bg-yellow-200 text-yellow-800",
    "in-progress": "bg-blue-200 text-blue-800",
    completed: "bg-green-200 text-green-800",
  };

  const priorityColor = {
    low: "text-sky-500",
    medium: "text-purple-500",
    high: "text-pink-500",
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-sky-100 p-6">
      {/* Background magic blobs */}
      <div className="absolute w-72 h-72 bg-pink-300/30 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-purple-300/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-purple-700 flex items-center gap-2">
              <CheckCircle2 className="text-pink-400" />
              My Tasks ✨
            </h1>
            <p className="text-purple-500 mt-1">
              Organize your magical daily journey 🌈
            </p>
          </div>

          <button
            onClick={() => openModal()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            <Plus size={18} />
            New Task
          </button>
        </div>

        {/* LOADING */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-purple-500" size={40} />
          </div>
        ) : tasks.length === 0 ? (
          /* EMPTY */
          <div className="text-center py-20 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg">
            <Clock className="mx-auto mb-4 text-purple-400" size={40} />
            <h3 className="text-xl font-semibold text-purple-700">
              No tasks yet ✨
            </h3>
            <p className="text-purple-500 mt-2">
              Create your first magical task 🌈
            </p>
          </div>
        ) : (
          /* TASK GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl shadow-lg p-5 hover:scale-[1.02] transition"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      statusColor[task.status]
                    }`}
                  >
                    {task.status}
                  </span>

                  <span
                    className={`text-xs font-bold uppercase ${
                      priorityColor[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* Content */}
                <h2 className="text-lg font-bold text-purple-800 mb-1">
                  {task.title}
                </h2>
                <p className="text-sm text-purple-600 line-clamp-3">
                  {task.description || "No description"}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => openModal(task)}
                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:scale-110 transition"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="p-2 rounded-lg bg-pink-100 text-pink-600 hover:scale-110 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-purple-700 mb-4">
              {editingId ? "Edit Task ✨" : "Create Task 🌈"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 h-11 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none"
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 h-24 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="h-11 rounded-xl bg-white/60 border border-white/40"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="h-11 rounded-xl bg-white/60 border border-white/40"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white"
                >
                  Save ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
