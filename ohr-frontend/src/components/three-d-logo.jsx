import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { extend } from "@react-three/fiber";
import Nabla from "../assets/Nabla_Regular.json";

class CustomTextGeometry extends TextGeometry {}
extend({ CustomTextGeometry });

const ThreeDLogo = () => {
  const fontLoader = new FontLoader();
  const font = fontLoader.parse(Nabla);

  return (
    <mesh position={[1, -1, -10]}>
      <customTextGeometry args={["øhr", { font, size: 1, height: 1 }]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export default ThreeDLogo;
