import React, { useState, useEffect } from "react";
import Navbar from "./componentes/Navbar";
import Header from "./componentes/Header";
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
    <>
      <div id="cursor-ring" className={isActive ? "active" : ""}></div>
      <nav className="mt-5" id="Nav">
        <Navbar />
      </nav>
      <header id="Header">
        <Header />
      </header>
    </>
  );
}

export default App;
