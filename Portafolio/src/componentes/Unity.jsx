import "../Styles/Unity.css";

const Unity = () => {
  return (
    <div id="game-developer">
      <div id="container">
      <div id="Unity">
        <div id="contenerdorperfil">
          <div id="fotoperfil">
            <img src="src/assets/frog.png" />
          </div>
          <div id="nombre">
            <h4>Perfil de Itchio:</h4>
            <div>Joseph2912</div>
          </div>
        </div>
        <span>
          GAME DEVELOPER
          <p>
            Como desarrollador de videojuegos, mi enfoque se centra en la
            creación de experiencias interactivas tanto en 2D como en 3D. Con
            conocimientos en Unity.
          </p>
        </span>
      </div>
      <div>
        <h3 id="jams">Participaciones en Jams</h3>
      </div>
      <div>
        <p id="parrafojams">
          He participado en varias JAMS con diversas temáticas. En una de ellas,
          formé parte del equipo de desarrollo que creó un juego ambientado en
          un safari, donde los jugadores toman fotos de animales. Además, hemos
          tenido éxito en competiciones, destacando en una de ellas con un
          segundo lugar.
        </p>
      </div>
      <div>
        <h3 id="desarrollados">Juegos que he desarrollado</h3>
      </div>
      <div id="juegos">
        <div>
          <div id="imagenProyectodungeon">
            <img src="src/assets/dungeon.png" />
          </div>
          <div id="titulodungeon">
            <h4>Royal Dungeons</h4>
          </div>
          <div id="parrafodungeon">
            <p>
              En "Royal Dungeons", explora los oscuros calabozos de un antiguo
              castillo, infestados de monstruos y trampas mortales, mientras
              buscas desesperadamente las llaves perdidas que te llevarán a la
              libertad.
            </p>
          </div>
          <a
            href="https://betsyale.itch.io/royal-dungeons"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className=" justify-center items-center rounded-full"
              id="jugar"
            >
              Jugar
            </button>
          </a>
        </div>
        <span>
          <div id="imagenProyectodungeon">
            <img src="src/assets/safari.png" />
          </div>
          <div id="titulodungeon">
            <h4>Snap and Roam</h4>
          </div>
          <div id="parrafodungeon">
            <p>
              "Snap and Roam" invita a los jugadores a una aventura por
              Australia para explorar los paisajes de desiertos y bosques en
              busca de vida salvaje única. Armados con una cámara, el desafío es
              localizar y fotografiar seis animales específicos.
            </p>
          </div>
          <a
            href="https://rickal16.itch.io/snap-and-roam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className=" justify-center items-center rounded-full"
              id="jugar"
            >
              Jugar
            </button>
          </a>
        </span>
        <span>
          <div id="imagenProyectodungeon">
            <img src="src/assets/mapache.png" />
          </div>
          <div id="titulodungeon">
            <h4>Run, raccoon, run!</h4>
          </div>
          <div id="parrafodungeon">
            <p>
              Sumérgete en un emocionante viaje a través de los exuberantes
              bosques junto a nuestro adorable protagonista, ¡el Mapache
              Travieso!
            </p>
          </div>
          <a
            href="https://betsyale.itch.io/run-raccoon-run"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className=" justify-center items-center rounded-full"
              id="jugar"
            >
              Jugar
            </button>
          </a>
        </span>
      </div>
      </div>
      <hr id="linea" />
    </div>
  );
};

export default Unity;
