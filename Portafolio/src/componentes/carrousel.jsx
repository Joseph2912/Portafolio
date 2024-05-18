import "../Styles/Carrousel.css";
import React, { useRef, useEffect } from "react";

const Carrousel = () => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    let animationFrameId;

    const step = () => {
      scroller.scrollLeft += 1;
      if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
        scroller.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    const startAnimation = () => {
      animationFrameId = requestAnimationFrame(step);
    };

    const stopAnimation = () => {
      cancelAnimationFrame(animationFrameId);
    };

    scroller.addEventListener("mouseenter", stopAnimation);
    scroller.addEventListener("mouseleave", startAnimation);

    startAnimation();

    return () => {
      stopAnimation();
      scroller.removeEventListener("mouseenter", stopAnimation);
      scroller.removeEventListener("mouseleave", startAnimation);
    };
  }, []);

  const items = [
    { src: "src/assets/figma.png", alt: "Figma", label: "Figma" },
    { src: "src/assets/spline.png", alt: "Spline", label: "Spline" },
    {
      src: "src/assets/illustrator.png",
      alt: "Illustrator",
      label: "Illustrator",
    },
    { src: "src/assets/photoshop.png", alt: "Photoshop", label: "Photoshop" },
    {
      src: "src/assets/after-effects.png",
      alt: "After Effects",
      label: "After Effects",
    },
    {
      src: "src/assets/premiere-pro.png",
      alt: "Premiere Pro",
      label: "Premiere Pro",
    },
    { src: "src/assets/blender.png", alt: "Blender", label: "Blender" },
  ];

  return (
    <div className="m-scroll">
      <div className="m-scroll__title" ref={scrollerRef}>
        <ul className="scroller-inner">
          {items.map((item, index) => (
            <li id="cajon" key={`item-${index}`}>
              <img loading="lazy" src={item.src} alt={item.alt} />
              <p>{item.label}</p>
            </li>
          ))}
          {items.map((item, index) => (
            <li id="cajon" key={`item-duplicate-${index}`}>
              <img loading="lazy" src={item.src} alt={item.alt} />
              <p>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carrousel;
