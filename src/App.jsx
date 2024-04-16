import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Artists from "./pages/Artists";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />}></Route>
          <Route path="songs" element={<Songs />}></Route>
          <Route path="artists" element={<Artists />}></Route>
          <Route path="about" element={<About />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
