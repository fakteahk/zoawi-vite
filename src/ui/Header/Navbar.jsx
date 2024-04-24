import { useState, useEffect, useRef } from "react";
import { MdMenu, MdClose, MdSearch } from "react-icons/md";
import { NavLink } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Navbar = () => {
  let Links = [
    { name: "Songs", link: "/songs" },
    { name: "Artists", link: "/artists" },
    { name: "About", link: "/about" },
    { name: "Search", link: "/search" },
  ];
  let [openNav, setOpenNav] = useState(false);
  let [openSearch, setOpenSearch] = useState(false);
  const [show, setShow] = useState(true);
  const scrollPos = useRef(0);

  const navRef = useRef(); // Create a ref

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPos]);

  const handleScroll = () => {
    const currentScrollPos = document.body.getBoundingClientRect().top;
    setShow(currentScrollPos > scrollPos.current);
    scrollPos.current = currentScrollPos;
  };

  return (
    <div
      ref={navRef}
      className={`shadow-md w-full fixed top-0 left-0 transition-all duration-500 ease-in-out ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="md:flex items-center justify-between bg-primary py-4 md:px-10 px-7">
        {/* logo section */}
        <div className="font-bold text-md uppercase flex">
          <NavLink to="home" className="flex items-center">
            <img className="h-8 w-8" src="/catman.svg" alt="catman" />
            <p className="ml-3  font-bold text-white/90">Zoawi</p>
          </NavLink>
        </div>

        {/* SearchBar */}
        <div className="fixed right-20 top-5 md:hidden text-white cursor-pointer hover:scale-110 ">
          <Dialog>
            <DialogTrigger>
              <MdSearch size={24} />
            </DialogTrigger>
            <DialogContent className="absolute top-20 left-1/2 transform -translate-x-1/2 md:max-w-[50%] rounded-2xl w-[90%]">
              <DialogHeader>
                <DialogTitle>Search</DialogTitle>
                <DialogDescription>
                  Search for songs, artists, albums
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-b-2 border-primary/60 outline-none flex-grow"
                />
                <button className="btn bg-primary text-white ml-2 p-1 px-2 rounded-full hover:scale-105 transition-transform ease-in-out duration-300">
                  Search
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Menu icon */}
        <div
          onClick={() => setOpenNav(!openNav)}
          className="absolute text-background right-8 top-5 cursor-pointer md:hidden hover:scale-110 duration-300 ease-in-out"
        >
          {openNav ? <MdClose size={24} /> : <MdMenu size={24} />}
        </div>

        {/* link items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-primary md:bg-transparent md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in-out ${
            openNav ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((links) => (
            <li className="md:ml-6 md:my-0 my-7 font-light " key={links.name}>
              <NavLink
                to={links.link}
                className="text-secondary hover:text-secondary/70 hover:border-b-2 border-white duration-50 ease-in ml-2"
                onClick={() => setOpenNav(false)}
              >
                {links.name}
              </NavLink>
            </li>
          ))}
          <button className="btn bg-transparent text-secondary md:ml-8  border rounded-full font-semibold px-3 py-1 duration-500 md:static">
            Login
          </button>
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Navbar;
