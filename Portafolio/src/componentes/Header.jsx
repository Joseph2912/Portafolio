import "../Styles/Header.css";
const Header = () => {
  return (
    <div>
      <div
        className="flex justify-center items-center mt-20 gap-3 text-white"
        id="contenedor"
      >
        <div className="rounded-full" id="contorno">
          <div className="rounded-full" id="relleno"></div>
        </div>
        <div className="texto">
          <p>Abierto a oportunidades</p>
        </div>
      </div>
      <div
        className="flex justify-center items-center gap-5 mt-5"
        id="espacio"
      >
        <span className="joseph">JOSEPH</span>
        <span className="ingeniero">INGENIERO</span>
      </div>
      <div className="flex justify-center items-center gap-5">
        <span className="ingeniero">MULTIMEDIA</span>
        <span className="joseph">CUARTAS</span>
      </div>
      <div className="flex justify-center items-center mt-5">
        <p className="flex justify-center items-center" id="texto-joseph">
          Soy un desarrollador y me apasionan los desafíos tecnológicos. He
          trabajado en diversos proyectos, desde videojuegos hasta aplicaciones
          móviles y web. Mi enfoque se centra en crear experiencias.
        </p>
      </div>
<div className="flex justify-center items-center mt-10">
  <a href="tu_linkedin_url" target="_blank" rel="noopener noreferrer">
    <button className="flex justify-center items-center rounded-full" id="button">
    LinkedIn
    </button>
  </a>
</div>

    </div>
  );
};
export default Header;
