import { Key } from "react";
import { EingabeAlphabet, EingabeAlphabetOption } from "../data/Alphabet";

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
  label: string;
  value: string;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
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
  alphabet: EingabeAlphabetOption[];
  deleteRow: () => void;
  updateRow: (index: Key, cells: Cell[]) => void;
  setFinal: (index: Key) => void;
}

export interface CellProps {
  value: string | Zustand | Direction;
  index: Key;
  alphabet: EingabeAlphabetOption[];
  showEditField: boolean;
  updateCellValue: (index: Key, arg: string | Zustand | Direction) => void;
}

export interface EditProps {
  options: EingabeAlphabetOption[];
  updateValue: (arg: string) => void;
}

export interface BandItemProps {
  value: string;
  index: number;
  skin: string;
  pointer: boolean;
  alphabet: EingabeAlphabetOption[];
  showEditField: boolean;
  setPointer: (index: Key, e: any) => void;
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
  new Direction("R", "Rechts"),
  new Direction("L", "Links"),
  new Direction("N", "Neutral"),
];

export const status: Zustand[] = [
  new Zustand("q1", "q1"),
  new Zustand("q2", "q2"),
  new Zustand("q3", "q3"),
];
