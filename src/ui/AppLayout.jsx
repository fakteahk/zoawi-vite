import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Navbar from "./Header/Navbar";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="w-full fixed z-10">
        <Navbar />
      </div>

      <div className="flex flex-grow mx-auto max-w-7xl justify-center mt-16 pt-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
