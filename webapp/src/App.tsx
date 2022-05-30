import React, { useState } from 'react'
import './App.css'
import logo from './favicon_turing.svg'
import DropDownSelect from "./components/Eingabealphabet/DropDownSelect";
import ConditionsList from "./components/Zustaende/List";

function App() {
    return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <DropDownSelect />
            <ConditionsList />
        </header>
    </div>
  )
}

export default App
