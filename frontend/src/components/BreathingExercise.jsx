import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BreathingExercise() {
  const [phase, setPhase] = useState("Inhale");

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === "Inhale") return "Hold";
        if (prev === "Hold") return "Exhale";
        return "Inhale";
      });
    }, 4000); // 4s cycle

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center py-20">

      <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
        Guided Breathing 🌿
      </h2>

      <motion.div
        animate={{
          scale:
            phase === "Inhale"
              ? 1.5
              : phase === "Hold"
              ? 1.5
              : 1,
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="w-40 h-40 rounded-full bg-indigo-400/30 backdrop-blur-lg flex items-center justify-center shadow-lg"
      >
        <span className="text-xl font-bold text-indigo-700">
          {phase}
        </span>
      </motion.div>

      <p className="mt-6 text-gray-600 dark:text-gray-300">
        Follow the circle to regulate your breathing
      </p>

    </div>
  );
}