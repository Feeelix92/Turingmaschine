import React, {useState} from 'react'
import Select, {ActionMeta, OnChangeValue} from 'react-select'
import {eingabeAlphabete, Eingabelphabet} from "../../data/Alphabet";
import MultiselectDropDown from "./DropDownMultiselect";

function DropDownSelect()  {
    function handleChange (
        newValue: OnChangeValue<Eingabelphabet, false>,
        actionMeta: ActionMeta<Eingabelphabet>
    ) {
        console.group('Value Changed');
        console.log(newValue);
        if (newValue && newValue.value == 'custom'){
            console.log('YAY');
            setOpenDialog(true);
        }else{
            setOpenDialog(false);
        }
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();

    }

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 grid grid-cols-2 gap-2 items-center"}>
                <p className={"p-3"}>Eingabealphabet ∑ =</p>
                <Select placeholder={<p>wählen Sie Ihr Eingabealphabet...</p>}
                        blurInputOnSelect={false}
                        className={"text-black p-3 text-lg"}
                        onChange={handleChange}
                        options={eingabeAlphabete}
                />
            </div>
            {openDialog &&
                <>
                    <MultiselectDropDown />
                    <div className={"text-white font-bold text-lg "}>
                    {/*<button onClick={() => {*/}
                    {/*    setOpenDialog(false)}} className={"bg-red-600 hover:bg-red-800 col-start-1 col-span-2"}>abrechen</button>*/}
                    {/*/!*<button onClick={setOpenDialog(false)} className={"bg-green-600 hover:bg-green-800 col-start-3 col-span-2"}>speichern</button>*!/*/}
                    <button onClick={() => {
                        setOpenDialog(false)}} className={"bg-green-600 hover:bg-green-800 col-start-3 col-span-2"}>speichern</button>
                    </div>
                </>
            }
        </>
    );
}
export default DropDownSelect;
