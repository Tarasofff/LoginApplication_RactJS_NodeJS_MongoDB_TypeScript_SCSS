import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./store/store";

interface IState {
    store: Store,
}

const store = new Store()

export const Context = createContext<IState>({
    store,
})

ReactDOM.render(
    <Context.Provider value={{
        store
    }}>
        <App />
    </Context.Provider>,

   document.getElementById('root')
);
