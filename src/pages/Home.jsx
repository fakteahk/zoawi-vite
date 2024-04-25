// import { ModeToggle } from "@/components/ui/modetoggle";
// import Search from "@/components/ui/search";
import {CarouselHomeArtists} from "@/features/home/CarouselHomeArtists";

function Home() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <CarouselHomeArtists />
    </div>
  );
}

export default Home;
