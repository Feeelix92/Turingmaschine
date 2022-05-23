import React from "react";
import MultiselectDropDown from "./DropDownMultiselect";

function Dialog(){
    return <div className={""}>
        <div className={"w-screen"}>
            <div className={"bg-gray-50"}>
                <div>
                    <h2>Eingabealphabet hinzufügen:</h2>
                </div>
                <div>
                    <p>
                        Sie können Zeichen eingeben oder Zeichen aus dem Standard-Eingabealphabet auswählen!
                    </p>
                    <MultiselectDropDown />
                </div>
                <div className={"text-white font-bold p-3 px-5 m-2 grid grid-cols-2 gap-4"}>
                    <button className={"bg-red-600 hover:bg-red-800"}>abrechen</button>
                    <button className={"bg-green-600 hover:bg-green-800"}>speichern</button>
                </div>
            </div>
        </div>
    </div>;
}

export default Dialog;
