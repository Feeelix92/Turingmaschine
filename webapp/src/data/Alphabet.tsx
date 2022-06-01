export interface EingabelphabetOption {
    readonly label: string;
    readonly value: string;
  readonly pointer: boolean;
}

/**
 * standard symbols for custom Eingabealphabet
 */
export const eingabeAlphabetOptionen: readonly EingabelphabetOption[] = [
    {label: '1', value: '1', pointer: false},
    {label: '0', value: '0', pointer: false},
    {label: '#', value: '#', pointer: false}
];

export interface Eingabelphabet {
    label: string;
    readonly value: string [];
  readonly pointer: boolean;
}

/**
 * standard Eingabealphabete
 */
export const eingabeAlphabete: readonly Eingabelphabet[] = [
    {label: '{1, #}', value: ['1', '#']},
    {label: '{0, 1}', value: ['0', '1']},
    {label: '{0, 1, #}', value: ['0', '1', '#']},
    {label: 'custom', value: ['custom']},
];

export const initBand: EingabelphabetOption[] = [ 
  { value: "", label: "B", pointer: false},
  { value: "", label: "B", pointer: true},
  { value: "", label: "B", pointer: false},
  { value: "", label: "B", pointer: false},
  { value: "", label: "B", pointer: false},
  { value: "", label: "B", pointer: false},
  { value: "", label: "B", pointer: false},
  { value: "", label: "B", pointer: false},
  { value: "", label: "B", pointer: false},
  { value: "", label: "B", pointer: false},
];

