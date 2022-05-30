import React from 'react'
import './App.css'
import conditionsList from "./components/Zustaende/List";

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">
          Ich bin eine Turingmaschine...bald!
        </h1>
      </header>
      <conditionsList />
    </div>
  )
}

export default App
