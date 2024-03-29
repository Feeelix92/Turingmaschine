import { Key } from "react";
import { EingabeAlphabetOption } from "../data/Alphabet";

export interface TableProps {
  header: string[];
  rows: RowInterface[];
  alphabet: EingabeAlphabetOption[];
}

export interface RowInterface {
  cells: Cell[];
  isFinal: boolean;
}

export interface Cell {
  value: string | Zustand | Direction;
  editField: boolean;
  warningMode: boolean;
}

export class Zustand {
  value: string;
  label: string;
  anfangszustand: boolean;
  endzustand: boolean;
  warningMode: boolean;
  icon?: any;

  constructor(
    label: string,
    value: string,
    anfangszustand: boolean,
    endzustand: boolean,
    warningMode: boolean
  ) {
    this.label = label;
    this.value = value;
    this.anfangszustand = anfangszustand;
    this.endzustand = endzustand;
    this.warningMode = warningMode;
  }
}

export class Direction {
  value: string;
  label: string;

  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
}

export interface RowProps {
  index: Key;
  cells: Cell[];
  isFinal: boolean;
  deleteRow: () => void;
}

export interface tableRowToAdd {
  zustand: string;
  lese: string;
  neuerZustand: string;
  schreibe: string;
  gehe: string;
}

export interface CellProps {
  value: string | Zustand | Direction;
  index: Key;
  rowIndex: Key;
  showEditField: boolean;
  warningMode: boolean;
}

export interface EditProps {
  options: EingabeAlphabetOption[];
  updateValue: (arg: string) => void;
}

export interface BandItemProps {
  value: string;
  label: string;
  index: number;
  bandIndex: number;
  pointer?: boolean;
  alphabet: EingabeAlphabetOption[];
  showEditField: boolean;
  setPointerAt: () => void;
}

export interface BandProps {
  alphabet: EingabeAlphabetOption[];
  currentBand: EingabeAlphabetOption[];
  skin: string;
}

export interface EingabeAlphabetCustomProp {
  customSelect: any;
  onCloseDialog: () => void;
}

export const directions: Direction[] = [
  new Direction("R", "R"),
  new Direction("L", "L"),
  new Direction("N", "N"),
];

export interface ZustandSelectProps {
  states: Zustand[];
  current: Zustand;
  updateValue: (arg: Zustand) => void;
}

export interface ExampleSelectProps {
  examples: CodeExample[];
}

export interface EingabeAlphabetDialogOptions {
  label: string;
  alphabet: Alphabet;
  icon?: boolean;
}

export interface Alphabet {
  key: number;
  alphabet: EingabeAlphabet[];
}

export interface EingabeAlphabet {
  label: string;
  value: string;
  warningMode: boolean;
}

export interface ChangeWarningModus {
  prop: string;
  value: boolean;
  payload?:
    | Alphabet
    | Zustand
    | Zustand[]
    | EingabeAlphabet[]
    | EingabeAlphabetDialogOptions[];
}
export interface updateCellType {
  cellIndex: React.Key;
  rowIndex: React.Key;
  value: string | boolean | Zustand | Direction;
  warningMode?: boolean;
}

export interface CodeEditorProps {
  toggleEditor: () => void;
  checkIfOpen: (arg0: boolean) => void;
}

export interface MespumaChangeAlphabet {
  cartesian: string[];
  alphabet?: Alphabet;
}

export interface checkWarning {
  rows: RowInterface[];
  alphabet: string[];
}

export class OperationType {
  value: string;
  label: string;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }
}

export interface CodeExample {
  value: string;
  label: string;
  type: "normal" | "mespuma";
}
