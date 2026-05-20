import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const resetData = () => {
  localStorage.removeItem("formData");
  localStorage.removeItem("result");
  localStorage.removeItem("suggestions");
  localStorage.removeItem("score");
  localStorage.removeItem("history");
  localStorage.removeItem("sessions");

  window.location.href = "/assessment";
};
  const { user, logout } = useAuth();
  const { dark, setDark } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/30 dark:bg-black/30 border-b border-white/20">
      <div className="flex justify-between items-center px-8 py-4">

        <h1 className="text-xl font-bold text-indigo-700 dark:text-white">
          MindCare AI
        </h1>

        <div className="flex items-center gap-6 text-gray-700 dark:text-gray-300">

          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/assessment">Assessment</Link>

          {/* 🌙 TOGGLE */}
          <div
            onClick={() => setDark(!dark)}
            className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer
            ${dark ? "bg-indigo-600" : "bg-gray-300"}`}
          >
            <motion.div
              layout
              className={`w-5 h-5 bg-white rounded-full shadow-md ${
                dark ? "translate-x-7" : ""
              }`}
            />
          </div>

          {/* 👤 USER */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="px-3 py-2 bg-white/40 dark:bg-white/10 rounded-lg"
            >
              {user?.name || "User"}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
                <p className="px-3 py-2 text-sm text-gray-500">
                  {user?.email}
                </p>

                <button
                  onClick={() => {
                    logout();
                    window.location.href = "/login";
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-red-100 rounded-lg text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}