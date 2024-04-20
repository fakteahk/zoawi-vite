import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function AppLayout() {
  return (
    <div className="">
      <Header />
      <div className="flex mx-auto p-5 max-w-7xl justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
