import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { Zustand, Direction, directions, Cell, status, RowProps, Row } from '../interfaces/CommonInterfaces'
import { alphabetChangeCurrent } from './generalStore'

interface updateRowType {
  index: React.Key, 
  cells: Cell[]
}

interface updateCellType {
  index: React.Key, 
  value: string | Zustand | Direction
}

const initialRow: Row[] = [
  {
    cells: [
      {
        value: new Zustand(
          status[0].value,
          status[0].label,
          status[0].isFinal
        ),
        editField: false,
      },
      { value: "1", editField: true },
      {
        value: new Zustand(
          status[0].value,
          status[0].label,
          status[0].isFinal
        ),
        editField: false,
      },
      { value: "0", editField: true },
      {
        value: new Direction(directions[0].value, directions[0].label),
        editField: false,
      },
    ],
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
            value: new Zustand(status[0].value, status[0].label, status[0].isFinal),
            editField: false,
          },
          { value: "1", editField: true },
          {
            value: new Zustand(status[0].value, status[0].label, status[0].isFinal),
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
    tableUpdateRow: (state, updateRow: PayloadAction<updateRowType>) => {
      // create flat copy of all existing rows
      const newRows: Row[] = state.rows.slice(0, state.rows.length) as Row[];
      console.log("!!!!!!!!!!!!!!!",newRows)
      // overwrite rows at certain index with new value
      newRows[updateRow.payload.index as number].cells = updateRow.payload.cells;

  
      if (updateRow.payload.cells[0].value instanceof Zustand) {
        if (updateRow.payload.cells[0].value.isFinal === true) {
          newRows[updateRow.payload.index as number].isFinal = true;
        } else {
          newRows[updateRow.payload.index as number].isFinal = false;
        }
      }  
      // update the rows in state with our new rows-array
      state.rows = newRows;
    },
    tableUpdateCell: (state, updateCell: PayloadAction<updateCellType>) => {
      console.log("haofaoifhawf", updateCell)
      const newCell: Cell[] = state.rows[0].cells
      console.log("haofaoiesgshgshsfhawf", newCell)
      newCell[updateCell.payload.index as number].value = updateCell.payload.value
      tableUpdateRow({index: updateCell.payload.index, cells: newCell as Cell[]})
    } 
  },
})

// Action creators are generated for each case reducer function
export const { tableAddRow, tableDeleteRow, tableUpdateRow, tableUpdateCell } = tableSlice.actions

export default tableSlice.reducer