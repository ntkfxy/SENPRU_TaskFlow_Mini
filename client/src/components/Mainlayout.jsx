import React from "react";
import { Outlet } from "react-router";
import NavBar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-sky-100 text-purple-900">
      {/* Magical background blobs */}
      <div className="absolute w-96 h-96 bg-pink-300/30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse" />
      <div className="absolute w-96 h-96 bg-purple-300/30 blur-3xl rounded-full bottom-[-120px] right-[-120px] animate-pulse" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/40 border-b border-white/30 shadow-sm">
        <NavBar />
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
