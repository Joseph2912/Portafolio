import React from 'react';
import '../Styles/Footer.css';


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="image-row">
        <div className="image-container">
          <img src="src/assets/playstore.png" alt="image1" />
        </div>
        <div className="image-container">
          <img src="src/assets/android.png" alt="image2" />
        </div>
        <div className="image-container">
          <img src="src/assets/app_store.png" alt="image3" />
        </div>
        <div className="image-container">
          <img src="src/assets/Xcode.png" alt="image4" />
        </div>
      </div>
      <div className="separator"></div>
      <div className="footer-content">
        <div className="footer-column">
          <h4>Habilidades y Tecnologías</h4>
        </div>
        <div className="footer-column">
          <h4>Front-end</h4>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React Js</li>
            <li>Tailwind</li>
            <li>Bootstrap</li>
            <li>Material UI</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Back-end</h4>
          <ul>
            <li>Firebase</li>
            <li>MongoDB</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Game developer</h4>
          <ul>
            <li>Unity 2D</li>
            <li>Unity 3D</li>
            <li>C#</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contacto</h4>
          <ul>
            <li>elsjoseph@hotmail.com</li>
            <li>LinkedIn</li>
            <li>+57 313 243 5910</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
