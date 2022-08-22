function CanvasElement({canvasRef, addBoidToPosition}) {
    return ( 
    <div className="canvas-element">
        <canvas id="main-canvas" ref={canvasRef} onClick={(e) => addBoidToPosition(e)}></canvas>
    </div>);
}

export default CanvasElement;