import "../Styles/Portfolio.css";

const AppPortfolio = () => {
  return (
    <div id="app-developer">
    <div id="container">
      <h3 id="portfolio">Portafolio</h3>
      <div id="proyecto">
        <div id="imagenProyecto">
          <img src="src/assets/App.jpeg" />
        </div>
        <div id="informacion">
          <h4 id="titulo">Delivery App | Android & IOS</h4>
          <span id="tecnologias">React Native | Firebase | Google Maps</span>
          <div id="parrafo2">
            Aplicación para Android, iOS y Windows que resuelve el problema de
            la gestión del envío de agua potable a pueblos y granjas. Incluye
            una función de identificación por roles que permite al administrador
            asignar pedidos y rastrear a los repartidores.
          </div>
         
        </div>
      </div>
    </div>
    </div>
  );
};

export default AppPortfolio;
