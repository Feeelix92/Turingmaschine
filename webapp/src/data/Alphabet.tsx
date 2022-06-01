export interface EingabelphabetOption {
    readonly label: string;
    readonly value: string;
}

/**
 * standard symbols for custom Eingabealphabet
 */
export const eingabeAlphabetOptionen: readonly EingabelphabetOption[] = [
    {label: '1', value: '1'},
    {label: '0', value: '0'},
    {label: '#', value: '#'}
];

export interface Eingabelphabet {
    label: string;
    readonly value: string [];
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

