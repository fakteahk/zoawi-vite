import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools} from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Artists from "./pages/Artists";
import About from "./pages/About";
import Lyrics from "./pages/Lyrics";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ArtistSongs from "./features/artists/ArtistSongs";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />}></Route>
            <Route path="songs" element={<Songs />}></Route>
            <Route path="artists" element={<Artists />}></Route>
            <Route path="artists/:id" element={<ArtistSongs />}></Route>
            <Route path="songs/:id" element={<Lyrics />}></Route>
            <Route path="about" element={<About />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster 
      position="top-center" 
      gutter={12} 
      containerStyle={{margin: "8px"}}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 3000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "#fee7cc",
        },
      }}
      />
    </QueryClientProvider>
  );
}
