import React, { useState } from "react";
// เปลี่ยน MessageSquare เป็น Sparkles เพื่อความวิ้งวับแบบ Pony
import { Sparkles, Eye, EyeOff, Loader2, Heart } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { toast } from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { register, isRegistering } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("Darling, Full Name is required ✨");

    if (!formData.email.trim())
      return toast.error("Email is required to join the magic!");

    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Hmm, that Email format doesn't look right.");

    if (!formData.password.trim())
      return toast.error("Password is required for safety!");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 magical characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (!success) return;

    try {
      await register(formData);
      // ข้อความแจ้งเตือนแบบ Pony
      toast.success("Welcome to Equestria! Account created 🎉💖");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Oops! Something went wrong with the magic.",
      );
    }
  };

  // กำหนดสีรุ้งพาสเทลสำหรับ Grid ด้านขวา
  const rainbowColors = [
    "bg-[#FFB3BA]", // Pastel Red/Pink
    "bg-[#FFDFBA]", // Pastel Orange
    "bg-[#FFFFBA]", // Pastel Yellow
    "bg-[#BAFFC9]", // Pastel Green
    "bg-[#BAE1FF]", // Pastel Blue
    "bg-[#D1BBFF]", // Pastel Purple
    "bg-[#FFC8DD]", // Pinkie Pink
    "bg-[#CDB4DB]", // Twilight Purple
    "bg-[#A2D2FF]", // Rainbow Blue
  ];

  return (
    // BG เปลี่ยนเป็น Gradient ชมพู-ม่วงอ่อนๆ
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#FFF0F5] via-white to-[#E6E6FA] flex relative overflow-hidden font-sans selection:bg-[#FFB6C1] selection:text-white">
      {/* Decorative Sparkles background effect */}
      <div className="absolute inset-0 opacity-20">
        <Sparkles className="absolute top-10 left-10 text-[#FF69B4] size-10 animate-pulse" />
        <Heart className="absolute bottom-20 left-1/4 text-[#BAFFC9] size-8 animate-bounce" />
        <Sparkles className="absolute top-1/3 right-10 text-[#BAE1FF] size-12 animate-pulse delay-100" />
      </div>

      {/* ========================================= */}
      {/* ส่วนที่ 1: ส่วนซ้าย (แบบฟอร์ม Register)     */}
      {/* ========================================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-10 md:px-12 relative z-10">
        {/* เพิ่ม Card สีขาวรอบฟอร์มเพื่อให้ลอยเด่นและดูนุ่มนวล */}
        <div className="w-full max-w-[400px] sm:max-w-[440px] bg-white/80 backdrop-blur-sm p-8 sm:p-10 rounded-[3rem] shadow-2xl shadow-[#FFB6C1]/20 border border-[#FFB6C1]/10">
          {/* Logo - เปลี่ยนสีและสไตล์ */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="p-4 bg-[#FFEDF2] rounded-full border-2 border-[#FFB6C1] shadow-lg shadow-[#FFB6C1]/30">
              {/* ใช้สีชมพูเข้ม Hot Pink */}
              <Sparkles className="text-[#FF69B4] w-10 h-10 sm:w-12 sm:h-12" />
            </div>
          </div>

          {/* Title - ปรับสีตัวอักษรเป็นม่วงเข้ม Twilight */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#4B0082] mb-2 sm:mb-3 tracking-tight">
              Join the Magic!
            </h1>
            <p className="text-sm sm:text-base text-[#8A2BE2]/70 font-medium">
              Create your profile and make new friends
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Input Full Name */}
            <div className="form-control w-full flex flex-col">
              <label className="label pb-1 sm:pb-1.5 pl-2">
                <span className="label-text text-xs sm:text-sm font-bold text-[#4B0082]">
                  Pony Name / Full Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Pinkie Pie"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                // ปรับสไตล์ Input: สีอ่อนลง, ขอบโค้งมากขึ้น, Focus สีชมพู
                className="input input-bordered w-full bg-white border-2 border-[#E6E6FA] rounded-full focus:border-[#FF69B4] focus:outline-none focus:ring-2 focus:ring-[#FFB6C1]/50 text-[#4B0082] placeholder:text-slate-400 pl-6 h-12 sm:h-13 text-sm sm:text-base transition-all duration-200 shadow-inner"
              />
            </div>

            {/* Input Email */}
            <div className="form-control w-full flex flex-col">
              <label className="label pb-1 sm:pb-1.5 pl-2">
                <span className="label-text text-xs sm:text-sm font-bold text-[#4B0082]">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                placeholder="Fluttershy@kindness.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input input-bordered w-full bg-white border-2 border-[#E6E6FA] rounded-full focus:border-[#FF69B4] focus:outline-none focus:ring-2 focus:ring-[#FFB6C1]/50 text-[#4B0082] placeholder:text-slate-400 pl-6 h-12 sm:h-13 text-sm sm:text-base transition-all duration-200 shadow-inner"
              />
            </div>

            {/* Input Password */}
            <div className="form-control w-full flex flex-col">
              <label className="label pb-1 sm:pb-1.5 pl-2">
                <span className="label-text text-xs sm:text-sm font-bold text-[#4B0082]">
                  Secret Password
                </span>
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="input input-bordered w-full bg-white border-2 border-[#E6E6FA] rounded-full focus:border-[#FF69B4] focus:outline-none focus:ring-2 focus:ring-[#FFB6C1]/50 text-[#4B0082] placeholder:text-slate-400 pl-6 pr-12 h-12 sm:h-13 text-sm sm:text-base transition-all duration-200 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A2BE2]/50 hover:text-[#FF69B4] transition-colors p-1"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button - สีชมพู Hot Pink, ขอบโค้งมน, มี Shadow สีชมพู */}
            <button
              type="submit"
              disabled={isRegistering}
              className="w-full bg-gradient-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#FF1493] hover:to-[#FF69B4] disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed rounded-full border-none text-white text-base sm:text-lg font-bold mt-4 sm:mt-6 h-12 sm:h-13 flex items-center justify-center shadow-lg shadow-[#FF69B4]/30 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  Casting Spell....
                </>
              ) : (
                <>
                  Start Your Journey!{" "}
                  <Heart className="size-5 ml-2 fill-white" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link - สีม่วง */}
          <p className="text-center text-[#8A2BE2]/80 mt-8 sm:mt-10 text-sm font-medium">
            Already a citizen of Equestria?{" "}
            <a
              href="/login"
              className="text-[#FF1493] hover:text-[#4B0082] hover:underline font-bold transition-colors"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>

      {/* ========================================= */}
      {/* ส่วนที่ 2: ส่วนขวา (Hero Grid Section)     */}
      {/* ========================================= */}
      {/* เปลี่ยน BG ด้านขวาเป็นสีม่วงอ่อน Twilight */}
      <div className="hidden lg:flex w-1/2 bg-[#F8F8FF] relative flex-col justify-center items-center p-8 xl:p-12 border-l-4 border-dashed border-[#FFB6C1]/50">
        {/* ก้อนเมฆตกแต่งด้านหลัง */}
        <div className="absolute top-20 right-20 bg-white size-32 rounded-full opacity-60 filter blur-xl"></div>
        <div className="absolute bottom-20 left-20 bg-white size-40 rounded-full opacity-60 filter blur-xl"></div>

        <div className="w-full max-w-[240px] sm:max-w-[320px] xl:max-w-[400px] grid grid-cols-3 gap-3 sm:gap-4 xl:gap-5 mb-8 sm:mb-12 xl:mb-16 opacity-100 relative z-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              // ใช้สีรุ้งพาสเทลจาก Array, ปรับความโค้งให้มนขึ้น
              className={`w-full aspect-square ${rainbowColors[i]} rounded-3xl shadow-[0_0_15px_rgba(255,182,193,0.5)] animate-pulse border-4 border-white`}
              style={{
                animationDelay: `${i * 0.15}s`, // เร่งจังหวะให้เร็วขึ้นเล็กน้อย
                animationDuration: "2.5s",
              }}
            ></div>
          ))}
        </div>

        <div className="text-center relative z-10 max-w-sm xl:max-w-md px-4 White Card (Optional for text consistency)">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white">
            <h2 className="text-2xl xl:text-3xl font-extrabold text-[#4B0082] mb-3 sm:mb-4 tracking-tight">
              Friendship is Magic! 🌈
            </h2>
            <p className="text-sm xl:text-base text-[#8A2BE2] leading-relaxed font-medium">
              Explore the wonders of Ponyville, share smiles, and discover the
              true power of harmony with everypony!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
