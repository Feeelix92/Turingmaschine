import { current } from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Select, {ActionMeta, OnChangeValue} from 'react-select'
import { EingabeAlphabetDialog} from "../../data/Alphabet";
import { bandDeleteAll } from '../../redux/bandStore';
import { Alphabet, alphabetChangeCurrent, defaultAlphabetOption4, EingabeAlphabetDialogOptions, eingabeAlphabetDialogOptions } from '../../redux/generalStore';
import { RootState } from '../../redux/store';
import MultiselectDropDown from "./DropDownMultiselect";

export default function DropDownSelect() {
    const dialogOptions = useSelector((state: RootState) => state.general.dialogOptions)
    const currentDialogOption = useSelector((state: RootState) => state.general.currentDialogOption)
    const dispatch = useDispatch()
    /**
     * checks if Dialog opened or closed
     */
    const [openDialog, setOpenDialog] = useState(false);

    /**
     * copy of the currentDialogOption from state, to get the correct labels in Select
     */
    const [copiedCurrentDialogOption, setCopiedCurrentDialogOption] = useState({label: "", value: ""});
    useEffect(() => {
        setCopiedCurrentDialogOption({label: currentDialogOption.label, value: currentDialogOption.label})
    },[currentDialogOption])

    
    /**
     * function handleChange checks if the selected option has changed
     * @param newValue
     * @param actionMeta
     */
    function handleChange(
        newValue: OnChangeValue<EingabeAlphabetDialogOptions, false>,
        actionMeta: ActionMeta<EingabeAlphabetDialogOptions>
    ) {
        // setShowPlaceholder(false);
        console.group('Value Changed');
        console.log(newValue);
        if(newValue){
            if (newValue.alphabet.key !== 0) {
                dispatch(alphabetChangeCurrent(newValue.alphabet))
            }else{
                dispatch(alphabetChangeCurrent(newValue.alphabet))
                setOpenDialog(true)
            }
            dispatch(bandDeleteAll())
        }
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
            <Select value={copiedCurrentDialogOption}
                    blurInputOnSelect={false}
                    className={"text-black p-3 text-base"}
                    onChange={handleChange}
                    options={dialogOptions}
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
                    customSelect={true}
                    onCloseDialog={() => setOpenDialog(false)}/>
                </div>
            }
        </div>
    );
}
