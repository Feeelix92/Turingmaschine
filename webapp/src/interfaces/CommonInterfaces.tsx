import { EingabelphabetOption } from "../data/Alphabet";

export interface TableProps {
  header: string[];
  rows: any[];
}

export interface RowProps {
  cells: string[];
}

export interface CellProps {
  value: string | number;
  showEdit: boolean;
  options: EingabelphabetOption[];
}

export interface EditProps {
  options: EingabelphabetOption[];
  updateValue: (arg: string) => void;
}
