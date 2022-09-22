export interface EingabeAlphabetOption {
  pointer?: boolean;
  label: string;
  value: string;
  warningMode?: boolean;
}

/**
 * default symbols for Eingabealphabet
 */
export const eingabeAlphabetOptionen: EingabeAlphabetOption[] = [
  { label: "1", value: "1", warningMode: false },
  { label: "0", value: "0", warningMode: false },
  { label: "#", value: "#", warningMode: false },
];

export interface EingabeAlphabetDialog {
  label: string;
  value: string[];
  icon?: any;
}
