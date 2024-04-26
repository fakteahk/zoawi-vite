// import { ModeToggle } from "@/components/ui/modetoggle";
// import Search from "@/components/ui/search";
import { CarouselHomeArtists } from "@/features/home/CarouselHomeArtists";
import ListHomeSongs from "@/features/home/ListHomeSongs";

function Home() {
  return (
    <>
      <div className="w-[90%] md:w-[70%] bg-neutral-100 h-64 shadow-md hover:shadow-2xl flex flex-col items-center justify-center mx-auto mb-12 rounded-xl transition-shadow duration-1000 ease-in-out ">
        <div className="text-2xl font-extralight">WELCOME TO</div>
        <div className="text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-stone-500 mb-6">
          ZOAWI
        </div>
        <div className="text-xl font-extralight">Lowkey the hippest lyrics</div>
        <div className="text-xl font-extralight">
          database in Mizoram. No cap.
        </div>
      </div>
{/* 
      <div className="mx-auto flex flex-row items-center justify-center mb-12 w-[60%] h-12 border-2 rounded-full hover:scale-110 transition-all duration-500 ease-in-out">
        <div>fsdlifusadiofudiof</div>
      </div> */}


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
