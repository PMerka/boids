function CanvasElement({canvasRef}) {
    return ( 
    <div className="canvas-element">
        <canvas id="main-canvas" ref={canvasRef}></canvas>
    </div>);
}

export default CanvasElement;