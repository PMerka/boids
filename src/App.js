import "./App.css";
import CanvasElement from "./components/Canvas";
import Controls from "./components/Controls";
import InfoElement from "./components/InfoElement";
import { Animation} from "./simulationLogic/animation";
import { useEffect, useRef, useState } from "react";

const startingSetting = {
    perception: 30,
    maxSpeed: 3,
    maxForce: 1,
    alignForce: 1,
    cohesionForce: 0.5,
    separationForceConstant: 10,   
    color: 'rgba(255, 235, 100, 0.04)' 
  }

function App() {
  const canvasRef = useRef(null);
  const animation = useRef(null); 
  const [activeGroup, setActiveGroup] = useState(0)
  const [property, setProperty] = useState([startingSetting]);

  const fullScreen = () => {
    canvasRef.current.requestFullscreen();
  };

  const updateProperty = (key, value) => {
    animation.current.updatePropertyOfBoid(key, value, activeGroup);
    let newArray = property.map( obj => {return {...obj} } )
    newArray[activeGroup][key] = Number(value);
    setProperty(newArray);
  };

  const addBoidToPosition = (e) => {
    const rect = e.target.getBoundingClientRect();
    const canvasPageHeight = rect.bottom - rect.top;
    const canvasPageWidth = rect.right - rect.left;
    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top; //y position within the element.
    animation.current.addBoid([
      (x * canvasRef.current.width) / canvasPageWidth,
      (y * canvasRef.current.height) / canvasPageHeight,
    ], property[activeGroup], activeGroup);
  };

  const addNewBoidGroup = (numNewBoids) => {
    let newArray = property.map( obj => {return {...obj} } )
    newArray.push(startingSetting)
    animation.current.addMultipleBoids(numNewBoids, startingSetting);
    setProperty(newArray)
  }

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
    animation.current.addMultipleBoids(40, startingSetting);
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
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
          addNewBoidGroup={addNewBoidGroup}
        />
      </div>

      <InfoElement/>

    </div>
  );
}

export default App;
