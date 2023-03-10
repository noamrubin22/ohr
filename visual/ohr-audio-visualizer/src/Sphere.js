import "./App.css";
import * as THREE from "three";

function Sphere(props) {

  const sphereColor = () => {
      let r, g, b;
      r = parseInt((Math.sin (props.angle - Math.PI) + 1) * 128);
      g = parseInt((Math.sin( (props.angle - Math.PI) - 3.5 * Math.PI / 3) + 1) * 128);
      b = parseInt((Math.sin( (props.angle - Math.PI) - 6 * Math.PI / 3) + 1) * 128);
      return new THREE.Color(`rgb(${r}, ${g}, ${b})`);
  }

    return (
       <mesh position={props.position}>
         <sphereGeometry args={[0.5, 30, 30]} />
         <meshPhongMaterial color={sphereColor()} />
       </mesh>
    );
}

export default Sphere;