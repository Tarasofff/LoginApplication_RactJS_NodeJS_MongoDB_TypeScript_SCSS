import React, {useContext, useEffect, useState} from "react";
import '../../scss/login.scss'
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {observer} from 'mobx-react-lite'
import {Log} from "./LoginLogoutStyle";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    useEffect(() => {
        Log(store.isAuth)
    }, [store.isAuth])

    return (<>
        <div className="Main-login-form">
            <div className="login-form">
                <span>Login</span>
                <span>{store.isAuth ? `Hello Dear ${store.user.email}` : 'Unauthorized'}</span>
                <span
                    id="EmailConfirm">{store.user.isActivated ? 'Account confirm' : 'Please check your email and confirm acc'}</span>
                <div className="login_inputs" id="login_inputs">
                    <input placeholder={"Enter your email"}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                           value={email}/>
                    <input placeholder={"Enter your password"}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                           value={password}
                           type="password"/>
                    <button onClick={() => store.login(email, password)}>login</button>
                </div>
                <button id="Logout" onClick={() => store.logout()}>logout</button>
                <Link className="LinkButtons" to={"/"}>Main menu</Link>
            </div>
        </div>
    </>)
}

export default observer(LoginForm)