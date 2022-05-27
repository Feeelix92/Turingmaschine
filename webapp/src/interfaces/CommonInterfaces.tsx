import { Key } from "react";
import { EingabelphabetOption } from "../data/Alphabet";

export interface TableProps {
  header: string[];
  rows: any[];
  alphabet: EingabelphabetOption[];
}

export interface RowProps {
  index: Key;
  cells: string[];
  alphabet: EingabelphabetOption[];
  deleteRow: () => void;
  updateRow: (index: Key, cells: string[]) => void;
}

export interface CellProps {
  value: string;
  index: Key;
  alphabet: EingabelphabetOption[];
  updateCellValue: (index: Key, arg: string) => void;
}

export interface EditProps {
  options: EingabelphabetOption[];
  updateValue: (arg: string) => void;
}
