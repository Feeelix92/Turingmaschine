import { Key } from "react";
import { Eingabelphabet, EingabelphabetOption } from "../data/Alphabet";

export interface TableProps {
  header: string[];
  rows: Row[];
  alphabet: EingabelphabetOption[];
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
  alphabet: EingabelphabetOption[];
  deleteRow: () => void;
  updateRow: (index: Key, cells: Cell[]) => void;
  setFinal: (index: Key) => void;
}

export interface CellProps {
  value: string | Zustand | Direction;
  index: Key;
  alphabet: EingabelphabetOption[];
  showEditField: boolean;
  updateCellValue: (index: Key, arg: string | Zustand | Direction) => void;
}

export interface EditProps {
  options: EingabelphabetOption[];
  updateValue: (arg: string) => void;
}

export interface BandItemProps {
  value: string;
  index: number;
  skin: string;
  pointer: boolean;
  alphabet: EingabelphabetOption[];
  showEditField: boolean;
  changeItemAt: (index: Key, e: any) => void;
  setPointer: (index: Key, e: any) => void;
  setPointerAt: () => void;
}

export interface BandProps {
  alphabet: EingabelphabetOption[];
  currentBand: EingabelphabetOption[];
  skin: string;
}

export interface EingabealphabetCustomProp {
  alphabet: Eingabelphabet[];
  customSelect: any;
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
