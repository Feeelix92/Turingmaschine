import React from 'react'
import './App.css'
import logo from './favicon.svg'
import DropDownSelect from "./components/Eingabealphabet/DropDownSelect";
import Band from "./components/Band/Band";
import Table from "./components/Zustandsüberführungsfunktion/Table";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                <DropDownSelect/>
                <Band/>
            </header>
            <Table/>
        </div>
    );
}

export default App;
