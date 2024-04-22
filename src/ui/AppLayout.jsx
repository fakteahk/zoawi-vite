import { Outlet } from "react-router-dom";

import Footer from "./Footer/Footer";
import Navbar from "./Header/Navbar";

function AppLayout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      {/* <Header /> */}
      <Navbar />

      <div className="flex flex-grow mx-auto max-w-7xl justify-center z-[-1] mt-16 pt-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
