import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";

function PublicLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default PublicLayout;
