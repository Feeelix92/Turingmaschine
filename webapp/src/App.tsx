import { useState } from 'react'
import './App.css'
import logo from './favicon_turing.svg'
import Dialog from "./components/Eingabealphabet/Dialog";
import DropDownSelect from "./components/Eingabealphabet/DropDownSelect";

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <DropDownSelect />
            <Dialog />
      </header>
    </div>
  )
}

export default App
