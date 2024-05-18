import React from "react";
import "../Styles/Nav.css";

const Navbar = () => {
  return (
    <nav
      className="text-white py-4 px-8 sticky top-0 rounded-full w-fit"
      id="nav"
    >
<div className="max-w-max mx-auto flex justify-between items-center">
  <div className="flex space-x-4 gap-5">
    <a href="#" className="hover:text-gray-300">
      Inicio
    </a>
    <a href="#" className="hover:text-gray-300">
      Web Developer
    </a>
    <a href="#" className="hover:text-gray-300">
      Game Developer
    </a>
    <a href="#" className="hover:text-gray-300">
      App Developer
    </a>
    <a href="#" className="hover:text-gray-300">
      Viate
    </a>
    <a href="#" className="hover:text-gray-300">
      Contáctame
    </a>
  </div>
</div>

    </nav>
  );
};

export default Navbar;
