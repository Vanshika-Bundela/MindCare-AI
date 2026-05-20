import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import { PieChart, Pie, Cell } from "recharts";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Brain, Zap, Timer } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [result, setResult] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [sessions, setSessions] = useState(0);
  const [score, setScore] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedResult = localStorage.getItem("result");
    const storedScore = localStorage.getItem("score");

    setResult(storedResult);
    setSuggestions(JSON.parse(localStorage.getItem("suggestions")) || []);
    setSessions(Number(localStorage.getItem("sessions")) || 0);

    if (storedScore !== null) {
      setScore(Number(storedScore));
    } else if (storedResult) {
      const fallback =
        storedResult === "Stressed" ? 80 :
        storedResult === "At Risk" ? 50 : 20;

      setScore(fallback);
    } else {
      setScore(null);
    }

    setHistory(JSON.parse(localStorage.getItem("history")) || []);
  }, []);

  const color =
    result === "Healthy" ? "#22c55e" :
    result === "At Risk" ? "#eab308" :
    "#ef4444";

  return (
    <div className="min-h-screen
    bg-gradient-to-br from-indigo-100 via-blue-50 to-teal-100
    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition">

      <Navbar />

      <div className="pt-24 px-6 md:px-10">

        <h1 className="text-3xl font-bold text-indigo-700 dark:text-white mb-8">
          MindCare Dashboard
        </h1>

        {/* 🔥 TOP CARDS (Sleep removed) */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Mental State", value: result || "--", icon: <Brain /> },
            {
              label: "Stress",
              value: score !== null ? `${score}%` : "--",
              icon: <Zap />,
            },
            { label: "Focus", value: sessions, icon: <Timer /> },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.03 }}
              className="p-5 rounded-2xl
              bg-white/60 dark:bg-white/5 backdrop-blur-xl
              border border-white/30 shadow-lg"
            >
              <div className="text-indigo-600 dark:text-indigo-300 mb-2">
                {item.icon}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-300">
                {item.label}
              </p>

              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {item.value}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* 📊 ONLY GAUGE (Habit Breakdown removed) */}
        <div className="grid md:grid-cols-1 gap-8">

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-lg"
          >
            <h2 className="mb-4 text-indigo-600 dark:text-indigo-400 font-semibold">
              Stress Gauge
            </h2>

            <div className="relative h-56">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { value: score !== null ? score : 0 },
                      { value: score !== null ? 100 - score : 100 },
                    ]}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={70}
                    outerRadius={90}
                    dataKey="value"
                  >
                    <Cell fill={color} />
                    <Cell fill="#374151" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center mt-6">
                <h2 className="text-2xl font-bold" style={{ color }}>
                  {score !== null ? `${score}%` : "--"}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {result || "--"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 📈 TREND */}
        {history.length > 0 && (
          <div className="mt-8 p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-lg">
            <h2 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
              Stress Trend
            </h2>

            <ResponsiveContainer height={200}>
              <LineChart data={history}>
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                />
                <Line dataKey="score" stroke="#6366f1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* 💡 INSIGHT */}
        <div className="mt-8 p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-lg">
          <h2 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
            AI Insight
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            Your current mental state is <b>{result || "--"}</b>.
          </p>
        </div>

        {/* 🌿 SUGGESTIONS */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {suggestions.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-xl bg-white/50 dark:bg-white/10 shadow text-gray-800 dark:text-gray-200"
            >
              🌿 {s}
            </motion.div>
          ))}
        </div>

        {/* 🎯 ACTIONS */}
        <div className="mt-10 flex gap-4 flex-wrap">
          <Link to="/assessment">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
              Retake
            </button>
          </Link>

          <button
            onClick={() => window.print()}
            className="bg-gray-800 text-white px-6 py-3 rounded-xl"
          >
            Export
          </button>
        </div>

      </div>
    </div>
  );
}