export interface EingabelphabetOption {
  readonly value: string;
  readonly label: string;
  readonly pointer: boolean;
}

export const eingabeAlphabetOptionen: EingabelphabetOption[] = [
  { value: "1", label: "1", pointer: false },
  { value: "0", label: "0", pointer: false },
  { value: "#", label: "#", pointer: false },
];

export interface Eingabelphabet {
  readonly value: string[];
  readonly label: string;
  readonly pointer: boolean;
}

export const eingabeAlphabete: readonly Eingabelphabet[] = [
  { value: ["1", "#"], label: "{1, #}", pointer: false},
  { value: ["0", "1"], label: "{0, 1}" , pointer: false},
  { value: ["0", "1", "#"], label: "{0, 1, #}", pointer: false },
  { value: ["eigenes"], label: "eigenes", pointer: false },
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

