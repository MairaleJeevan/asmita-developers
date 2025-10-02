// Header.jsx
"use client";

import { Link as ScrollLink } from "react-scroll";
import { RiArrowRightUpLine } from "react-icons/ri";

// components
import Logo from "./Logo";
import NavMobile from "./NavMobile";

const links = [
  {
    name: "home",
    path: "home",
  },
  {
    name: "about",
    path: "about",
  },
  {
    name: "services",
    path: "services",
  },
  {
    name: "projects",
    path: "projects",
  },
  {
    name: "contact",
    path: "contact",
  },
];

const Header = () => {
  return (
    <header className="bg-white py-1"> {/* Reduced padding from py-3 to py-2 */}
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* logo */}
          <div className="w-28 md:w-32"> {/* Reduced width from w-48 to w-40 */}
            <Logo />
          </div>
          
          {/* nav & btn */}
          <nav className="hidden xl:flex items-center gap-6"> {/* Reduced gap from gap-10 to gap-8 */}
            <ul className="flex">
              {links.map((link, index) => {
                return (
                  <li
                    key={index}
                    className="text-black text-xs uppercase font-primary font-medium tracking-[1.1px] after:content-['/'] after:mx-2 last:after:content-none after:text-[#ffd700]" /* Reduced text size and spacing */
                  >
                    <ScrollLink
                      to={link.path}
                      smooth
                      spy
                      className="cursor-pointer hover:text-[#ffd700] transition-colors"
                      activeClass="text-[#ffd700]"
                    >
                      {link.name}
                    </ScrollLink>
                  </li>
                );
              })}
            </ul>
            {/* btn */}
            <button className="w-[160px] h-[40px] py-[3px] pl-[6px] pr-[3px] flex items-center justify-between min-w-[160px] bg-[#ffd700] group ml-4"> {/* Reduced button size */}
              <div className="flex-1 text-center tracking-[1.1px] font-primary font-bold text-[#1a2a3a] text-xs uppercase">
                Get a quote
              </div>
              <div className="w-8 h-8 bg-[#1a2a3a] flex items-center justify-center"> {/* Reduced icon container size */}
                <RiArrowRightUpLine className="text-[#ffd700] text-base group-hover:rotate-45 transition-all duration-200" /> {/* Reduced icon size */}
              </div>
            </button>
          </nav>

          {/* nav mobile */}
          <div className="xl:hidden">
            <NavMobile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;