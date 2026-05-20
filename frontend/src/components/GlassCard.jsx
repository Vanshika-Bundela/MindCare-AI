export default function GlassCard({ children }) {
  return (
    <div className="glass p-6 shadow-xl rounded-2xl">
      {children}
    </div>
  );
}