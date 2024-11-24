import React, { useEffect } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Floor from "./Floor";
import CameraController from "./cameraController";
const Building = () => {
  return (
    <Canvas
    camera={{ position: [0, 15, 20], fov: 50 }}
    
      style={{
        height: "100vh",
        width: "50vw",
        position: "absolute",
        right: "1%",
      }}
      className="h-screen absolute"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      {/* Floors with walls */}
      <Floor position={[0, 0, 0]} floorNumber={1} withRooms={true} />
      <Floor position={[0, 2.1, 0]} floorNumber={2} withRooms={true} />{" "}
      {/* Adjust height as needed */}
      <Floor position={[0, 4.2, 0]} floorNumber={3} withRooms={true} />
      <Floor position={[0, 6.3, 0]} floorNumber={4} />
      <OrbitControls />
      <CameraController />
    </Canvas>
  );
};

export default Building;
