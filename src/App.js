import './App.css';
import CanvasElement from './components/Canvas';
import Controls from './components/Controls';
import { Animation, Boid } from "./simulationLogic/animation";
import { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef(null);
  let animation = useRef(null);

  const fullScreen = () => {
    canvasRef.current.requestFullscreen();
  };

  useEffect(() => {
    canvasRef.current.width = 1280;
    canvasRef.current.height = 720;
    const ctx = canvasRef.current.getContext("2d");
    let boids = [];
    for (let i = 0; i < 50; i++) {
      boids.push(
        new Boid(
          [Math.random() * canvasRef.current.width,
          Math.random() * canvasRef.current.height],
          [5 * Math.random(),
          5 * Math.random()]
        )
      );
    }
    // setup animation
    animation.current = new Animation(
      ctx,
      canvasRef.current.width,
      canvasRef.current.height,
      boids
    );
    // calling animation
    const animationFrameId = window.requestAnimationFrame(() => animation.current.animate());

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, []);
  
  return (
    <div className="box">
      
      <div className="header big-border">
        <h1>Boids</h1>
      </div>
      
      <div className="main-simulation big-border">
        <CanvasElement canvasRef={canvasRef}/>
        <Controls/>
        
      </div>

      <div className="footer big-border">
          Footer
      </div>

    </div>
  );
}

export default App;
