export interface EingabelphabetOption {
    label: string;
    value: string;
    pointer: boolean;
}

/**
 * standard symbols for custom Eingabealphabet
 */
export const eingabeAlphabetOptionen: EingabelphabetOption[] = [
    {label: '1', value: '1', pointer: false},
    {label: '0', value: '0', pointer: false},
    {label: '#', value: '#', pointer: false}
];

export interface Eingabelphabet {
    label: string;
    value: string [];
}

/**
 * standard Eingabealphabete
 */
export const eingabeAlphabete: Eingabelphabet[] = [
    {label: 'erstellen', value: ['custom']},
    {label: '{1}', value: ['1']},
    {label: '{1,#}', value: ['1', '#']},
    {label: '{0,1}', value: ['0', '1']},
    {label: '{0,1,#}', value: ['0', '1', '#']},
];

export const initBand: EingabelphabetOption[] = [
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

