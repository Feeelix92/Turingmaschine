import React, {useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import {EingabeAlphabetOption} from "../../data/Alphabet";
import {ActionMeta, OnChangeValue} from 'react-select';
import {EingabeAlphabetCustomProp} from "../../interfaces/CommonInterfaces";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Alphabet, alphabetDeleteCustom, alphabetPushToCustom, alphabetPushToDialogOptions, defaultAlphabetOption4, EingabeAlphabet } from '../../redux/generalStore';
import { GiConsoleController } from 'react-icons/gi';

export default function MultiselectDropDown(props: EingabeAlphabetCustomProp) {
    const dispatch = useDispatch()
    
    // valuesArray = current selected options as Array
    let valuesArray: string[] = [];
    // valuesString = current selected options as String to use it as label
    let valuesString = "";

    const [placeholderText, setPlaceholderText] = useState(<p>Geben Sie ein beliebiges Zeichen ein...</p>);

    /**
     * function handleChange checks if the selected option has changed
     * @param newValues
     * @param actionMeta
     */
    function handleChange(
        newValues: OnChangeValue<EingabeAlphabet, true>,
        actionMeta: ActionMeta<EingabeAlphabet>,
    ) {
        console.group('Value Changed !!!!!!!!!!!');
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
                <p>Sie können Zeichen eingeben oder Zeichen aus den Standard-Eingabealphabeten auswählen!</p>
                <div className={"text-lg p-3"}>
                    <CreatableSelect allowCreateWhileLoading={false} formatCreateLabel={inputValue => inputValue + " hinzufügen"}
                                     noOptionsMessage={() => 'Geben Sie neues Zeichen ein!'}
                                     placeholder={placeholderText}
                                     className={"text-black"}
                                     isMulti
                                     onChange={handleChange}
                                     options={defaultAlphabetOption4.alphabet}
                                     onInputChange={inputValue =>
                                         (inputValue.length <= 1 ? inputValue : inputValue.substr(0, 1))
                                     }
                    />
                </div>
                <div className={""}>
                    <button onClick={() => {  
                        if(valuesArray.length > 0) {
                            dispatch(alphabetDeleteCustom())               
                            valuesArray.forEach((value) =>{
                                dispatch(alphabetPushToCustom(value))
                            })
                            dispatch(alphabetPushToDialogOptions(valuesArray.toString()))                            
                        }else{
                            alert("Ein leeres Alphabet ist nicht erlaubt!");                           
                        }             
                        props.onCloseDialog()           
                    }} className={"primaryBtn col-start-3 col-span-2 m-2"}>speichern
                    </button>
                </div>
            </div>
        </div>
    );
}
