import React, {Key, useEffect, useRef} from "react";

import ConditionsList from "../Zustaende/List";
import Table from "../Zustandsüberführungsfunktion/Table";
import {
    FaTable,
    FaClipboardList
  } from "react-icons/fa";
import {useTranslation} from "react-i18next";


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

    const [keyboardIsOpen, setKeyboardIsOpen] = React.useState(false);

    const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
    function updateWindowHeight(height: React.SetStateAction<number>) {
        setWindowHeight(height);
    }

    
    useEffect(() => {

        function handleResize() {
            var y = window.innerHeight;

            if(windowHeight > y) {
                setKeyboardIsOpen(true);
            } else {
                setKeyboardIsOpen(false);
            }
           
            updateWindowHeight(y);
        }

        window.addEventListener('resize', handleResize);

    })

    ///internationalization
    const { t } = useTranslation(["general"])

    return (
        <div>
            <div className={"mt-11 mb-36"}>
                { spez ? (<ConditionsList/>) : "" }
                { funk ? (<Table/>) : "" }                
            </div>

            <div className={`bottomnav z-50 ${(keyboardIsOpen) ? 'hidden' : 'flex'}`}>
                <button className={"grid justify-items-center"}  onClick={() => showSpez()}>
                    <FaClipboardList/>
                    {t("bottomNavBar.configurations")}
                </button>

                <button className={"grid justify-items-center"} onClick={() => showFunk()}>
                     <FaTable/>
                    {t("bottomNavBar.table")}
                </button>

            </div>
        </div>
    );
}

export default Bottomnav;