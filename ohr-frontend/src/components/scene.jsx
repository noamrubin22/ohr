import { useThree } from "@react-three/fiber";
import { Stars, Center } from "@react-three/drei";
import ThreeDText from "./three-d-logo";

const Scene= ({ shouldMint }) => {
  const gl = useThree((state) => state.gl);

  return (
    <>
      <ambientLight intensity={0.5} color="hotpink" />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Center>
        <ThreeDText />
      </Center>
    </>
  );
};

export default Scene;
