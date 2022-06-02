import React from 'react';
import CreatableSelect from 'react-select/creatable';
import {EingabelphabetOption, eingabeAlphabetOptionen} from "../../data/Alphabet";
import {ActionMeta, OnChangeValue} from 'react-select';
import {EingabealphabetCustomProp} from "../../interfaces/CommonInterfaces";

export default function MultiselectDropDown(props: EingabealphabetCustomProp) {
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
        newValues: OnChangeValue<EingabelphabetOption, true>,
        actionMeta: ActionMeta<EingabelphabetOption>,
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
                                     placeholder={<p>Geben Sie ein beliebiges Zeichen ein...</p>}
                                     className={"text-black"}
                                     isMulti
                                     onChange={handleChange}
                                     options={eingabeAlphabetOptionen}
                                     onInputChange={inputValue =>
                                         (inputValue.length <= 1 ? inputValue : inputValue.substr(0, 1))
                                     }
                    />
                </div>
                <div className={""}>
                    <button onClick={() => {
                        props.alphabet.push({label: "{" + valuesString + "}", value: valuesArray});
                        props.customSelect(false);
                    }} className={"bg-green-600 hover:bg-green-800 col-start-3 col-span-2 m-2"}>speichern
                    </button>
                </div>
            </div>
        </div>
    );
}