import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select, { OnChangeValue } from "react-select";
import { Zustand } from '../../interfaces/CommonInterfaces';
import { alphabetChangeAnfangszustand, alphabetChangeEndzustand } from '../../redux/generalStore';
import { RootState } from '../../redux/store';
import DropDownSelect from "../Eingabealphabet/DropDownSelect";
import {BiDownArrow, BiUpArrow} from "react-icons/all";

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
        openAccordion: <BiDownArrow/>,
        closeAccordion: <BiUpArrow/>,
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
        <div className={"border-solid border rounded bg-white w-screen sm:w-3/4 lg:w-3/4 xl:w-2/4 p-3 border rounded items-center hover:bg-gray-100"}>
            <div className={""}>
                <div className={""} onClick={() => setIsActive(!isActive)}>
                    <div className={"hover:bg-none flex gap-5 items-center m-2"}>
                        <span className={""}>{isActive ? closeAccordion : openAccordion}</span>
                        <span>{title}</span>
                    </div>
                </div>
                {isActive && <div className={""}>
                    <div>
                        <DropDownSelect />
                    </div>
                    <div className={"grid grid-cols-2 gap-5 items-center m-2"}>
                        <div>Bandalphabet &Gamma; =</div>
                        <div>{kA}
                        {bandAlphabet.map((value, index) => (
                            <span key={index}>{value.value},</span>
                        ))}{kZ}
                        </div>
                    </div>
                    <div className={"grid grid-cols-2 gap-5 items-center m-2"}>
                        <div>Zustandsmenge Q = </div>
                        <div>{kA}
                        {zustandsmenge.map((value, index) => (
                            <span key={index}>{value.value},</span>
                        ))}{kZ}
                        </div>
                    </div>
                    <div className={"grid grid-cols-2 gap-5 items-center m-2"}>
                        <div>Anfangszustand q0 = {anfangsZustand.value} </div>
                        <Select
                            placeholder={anfangsZustand.value}
                            blurInputOnSelect={false}
                            className={""}
                            onChange={handleChange}
                            options={zustandsmenge} 
                        />
                    </div>
                    <div className={"grid grid-cols-2 gap-5 items-center m-2"}>
                        <div>
                            Endzustand F = {kA}
                            {endZustand.map((value, index) => (
                                <span key={index}>{value.value},</span>
                            ))}{kZ}
                        </div>
                        <Select
                            value={endZustand}
                            blurInputOnSelect={false}
                            className={""}
                            onChange={handleChangeMulti}
                            options={zustandsmenge} 
                            isMulti={true}
                        />
                    </div>
                    <div>
                        <div className={"grid grid-cols-2 gap-5 items-center m-2"}>
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