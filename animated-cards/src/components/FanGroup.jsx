import React, { useMemo, useRef } from 'react'
import { useControls } from 'leva';

import { images } from '../Data/Images'
import ImagePlane from './ImagePlane';
import { useFrame, useThree } from '@react-three/fiber';

// Computes responsive 3D sizes based on CSS pixel width
const getResponsiveDefaults = (width) => {
  if (width < 480) {
    // Mobile
    return { planeWidth: 1.2, planeHeight: 1.2, positionY: -0.8 };
  } else if (width < 768) {
    // Large mobile
    return { planeWidth: 1.6, planeHeight: 1.6, positionY: -1.0 };
  } else if (width < 1024) {
    // Tablet
    return { planeWidth: 2.0, planeHeight: 2.0, positionY: -1.2 };
  } else if (width < 1440) {
    // Laptop
    return { planeWidth: 2.5, planeHeight: 2.5, positionY: -1.5 };
  } else {
    // Wide / ultra-wide
    return { planeWidth: 3.0, planeHeight: 3.0, positionY: -1.5 };
  }
};

const FanGroup = () => {
  const { size } = useThree();
  const defaults = getResponsiveDefaults(size.width);

  const { numPlanes, spreadAngle, planeWidth, planeHeight, positionY, rotationYspeed } = useControls("Book Fan Controls", {
    numPlanes: {
      value: 6,
      min: 2,
      max: 80,
      step: 1,
      label: "No. of Planes"
    },
    spreadAngle: {
      value: 360,
      min: 20,
      max: 360,
      step: 1,
      label: "Spread Angle"
    },
    planeWidth: {
      value: defaults.planeWidth,
      min: 0.4,
      max: 6,
      step: 0.05,
      label: "Plane Width"
    },
    planeHeight: {
      value: defaults.planeHeight,
      min: 0.4,
      max: 8,
      step: 0.05,
      label: "Plane Height"
    },
    positionY: {
      value: defaults.positionY,
      min: -6,
      max: 6,
      step: 0.05,
      label: 'Y Position',
    },
    rotationYspeed: {
      value: 0.5,
      min: -0.8,
      max: 0.8,
      step: 0.05,
      label: "Rotation Speed"
    }
  })

  const planes = useMemo(() => {
    const count = numPlanes
    const totalArcRad = (spreadAngle * Math.PI) / 180
    const step = totalArcRad / (count - 1)
    const startingAngle = -totalArcRad / 2

    return Array.from({ length: count }).map((_, i) => {
      const angle = startingAngle + i * step
      return {
        key: i,
        url: images[i % images.length],
        // position: [Math.cos(angle), positionY, Math.sin(angle)],
        position: [0, 0, 0],
        rotation: [0, angle, 0],
       
      }
    })
  }, [numPlanes, spreadAngle,])

  const groupRef = useRef()

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * rotationYspeed
  })


  return (
    <group ref={groupRef} position={[0, positionY, 0]}>
      {planes.map((plane) => (
        <ImagePlane 
          key={plane.key}
          url={plane.url} 
          position={plane.position} 
          rotation={plane.rotation} 
          planeWidth={planeWidth}
          planeHeight={planeHeight} 
        />
      ))}

    </group>
  )
}

export default FanGroup
