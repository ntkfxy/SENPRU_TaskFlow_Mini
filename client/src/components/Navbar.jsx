import React from "react";
import { LogOut, CheckCircle, User } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"; // แก้ไข import ให้ถูกต้อง

const Navbar = () => {
  const { logOut, authUser } = useAuthStore();

  return (
    // ปรับพื้นหลังให้ดูโปร่งแสง (Backdrop blur) เข้ากับธีมสว่าง/พาสเทล
    <div className="navbar bg-base-100/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 sticky top-0 z-50 border-b border-base-200">
      {/* Logo */}
      <div className="flex-1">
        <Link
          to="/home"
          className="btn btn-ghost hover:bg-transparent normal-case text-xl gap-3 px-0"
        >
          <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 shadow-sm">
            <CheckCircle className="text-primary" size={24} />
          </div>
          {/* เปลี่ยนชื่อแอปให้ตรงกับโปรเจกต์ */}
          <span className="font-extrabold text-base-content tracking-tight">
            Magic Tasks ✨
          </span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex-none gap-1 sm:gap-2 flex items-center">
        {authUser ? (
          <>
            {/* โชว์ชื่อคนล็อกอินนิดนึง จะได้ดูสมบูรณ์ */}
            <div className="hidden sm:flex items-center gap-2 mr-2 px-3 py-1.5 bg-base-200 rounded-full border border-base-300">
              <User size={16} className="text-primary" />
              <span className="text-sm font-semibold text-base-content/80">
                {authUser.fullName || "User"}
              </span>
            </div>

            <button
              onClick={logOut}
              className="btn btn-ghost text-base-content/70 hover:text-error hover:bg-error/10 gap-2 rounded-full transition-colors"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline font-bold">Logout</span>
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="btn btn-ghost text-base-content/70 hover:text-primary hover:bg-primary/10 rounded-full font-bold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary rounded-full font-bold shadow-md shadow-primary/20"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
