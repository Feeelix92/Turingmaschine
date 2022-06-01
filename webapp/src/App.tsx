import React, { useState } from 'react'
import './App.css'
import logo from './favicon_turing.svg'
import DropDownSelect from "./components/Eingabealphabet/DropDownSelect";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import ConditionsList from "./components/Zustaende/List";

function App() {
    return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        </header>
        <DropDownSelect />
        <Table />
        <ConditionsList />
    </div>
  );
}

export default App;
