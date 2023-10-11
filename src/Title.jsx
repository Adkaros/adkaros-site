import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

export default function Title() {

    return (
        <>
            {/* <div id="bg" className={`absolute w-screen h-screen top-0 left-0 p-0 m-0 bg-[url('/src/images/weatherbg.jpg')] bg-cover`} /> */}
            <div id="page-container" className="relative w-screen h-screen p-0 m-0 overflow-hidden">
                <TopNavigation />

                <div id="layout-container" className="flex justify-center items-center h-screen mx-64">

                    <div id="h-scaffolding" className="grid grid-cols-2 gap-4 h-full w-full">
                        <div id="v-scaffolding" className="grid grid-rows-titlePageLayout gap-4 h-full w-full">
                            <div id="general-info" className="row-start-2 flex flex-row justify-start items-center h-full w-full">

                                <div id="icon-wrapper" className="flex flex-col h-full w-auto mt-24">
                                    {/* <img className="w-32 h-32 flex flex-col items-start max-w-none" src="/src/images/partlycloudy.svg" /> */}
                                </div>

                                <div id="info-wrapper" className="flex flex-col justify-center h-full w-auto">
                                    <div className="w-100 h-86 text-left text-9xl text-primary">Andrew Karos</div>

                                    <div id="highs-lows-wrapper" className="flex flex-row items-center w-auto gap-x-12">
                                        <div className="h-16 text-6xl text-primaryVariant font-thin mt-8">Fullstack Developer ☕😎💻</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function TopNavigation() {
    return (
      <div className="flex justify-end items-center h-16 text-primary mr-12 gap-8 text-xl mt-4">
        <Link to="/projects">
          <div className="group flex items-center hover:text-white hover:scale-110
                                transition-all duration-200 ease-out">
            <span className="">Projects</span>
          </div>
        </Link>
  
        <Link to="/about">
          <div className="group flex items-center hover:text-white hover:scale-110
                                transition-all duration-200 ease-out">
            <span className="">About</span>
          </div>
        </Link>
      </div>
    )
  }