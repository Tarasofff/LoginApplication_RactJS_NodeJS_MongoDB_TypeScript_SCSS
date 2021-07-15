import React, {useContext, useEffect} from 'react';
import {MainComponent} from "./components/Main";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Register} from "./components/Register";
import {Login} from "./components/Login";
import {Context} from "./index";
import { observer } from 'mobx-react-lite'

function App() {
    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainComponent}/>
                <Route path="/registration" component={Register}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </BrowserRouter>
    );
}

export default observer(App);
