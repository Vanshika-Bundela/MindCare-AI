import { motion } from "framer-motion";
// import ParticlesBg from "../components/ParticlesBg";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { dark, setDark } = useTheme();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden
      bg-gradient-to-br from-indigo-100 via-blue-50 to-teal-100
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition duration-500"
    >
      {/* 🌌 Particles */}
      {/* <ParticlesBg /> */}

      {/* 🌈 Floating Blobs */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-300 rounded-full blur-3xl opacity-30"
      />
      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-30"
      />

      {/* 🌿 NAVBAR */}
      <div className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/30 dark:bg-black/30 border-b border-white/20">
        <div className="flex justify-between items-center px-8 py-4">

          <h1 className="text-xl font-bold text-indigo-700 dark:text-white">
            MindCare AI
          </h1>

          <div className="flex items-center gap-6 text-gray-700 dark:text-gray-300">

            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/assessment">Assessment</Link>
            <Link to="/wellness">Wellness</Link>

            {/* 🌙 THEME TOGGLE */}
            <div
              onClick={() => setDark(!dark)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition
              ${dark ? "bg-indigo-600" : "bg-gray-300"}`}
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-5 h-5 bg-white rounded-full shadow-md"
              />
            </div>

            {/* 🔐 LOGOUT */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-500 text-white hover:scale-105 transition shadow-md"
            >
              Logout
            </button>

          </div>
        </div>
      </div>

      {/* 🌿 HERO */}
      <div className="flex flex-col items-center text-center pt-40 px-6">

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-gray-800 dark:text-white"
        >
          Calm Your Mind <br />
          <span className="text-indigo-600">Track Your Wellness</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-gray-600 dark:text-gray-300 max-w-xl"
        >
          AI-powered insights to understand and improve your mental wellbeing.
        </motion.p>

        <div className="mt-8 flex gap-4">

          {/* ✅ Get Started */}
          <Link to="/assessment">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:scale-110 transition shadow-lg hover:shadow-indigo-400/50">
              Get Started
            </button>
          </Link>

          {/* ✅ Explore → Wellness */}
          <Link to="/wellness">
            <button className="bg-white/40 dark:bg-white/10 px-6 py-3 rounded-xl backdrop-blur-lg hover:scale-105 transition">
              Explore
            </button>
          </Link>

        </div>
      </div>

      {/* 🌿 FEATURES */}
      <div className="mt-32 px-8 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "AI Stress Detection",
            desc: "Analyze your mental state intelligently.",
          },
          {
            title: "Daily Tracking",
            desc: "Track habits and emotions daily.",
          },
          {
            title: "Wellness Insights",
            desc: "Get personalized improvement tips.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="group relative p-6 rounded-2xl bg-white/40 dark:bg-white/10 backdrop-blur-lg border border-white/30 shadow-lg overflow-hidden hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition"
          >
            <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 blur-xl transition"></div>

            <h3 className="text-xl font-semibold text-indigo-700 dark:text-white relative z-10">
              {feature.title}
            </h3>

            <p className="mt-3 text-gray-600 dark:text-gray-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition relative z-10">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 🌿 TESTIMONIALS */}
      <div className="mt-32 overflow-hidden px-6">

        <h2 className="text-3xl text-center text-gray-800 dark:text-white mb-10">
          Loved by Users 
        </h2>

        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll w-max">

            {[...Array(2)].map((_, repeatIndex) => (
              <div key={repeatIndex} className="flex gap-6">
                {[
                  "Helped me reduce stress.",
                  "Amazing insights!",
                  "Feels like a therapist.",
                  "Improved my habits.",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="min-w-[300px] p-6 bg-white/40 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-md hover:scale-105 transition"
                  >
                    <p className="text-gray-600 dark:text-gray-300">
                      “{text}”
                    </p>
                  </div>
                ))}
              </div>
            ))}

          </div>
        </div>
      </div>

    </div>
  );
}
