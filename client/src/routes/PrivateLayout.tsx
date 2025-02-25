import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Sidebar from "../components/Sidebar";

function PrivateLayout() {
  return (
    <div className="flex ">
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default PrivateLayout;
