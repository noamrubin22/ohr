import { useRef, useEffect } from 'react';
//import { setPcm } from './visualisation-view'
import '../App.css'

function CanvasVisual() {

    const canvas = useRef();
    let ctx = null;

    // initialize the canvas context
    useEffect(() => {
        // dynamically assign the width and height to canvas
        const canvasEle = canvas.current;
        canvasEle.width = canvasEle.clientWidth;
        canvasEle.height = canvasEle.clientHeight;

        // get context of the canvas
        ctx = canvasEle.getContext("2d");
    }, []);

    const pixelSize = 10;

    useEffect(() => {
        const r3Info = { x: 0, y: 0, w: pixelSize, h: pixelSize };
        drawFillRect(r3Info, { backgroundColor: "" });

        const r4Info = { x: pixelSize, y: 0, w: pixelSize, h: pixelSize };
        drawFillRect(r4Info);
    }, []);

    // draw rectangle with background
    const drawFillRect = (info, style = {}) => {
        const { x, y, w, h } = info;
        const { backgroundColor = 'black' } = style;

        ctx.beginPath();
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(x, y, w, h);
    }

    return (
        <div className="CanvasVisual">
            <canvas ref={canvas}>

            </canvas>
        </div>
    );
}

export default CanvasVisual;