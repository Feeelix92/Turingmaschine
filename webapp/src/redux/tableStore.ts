import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Direction,
  directions,
  Cell,
  Row,
  Zustand,
} from "../interfaces/CommonInterfaces";

interface updateCellType {
  cellIndex: React.Key;
  rowIndex: React.Key;
  value: string | Zustand | Direction;
}

// export const initialZustand: Zustand = new Zustand("q1", "q1", true, false);

// export const initialCell: Cell[] = [
//   {
//     value: initialZustand,
//     editField: false,
//   },
//   { value: "1", editField: true },
//   {
//     value: initialZustand,
//     editField: false,
//   },
//   { value: "1", editField: true },
//   {
//     value: new Direction(directions[0].value, directions[0].label),
//     editField: false,
//   },
// ];

// const initialRow: Row[] = [
//   {
//     cells: initialCell,
//     isFinal: false,
//   },
// ];

export const initialZustand: Zustand = new Zustand("q1", "q1", true, false, false);
export const initialZustand2: Zustand = new Zustand("q2", "q2", false, true, false);
export const initialZustand3: Zustand = new Zustand(
  "erstellen",
  "erstellen",
  false,
  false, false
);

export const initialCell: Cell[] = [
  {
    value: initialZustand,
    editField: false,
  },
  { value: "1", editField: true },
  {
    value: initialZustand,
    editField: false,
  },
  { value: "0", editField: true },
  {
    value: new Direction(directions[0].value, directions[0].label),
    editField: false,
  },
];
export const initialCell2: Cell[] = [
  {
    value: initialZustand,
    editField: false,
  },
  { value: "0", editField: true },
  {
    value: initialZustand,
    editField: false,
  },
  { value: "1", editField: true },
  {
    value: new Direction(directions[0].value, directions[0].label),
    editField: false,
  },
];
export const initialCell3: Cell[] = [
  {
    value: initialZustand,
    editField: false,
  },
  { value: "B", editField: true },
  {
    value: initialZustand2,
    editField: false,
  },
  { value: "B", editField: true },
  {
    value: new Direction(directions[2].value, directions[2].label),
    editField: false,
  },
];
export const initialCell4: Cell[] = [
  {
    value: initialZustand2,
    editField: false,
  },
  { value: "B", editField: true },
  {
    value: initialZustand,
    editField: false,
  },
  { value: "B", editField: true },
  {
    value: new Direction(directions[0].value, directions[0].label),
    editField: false,
  },
];

const initialRow: Row[] = [
  {
    cells: initialCell,
    isFinal: false,
  },
  {
    cells: initialCell2,
    isFinal: false,
  },
  {
    cells: initialCell3,
    isFinal: false,
  },
  {
    cells: initialCell4,
    isFinal: true,
  },
];

const activeRow: Row | undefined = undefined

const watchedRows: Row[] = [];

const activeState: Zustand = new Zustand("q1", "q1", true, false, false);

export const tableSlice = createSlice({
  name: "table",
  initialState: {
    header: ["Zustand", "Lese", "Neuer Zustand", "Schreibe", "Gehe nach"],
    rows: initialRow,
    activeRow: activeRow,
    watchedRows: watchedRows,
    activeState: activeState,
  },
  reducers: {
    tableAddRow: (state) => {
      // create flat copy of all existing rows
      const newRows = state.rows.slice(0, state.rows.length);

      // add new row to existing rows
      newRows.push({
        cells: [
          {
            value: initialZustand,
            editField: false,
          },
          { value: "1", editField: true },
          {
            value: initialZustand,
            editField: false,
          },
          { value: "1", editField: true },
          {
            value: new Direction(directions[0].value, directions[0].label),
            editField: false,
          },
        ],
        isFinal: false,
      });

      // update the rows in state with our new rows-array
      state.rows = newRows;
    },
    tableDeleteRow: (state, i: PayloadAction<React.Key>) => {
      // create flat copy of all existing rows
      const newRows = state.rows.slice(0, state.rows.length);

      // delete element at index
      newRows.splice(i.payload as number, 1);

      // update the rows in state with our new rows-array
      state.rows = newRows;
    },
    tableUpdateCell: (state, updateCell: PayloadAction<updateCellType>) => {
      const newCells: Cell[] = state.rows[
        updateCell.payload.rowIndex as number
      ].cells.slice(
        0,
        state.rows[updateCell.payload.rowIndex as number].cells.length
      );
      newCells[updateCell.payload.cellIndex as number].value =
        updateCell.payload.value;
      // tableUpdateRow({index: updateCell.payload.index, cells: newCells})

      const newRows: Row[] = state.rows.slice(0, state.rows.length) as Row[];
      // overwrite rows at certain index with new value
      newRows[updateCell.payload.rowIndex as number].cells = newCells;

      if (newCells[0].value instanceof Zustand) {
        if (newCells[0].value.endzustand === true) {
          newRows[updateCell.payload.rowIndex as number].isFinal = true;
        } else {
          newRows[updateCell.payload.rowIndex as number].isFinal = false;
        }
      }
      //update the rows in state with our new rows-array
      state.rows = newRows;
    },
    tableSetActiveRow: (state, row: PayloadAction<Row | undefined>) => {
      state.activeRow = row.payload;
    },
    tableSetWatchedRows: (state, rows: PayloadAction<Row[]>) => {
      state.watchedRows = rows.payload;
    },
    tableSetActiveState: (state, newVal: PayloadAction<Zustand>) => {
      state.activeState = newVal.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  tableAddRow,
  tableDeleteRow,
  tableUpdateCell,
  tableSetActiveRow,
  tableSetWatchedRows,
  tableSetActiveState,
} = tableSlice.actions;

export default tableSlice.reducer;
