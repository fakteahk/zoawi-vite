import { ModeToggle } from "@/components/ui/modetoggle";
import Search from "@/components/ui/search";

function Home() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        Theme Toggle
        <ModeToggle />
      </div>
      <div className="flex flex-col justify-center items-center">
        Search Bar concept
        <Search />
      </div>
    </div>
  );
}

export default Home;
