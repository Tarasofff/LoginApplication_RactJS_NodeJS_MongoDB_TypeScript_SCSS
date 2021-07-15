import React from "react";
import {ParticlesComponentBackground} from "../particles/app";
// @ts-ignore
import RegisterForm from "./Forms/RegisterForm";


export const Register: React.FC = () => {
    return (
        <div className="Register">
            <ParticlesComponentBackground imageUrl={"https://i.pinimg.com/originals/c3/3f/71/c33f716e1b1fe4138c2306975e4959c1.jpg"}/>
            <RegisterForm/>
        </div>
    )
}