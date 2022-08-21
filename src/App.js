import logo from './logo.svg';
import './App.css';
import CanvasElement from './components/Canvas';
import Controls from './components/Controls';

function App() {
  return (
    <div className="box">
      
      <div className="header big-border">
        <h1>Boids</h1>
      </div>
      
      <div className="main-simulation big-border">
        <CanvasElement/>
        <Controls/>
        
      </div>

      <div className="footer big-border">
          Footer
      </div>

    </div>
  );
}

export default App;
