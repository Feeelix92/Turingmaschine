import React, {useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import {defaultInputEingabeAlphabet, EingabeAlphabetOption} from "../../data/Alphabet";
import {ActionMeta, OnChangeValue} from 'react-select';
import {EingabeAlphabetCustomProp} from "../../interfaces/CommonInterfaces";

export default function MultiselectDropDown(props: EingabeAlphabetCustomProp) {
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
        newValues: OnChangeValue<EingabeAlphabetOption, true>,
        actionMeta: ActionMeta<EingabeAlphabetOption>,
    ) {
        console.group('Value Changed');
        console.log(newValues);
        // converting the object to an iteratable Array
        const optionsArray = Array.from(newValues.values());
        valuesArray = optionsArray.map(({value}) => value);
        valuesString = valuesArray.toString();
        console.log(valuesString);
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
                                     placeholder={placeholderText}
                                     className={"text-black"}
                                     isMulti
                                     onChange={handleChange}
                                     options={defaultInputEingabeAlphabet}
                                     onInputChange={inputValue =>
                                         (inputValue.length <= 1 ? inputValue : inputValue.substr(0, 1))
                                     }
                    />
                </div>
                <div className={""}>
                    <button onClick={() => {
                        if(valuesArray.length > 0) {
                            props.alphabet.push({label: "{" + valuesString + "}", value: valuesArray});
                            props.alphabetOptions.length = 0;
                            valuesArray.forEach((value) => {
                                props.alphabetOptions.push({label: value, value: value});
                            })
                            props.customSelect(false);
                        }else{
                            setPlaceholderText(<p className={"text-red-600"}>Sie müssen mindestens ein Zeichen eingeben!</p>);
                        }
                    }} className={"primaryBtn col-start-3 col-span-2 m-2"}>speichern
                    </button>
                </div>
            </div>
        </div>
    );
}