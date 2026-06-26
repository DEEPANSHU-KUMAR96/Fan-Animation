import React, { useEffect } from 'react'
import { useControls } from 'leva';
import FanGroup from './FanGroup';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Adjusts camera FOV and Z-position responsively based on viewport width
const ResponsiveCamera = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    const w = size.width;

    if (w < 480) {
      // Mobile: wider FOV, pull camera back so fan fits
      camera.fov = 90;
      camera.position.z = 7;
    } else if (w < 768) {
      // Large mobile / small tablet
      camera.fov = 80;
      camera.position.z = 6;
    } else if (w < 1024) {
      // Tablet
      camera.fov = 75;
      camera.position.z = 5.5;
    } else if (w < 1440) {
      // Laptop / desktop
      camera.fov = 75;
      camera.position.z = 5;
    } else {
      // Wide / ultra-wide
      camera.fov = 70;
      camera.position.z = 5;
    }

    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
};

const Experience = () => {

  // leva controls 
  const { _ } = useControls("Box Position", {});

  return (
    <>
      <ambientLight intensity={2} color={"#ffffff"} />
      <ResponsiveCamera />
      <FanGroup />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enableZoom={false}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />
    </>
  )
}

export default Experience
