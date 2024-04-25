// import { ModeToggle } from "@/components/ui/modetoggle";
// import Search from "@/components/ui/search";
import { CarouselHomeArtists } from "@/features/home/CarouselHomeArtists";
import ListHomeSongs from "@/features/home/ListHomeSongs";

function Home() {
  return (
    <>
    <div className="flex flex-col gap-4 justify-center items-center mx-auto mb-12">
      <div className="pl-6 xl:pl-2 self-start text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-red-600">
        Trending Artists
      </div>
      <div className="">
        <CarouselHomeArtists />
      </div>
    </div>

    <div className="flex flex-col gap-4 justify-center items-center mx-auto">
      <div className="pl-6 xl:pl-2 self-start text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-gray-400">
        Hot Songs
      </div>
      <div className="">
        <ListHomeSongs />
      </div>
    </div>
    </>
  );
}

export default Home;
