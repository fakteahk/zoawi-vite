import { Outlet } from "react-router-dom";

import Footer from "./Footer/Footer";
import Navbar from "./Header/Navbar";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="w-full fixed z-10">
        <Navbar />
      </div>

      <div className="mt-24 flex flex-col items-center justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
