import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select, { OnChangeValue } from "react-select";
import { Zustand } from '../../interfaces/CommonInterfaces';
import { alphabetChangeAnfangszustand, alphabetChangeEndzustand } from '../../redux/generalStore';
import { RootState } from '../../redux/store';
import DropDownSelect from "../Eingabealphabet/DropDownSelect";

function ConditionsList() {
    /**
     * To check if Accordion opened or closed
     */
    const [isActive, setIsActive] = useState(true);

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
        title: <h2>Spezifikationen</h2>,
        openAccordion: '+',
        closeAccordion: '-',
    };
    const { title, openAccordion, closeAccordion } = accordionData;

    function handleChange(newValue: OnChangeValue<Zustand, false>) {
        if (newValue) {
            const newAnfangszustand = new Zustand(newValue.label, newValue.value, true, false)
            dispatch(alphabetChangeAnfangszustand(newAnfangszustand))
        }
    }

    function handleChangeMulti(newValue: OnChangeValue<Zustand[], false>) {
        if (newValue) {
            let temp: Zustand[] = [];
            newValue.forEach(zustand => {
                temp.push(new Zustand(zustand.value,zustand.label, zustand.anfangszustand, true))
            });
            dispatch(alphabetChangeEndzustand(temp))
        }
    }

    return (
        <div className={"accordion border-solid border-2 rounded-md"}>
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
                        {bandAlphabet.map((value, index) => (
                            <span key={index}>{value.value},</span>
                        ))}{kZ}
                    </div>
                    <div>
                        Zustandsmenge Q = {kA}
                        {zustandsmenge.map((value, index) => (
                            <span key={index}>{value.value},</span>
                        ))}{kZ}
                    </div>
                    <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 grid grid-cols-2 gap-2 items-center"}>
                        <div>Anfangszustand q0 = {anfangsZustand.value} </div>
                        <Select
                            placeholder={anfangsZustand.value}
                            blurInputOnSelect={false}
                            className={"text-black p-3 text-base"}
                            onChange={handleChange}
                            options={zustandsmenge} 
                        />
                    </div>
                    <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 grid grid-cols-2 gap-2 items-center"}>
                        <div>
                            Endzustand F = {kA}
                            {endZustand.map((value, index) => (
                                <span key={index}>{value.value},</span>
                            ))}{kZ}
                        </div>
                        <Select
                            value={endZustand}
                            blurInputOnSelect={false}
                            className={"text-black p-3 text-base"}
                            onChange={handleChangeMulti}
                            options={zustandsmenge} 
                            isMulti={true}
                        />
                    </div>
                    <div>
                        <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 grid grid-cols-2 gap-2 items-center"}>
                            <span>Zustandsüberführungsfunktion &delta; =</span>
                            <button className={"text-black bg-white hover:bg-gray-200 text-left"} onClick={() => setShowZustandsfunktion(!showZustandsfunktion)}>{ showZustandsfunktion ? 'Hier steht eine Funktion' : '...' }</button>
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