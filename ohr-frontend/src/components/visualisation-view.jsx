import { React, useState, useRef, useEffect } from "react";
import UploadDataToArweave from "./upload-data-to-arweave";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./scene";
const pixelSize = 6.8;

const VisualisationAndCoords = ({ blob, setView }) => {
  const handleBack = () => {
    setView("map");
  };

  async function handleTouch() {
    if (blob) {
      const audio = new Audio(blob);
      audio.play();
    }
  };

  return (
    <div className="central-inner-container">
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [-1.5, 0.5, 3] }}
      >
        <OrbitControls onStart={handleTouch} />
        <Scene />
      </Canvas>
      <div className="vis-btns">
        <UploadDataToArweave blob={blob} />
        <button className="btn btn-ghost" onClick={handleBack}>
          back
        </button>
      </div>
    </div>
  );
};

export default VisualisationAndCoords;
