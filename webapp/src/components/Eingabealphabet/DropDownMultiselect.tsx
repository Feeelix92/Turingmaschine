import React, {Component} from 'react';

import CreatableSelect from 'react-select/creatable';
import {EingabelphabetOption, eingabeAlphabetOptionen} from "../../data/Alphabet";
import {ActionMeta, OnChangeValue} from 'react-select';

export default class CreatableMulti extends Component<{}> {
    handleChange = (
        newValue: OnChangeValue<EingabelphabetOption, true>,
        actionMeta: ActionMeta<EingabelphabetOption>
    ) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    render() {
        return (
            <CreatableSelect allowCreateWhileLoading={false} formatCreateLabel={inputValue => inputValue + " hinzufügen"} noOptionsMessage={() => 'Geben Sie neues Zeichen ein!'}
                             placeholder={<p>Eingabe...</p>} className={"text-black p-3 px-5"}
                             isMulti
                             onChange={this.handleChange}
                             options={eingabeAlphabetOptionen}
            />
        );
    }
}