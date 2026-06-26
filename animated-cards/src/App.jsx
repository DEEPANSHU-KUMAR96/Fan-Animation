import React from 'react'
import { Canvas } from '@react-three/fiber'
import {} from '@react-three/drei'
import Experience from './components/Experience'

const App = () => {
  return (
    <div className='parent h-screen w-full'>
      <Canvas>
        <Experience />
      </Canvas>
    </div>
  )
}

export default App
