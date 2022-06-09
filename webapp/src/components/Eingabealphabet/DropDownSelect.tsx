import React, {useState} from 'react'
import Select, {ActionMeta, OnChangeValue} from 'react-select'
import {currentBand, EingabeAlphabet, eingabeAlphabete, eingabeAlphabetOptionen} from "../../data/Alphabet";
import MultiselectDropDown from "./DropDownMultiselect";

export default function DropDownSelect() {
    /**
     * checks if Dialog opened or closed
     */
    const [openDialog, setOpenDialog] = useState(false);
    // const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [selectedOption, setSelectedOption] = useState(eingabeAlphabete[1]);
    /**
     * checks if Button on DropDownMultiselect is clicked
     * @param data
     */
    const customSelect = (data: any) => {
        setOpenDialog(data);
        setSelectedOption(eingabeAlphabete[eingabeAlphabete.length - 1])
    }
    /**
     * function handleChange checks if the selected option has changed
     * @param newValue
     * @param actionMeta
     */
    function handleChange(
        newValue: OnChangeValue<EingabeAlphabet, false>,
        actionMeta: ActionMeta<EingabeAlphabet>
    ) {
        // setShowPlaceholder(false);
        console.group('Value Changed');
        console.log(newValue);
        if (newValue) {
            setSelectedOption(newValue);
            eingabeAlphabetOptionen.length = 0;
            newValue.value.forEach((value) => {
                if (value != 'custom') {
                    setOpenDialog(false);                  
                    eingabeAlphabetOptionen.push({label: value, value: value});                    
                } else {
                    setOpenDialog(true);
                }                
            })
            for(let i = 0; i < currentBand.length; i++){                  
                currentBand[i] = {value: "", label: "B", pointer: currentBand[i].pointer}         
            }
            console.log(currentBand)
        }
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();

    }
    return (
        <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 grid grid-cols-2 gap-2 items-center"}>
            <p className={"p-3"}>Eingabealphabet ∑ =</p>
            {/*{showPlaceholder &&*/}
            {/*    <Select placeholder={<p className={"text-gray-500"}>Bitte wählen</p>}*/}
            {/*            blurInputOnSelect={false}*/}
            {/*            className={"text-black p-3 text-base"}*/}
            {/*            onChange={handleChange}*/}
            {/*            options={eingabeAlphabete}*/}
            {/*    />*/}
            {/*}*/}
            {/*{!showPlaceholder &&*/}
            <Select value={selectedOption}
                    blurInputOnSelect={false}
                    className={"text-black p-3 text-base"}
                    onChange={handleChange}
                    options={eingabeAlphabete}
                    // @ts-ignore
                    getOptionLabel={e => (
                        <div className={"flex items-center place-content-start"}>
                            {e.icon}
                            <span className={"m-2"}>{e.label}</span>
                        </div>
                    )}
            />
            {/*}*/}
            {openDialog &&
                <div className={"text-white text-lg col-span-2"}>
                    <MultiselectDropDown
                        alphabet={eingabeAlphabete}
                        alphabetOptions={eingabeAlphabetOptionen}
                        customSelect={customSelect}
                    />
                </div>
            }
        </div>
    );
}
