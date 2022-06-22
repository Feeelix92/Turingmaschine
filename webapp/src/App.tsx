import React from 'react'
import Band from "./components/Band/Band";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import Menu from "./components/Menu/Menu";
import Control from "./components/Control/Control";
import ConditionsList from "./components/Zustaende/List";

function App() {             
        
    return (
        <div className="App">
            <header className="App-header">
                <Menu/>
                <Control />
                <Band/>
            </header>
            <div className={"App-body"}>
                <ConditionsList/>
                <Table/>
            </div>
        </div>
    );
        
        
}

export default App;
