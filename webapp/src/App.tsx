import React from 'react'
import './App.css'
import logo from './favicon.svg'
import DropDownSelect from "./components/Eingabealphabet/DropDownSelect";
import Band from "./components/Band/Band";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import Menu from "./components/Menu/Menu";
import Control from "./components/Control/Control";



function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                <Menu/>
                <Control/>
                <DropDownSelect/>
                <Band/>
            </header>
            <Table/>
        </div>
    );
}

export default App;
