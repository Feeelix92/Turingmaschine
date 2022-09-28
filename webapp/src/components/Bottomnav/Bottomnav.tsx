import React, {useEffect} from "react";

import ConditionsList from "../Zustaende/List";
import MespumaList from "../Zustaende/MespumaList";

import Table from "../Zustandsüberführungsfunktion/Table";
import {
    FaTable,
    FaClipboardList
  } from "react-icons/fa";
import {useTranslation} from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Bottomnav() {

    // Anzeige der Spezifikation
    const [spez, setSpez] = React.useState(true);
    function showSpez() {
        setFunk(false);
        setSpez(true);
    }

    // Anzeige der Zustandsüberführungsfunktion
    const [funk, setFunk] = React.useState(false);
    function showFunk() {
        setSpez(false);
        setFunk(true);
    }

    // Wenn Keyboard geöffnet ist, soll die BottomNavigation ausgeblendet werden
    const [keyboardIsOpen, setKeyboardIsOpen] = React.useState(false); 

    const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
    function updateWindowHeight(height: React.SetStateAction<number>) {
        setWindowHeight(height);
    }

    
    useEffect(() => {

        function handleResize() {
            const y = window.innerHeight;
            const heightDiff = 200; // Soll erst ab einer bestimmten Differenz der Höhe getriggert werden --> Damit es nicht auch auf scrollen reagiert, also quasi die vermutete Mindesthöhe des Keyboards

            if(windowHeight > y && ( (windowHeight-y) > heightDiff ) ) {
                setKeyboardIsOpen(true); 
            } else if (windowHeight < y && ( (y-windowHeight) > heightDiff ) ) {
                setKeyboardIsOpen(false);
            }
           
            updateWindowHeight(y);
        }

        window.addEventListener('resize', handleResize);

    })

    const mode = useSelector(
        (state: RootState) => state.general.mode
      );

    /// internationalization
    const { t } = useTranslation(["general"])

    return (
        <div>
            <div className={"mt-11 mb-36"}>
                { spez
                 ? 
                 (
                     mode == "default" ? ( <ConditionsList/> ) : 
                     mode == "mespuma" ? ( <MespumaList /> ) :
                     ""
                 ) 
                 : 
                 "" }
                 
                { (funk || mode=="toiletpaper") 
                ? 
                (<Table/>) : "" }                
            </div>

            { (mode!="toiletpaper") 
                ? 
                (
                    <div className={`bottomnav z-0 ${(keyboardIsOpen) ? 'hidden' : 'grid grid-cols-2 justify-items-center'}`}>
                        <button className={"flex gap-4 items-center"}  onClick={() => showSpez()}>
                            <FaClipboardList size={30}/>
                            {t("bottomNavBar.configurations")}
                        </button>
        
                        <button className={"flex gap-4 items-center"} onClick={() => showFunk()}>
                            <FaTable size={30}/>
                            {t("bottomNavBar.table")}
                        </button>
                </div>
                ) : "" }     

        </div>
    );
}

export default Bottomnav;