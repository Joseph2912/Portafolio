import "../Styles/Header.css";

const Header = () => {
  return (
    <div className="w-screen" id="home">
      <div className="flex justify-center items-center mt-12 gap-3 text-white">
        <div className="rounded-full" id="contorno">
          <div className="rounded-full" id="relleno"></div>
        </div>
        <div className="texto">
          <p>Abierto a oportunidades</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 mt-5" id="espacio">
        <span className="joseph">JOSEPH</span>
        <span className="ingeniero" id="inge">INGENIERO</span>
      </div>
      <div className="flex justify-center items-center gap-5">
        <span className="ingeniero" id="multi">MULTIMEDIA</span>
        <span className="joseph" id="cuartas">CUARTAS</span>
      </div>
      <div className="flex justify-center items-center mt-5">
        <p className=" justify-center items-center" id="texto-joseph">
          Soy un desarrollador y me apasionan los desafíos tecnológicos. He
          trabajado en diversos proyectos, desde videojuegos hasta aplicaciones
          móviles y web. Mi enfoque se centra en crear experiencias.
        </p>
      </div>
      <div className="flex justify-center items-center mt-10 ">
        <a
          href="https://www.linkedin.com/in/joseph-cuartas"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className=" justify-center items-center rounded-full"
            id="button"
          >
            LinkedIn
          </button>
        </a>
      </div>
      <div className="flex justify-between items-end mt-10" id="test">
        <span>
          correo: <div>elsjoseph@hotmail.com</div>
        </span>
        <span>Cali, Colombia</span>
      </div>
      <hr className="mt-10" id="line" />
    </div>
  );
};
export default Header;
