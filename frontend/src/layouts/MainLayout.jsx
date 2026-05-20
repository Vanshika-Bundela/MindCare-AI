import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      
      {/* floating background blobs */}
      <div className="blob bg-purple-300 top-10 left-10"></div>
      <div className="blob bg-blue-300 bottom-10 right-10"></div>

      <Navbar />

      <div className="pt-20 px-6">
        <Outlet />
      </div>
    </div>
  );
}