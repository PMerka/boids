import "./App.css";
import CanvasElement from "./components/Canvas";
import Controls from "./components/Controls";
import { Animation, Boid } from "./simulationLogic/animation";
import { useEffect, useRef, useState } from "react";

function App() {
  const canvasRef = useRef(null);
  const animation = useRef(null);
  const [boidVision, setBoidVision] = useState(25);
  const [maxForce, setBoidmaxForce] = useState(100);
  const [property, setProperty] = useState({
    perception: 25,
    maxSpeed: 3,
    maxForce: 1,
    alignForce: 1,
    cohesionForce: 0.5,
    separationForceConstant: 10,
  });

  const fullScreen = () => {
    canvasRef.current.requestFullscreen();
  };

  const updateProperty = (key, value) => {
    animation.current.updatePropertyOfBoid(key, value);
    let newProperty = { ...property };
    newProperty[key] = Number(value);
    setProperty(newProperty);
  };

  const addBoidToPosition = (e) => {
    const rect = e.target.getBoundingClientRect();
    const canvasPageHeight = rect.bottom - rect.top;
    const canvasPageWidth = rect.right - rect.left;
    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top; //y position within the element.
    console.log(rect.top, rect.bottom);
    animation.current.addBoid([
      (x * canvasRef.current.width) / canvasPageWidth,
      (y * canvasRef.current.height) / canvasPageHeight,
    ]);
  };

  useEffect(() => {
    canvasRef.current.width = 1280;
    canvasRef.current.height = 720;
    const ctx = canvasRef.current.getContext("2d");
    // setup animation
    animation.current = new Animation(
      ctx,
      canvasRef.current.width,
      canvasRef.current.height
    );
    animation.current.addMultipleBoids(50, 30);
    // calling animation
    const animationFrameId = window.requestAnimationFrame(() =>
      animation.current.animate()
    );

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="box">
      <div className="header big-border">
        <h1>Boids</h1>
      </div>



      <div className="main-simulation big-border">
        <CanvasElement
          addBoidToPosition={addBoidToPosition}
          canvasRef={canvasRef}
        />
        <Controls
          updateProperty={updateProperty}
          property={property}
          setProperty={setProperty}
        />
      </div>

      <div className="big-border info">
        <div className="info-box">
        <h3>What?</h3>
        <p>
        This program is a javascripr implementation of "boids" algorithm. 
        The movement of particles on the screen is called flocking.  
        Flocking is typical for the movement of a big group of birds, fish, or insects. 
        </p>
        </div>
 
        <div className="info-box">
        <h3>How?</h3>
        <ul>
          <li>
            Every particle on the screen tries to have the same direction of movement as other nearby particles.
          </li>
          <li>
            Particles are atracted together. 
          </li>
          <li>
            Particles also repel each other (proportional to one over distance)
          </li>
        </ul>
        </div>

        <div className="info-box about">
          <img src={require("./github_logo.png")} alt="Github icon" /><br />
          Source code
          <br />
          <br />       
          Created by <br /> 
          Pavel Měrka
        </div>
      </div>
    </div>
  );
}

export default App;
