import React from 'react';
import CreatableSelect from 'react-select/creatable';
import {EingabelphabetOption, eingabeAlphabetOptionen} from "../../data/Alphabet";
import {ActionMeta, OnChangeValue} from 'react-select';

function MultiselectDropDown(){
    function handleChange(
        newValue: OnChangeValue<EingabelphabetOption, true>,
        actionMeta: ActionMeta<EingabelphabetOption>
    ) {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    }
     return (
        <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 p-3 border rounded"}>
            <div className={""}>
                <h2 >Eingabealphabet hinzufügen:</h2>
            </div>
            <div className={""}>
                <p>Sie können Zeichen eingeben oder Zeichen aus dem Standard-Eingabealphabet auswählen!</p>
                <div className={"text-lg p-3"}>
                    <CreatableSelect allowCreateWhileLoading={false} formatCreateLabel={inputValue => inputValue + " hinzufügen"} noOptionsMessage={() => 'Geben Sie neues Zeichen ein!'}
                                     placeholder={<p>Eingabe...</p>} className={"text-black"}
                                     isMulti
                                     onChange={handleChange}
                                     options={eingabeAlphabetOptionen}
                                     onInputChange={inputValue =>
                                         (inputValue.length <= 1 ? inputValue : inputValue.substr(0, 1))
                                     }
                    />
                </div>
            </div>
        </div>
    );
}
export default MultiselectDropDown;