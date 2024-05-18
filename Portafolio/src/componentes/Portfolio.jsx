import "../Styles/Portfolio.css";

const Portfolio = () => {
  return (
    <div id="container">
      <h3 id="portfolio">Portafolio</h3>
      <div id="proyecto">
        <div id="imagenProyecto">
          <img src="src/assets/Portfolio.jpeg" />
        </div>
        <div id="informacion">
          <h4 id="titulo">Portafolio</h4>
          <span id="tecnologias">
            React Js | Tailwind | Vite | Responsive | UI/UX
          </span>
          <div id="parrafo2">
            Para la creación de mi portafolio, comencé por la herramienta de
            Figma, aplicando cuidadosamente heurísticas de UI/UX para garantizar
            una experiencia de usuario óptima. Luego, procedí con la
            implementación utilizando tecnologías avanzadas como React.js,
            Tailwind CSS y Vite.
          </div>
          <a
            href="https://github.com/Joseph2912/Portafolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className=" justify-center items-center rounded-full"
              id="codigo"
            >
              Codigo en Github
            </button>
          </a>
        </div>
      </div>
      <div id="proyecto">
        <div id="imagenProyecto">
          <img src="src/assets/underconstruction.jpg" />
        </div>
        <div id="informacion">
          <h4 id="titulo">En construcción...</h4>
          <span id="tecnologias">Tecnologías</span>
          <div id="parrafo3">Descripción del proyecto</div>
          <span id="spanbutton">
            <button
              className=" justify-center items-center rounded-full"
              id="codigodesactivado1"
            >
              Ver proyecto
            </button>

            <button
              className=" justify-center items-center rounded-full"
              id="codigodesactivado2"
            >
              Codigo en Githubdd
            </button>
          </span>
        </div>
      </div>
      <h2 id="herramientas">Herramientas que uso para diseñar</h2>
    </div>
  );
};

export default Portfolio;
