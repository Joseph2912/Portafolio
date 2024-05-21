import AppPortfolio from "./AppPortfolio";
import "../Styles/Web.css";
const Appdeveloper = () => {
  return (
    <div className="" id="web">
      <h2 className="mt-10" id="developer">
        APP DEVELOPER
        <span>ANDROID & IOS</span>
      </h2>
      <div>
        <p className="mt-10" id="parrafo">
          Como desarrollador de aplicaciones móviles, cuento con experiencia en
          la creación estas para iOS como para Android. He tenido el privilegio
          de llevar a cabo proyectos que entregan una solución a las necesidades
          que se presentan en las organizaciones.
        </p>
      </div>
      <AppPortfolio />
    </div>
  );
};

export default Appdeveloper;
