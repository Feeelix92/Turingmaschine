import React, {useEffect, useState} from 'react'
import { CgAddR } from 'react-icons/cg';
import { useSelector, useDispatch } from 'react-redux';
import Select, {ActionMeta, OnChangeValue} from 'react-select'
import { bandDeleteAll } from '../../redux/bandStore';
import {alphabetChangeCurrent,  EingabeAlphabetDialogOptions } from '../../redux/generalStore';
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
        console.group('Value Changed');
        console.log(newValue);
        if(newValue){
            if (newValue.alphabet.key !== 0) {
                dispatch(alphabetChangeCurrent(newValue.alphabet))
                setOpenDialog(false)
            }else{
                dispatch(alphabetChangeCurrent(newValue.alphabet))
                setOpenDialog(true)
            }
            dispatch(bandDeleteAll())
        }
        console.groupEnd();
    }
    return (
        <div className={"grid grid-cols-3 gap-5 items-center m-2"}>
            <p className={"col-span-2 text-left"}>Eingabealphabet ∑ =</p>
            <Select value={copiedCurrentDialogOption}
                    blurInputOnSelect={false}
                    className={""}
                    onChange={handleChange}
                    options={dialogOptions}
                    // @ts-ignore
                    getOptionLabel={e => (
                        <div className={"flex items-center place-content-start"}>
                            {e.icon ? (
                               <CgAddR/>
                            ) : (
                                ""
                            )}
                            <span className={"m-2"}>{e.label}</span>
                        </div>
                    )}
            />
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
