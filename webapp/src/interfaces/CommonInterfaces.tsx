import { Key } from "react";
import { EingabeAlphabetOption } from "../data/Alphabet";

export interface TableProps {
  header: string[];
  rows: Row[];
  alphabet: EingabeAlphabetOption[];
}

export interface Row {
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
  warningModus: boolean;

  constructor(
    label: string,
    value: string,
    anfangszustand: boolean,
    endzustand: boolean,
    warningModus: boolean
  ) {
    this.label = label;
    this.value = value;
    this.anfangszustand = anfangszustand;
    this.endzustand = endzustand;
    this.warningModus = warningModus;
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
  updateCellValue: (index: Key, arg: string | Zustand | Direction) => void;
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
  pointer: boolean;
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

