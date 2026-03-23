import React, { useState } from "react";
import { MessageSquare, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");

    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid Email Format");

    if (!formData.password.trim()) return toast.error("Password is required");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  };

  return (
    <div className="min-h-[100dvh] flex relative overflow-hidden font-sans bg-gradient-to-br from-pink-200 via-purple-200 to-sky-200">
      {/* Magical background blobs */}
      <div className="absolute w-72 h-72 bg-pink-300/40 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-purple-300/40 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      {/* LEFT: FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 relative z-10">
        <div className="w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/50 rounded-2xl shadow-md border border-white/40">
              <MessageSquare className="text-pink-500 w-10 h-10" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2">
              Welcome Back ✨
            </h1>
            <p className="text-sm text-purple-500">
              Sign in to your magical account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-purple-600">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full mt-1 px-4 h-12 rounded-xl bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 text-purple-800 placeholder-purple-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-purple-600">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 pr-10 h-12 rounded-xl bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 text-purple-800 placeholder-purple-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Loading...
                </>
              ) : (
                "Login ✨"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-purple-500 mt-6">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-pink-500 font-semibold hover:underline"
            >
              Create account
            </a>
          </p>
        </div>
      </div>

      {/* RIGHT: MAGIC PANEL */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-300 to-purple-300 shadow-lg animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        <div className="absolute bottom-10 text-center px-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            Friendship is Magic 🌈
          </h2>
          <p className="text-purple-500 text-sm max-w-sm">
            Enter your account and continue your magical journey with friends.
          </p>
        </div>
      </div>
    </div>
  );
}
