import React from 'react'
import Band from "./components/Band/Band";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import Menu from "./components/Menu/Menu";
import Control from "./components/Control/Control";
import ConditionsList from "./components/Zustaende/List";
import Bottomnav from "./components/Bottomnav/Bottomnav";


function App() {             
        
    return (
        <div className="App">
            <header className="App-header">
                <Menu/>
                <Control />
                <Band/>
            </header>


            <div className={"App-body"}>

                <div className={" hidden md:grid md:grid-cols-4 md:items-start"}>
                    <ConditionsList/>
                    <Table/>
                </div>


                <div className={"md:hidden"}>
                    <Bottomnav/>
                </div> 

            </div>

        </div>
    );
        
        
}

export default App;
