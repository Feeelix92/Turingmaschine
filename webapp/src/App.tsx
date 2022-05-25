import { useState } from "react";
import "./App.css";
import logo from "./favicon_turing.svg";
import Dialog from "./components/Eingabealphabet/Dialog";
import DropDownSelect from "./components/Eingabealphabet/DropDownSelect";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import Editfield from "./components/Zustandsüberführungsfunktion/EditField";
import EditField from "./components/Zustandsüberführungsfunktion/EditField";
import { eingabeAlphabetOptionen } from "./data/Alphabet";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <DropDownSelect />
        <Dialog /> */}
      </header>
      <Table />
      <EditField/>
    </div>
  );
}

export default App;
