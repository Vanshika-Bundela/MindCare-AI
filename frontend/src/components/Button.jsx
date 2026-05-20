export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-400 to-blue-400 text-white shadow-md hover:scale-105 transition"
    >
      {children}
    </button>
  );
}