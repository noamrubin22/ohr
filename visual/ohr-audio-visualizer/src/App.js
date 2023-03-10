import "./App.css";
import {Canvas} from "@react-three/fiber";
import Sphere from "./Sphere";

function App() {
  // Adding sphere in a circle.
  const number = 20,
  increase = Math.PI * 2 / number;
let angle = 0;
let spheres = []; // The array of spheres to the canvas.


  for (let i = 0; i < number; i++) {
    let x = 5 * Math.cos(angle);
    let y = 5 * Math.sin(angle);
    let key = `sphere_${i}`;
    spheres.push(<Sphere 
      key={key}
      position={[x, y, -10]}
      radius={5}
      angle={angle}
    />);
    angle += increase;
  }

    return (
      <div className="App">
        <button>Record</button>
        <Canvas>
          <ambientLight intensity={0.2} />
          <directionalLight position={[0, 0, 5]} />
          {spheres}
        </Canvas>
      </div>
    );
}

export default App;
