import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function AppLayout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="flex flex-grow mx-auto py-5 max-w-7xl justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
