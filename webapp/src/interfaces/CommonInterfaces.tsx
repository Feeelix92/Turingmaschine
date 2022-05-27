import { Key } from "react";
import { EingabelphabetOption } from "../data/Alphabet";

export interface TableProps {
  header: string[];
  rows: any[];
}

export interface RowProps {
  index: Key;
  cells: string[];
  deleteRow: () => void;
  updateRow: (index: Key, cells: string[]) => void;
}

export interface CellProps {
  value: string;
  index: Key;
  // showEdit: boolean;
  // options: EingabelphabetOption[];
  updateCellValue: (index: Key, arg: string) => void;
}

export interface EditProps {
  options: EingabelphabetOption[];
  updateValue: (arg: string) => void;
}
