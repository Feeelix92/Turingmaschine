import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import DropDownSelect from "../Eingabealphabet/DropDownSelect";

function ConditionsList() {
    /**
     * To check if Accordion opened or closed
     */
    const [isActive, setIsActive] = useState(false);

    /**
     * To show the Zustandsüberführungsfunktion
     */
    const [showZustandsfunktion, setShowZustandsfunktion] = useState(false)

    const bandAlphabet = useSelector((state: RootState) => state.general.bandAlphabet)

    const zustandsmenge = useSelector((state: RootState) => state.general.zustandsmenge)
    const anfangsZustand = useSelector((state: RootState) => state.general.anfangsZustand)
    const endZustand = useSelector((state: RootState) => state.general.endZustand)
    const dispatch = useDispatch() 

    const kA = "{"
    const kZ = "}"

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
                     <DropDownSelect />
                    </div>
                    <div>
                        Bandalphabet &Gamma; ={kA}
                        {bandAlphabet.map((value) => (
                            <span>{value.value},</span>
                        ))}{kZ}
                    </div>
                    <div>
                        Zustandsmenge Q = {kA}
                        {zustandsmenge.map((value) => (
                            <span>{value.value},</span>
                        ))}{kZ}
                    </div>
                    <div>
                        <p>Anfangszustand q0 = {anfangsZustand.value}</p>
                    </div>
                    <div>
                        Endzustand F = {kA}
                        {endZustand.map((value) => (
                            <span>{value.value},</span>
                        ))}{kZ}
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