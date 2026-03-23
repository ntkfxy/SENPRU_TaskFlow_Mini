import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  Loader2,
  Search,
} from "lucide-react";
import useTaskStore from "../store/useTaskStore";

const HomePage = () => {
  const { tasks, isLoading, getTasks, createTask, updateTask, deleteTask } =
    useTaskStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
  });

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

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
    if (editingId) await updateTask(editingId, formData);
    else await createTask(formData);
    setIsModalOpen(false);
  };

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
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-sky-100 px-4 py-6 sm:px-8 lg:px-12">
      {/* Background blobs - Hidden on very small screens for performance */}
      <div className="hidden sm:block absolute w-72 h-72 bg-pink-300/30 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="hidden sm:block absolute w-72 h-72 bg-purple-300/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER - Stack on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-6 text-center md:text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 flex items-center justify-center md:justify-start gap-2">
              <CheckCircle2 className="text-pink-400" />
              My Tasks ✨
            </h1>
            <p className="text-purple-500 mt-1 text-sm sm:text-base">
              Organize your magical daily journey 🌈
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 font-semibold"
          >
            <Plus size={20} /> New Task
          </button>
        </div>

        {/* SEARCH & FILTERS - Optimized Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          <div className="relative group sm:col-span-2 lg:col-span-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-pink-400 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search magic tasks..."
              className="w-full pl-10 pr-4 h-12 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 outline-none focus:ring-2 focus:ring-pink-300 transition shadow-sm text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:col-span-2 lg:col-span-2">
            <select
              className="h-12 px-2 sm:px-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 outline-none focus:ring-2 focus:ring-pink-300 shadow-sm text-xs sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status 🌈</option>
              <option value="pending">Pending ⏳</option>
              <option value="in-progress">In Progress 🚀</option>
              <option value="completed">Completed ✅</option>
            </select>

            <select
              className="h-12 px-2 sm:px-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 outline-none focus:ring-2 focus:ring-pink-300 shadow-sm text-xs sm:text-sm"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priority 🎈</option>
              <option value="low">Low ☁️</option>
              <option value="medium">Medium ⭐</option>
              <option value="high">High 🔥</option>
            </select>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-purple-500" size={40} />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-16 bg-white/30 backdrop-blur-md rounded-3xl border border-white/20">
            <Search className="mx-auto text-purple-300 mb-4" size={48} />
            <p className="text-purple-600 font-medium">
              No tasks found in your magic box! ✨
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="flex flex-col bg-white border border-pink-100 rounded-2xl shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group p-5"
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${statusColor[task.status]}`}
                  >
                    {task.status}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase ${priorityColor[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-purple-800 mb-2 truncate">
                  {task.title}
                </h2>
                <p className="text-sm text-purple-600/80 line-clamp-2 flex-grow mb-4">
                  {task.description || "No description provided."}
                </p>

                <div className="flex justify-end gap-2 pt-4 border-t border-white/20">
                  <button
                    onClick={() => openModal(task)}
                    className="p-2.5 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() =>
                      window.confirm("Delete this task?") &&
                      deleteTask(task._id)
                    }
                    className="p-2.5 rounded-xl bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL - Responsive Width */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white/90 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-purple-700 mb-4">
              {editingId ? "Edit Task ✨" : "New Magic Task 🌈"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="What needs to be done?"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 h-12 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none transition-all"
              />

              <textarea
                placeholder="Add some magical details..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 h-28 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none resize-none transition-all"
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-purple-400 uppercase ml-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl bg-white/60 border border-white/40 outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-purple-400 uppercase ml-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl bg-white/60 border border-white/40 outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold shadow-md hover:shadow-pink-200 transition-all"
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
