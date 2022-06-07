export interface DefaultInputEingabeAlphabet {
    label: string;
    value: string;
}

/**
 * default symbols for custom Eingabealphabet
 */
export const defaultInputEingabeAlphabet: DefaultInputEingabeAlphabet[] = [
    {label: '1', value: '1'},
    {label: '0', value: '0'},
    {label: '#', value: '#'}
];

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

export interface EingabeAlphabet {
    label: string;
    value: string [];
}

/**
 * default Eingabealphabete
 */
export const eingabeAlphabete: EingabeAlphabet[] = [
    {label: 'erstellen', value: ['custom']},
    {label: '{1}', value: ['1']},
    {label: '{1,#}', value: ['1', '#']},
    {label: '{0,1}', value: ['0', '1']},
    {label: '{0,1,#}', value: ['0', '1', '#']},
];

export const initBand: EingabeAlphabetOption[] = [
    {value: "", label: "B", pointer: false},
    {value: "", label: "B", pointer: true},
    {value: "", label: "B", pointer: false},
    {value: "", label: "B", pointer: false},
    {value: "", label: "B", pointer: false},
    {value: "", label: "B", pointer: false},
    {value: "", label: "B", pointer: false},
    {value: "", label: "B", pointer: false},
    {value: "", label: "B", pointer: false},
    {value: "", label: "B", pointer: false},
];

