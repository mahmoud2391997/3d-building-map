import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

function CameraController() {
  const { camera } = useThree();

  // Example function to animate camera
  const animateToFloor = (floorY) => {
    gsap.to(camera.position, { y: floorY + 2, duration: 1, ease: 'power2.inOut' });
  };

  // For demo, you can call animateToFloor manually or link it with a specific event
  // animateToFloor(4); // Move camera to the 2nd floor for example
  
  return null; // This component doesn't render anything
}

export default CameraController;
