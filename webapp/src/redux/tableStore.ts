import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { Direction, directions, Cell, RowProps, Row, Zustand } from '../interfaces/CommonInterfaces'
import { alphabetChangeCurrent } from './generalStore'

interface updateRowType {
  index: React.Key, 
  cells: Cell[]
}

interface updateCellType {
  cellIndex: React.Key, 
  rowIndex: React.Key,
  value: string | Zustand | Direction
}

export const initialZustand: Zustand = new Zustand("q1", "q1", true, false)

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
]

const initialRow: Row[] = [
  {
    cells: initialCell,
    isFinal: false,
  },
]

export const tableSlice = createSlice({
  name: 'table',
  initialState:{
    header: ["Zustand", "Lese", "Neuer Zustand", "Schreibe", "Gehe nach"],
    rows: initialRow
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
          { value: "0", editField: true },
          {
            value: new Direction(directions[0].value, directions[0].label),
            editField: false,
          },
        ],
        isFinal: false,
      });
  
      // update the rows in state with our new rows-array
      state.rows = newRows
    },
    tableDeleteRow: (state, i: PayloadAction<React.Key>) => {
      // create flat copy of all existing rows
      const newRows = state.rows.slice(0, state.rows.length);
  
      // delete element at index
      newRows.splice(i.payload as number, 1);
  
      // update the rows in state with our new rows-array
      state.rows = newRows
    },
    // tableUpdateRow: (state, updateRow: PayloadAction<updateRowType>) => {
    //   console.log("tableUpdateRow is called")
    //   // create flat copy of all existing rows
    //   const newRows: Row[] = state.rows.slice(0, state.rows.length) as Row[];
    //   // overwrite rows at certain index with new value
    //   newRows[updateRow.payload.index as number].cells = updateRow.payload.cells;

  
    //   if (updateRow.payload.cells[0].value instanceof Zustand) {
    //     if (updateRow.payload.cells[0].value.endzustand === true) {
    //       newRows[updateRow.payload.index as number].isFinal = true;
    //     } else {
    //       newRows[updateRow.payload.index as number].isFinal = false;
    //     }
    //   }  
    //   //update the rows in state with our new rows-array
    //   state.rows = newRows;
    // },
    tableUpdateCell: (state, updateCell: PayloadAction<updateCellType>) => {
      console.log("updateCell value: ", updateCell.payload)
      const newCells: Cell[] = state.rows[updateCell.payload.rowIndex as number].cells.slice(0, state.rows[updateCell.payload.rowIndex as number].cells.length);
      newCells[updateCell.payload.cellIndex as number].value = updateCell.payload.value
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
      console.log("!!!!!!!!!!",newRows)
      state.rows = newRows;
     
    } 
  },
})

// Action creators are generated for each case reducer function
export const { tableAddRow, tableDeleteRow, tableUpdateCell } = tableSlice.actions

export default tableSlice.reducer