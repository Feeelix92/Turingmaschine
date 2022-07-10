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
        setSpez(true);
    }

    const [funk, setFunk] = React.useState(false);
    function showFunk() {
        setSpez(false);
        setFunk(true);
    }

    return (
        <div>
            <div className={"mt-11 mb-36"}>
                { spez ? (<ConditionsList/>) : "" }
                { funk ? (<Table/>) : "" }                
            </div>

            <div className={"bottomnav z-50"}>
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