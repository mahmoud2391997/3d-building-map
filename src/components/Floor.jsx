import React, { useRef, useState } from 'react';

import Room from './Room';

function Floor({ position,floorNumber,withRooms }) {
  const floorRef = useRef();
  const [color, setColor] = useState(0x8a8a8a);

  const toggleColor = () => {
    setColor((prevColor) => (prevColor === 0x8a8a8a ? 0xff0000 : 0x8a8a8a));
  };
  const roomPositions = [
    [-3, 1, -3], [3, 1, -3], [-3, 1, 3],
    [3, 1, 3],  [0, 1, -3], [0, 1, 3],
  ];
  return (
    <group position={position}>
      <mesh ref={floorRef} onClick={toggleColor}>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color={color} />
      </mesh>
     { withRooms ? roomPositions.map((pos, index) => (
        <Room key={index} position={pos} roomNumber={index + 1} floorNumber={floorNumber} /> 
       
    ))
    : null
    }
    </group>
  );
}

export default Floor;
