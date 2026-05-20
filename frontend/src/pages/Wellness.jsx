import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Droplet, Moon, Brain, Wind } from "lucide-react";
import BreathingExercise from "../components/BreathingExercise";
import Navbar from "../components/Navbar"; // ✅ ADD THIS

export default function Wellness() {
  const [startBreathing, setStartBreathing] = useState(false);

  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time === 0) {
      if (isBreak) {
        setTime(1500);
        setIsBreak(false);
      } else {
        setTime(300);
        setIsBreak(true);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, time, isBreak]);

  const formatTime = () => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const cards = [
    {
      title: "Hydration Reminder",
      desc: "Stay hydrated throughout your day",
      icon: <Droplet />,
    },
    {
      title: "Sleep Reminder",
      desc: "Maintain a healthy sleep schedule",
      icon: <Moon />,
    },
    {
      title: "Meditation",
      desc: "Calm your mind with guided breathing",
      icon: <Brain />,
    },
    {
      title: "Mood Check-in",
      desc: "Track your daily emotional state",
      icon: <Wind />,
    },
  ];

  return (
    <div className="min-h-screen
    bg-gradient-to-br from-indigo-100 to-blue-100
    dark:from-gray-900 dark:to-gray-800 transition duration-500">

      {/* ✅ NAVBAR */}
      <Navbar />

      {/* ✅ CONTENT WRAPPER */}
      <div className="pt-24 px-6 py-16">

        <h1 className="text-3xl font-bold text-center text-indigo-700 dark:text-white mb-12">
          Wellness Tools 
        </h1>

        {/* 🌿 CARDS */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-6 rounded-2xl
              bg-white/40 dark:bg-white/10 backdrop-blur-lg
              border border-white/30 shadow-lg
              hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]
              transition duration-300"
            >
              <div className="text-indigo-600 dark:text-indigo-300 mb-3">
                {card.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {card.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 🌬️ BREATHING */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-indigo-700 dark:text-white mb-6">
            Relaxation & Focus Mode
          </h2>

          <button
            onClick={() => setStartBreathing(!startBreathing)}
            className="mb-8 px-6 py-3 bg-indigo-600 text-white rounded-xl
            hover:scale-105 transition shadow-lg"
          >
            {startBreathing ? "Stop Breathing" : "Start Breathing"}
          </button>

          {startBreathing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <BreathingExercise />
            </motion.div>
          )}
        </div>

        {/* ⏱️ POMODORO */}
        <div className="mt-20 text-center">

          <h2 className="text-2xl font-semibold text-indigo-700 dark:text-white mb-6">
            Focus Mode (Pomodoro) 
          </h2>

          <div className="max-w-md mx-auto p-8 rounded-2xl
            bg-white/40 dark:bg-white/10 backdrop-blur-lg
            shadow-lg border border-white/30">

            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
              {isBreak ? "Break Time ☕" : "Focus Time "}
            </p>

            <h1 className="text-5xl font-bold text-indigo-600 dark:text-white mb-6">
              {formatTime()}
            </h1>

            <div className="flex justify-center gap-4">

              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:scale-105 transition"
              >
                {isRunning ? "Pause" : "Start"}
              </button>

              <button
                onClick={() => {
                  setIsRunning(false);
                  setTime(1500);
                  setIsBreak(false);
                }}
                className="px-5 py-2 bg-gray-500 text-white rounded-xl hover:scale-105 transition"
              >
                Reset
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}