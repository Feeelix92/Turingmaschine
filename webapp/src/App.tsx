import { useState } from 'react'
import './App.css'
import logo from './favicon_turing.svg'
import Dialog from "./components/Eingabealphabet/Dialog";
import DropDownSelect from "./components/Eingabealphabet/DropDownSelect";
import Band from "./components/Band/Band";
import "./App.css";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import {eingabeAlphabetOptionen, currentBandItems} from "./data/Alphabet";

function App() {
  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <DropDownSelect />
          <Band />            
          <Table />
      </header>
    </div>
  );
}

export default App;
