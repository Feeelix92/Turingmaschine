import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Select, {ActionMeta, OnChangeValue} from 'react-select'
import {EingabeAlphabet, EingabeAlphabetDialog} from "../../data/Alphabet";
import { bandDeleteAll } from '../../redux/bandStore';
import { alphabetChangeCurrent, eingabeAlphabetDialogOptions } from '../../redux/generalStore';
import { RootState } from '../../redux/store';
import MultiselectDropDown from "./DropDownMultiselect";

interface EingabeAlphabetDialogOptions {
    label: string;
    value: string;
    icon?: any
}

export default function DropDownSelect() {
    const currentBand = useSelector((state: RootState) => state.band.currentBand)
    const currentAlphabet = useSelector((state: RootState) => state.general.currentAlphabet)
    const alphabetOptions = useSelector((state: RootState) => state.general.alphabetOptions)
    const dispatch = useDispatch()
    /**
     * checks if Dialog opened or closed
     */
    const [openDialog, setOpenDialog] = useState(false);
    // const [showPlaceholder, setShowPlaceholder] = useState(true);

    const [selectedOption, setSelectedOption] = useState<EingabeAlphabet[]>(currentAlphabet);
   

    /**
     * checks if Button on DropDownMultiselect is clicked
     * @param data
     */
    // const customSelect = (data: any) => {
    //     setOpenDialog(data);
    //     setSelectedOption(currentAlphabet[currentAlphabet.length - 1])
    // }

    
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
            if (newValue.value !== '0') {
                dispatch(alphabetChangeCurrent(newValue?.value))
                setSelectedOption(newValue)
                dispatch(bandDeleteAll())
            }else{
                setOpenDialog(true)
            }
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
            <Select value={selectedOption}
                    blurInputOnSelect={false}
                    className={"text-black p-3 text-base"}
                    onChange={handleChange}
                    options={eingabeAlphabetDialogOptions}
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
                    <MultiselectDropDown customSelect={true}/>
                </div>
            }
        </div>
    );
}
