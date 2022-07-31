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
}

export class Zustand {
  value: string;
  label: string;
  anfangszustand: boolean;
  endzustand: boolean;
  warningMode: boolean;

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
  label: string;
  value: string;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }
}

export interface RowProps {
  index: Key;
  cells: Cell[];
  isFinal: boolean;
  deleteRow: () => void;
}

export interface CellProps {
  value: string | Zustand | Direction;
  index: Key;
  showEditField: boolean;
  updateCellValue: (
    index: Key,
    arg: string | boolean | Zustand | Direction
  ) => void;
}

export interface EditProps {
  options: EingabeAlphabetOption[];
  updateValue: (arg: string) => void;
}

export interface BandItemProps {
  value: string;
  label: string;
  index: number;
  //skin: string;
  //pointer: boolean;
  alphabet: EingabeAlphabetOption[];
  showEditField: boolean;
  //setPointer: (index: Key, e: any) => void;
  setPointerAt: () => void;
  //movePointer: (arg: number) => void;
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
  new Direction("R", "Rechts"),
  new Direction("L", "Links"),
  new Direction("N", "Neutral"),
];

export interface ZustandSelectProps {
  states: Zustand[];
  current: Zustand;
  updateValue: (arg: Zustand) => void;
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
}

export interface CodeEditorProps {
  toggleEditor: () => void;
}
