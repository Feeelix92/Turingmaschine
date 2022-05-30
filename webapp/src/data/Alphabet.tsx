export interface EingabelphabetOption {
    readonly label: string;
    readonly value: string;
}

export const eingabeAlphabetOptionen: readonly EingabelphabetOption[] = [
    { label: '1', value: '1'},
    { label: '0', value: '0' },
    { label: '#', value: '#' }
];

export interface Eingabelphabet{
    label: string;
    readonly value: string;
}

export const eingabeAlphabete: readonly Eingabelphabet[] = [
    { label: '{1, #}', value: '1,#'},
    { label: '{0, 1}', value: '0,1'},
    { label: '{0, 1, #}', value: '0,1,#'},
    { label: 'custom', value: 'custom'},
];

