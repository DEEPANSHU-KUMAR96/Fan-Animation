import React from 'react'
import { useControls } from 'leva';
import FanGroup from './FanGroup';
import { OrbitControls } from '@react-three/drei';
const Experience = () => {

    // leva controls 
    const {_,}  = useControls("Box Position", {

    })
    return (
        <>
            <ambientLight intensity={2} color={"#ffffff"} />
            <FanGroup />
            <OrbitControls />

        </>
    )
}

export default Experience
