import React, {Key, useEffect, useRef} from "react";

import ConditionsList from "../Zustaende/List";
import Table from "../Zustandsüberführungsfunktion/Table";


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

            <div className={"bottomnav w-screen p-5 flex justify-around  fixed bottom-0"}>
                <button className={""}  onClick={() => showSpez()}>
                    Spezifikationen
                </button>

                <button className={""} onClick={() => showFunk()}>
                    Funktion
                </button>
                
                <button className={""} onClick={() => showCode()}>
                    Code
                </button>
            </div>
        </div>
    );
}

export default Bottomnav;