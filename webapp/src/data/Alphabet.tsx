import {CgAddR} from "react-icons/all";
import React from "react";

export interface EingabeAlphabet {
    label: string;
    value: string;
}

// /**
//  * default symbols for custom Eingabealphabet
//  */
// export const defaultInputEingabeAlphabet: EingabeAlphabet[] = [
//     {label: '1', value: '1'},
//     {label: '0', value: '0'},
//     {label: '#', value: '#'}
// ];

export interface EingabeAlphabetOption {
    label: string;
    value: string;
    pointer?: boolean;
}

/**
 * default symbols for Eingabealphabet
 */
export const eingabeAlphabetOptionen: EingabeAlphabetOption[] = [
    {label: '1', value: '1', pointer: false},
    {label: '0', value: '0', pointer: false},
    {label: '#', value: '#', pointer: false}
];

export interface EingabeAlphabetDialog {
    label: string;
    value: string [];
    icon?: any;
}

// /**
//  * default Eingabealphabete
//  */
// export const eingabeAlphabeteDialog: EingabeAlphabetDialog[] = [
//     {label: 'erstellen', value: ['custom'], icon: <CgAddR/>},
//     {label: '{1}', value: ['1']},
//     {label: '{1,#}', value: ['1', '#']},
//     {label: '{0,1}', value: ['0', '1']},
//     {label: '{0,1,#}', value: ['0', '1', '#']},
// ];

