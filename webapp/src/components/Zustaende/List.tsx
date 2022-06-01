import React, { useState } from 'react';
import DropDownSelect from "../Eingabealphabet/DropDownSelect";
import {EingabelphabetOption} from "../../data/Alphabet";

function ConditionsList() {
    /**
     * To check if Accordion opened or closed
     */
    const [isActive, setIsActive] = useState(false);

    /**
     * To show the Zustandsüberführungsfunktion
     */
    const [showZustandsfunktion, setShowZustandsfunktion] = useState(false)

    /**
     * Accordion data (Title, Icons)
     */
    const accordionData = {
        title: 'Spezifikationen:',
        openAccordion: '+',
        closeAccordion: '-',
    };
    const { title, openAccordion, closeAccordion } = accordionData;

    return (
        <div className={"accordion border-solid border-2 border-gray-600 rounded-md mx-1 my-3"}>
            <div className={"accordion-item"}>
                <div
                    className={"accordion-title"}
                    onClick={() => setIsActive(!isActive)}
                >
                    <div className={"specification-header"}>
                        <span className={"accordion-icon"}>{isActive ? closeAccordion : openAccordion}</span>
                        <span>{title}</span>
                    </div>
                </div>
                {isActive && <div className={"accordion-content"}>
                    <div>
                        <p>Eingabealphabet ∑ = </p> <DropDownSelect />
                    </div>
                    <div>
                        <p>Bandalphabet &Gamma; = </p>
                    </div>
                    <div>
                        <p>Zustandsmenge Q = </p>
                    </div>
                    <div>
                        <p>Anfangszustand q0 = </p>
                    </div>
                    <div>
                        <p>Endzustand F = { }</p>
                    </div>
                    <div>
                        <div className={"grid grid-cols-2 items-center"}>
                            <span>Zustandsüberführungsfunktion &delta; =</span>
                            <button className={"text-black text-left"} onClick={() => setShowZustandsfunktion(!showZustandsfunktion)}>{ showZustandsfunktion ? 'Hier steht eine Funktion' : '...' }</button>
                        </div>
                        {/*{showZustandsfunktion && <div>
                            <p>Hier steht eine Funktion</p>
                        </div>}*/}
                    </div>
                </div>}
            </div>
        </div>
    );
}
export default ConditionsList;