import React from 'react'
import Band from "./components/Band/Band";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import Menu from "./components/Menu/Menu";
import ConditionsList from "./components/Zustaende/List";



function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Menu/>
                <Band/>
            </header>
            <body className={"App-body"}>
                <Table/>
                <ConditionsList />
            </body>
        </div>
    );
        
}

export default App;
