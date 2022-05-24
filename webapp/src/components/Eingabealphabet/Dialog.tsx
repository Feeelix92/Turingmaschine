import React from "react";
import MultiselectDropDown from "./DropDownMultiselect";

function Dialog(){
    return <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 p-3"}>
        <div>
            <h2>Eingabealphabet hinzufügen:</h2>
        </div>
        <div>
            <p>Sie können Zeichen eingeben oder Zeichen aus dem Standard-Eingabealphabet auswählen!</p>
            <MultiselectDropDown />
        </div>
        <div className={"text-white font-bold grid grid-cols-2 gap-2 text-lg"}>
            <button className={"bg-red-600 hover:bg-red-800"}>abrechen</button>
            <button className={"bg-green-600 hover:bg-green-800"}>speichern</button>
        </div>
    </div>
}

export default Dialog;
