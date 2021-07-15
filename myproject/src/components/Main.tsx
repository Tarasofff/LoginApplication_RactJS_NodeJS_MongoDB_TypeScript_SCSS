import React from "react";
import {ParticlesComponentBackground} from "../particles/app";
import '../scss/style.scss'
import {Navbar} from "./nav";

export const MainComponent: React.FC = () => {
    return (
        <div className="MainBlock">
         <ParticlesComponentBackground imageUrl={"https://i.pinimg.com/originals/3c/24/b1/3c24b13f2acbef655055290960f71f61.jpg"}/>
         <Navbar/>
        </div>
    )
}

