export interface EingabelphabetOption {
  readonly value: string;
  readonly label: string;
}

export const eingabeAlphabetOptionen: EingabelphabetOption[] = [
  { value: "1", label: "1" },
  { value: "0", label: "0" },
  { value: "#", label: "#" },
];

export interface Eingabelphabet {
  readonly value: string[];
  readonly label: string;
}

export const eingabeAlphabete: readonly Eingabelphabet[] = [
  { value: ["1", "#"], label: "{1, #}" },
  { value: ["0", "1"], label: "{0, 1}" },
  { value: ["0", "1", "#"], label: "{0, 1, #}" },
  { value: ["eigenes"], label: "eigenes" },
];
