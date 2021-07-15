import React, {useContext, useEffect, useState} from "react";
import './../../scss/register.scss'
import {Link} from "react-router-dom";
import {StepsRegister} from "./StepsRegisterStyle";
import {Context} from "../../index";
import {observer} from 'mobx-react-lite'

const RegisterForm: React.FC = () => {
    const [counter, setCounter] = useState<number>(0)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    useEffect(() => {
        StepsRegister(counter)
    }, [counter])
    return (
        <div className="Main-register-form">
            <div className="register_form ">
                <span>Registration</span>
                <div id="Step1">
                    <input placeholder="Enter your @email"
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                           value={email}/>
                </div>
                <div id="Step">
                    <input id="rules"
                           type="checkbox"
                           onChange={() => store.setConfirm()}
                    />
                    <p>Я принимаю условия пользования и соглашаюсь со всеми правилами и регламентом сайта</p>
                </div>
                <div id="Step2" className="no_activity ">
                    <input placeholder={"Enter your password"}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                           value={password}
                           type="password"/>
                    <input placeholder={"Repeat your password"}/>
                </div>
                <button id="Step3" onClick={() => setCounter(counter + 1)}>Nex step</button>
                <button id="Step4" onClick={() => store.registration(email, password)}>Save</button>
                <Link className="LinkButtons" to={"/"}>Main menu</Link>
            </div>
        </div>
    )
}

export default observer(RegisterForm)