import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import SearchTest from "../../pages/SearchTest";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="shadow-xl flex flex-wrap p-5 flex-row items-center bg-primary/70 justify-between">
        {/* Catman */}
        <NavLink
          to="home"
          className="flex items-center title-font font-medium text-gray-900 w-1/2 md:w-1/3"
        >
          <img className="h-8 w-8" src="/catman.svg" alt="catman" />
          <p className="ml-3 font-atkinson font-bold text-white/80">
            CatMan Lyrics
          </p>
        </NavLink>
        {/* Hamburger Menu */}
        <HamburgerMenu setIsOpen={setIsOpen} isOpen={isOpen} />
        {/* Nav on PC */}
        <PCNav setIsOpen={setIsOpen} isOpen={isOpen} />
        {/* Login */}
        <div className="hidden md:block md:w-1/3">
          <div className="flex justify-end  text-teal-100">
            <button className="inline-flex items-center bg-white-500 rounded-full py-0.5 px-3 border-[1px] border-teal-300 text-sm font-atkinson">
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

function HamburgerMenu({ setIsOpen, isOpen }) {
  return (
    <>
      <div className="block md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400`}
        >
          <MdMenu
            size={24}
            className={`text-white ${isOpen ? "hidden" : "block"}`}
          />
          <MdClose
            size={24}
            className={`text-white ${isOpen ? "block" : "hidden"}`}
          />
        </button>
      </div>
    </>
  );
}

function PCNav({ isOpen, setIsOpen }) {
  return (
    <>
      <div
        className={` w-full block font-atkinson flex-grow md:flex md:items-center md:w-1/3 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex md:flex-row flex-col text-md md:flex-grow justify-center">
          <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/home"
            className="block mt-4 md:inline-block md:mt-0 text-white mr-4"
          >
            Home
          </NavLink>

          <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/songs"
            className="block mt-4 md:inline-block md:mt-0 text-white mr-4"
          >
            Songs
          </NavLink>

          <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/artists"
            className="block mt-4 md:inline-block md:mt-0 text-white mr-4"
          >
            Artists
          </NavLink>

          <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/about"
            className="block mt-4 md:inline-block md:mt-0 text-white mr-4"
          >
            About
          </NavLink>

          <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/zori_page"
            className="block mt-4 md:inline-block md:mt-0 text-white mr-4"
          >
            ZoriPage
          </NavLink>
          <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to="/search"
            className="block mt-4 md:inline-block md:mt-0 text-white mr-4"
          >
            Search
          </NavLink>
        </div>
      </div>
    </>
  );
}
