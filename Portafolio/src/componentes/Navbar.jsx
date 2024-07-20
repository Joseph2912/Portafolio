import React, { useState } from "react";
import "../Styles/Nav.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar" id="nav">
      <div className={`nav_items ${isOpen ? "open" : ""}`}>
        <a href="#home">Inicio</a>
        <a href="#web">Web Developer</a>
        <a href="#game-developer">Game Developer</a>
        <a href="#app-developer">App Developer</a>
        <a
          href="https://drive.google.com/file/d/1k21-RV5W1mBdGJxAwem5QDH-kVk6zuug/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          Viate
        </a>
        <a
          href="https://wa.me/+573132435910"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contáctame
        </a>
      </div>
      <div className={`nav_toggle ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
