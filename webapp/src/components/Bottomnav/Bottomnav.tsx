import React, {Key, useEffect, useRef} from "react";

import ConditionsList from "../Zustaende/List";
import Table from "../Zustandsüberführungsfunktion/Table";
import {
    FaTable,
    FaClipboardList
  } from "react-icons/fa";


function Bottomnav() {

    const [spez, setSpez] = React.useState(true);
    function showSpez() {
        setFunk(false);
        setCode(false);
        setSpez(true);
    }

    const [funk, setFunk] = React.useState(false);
    function showFunk() {
        setSpez(false);
        setCode(false);
        setFunk(true);
    }

    
    const [code, setCode] = React.useState(false);
    function showCode() {
        setSpez(false);
        setFunk(false);
        setCode(true);
    }

    return (
        <div>
            <div className={"mt-11 mb-36"}>
                { spez ? (<ConditionsList/>) : "" }
                { funk ? (<Table/>) : "" }                
                { code ? ("") : "" }
            </div>

            <div className={"bottomnav"}>
                <button className={"grid justify-items-center"}  onClick={() => showSpez()}>
                    <FaClipboardList/>
                    Spezifikationen
                </button>

                <button className={"grid justify-items-center"} onClick={() => showFunk()}>
                     <FaTable/>
                     Tabelle
                </button>

            </div>
        </div>
    );
}

export default Bottomnav;