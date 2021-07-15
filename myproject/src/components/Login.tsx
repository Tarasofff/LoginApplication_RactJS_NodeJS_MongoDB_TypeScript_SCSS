import React from "react";
import {ParticlesComponentBackground} from "../particles/app";
// @ts-ignore
import LoginForm from "./Forms/LoginForm";


export const Login: React.FC = () => {
    return (
        <div className="Login">
            <ParticlesComponentBackground imageUrl={"https://vsthemes.org/uploads/posts/2018-03/1582033534_full-hd_vsthemes_ru-50.jpg"}/>
            <LoginForm/>
        </div>
    )
}