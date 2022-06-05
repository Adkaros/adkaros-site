import { useState, useEffect } from 'react'
import FPSStats from "react-fps-stats";
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import logo from './logo.svg'
import './App.css'

import * as THREE from 'three'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import TextureMorphOverlay from './postprocessing/TextureMorphOverlay';
import BarrelDistortion from './postprocessing/BarrelDistortion';
import DomainWarp from './postprocessing/DomainWarp';


function App() {

  return (
    <>

      <Suspense fallback={null}>
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 60 }} linear performance={{ min: 0.5, max: 1 }}
          gl={{ powerPreference: "high-performance", antialias: false, depth: false, stencil: false }}>

          <fog attach="fog" color={0x062365} near={40} far={120} />
          <color attach="background" args={[0x062365]} />

          <ambientLight intensity={0.5} />
          <mesh scale={1}>
            <boxGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color={0xffffff} roughness={0.5} metalness={0.5} />
          </mesh>

          <EffectComposer multisampling={0} stencilBuffer={true}>
            <DomainWarp />
          </EffectComposer>

        </Canvas>
      </Suspense>

      <FPSStats />
    </>
  )
}

export default App
