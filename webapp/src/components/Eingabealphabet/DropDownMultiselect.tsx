import React from 'react';
import CreatableSelect from 'react-select/creatable';
import {EingabeAlphabetOption} from "../../data/Alphabet";
import {ActionMeta, OnChangeValue} from 'react-select';
import {EingabeAlphabetCustomProp} from "../../interfaces/CommonInterfaces";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { alphabetPushToCustom, defaultAlphabetOption4 } from '../../redux/generalStore';

export default function MultiselectDropDown() {

    const currentAlphabet = useSelector((state: RootState) => state.general.currentAlphabet)
    const alphabetOptions = useSelector((state: RootState) => state.general.alphabetOptions)
    const customAlphabet = useSelector((state: RootState) => state.general.alphabetOptions)
    const dispatch = useDispatch()
    
    // valuesArray = current selected options as Array
    let valuesArray: string[] = [];
    // valuesString = current selected options as String to use it as label
    let valuesString = "";

    /**
     * function handleChange checks if the selected option has changed
     * @param newValues
     * @param actionMeta
     */
    function handleChange(
        newValues: OnChangeValue<EingabeAlphabetOption, true>,
        actionMeta: ActionMeta<EingabeAlphabetOption>,
    ) {
        console.group('Value Changed');
        console.log(newValues);
        
        // converting the object to an iteratable Array
        const optionsArray = Array.from(newValues.values());
        valuesArray = optionsArray.map(({value}) => value);
        valuesString = valuesArray.toString();
        
        console.log("valuesString: ",valuesString);
        console.log("valuesArray: ",valuesArray);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    }

    return (
        <div className={"col-span-2"}>
            <div className={""}>
                <h2>Eingabealphabet hinzufügen:</h2>
            </div>
            <div className={""}>
                <p>Sie können Zeichen eingeben oder Zeichen aus dem Standard-Eingabealphabet auswählen!</p>
                <div className={"text-lg p-3"}>
                    <CreatableSelect allowCreateWhileLoading={false} formatCreateLabel={inputValue => inputValue + " hinzufügen"}
                                     noOptionsMessage={() => 'Geben Sie neues Zeichen ein!'}
                                     placeholder={<p>Geben Sie ein beliebiges Zeichen ein...</p>}
                                     className={"text-black"}
                                     isMulti
                                     onChange={handleChange}
                                     options={defaultAlphabetOption4}
                                     onInputChange={inputValue =>
                                         (inputValue.length <= 1 ? inputValue : inputValue.substr(0, 1))
                                     }
                    />
                </div>
                <div className={""}>
                    <button onClick={() => {                        
                        valuesArray.forEach((value) =>{
                            dispatch(alphabetPushToCustom(value))
                        })
                        props.customSelect(false);
                    }} className={"primaryBtn col-start-3 col-span-2 m-2"}>speichern
                    </button>
                </div>
            </div>
        </div>
    );
}