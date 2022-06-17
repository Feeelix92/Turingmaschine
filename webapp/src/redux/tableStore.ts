import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { Zustand, Direction, directions, Cell, status } from '../interfaces/CommonInterfaces'
import { alphabetChangeCurrent } from './generalStore'

interface updateRowType {
  i: React.Key, 
  cells: Cell[]
}

export const tableSlice = createSlice({
  name: 'table',
  initialState:{
    header: ["Zustand", "Lese", "Neuer Zustand", "Schreibe", "Gehe nach"],
    rows: [
      {
        cells: [
          {
            value: new Zustand(status[0].value, status[0].label),
            editField: false,
          },
          { value: "1", editField: true },
          {
            value: new Zustand(status[0].value, status[0].label),
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
  },
  reducers: {  
    tableAddRow: (state) => {
      // create flat copy of all existing rows
      const newRows = state.rows.slice(0, state.rows.length);
  
      // add new row to existing rows
      newRows.push({
        cells: [
          {
            value: new Zustand(status[0].value, status[0].label),
            editField: false,
          },
          { value: "1", editField: true },
          {
            value: new Zustand(status[0].value, status[0].label),
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
      const newRows = state.rows.slice(0, state.rows.length);
  
      // overwrite rows at certain index with new value
      newRows[updateRow.payload.i as number].cells = updateRow.payload.cells;
  
      // update the rows in state with our new rows-array
      state.rows = newRows
    },
    tableSetFinal: (state, i: PayloadAction<React.Key>) => {
      // create flat copy of all existing rows
      const newRows = state.rows.slice(0, state.rows.length);
  
      // overwrite rows at certain index with new value
      newRows[i.payload as number].isFinal = !newRows[i.payload as number].isFinal;
  
      if (newRows[i.payload as number].isFinal) {
        alert("Als Finalzustand markiert!");
      } else {
        alert("Finalzustand entfernt!");
      }
  
      // update the rows in state with our new rows-array
      state.rows = newRows  
    }  
    
  },
})

// Action creators are generated for each case reducer function
export const { tableAddRow, tableDeleteRow, tableUpdateRow, tableSetFinal } = tableSlice.actions

export default tableSlice.reducer