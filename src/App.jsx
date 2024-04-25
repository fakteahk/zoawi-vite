import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "./components/theme-provider";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Artists from "./pages/Artists";
import About from "./pages/About";
import Lyrics from "./pages/Lyrics";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ArtistBio from "./features/artists/ArtistBio";
import { Toaster } from "react-hot-toast";
import AddArtistForm from "./features/artists/AddArtistForm";
import SearchTest from "./pages/SearchTest copy";
import Lab from "./pages/Lab";
import AddSongForm from "./features/songs/AddSongForm";
import ScrollToTop from "./helpers/ScrollToTop";
import EditSongForm from "./features/songs/EditSongForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />}></Route>

              <Route path="songs" element={<Songs />}></Route>
              <Route path="songs/:id" element={<Lyrics />}></Route>
              <Route path="addSong" element={<AddSongForm />}></Route>
              <Route path="editSong" element={<EditSongForm />}></Route>

              <Route path="artists" element={<Artists />}></Route>
              <Route path="artists/:id" element={<ArtistBio />}></Route>
              <Route path="addArtist" element={<AddArtistForm />}></Route>

              <Route path="about" element={<About />}></Route>

              <Route path="lab" element={<Lab />}></Route>
              <Route path="search" element={<SearchTest />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
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
    </ThemeProvider>
  );
}
