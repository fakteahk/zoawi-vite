import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <div className="flex mx-auto py-5 max-w-7xl justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;