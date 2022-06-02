import {Key} from "react";
import {Eingabelphabet, EingabelphabetOption} from "../data/Alphabet";

export interface TableProps {
    header: string[];
    rows: Row[];
    alphabet: EingabelphabetOption[];
}

export interface Row {
    cells: Cell[];
}

export interface Cell {
    value: string;
    editField: boolean;
}

export interface RowProps {
    index: Key;
    cells: Cell[];
    alphabet: EingabelphabetOption[];
    deleteRow: () => void;
    updateRow: (index: Key, cells: Cell[]) => void;
}

export interface CellProps {
    value: string;
    index: Key;
    alphabet: EingabelphabetOption[];
    showEditField: boolean;
    updateCellValue: (index: Key, arg: string) => void;
}

export interface EditProps {
    options: EingabelphabetOption[];
    updateValue: (arg: string) => void;
}

export interface BandItemProps {
    value: string,
    index: number,
    skin: string,
    pointer: boolean,
    alphabet: EingabelphabetOption[];
    showEditField: boolean;
    changeItemAt: (index: Key, e: any) => void
}

export interface BandProps {
    alphabet: EingabelphabetOption[];
    currentBand: EingabelphabetOption[];
    skin: string
}

export interface EingabealphabetCustomProp {
    alphabet: Eingabelphabet[];
    customSelect: any;
}
