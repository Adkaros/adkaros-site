import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
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

import Title from './Title'

const firebaseConfig = {
  apiKey: "AIzaSyAYtLz9FaZHXJJNIeJ9gG4G3V9SZKhpXoY",
  authDomain: "adkaros-site.firebaseapp.com",
  projectId: "adkaros-site",
  storageBucket: "adkaros-site.appspot.com",
  messagingSenderId: "5264531907",
  appId: "1:5264531907:web:9483232ab92b0eb055dd76",
  measurementId: "G-6W64D23BPL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestoreDB = firebase.firestore()

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    setProjects([])

    firestoreDB.collection("projects").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        setProjects(p => [...p, doc.data()]);
      });
    });
  }, [])

  useEffect(() => {
    console.log(projects)
  }, [projects])

  return (
    <BrowserRouter>

      <div className="absolute top-0 left-0 right-0 w-screen h-screen">
        <Scene />
      </div>

      <Title />

      <>
        {/* <div id="bg" className={`absolute w-screen h-screen top-0 left-0 p-0 m-0 bg-[url('/src/images/weatherbg.jpg')] bg-cover`} /> */}
        <div id="page-container" className="relative w-screen h-screen p-0 m-0 overflow-hidden">

          <div id="layout-container" className="flex justify-center items-center mx-64 h-[2000px]">

            <div id="projects-grid" className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-1px mt-20">
              {projects?.length > 0 && projects.map((data, index) => {
                return <Project key={index} data={data} />
              })}
            </div>
          </div>
        </div>
      </>

    </BrowserRouter>
  )
}

function Project({ data }) {
  return (
    <div>
      <Link to={`/project/${data.name}`}>
        <div className={`relative w-full h-full bg-cover`} style={{ backgroundImage: `url(${data.header_image})` }}>

        </div>
      </Link>
    </div>
  )
}

function Scene() {

  const [iData, setIData] = useState([])
  const palette = [0x2A747E, 0x49948A, 0x2FAFB5]

  useEffect(() => {
    setIData([])

    for (let i = 0; i < 200; i++) {
      const x = (Math.random() * 20)-10
      const y = Math.random() * 10-5
      const z = (Math.random() * 10) - 5 * (i*0.01)

      const xScale = Math.random() * 1
      const yScale = Math.random() * 0.5
      const zScale = Math.random() * 0.5

      if (x < 3 && y < 2) continue

      const color = palette[Math.floor(Math.random() * palette.length)]
      setIData(p => [...p, { position: [ x, y, z ], scale: [xScale, yScale, zScale], color: color }])
    }

    
  }, [])

  useEffect(() => {
    if (iData.length >= 100) {
      console.log(iData)
    }
  }, [iData])

  return (
    <Suspense fallback={null}>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 60 }} linear performance={{ min: 0.5, max: 1 }}
        gl={{ powerPreference: "high-performance", antialias: false, depth: false, stencil: false }}>

        <fog attach="fog" color={0x062365} near={10} far={120} />
        <color attach="background" args={[0xffffff]} />

        {/* <ambientLight intensity={2} /> */}
        <directionalLight position={[0, 0, 5]} intensity={1} />

        { iData.map((d, index) => {
          return <Cube key={index} position={d.position} color={d.color} />
        }) }


        {/* <EffectComposer multisampling={0} stencilBuffer={true}>
          <DomainWarp />
        </EffectComposer> */}

      </Canvas>
    </Suspense>
  )
}

function Cube({ position, scale, color }) {
  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[3,0.5,0.1]} />
      <meshStandardMaterial attach="material" color={color} roughness={0.5} metalness={0.5} />
    </mesh>
  )
}

export default App
