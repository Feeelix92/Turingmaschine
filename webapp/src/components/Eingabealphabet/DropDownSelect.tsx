import React, {useState} from 'react'
import Select, {ActionMeta, OnChangeValue} from 'react-select'
import {Eingabelphabet, eingabeAlphabete} from "../../data/Alphabet";
import MultiselectDropDown from "./DropDownMultiselect";

function DropDownSelect()  {
    /**
     * To check if Dialog opened or closed
     */
    const [openDialog, setOpenDialog] = useState(false);

    /**
     * function handleChange checks if the selected option has changed
     * @param newValue
     * @param actionMeta
     */
    function handleChange (
        newValue: OnChangeValue<Eingabelphabet, false>,
        actionMeta: ActionMeta<Eingabelphabet>
    ) {
        console.group('Value Changed');
        console.log(newValue);
        if (newValue && newValue.value == 'eigenes'){
            setOpenDialog(true);
        }else{
            setOpenDialog(false);
        }
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    }

    return (
        <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 grid grid-cols-2 gap-2 items-center"}>
            <p className={"p-3"}>Eingabealphabet ∑ =</p>
            <Select placeholder={<p>wählen Sie Ihr Eingabealphabet...</p>}
                    blurInputOnSelect={false}
                    className={"text-black p-3 text-lg"}
                    onChange={handleChange}
                    options={eingabeAlphabete}
            />
            {openDialog &&
            <div className={"text-white text-lg col-span-2"}>
                <MultiselectDropDown />
                <div className={""}>
                    <button onClick={() => {
                        setOpenDialog(false)}} className={"bg-green-600 hover:bg-green-800 col-start-3 col-span-2 m-2"}>speichern</button>
                </div>
            </div>
            }
        </div>
    );
}
export default DropDownSelect;
