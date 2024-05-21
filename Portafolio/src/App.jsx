import React, { useState, useEffect } from "react";
import Navbar from "./componentes/Navbar";
import Header from "./componentes/Header";
import Web from "./componentes/Web";
import Unity from "./componentes/Unity";
import Appdeveloper from "./componentes/Appdeveloper"
import Footer from "./componentes/Footer";
import "./App.css";

function App() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const cursorRing = document.getElementById("cursor-ring");

    const handleMouseMove = (e) => {
      cursorRing.style.left = `${e.clientX}px`;
      cursorRing.style.top = `${e.clientY}px`;
    };

    const toggleCursor = () => {
      setIsActive(!isActive);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", toggleCursor);
    document.addEventListener("mouseup", toggleCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", toggleCursor);
      document.removeEventListener("mouseup", toggleCursor);
    };
  }, [isActive]);

  return (
    <div>
      <div id="cursor-ring" className={isActive ? "active" : ""}></div>
      <nav id="Nav">
        <Navbar />
      </nav>
      <header id="Header">
        <Header />
      </header>
      <div className="">
        <Web />
      </div>
      <div className="">
        <Unity />
      </div>
      <div className="">
      <Appdeveloper />
      </div>
      <div className="">
      <Footer />
      </div>
    </div>
  );
}

export default App;
