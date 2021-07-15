import React from "react";
import '../scss/style.scss'
import {Link} from "react-router-dom";

export const Navbar: React.FC = () => {
    return (
        <nav className="MainForm" id="MainForm">
            <Link className="LINKTO" to={"/registration"}>Registration</Link>
            <Link className="LINKTO" to={"/login"}>Login</Link>
        </nav>
    )
}

