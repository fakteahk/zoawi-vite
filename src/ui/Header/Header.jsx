import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiBars3, HiMiniXMark } from "react-icons/hi2";
import { LuCat } from "react-icons/lu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="container mx-auto flex max-w-7xl flex-wrap p-5 flex-row items-center bg-slate-700/70 justify-between">
        {/* Catman */}
        <NavLink to="home" className="flex items-center title-font font-medium text-gray-900 w-1/3">
            <LuCat size={24} className="text-orange-300" />
            <p className="ml-3">Cat Lyrics</p>
        </NavLink>
        {/* Hamburger Menu */}
        <div className="block sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
          >
            <HiBars3 size={24} className={`${isOpen ? "hidden" : "block"}`} />
            <HiMiniXMark
              size={24}
              className={`${isOpen ? "block" : "hidden"}`}
            />
          </button>
        </div>
        {/* Nav on PC */}
        <div
          className={`w-full block flex-grow sm:flex sm:items-center sm:w-1/3 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex sm:flex-row flex-col text-md sm:flex-grow justify-center">
            <NavLink
              onClick={() => setIsOpen(!isOpen)}
              to="/home"
              className="block mt-4 sm:inline-block sm:mt-0 text-white-200 mr-4"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setIsOpen(!isOpen)}
              to="/songs"
              className="block mt-4 sm:inline-block sm:mt-0 text-white-200 mr-4"
            >
              Songs
            </NavLink>
            <NavLink
              onClick={() => setIsOpen(!isOpen)}
              to="/artists"
              className="block mt-4 sm:inline-block sm:mt-0 text-white-200 mr-4"
            >
              Artists
            </NavLink>
            <NavLink
              onClick={() => setIsOpen(!isOpen)}
              to="/about"
              className="block mt-4 sm:inline-block sm:mt-0 text-white-200 mr-4"
            >
              About
            </NavLink>
          </div>
        </div>
        {/* Login */}
        <div className="hidden sm:block sm:w-1/3">
          <div className="flex justify-end">
            <button className="inline-flex items-center bg-white-500 rounded-full py-0.5 px-3 text-slate-900 border-[1px] border-slate-900 text-sm">
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
