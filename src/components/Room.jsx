import React, { useState } from 'react';

function Room({ position, roomNumber, floorNumber }) {
  const [color, setColor] = useState('lightgrey');

  const toggleColor = () => {
    setColor(color === 'lightgrey' ? 'skyblue' : 'lightgrey');
  };

  return (
    <mesh position={position} onClick={toggleColor}>
      <boxGeometry args={[2.5, 1.7, 2.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Room;
