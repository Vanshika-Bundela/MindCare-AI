import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { predictMentalHealth } from "../services/api";
import Navbar from "../components/Navbar";

export default function Assessment() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(true);
  const [consent, setConsent] = useState(false);

  const [form, setForm] = useState({
    age: "",
    gender: "",
    platform: "",
    daily_screen_time_min: 0,
    social_media_time_min: 0,
    negative_interactions_count: 0,
    positive_interactions_count: 0,
    sleep_hours: "",
    physical_activity_min: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const progress =
    (Object.values(form).filter((v) => v !== "" && v !== 0).length / 9) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await predictMentalHealth({
        age: Number(form.age),
        gender: Number(form.gender),
        platform: Number(form.platform),
        daily_screen_time_min: Number(form.daily_screen_time_min),
        social_media_time_min: Number(form.social_media_time_min),
        negative_interactions_count: Number(form.negative_interactions_count),
        positive_interactions_count: Number(form.positive_interactions_count),
        sleep_hours: Number(form.sleep_hours),
        physical_activity_min: Number(form.physical_activity_min),
      });

      localStorage.setItem("result", res.data.prediction);
      localStorage.setItem("suggestions", JSON.stringify(res.data.suggestions));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Backend error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition">

      {/* ✅ NAVBAR */}
      <Navbar />

      {/* PROGRESS */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-1 bg-indigo-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="pt-24 px-4 py-10">

        {/* 🌿 MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-[420px] text-center shadow-2xl"
            >
              <h2 className="text-xl font-bold text-indigo-600">
                Mental Wellness Check 
              </h2>

              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
                Answer a few questions to get AI-powered insights.
              </p>

              <div className="mt-5 flex items-center justify-center gap-2">
                <input type="checkbox" onChange={() => setConsent(!consent)} />
                <span className="text-sm dark:text-gray-300">
                  I agree to proceed
                </span>
              </div>

              <button
                disabled={!consent}
                onClick={() => setShowModal(false)}
                className={`mt-5 px-6 py-2 rounded-xl text-white ${
                  consent
                    ? "bg-indigo-600 hover:scale-105 transition"
                    : "bg-gray-400"
                }`}
              >
                Start
              </button>
            </motion.div>
          </div>
        )}

        {/* FORM */}
        {!showModal && (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">

            <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-white">
              Mental Health Assessment
            </h2>

            {/* BASIC */}
            <div className="p-5 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-lg shadow-md">
              <h3 className="font-semibold mb-3 text-indigo-600">Basic Info</h3>

              <input
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className="w-full p-2 mb-2 rounded border dark:bg-gray-800 dark:text-white"
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full p-2 mb-2 rounded border dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Gender</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>

              <select
                name="platform"
                value={form.platform}
                onChange={handleChange}
                className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
              >
                <option value="">Platform</option>
                <option value="0">Instagram</option>
                <option value="1">Facebook</option>
                <option value="2">Twitter</option>
                <option value="3">YouTube</option>
              </select>
            </div>

            {/* DIGITAL (SLIDERS) */}
            <div className="p-5 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-lg shadow-md">
              <h3 className="font-semibold mb-3 text-indigo-600">Digital Usage</h3>

              <label className="text-sm dark:text-gray-300">
                Screen Time: {form.daily_screen_time_min} mins
              </label>
              <input
                type="range"
                min="0"
                max="600"
                step="10"
                name="daily_screen_time_min"
                value={form.daily_screen_time_min}
                onChange={handleChange}
                className="w-full accent-indigo-500 mb-4"
              />

              <label className="text-sm dark:text-gray-300">
                Social Media: {form.social_media_time_min} mins
              </label>
              <input
                type="range"
                min="0"
                max="600"
                step="10"
                name="social_media_time_min"
                value={form.social_media_time_min}
                onChange={handleChange}
                className="w-full accent-pink-500"
              />
            </div>

            {/* LIFESTYLE */}
            <div className="p-5 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-lg shadow-md">
              <h3 className="font-semibold mb-3 text-indigo-600">Lifestyle</h3>

              <select
                name="sleep_hours"
                value={form.sleep_hours}
                onChange={handleChange}
                className="w-full p-2 mb-3 rounded border dark:bg-gray-800 dark:text-white"
              >
                <option value="">Sleep Hours</option>
                <option value="4">Less than 5</option>
                <option value="6">5-7 hours</option>
                <option value="8">7-9 hours</option>
              </select>

              <label className="text-sm dark:text-gray-300">
                Activity: {form.physical_activity_min} mins
              </label>
              <input
                type="range"
                min="0"
                max="180"
                step="5"
                name="physical_activity_min"
                value={form.physical_activity_min}
                onChange={handleChange}
                className="w-full accent-green-500"
              />
            </div>

            {/* INTERACTIONS */}
            <div className="p-5 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-lg shadow-md">
              <h3 className="font-semibold mb-3 text-indigo-600">Interactions</h3>

              <label className="text-sm dark:text-gray-300">
                Negative: {form.negative_interactions_count}
              </label>
              <input
                type="range"
                min="0"
                max="50"
                name="negative_interactions_count"
                value={form.negative_interactions_count}
                onChange={handleChange}
                className="w-full accent-red-500 mb-4"
              />

              <label className="text-sm dark:text-gray-300">
                Positive: {form.positive_interactions_count}
              </label>
              <input
                type="range"
                min="0"
                max="50"
                name="positive_interactions_count"
                value={form.positive_interactions_count}
                onChange={handleChange}
                className="w-full accent-yellow-500"
              />
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:scale-105 transition">
              Analyze
            </button>

          </form>
        )}
      </div>
    </div>
  );
}