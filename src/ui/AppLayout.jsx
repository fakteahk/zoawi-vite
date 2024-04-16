import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

function AppLayout() {
  return (
    <div>
      <Header />
      <div className="container mx-auto flex p-5 max-w-7xl justify-center bg-orange-300/60">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
