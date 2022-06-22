import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select, { OnChangeValue } from "react-select";
import { Direction, Zustand } from '../../interfaces/CommonInterfaces';
import { alphabetChangeAnfangszustand, alphabetChangeEndzustand, alphabetClearEndzustand, alphabetPushToZustand, alphabetDeleteZustand } from '../../redux/generalStore';
import { RootState } from '../../redux/store';
import DropDownSelect from "../Eingabealphabet/DropDownSelect";
import {BiCaretDown, BiCaretUp,} from "react-icons/all";

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
    const possibleEnd = useSelector((state: RootState) => state.general.zustandsmenge).filter(zustand => !zustand.anfangszustand)

    const dispatch = useDispatch()

    const kA = "{"
    const kZ = "}"

    /**
     * Accordion data (Title, Icons)
     */
    const accordionData = {
        title: <h2>Spezifikationen</h2>,
        openAccordion: <button className={"float-left"}><BiCaretDown/></button>,
        closeAccordion: <button className={"float-left"}><BiCaretUp/></button>,
    };
    const {title, openAccordion, closeAccordion} = accordionData;


    function handleChange(newValue: OnChangeValue<Zustand, false>) {
        if (newValue) {
            if (!newValue.endzustand) {
                const newAnfangszustand = new Zustand(newValue.label, newValue.value, true, false)
                dispatch(alphabetChangeAnfangszustand(newAnfangszustand))
            } else{
                const newAnfangszustand = new Zustand(newValue.label, newValue.value, true, false)
                dispatch(alphabetChangeAnfangszustand(newAnfangszustand))
                dispatch(alphabetClearEndzustand())
                alert("Bitt vergiss nicht deine Endzustandsmenge neu zu setzen!");
            }
        }
    }

    function handleChangeMulti(newValue: OnChangeValue<Zustand[], false>) {
        if(newValue){
            if (newValue.filter(zustand => !zustand.anfangszustand)) {
                console.log('Anfang', anfangsZustand, 'Ende', endZustand, 'Menge', zustandsmenge, 'newValue', newValue)
                    let temp: Zustand[] = [];
                    newValue.forEach(zustand => {
                        temp.push(new Zustand(zustand.value,zustand.label, zustand.anfangszustand, true))
                    });
                    dispatch(alphabetChangeEndzustand(temp))
            }
        }
    }

    const loadedRows = useSelector((state: RootState) => state.table.rows)
    const [zustandsFunktion] = useState([""])

    function getZustandsFunktion(){           
        if(zustandsFunktion.length<=1){
            zustandsFunktion.pop()
            let tempCellsString = "δ("
            let tempHelper = true;
            loadedRows.forEach(row => {
                row.cells.forEach(cell => {
                    if(cell.value instanceof Zustand){
                        tempCellsString = tempCellsString + cell.value.value + ","
                    }else if(cell.value instanceof Direction){
                        tempCellsString = tempCellsString + cell.value.value + ")"
                    }else{
                        if(tempHelper === true){
                            tempCellsString = tempCellsString + cell.value.toString() + ") = ("
                            tempHelper = false;
                        }else{
                            tempCellsString = tempCellsString + cell.value.toString() + ","
                            tempHelper = true;
                        }
                    }               
                })   
                zustandsFunktion.push(tempCellsString)       
                tempCellsString="δ("; 
            })
        }
        setShowZustandsfunktion(!showZustandsfunktion)           
    }

    return (
        <div className={"border-solid border rounded bg-white w-screen sm:w-3/4 lg:w-3/4 3xl:w-2/4 p-2 border rounded items-center hover:bg-gray-100 col-span-2 max-w-screen-sm"}>
            <div className={""} onClick={() => setIsActive(!isActive)}>
                <div className={"flex xl:grid xl:grid-cols-3 gap-5 items-center"}>
                    <span className={""}>{isActive ? closeAccordion : openAccordion}</span>
                    <span>{title}</span>
                </div>
            </div>
            {isActive &&
                <div className={""}>
                    <div>
                        <DropDownSelect/>
                    </div>
                    <div className={"flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"}>
                        <div className={"col-span-2"}>Bandalphabet &Gamma; =</div>
                        <div className={"border border-solid bg-gray-100 rounded p-2 col-span-2"}>{kA}
                            {bandAlphabet.map((value, index) => (
                                <span key={index}>{value.value},</span>
                            ))}{kZ}
                        </div>
                    </div>
                    <div className={"flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"}>
                        <div className={"col-span-2"}>Zustandsmenge Q =</div>
                        <div className={"border border-solid bg-gray-100 rounded p-2 break-all"}>{kA}
                            {zustandsmenge.map((value, index) => (
                                <span key={index}>{value.value}, </span>
                            ))}{kZ}</div>
                        <button className={"primaryBtn text-white font-bold py-1 px-2 rounded m-2 "} onClick={() => dispatch(alphabetPushToZustand())}>+</button>
                        <button className={"primaryBtn text-white font-bold py-1 px-2 rounded m-2 "} onClick={() => dispatch(alphabetDeleteZustand())}>-</button>
                    </div>
                    <div className={"flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"}>
                        <div className={"col-span-2"}>Anfangszustand q0 = {anfangsZustand.value} </div>
                        <Select
                            placeholder={anfangsZustand.value}
                            blurInputOnSelect={false}
                            className={"col-span-2"}
                            onChange={handleChange}
                            options={zustandsmenge}
                        />
                    </div>
                    <div className={"flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"}>
                        <div className={"col-span-2"}>
                            Endzustand F = {kA}
                            {endZustand.map((value, index) => (
                                <span key={index}>{value.value},</span>
                            ))}{kZ}
                        </div>
                        <Select
                            value={endZustand}
                            blurInputOnSelect={false}
                            className={"col-span-2"}
                            onChange={handleChangeMulti}
                            options={possibleEnd}
                            isMulti={true}
                        />
                    </div>
                    <div>
                        <div className={"flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"}>
                            <span className={"col-span-2"}>Zustandsüberführungsfunktion &delta; =</span>
                            <button className={"text-black bg-white hover:bg-gray-200 text-left border border-solid col-span-2"}
                                    onClick={() => getZustandsFunktion()}>{showZustandsfunktion ? 'close' : 'δ:Q×Γ → Q×Γ×{R,L,N}'}</button>
                                  
                        </div>
                        {showZustandsfunktion === true ? (
                        <div className='Test'>
                            {zustandsFunktion.map((value) => (
                                <p key={value}>{value}</p>
                            ))}
                        </div>
                        ) : (
                            ""
                        )}                        
                        
                    </div>
                </div>}
        </div>
    );
}

export default ConditionsList;