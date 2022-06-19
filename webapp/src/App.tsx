import React from 'react'
import './App.css'
import Band from "./components/Band/Band";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import Menu from "./components/Menu/Menu";
import ConditionsList from "./components/Zustaende/List";



function App() {
    return (
        <div className="App">
            <Menu/>
            <Band/>
            <Table/>
            <ConditionsList />
        </div>
    );
        
}

export default App;
