import { useState, useEffect, useRef } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  let Links = [
    { name: "Songs", link: "/songs" },
    { name: "Artists", link: "/artists" },
    { name: "About", link: "/about" },
    { name: "Zori Page", link: "/zori_page" },
    { name: "Search", link: "/search" },
  ];
  let [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const scrollPos = useRef(0);

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
      className={`shadow-md w-full fixed top-0 left-0 transition-all duration-500 ease-in-out ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="md:flex items-center justify-between bg-primary py-4 md:px-10 px-7">
        {/* logo section */}

        <div className="font-bold text-md uppercase flex">
          <NavLink to="home" className="flex items-center">
            <img className="h-8 w-8" src="/catman.svg" alt="catman" />
            <p className="ml-3 font-atkinson font-bold text-white/90">
              CatMan Lyrics
            </p>
          </NavLink>
        </div>

        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute text-background right-8 top-5 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <MdClose size={24} /> : <MdMenu size={24} />}
        </div>

        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-primary md:bg-transparent md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in-out ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li
              className="md:ml-8 md:my-0 my-7 font-light font-atkinson"
              key={link.name}
            >
              <NavLink
                to={link.link}
                className="text-neutral-200 hover:text-secondary duration-500"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <button className="btn bg-transparent text-teal-100 md:ml-8  border rounded-full font-semibold px-3 py-1 duration-500 md:static">
            Login
          </button>
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Navbar;
