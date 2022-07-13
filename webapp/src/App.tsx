import React from 'react'
import TeepeeBand from "./components/Band/TeepeeBand";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import Menu from "./components/Menu/Menu";
import Control from "./components/Control/Control";
import ConditionsList from "./components/Zustaende/List";
import ToPaTable from "./components/Zustandsüberführungsfunktion/ToPaTable"
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";

function App() {
    const toiletPaperMode = useSelector((state: RootState) => state.general.toiletPaperMode)
        
    return (
        <div className="App">
            <header className="App-header">
                <Menu/>
                <Control/>
            </header>
            <TeepeeBand/>
            <div className={"App-body"}>
                {!toiletPaperMode &&
                    <ConditionsList/>
                }
                {!toiletPaperMode &&
                    <Table />
                }
                {toiletPaperMode &&
                    <ToPaTable/>
                }
            </div>
        </div>
    );
        
        
}

export default App;
