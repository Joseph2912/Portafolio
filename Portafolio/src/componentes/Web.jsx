// Web.js
import React, { useContext } from "react";
import Portfolio from "./Portfolio";
import Carrousel from "./carrousel";
import "../Styles/Web.css";

const Web = () => {


  return (
    <div className="" id="web">
      <h2 className="mt-10" id="developer">
        WEB DEVELOPER
        <span>FRONT END</span>
      </h2>
      <div>
        <p className="mt-10" id="parrafo">
          Como desarrollador web con experiencia en la creación de páginas web,
          trabajo con tecnologías como React.js, Firebase, Tailwind y Bootstrap.
          Además, poseo conocimientos en interfaces intuitivas, certificado por
          la Interaction Design Foundation.
        </p>
      </div>
      <a
        href="https://github.com/Joseph2912"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          className=" justify-center items-center rounded-full"
          id="Proyectos"
        >
          Proyectos en Github
        </button>
      </a>
      <Portfolio />
      <div>
        <Carrousel />
      </div>
      <hr id="line" />
    </div>
  );
};
export default Web;
