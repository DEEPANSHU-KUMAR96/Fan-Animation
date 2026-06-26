import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'

const App = () => {
  return (
    <div className='w-full h-full' style={{ touchAction: 'none' }}>
      <Canvas
        gl={{ antialias: true }}
        dpr={[1, 2]}
        camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, 5] }}
        performance={{ min: 0.5 }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}

export default App
