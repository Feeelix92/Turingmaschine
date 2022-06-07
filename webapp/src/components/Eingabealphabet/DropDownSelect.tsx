import React, {useState} from 'react'
import Select, {ActionMeta, OnChangeValue} from 'react-select'
import {EingabeAlphabet, eingabeAlphabete, eingabeAlphabetOptionen} from "../../data/Alphabet";
import MultiselectDropDown from "./DropDownMultiselect";

export default function DropDownSelect() {
    /**
     * To check if Dialog opened or closed
     */
    const [openDialog, setOpenDialog] = useState(false);

    const customSelect = (data: any) => {
        setOpenDialog(data);
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
        console.group('Value Changed');
        console.log(newValue);
        if (!(newValue && newValue.value[0] == 'custom')) {
            setOpenDialog(false);
        } else {
            setOpenDialog(true);
        }
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();

    }

    return (
        <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 grid grid-cols-2 gap-2 items-center"}>
            <p className={"p-3"}>Eingabealphabet ∑ =</p>
            <Select placeholder={<p className={"text-gray-500"}>Bitte wählen</p>}
                    blurInputOnSelect={false}
                    className={"text-black p-3 text-base"}
                    onChange={handleChange}
                    options={eingabeAlphabete}
            />
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
