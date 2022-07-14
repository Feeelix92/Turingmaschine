import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { EingabeAlphabetOption } from "../data/Alphabet";
import {
  Alphabet,
  Cell,
  ChangeWarningModus,
  Direction,
  directions,
  EingabeAlphabet,
  EingabeAlphabetDialogOptions,
  Row,
  updateCellType,
  Zustand,
} from "../interfaces/CommonInterfaces";

///////////////////// Zustandsmenge /////////////////////
const initialZustandsmenge: Zustand[] = [
  new Zustand("q1", "q1", true, false, false),
];
export const initialAnfangszustand: Zustand = initialZustandsmenge[0];
const initialEndZustandsmenge: Zustand[] = [];

///////////////////// BandAlphabet /////////////////////
const initialBandAlphabet: EingabeAlphabetOption[] = [
  { label: "1", value: "1", warningMode: false },
  { label: "", value: "B", warningMode: false },
];
const defaultCustomAlphabet: Alphabet = {
  key: 0,
  alphabet: [],
};
const defaultAlphabetOption1: Alphabet = {
  key: 1,
  alphabet: [{ label: "1", value: "1", warningMode: false }],
};
const defaultAlphabetOption2: Alphabet = {
  key: 2,
  alphabet: [
    { label: "1", value: "1", warningMode: false },
    { label: "#", value: "#", warningMode: false },
  ],
};
const defaultAlphabetOption3: Alphabet = {
  key: 3,
  alphabet: [
    { label: "1", value: "1", warningMode: false },
    { label: "0", value: "0", warningMode: false },
  ],
};
export const defaultAlphabetOption4: Alphabet = {
  key: 4,
  alphabet: [
    { label: "1", value: "1", warningMode: false },
    { label: "0", value: "0", warningMode: false },
    { label: "#", value: "#", warningMode: false },
  ],
};

///////////////////// DialogOption /////////////////////
const initialDialogOption: EingabeAlphabetDialogOptions = {
  label: "{1}",
  alphabet: defaultAlphabetOption1,
};
export const eingabeAlphabetDialogOptions: EingabeAlphabetDialogOptions[] = [
  { label: "erstellen", alphabet: defaultCustomAlphabet, icon: true },
  { label: "{1}", alphabet: defaultAlphabetOption1 },
  { label: "{1,#}", alphabet: defaultAlphabetOption2 },
  { label: "{0,1}", alphabet: defaultAlphabetOption3 },
  { label: "{0,1,#}", alphabet: defaultAlphabetOption4 },
];

///////////////////// Table /////////////////////
export const initialZustand3: Zustand = new Zustand(
  "erstellen",
  "erstellen",
  false,
  false,
  false
);

const watchedRows: Row[] = [];

export const initialCell: Cell[] = [
  {
    value: initialZustandsmenge[0],
    editField: false,
    warningMode: false,
  },
  { value: "1", editField: true, warningMode: false },
  {
    value: initialZustandsmenge[0],
    editField: false,
    warningMode: false,
  },
  { value: "1", editField: true, warningMode: false },
  {
    value: new Direction(directions[0].value, directions[0].label),
    editField: false,
    warningMode: false,
  },
];
// const initialRow: Row[] = [
//   {
//     cells: initialCell,
//     isFinal: false,
//   },
// ];
const initialRow: Row[] = [];

let activeRow: Row | undefined;

const activeState: Zustand | undefined = initialZustandsmenge[0];

///////////////////// Other /////////////////////
let customKey = 5;

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    //// Zustand ////
    zustandsmenge: initialZustandsmenge,
    anfangsZustand: initialAnfangszustand,
    endZustand: initialEndZustandsmenge,
    //// Alphabet ////
    currentAlphabet: defaultAlphabetOption1,
    bandAlphabet: initialBandAlphabet,
    customAlphabet: defaultCustomAlphabet,
    //// Dialog ////
    dialogOptions: eingabeAlphabetDialogOptions,
    currentDialogOption: initialDialogOption,
    //// Maschine ////
    pauseMaschine: false,
    stoppMaschine: false,
    executable: false,
    //// Table ////
    header: ["Zustand", "Lese", "Neuer Zustand", "Schreibe", "Gehe nach"],
    rows: initialRow,
    activeRow: activeRow,
    watchedRows: watchedRows,
    activeState: activeState,
  },
  reducers: {
    ///////////////////// Alphabet /////////////////////
    /**
     * function alphabetChangeCurrent changes current Alphabet
     */
    alphabetChangeCurrent: (state, alphabet: PayloadAction<Alphabet>) => {
      state.dialogOptions.forEach((option) => {
        if (option.alphabet.key === alphabet.payload.key) {
          state.currentAlphabet.alphabet = option.alphabet.alphabet;
          state.currentDialogOption = option;
        }
      });
      let tempAlphabet = Object.assign([], alphabet.payload.alphabet);
      tempAlphabet.push({ value: "B", label: "", warningMode: false });
      state.bandAlphabet = tempAlphabet;
    },
    /**
     * function alphabetPushToCustom pushes a new Value to the customAlphabet
     * @param value
     */
    alphabetPushToCustom: (state, value: PayloadAction<string>) => {
      state.customAlphabet.alphabet.push({
        value: value.payload,
        label: value.payload,
        warningMode: false,
      });
    },
    /**
     * function alphabetDeleteCustom deletes the customAlphabet
     * @param value
     */
    alphabetDeleteCustom: (state) => {
      state.customAlphabet.alphabet = [];
    },

    ///////////////////// Dialog /////////////////////
    alphabetPushToDialogOptions: (state, optionName: PayloadAction<string>) => {
      state.customAlphabet.key = customKey;
      state.dialogOptions.push({
        label: `{${optionName.payload}}`,
        alphabet: state.customAlphabet,
      });
      state.currentAlphabet = state.customAlphabet;
      state.dialogOptions.forEach((option) => {
        if (option.alphabet.key === state.customAlphabet.key) {
          state.currentDialogOption = option;
        }
      });
      customKey++;
    },

    ///////////////////// Zustand /////////////////////
    /**
     * function alphabetDeleteCustom deletes the customAlphabet
     * @param value
     */
    alphabetPushToZustand: (state) => {
      let tempNumber = state.zustandsmenge.length + 1;
      state.zustandsmenge.push(
        new Zustand("q" + tempNumber, "q" + tempNumber, false, false, false)
      );

      if (state.zustandsmenge.length === 1) {
        state.activeState = state.zustandsmenge[0];
      }
    },
    alphabetDeleteZustand: (state) => {
      state.zustandsmenge.pop();

      if (state.zustandsmenge.length <= 0) {
        state.activeState = undefined;
      }
    },
    alphabetChangeAnfangszustand: (state, zustand: PayloadAction<Zustand>) => {
      state.zustandsmenge.forEach((option) => {
        if (option.value === zustand.payload.value) {
          option.anfangszustand = true;
          option.endzustand = false;
        } else {
          option.anfangszustand = false;
        }
      });
      state.anfangsZustand = zustand.payload;
      state.activeState = zustand.payload;
    },
    alphabetChangeEndzustand: (state, zustand: PayloadAction<Zustand[]>) => {
      console.log(zustand.payload);
      state.endZustand = zustand.payload;

      state.zustandsmenge.forEach((option) => {
        const result = state.endZustand.some((value) => {
          return value.value === option.value;
        });

        if (result) {
          option.endzustand = true;
        } else {
          option.endzustand = false;
        }
      });

      console.log(current(state));
    },
    alphabetClearEndzustand: (state) => {
      state.zustandsmenge.forEach((option) => {
        option.endzustand = false;
      });
      state.endZustand = [];
    },

    ///////////////////// Maschine /////////////////////
    alphabetChangePauseMaschine: (state, value: PayloadAction<boolean>) => {
      state.pauseMaschine = value.payload;
    },
    alphabetChangeStoppMaschine: (state, value: PayloadAction<boolean>) => {
      state.stoppMaschine = value.payload;
    },
    maschineChangeExecutable: (state, value: PayloadAction<boolean>) => {
      console.log(value.payload)
      state.executable = value.payload;
    },
    maschineCheckExecutable: (state) => {
      if(state.rows.length === 0 || state.endZustand.length === 0 ){
        state.executable = false
      } else{
        state.executable = true
      }
      
    },

    ///////////////////// Table /////////////////////
    tableAddRow: (state) => {
      // create flat copy of all existing rows
      const newRows = state.rows.slice(0, state.rows.length);

      console.log(current(state));

      // add new row to existing rows
      newRows.push({
        cells: [
          {
            value: new Zustand(
              state.zustandsmenge[0].label,
              state.zustandsmenge[0].value,
              state.zustandsmenge[0].anfangszustand,
              state.zustandsmenge[0].endzustand,
              state.zustandsmenge[0].warningMode
            ),
            editField: false,
            warningMode: false,
          },
          { value: "1", editField: true, warningMode: false },
          {
            value: new Zustand(
              state.zustandsmenge[0].label,
              state.zustandsmenge[0].value,
              state.zustandsmenge[0].anfangszustand,
              state.zustandsmenge[0].endzustand,
              state.zustandsmenge[0].warningMode
            ),
            editField: false,
            warningMode: false,
          },
          { value: "1", editField: true, warningMode: false },
          {
            value: new Direction(directions[0].value, directions[0].label),
            editField: false,
            warningMode: false,
          },
        ],
        isFinal: false,
      });

      console.log(newRows);

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

      if (typeof updateCell.payload.value === "boolean") {
        newCells[updateCell.payload.cellIndex as number].warningMode =
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
      } else {
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
      }
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

    ///////////////////// Other /////////////////////
    alphabetChangeWarningMode: (
      state,
      warningValue: PayloadAction<ChangeWarningModus>
    ) => {
      switch (warningValue.payload.prop) {        
        case "anfangsZustand":
          state.anfangsZustand.warningMode = warningValue.payload.value;
          break;
        case "endZustand":
          state.endZustand = warningValue.payload.payload as Zustand[];
          break;
        default:
          console.log("ERROR in alphabetChangeWarningMode");
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  alphabetChangeCurrent,
  alphabetPushToCustom,
  alphabetPushToDialogOptions,
  alphabetDeleteCustom,
  alphabetPushToZustand,
  alphabetChangeAnfangszustand,
  alphabetChangeEndzustand,
  alphabetClearEndzustand,
  alphabetDeleteZustand,
  alphabetChangePauseMaschine,
  alphabetChangeStoppMaschine,
  maschineChangeExecutable,
  maschineCheckExecutable,
  alphabetChangeWarningMode,
  tableAddRow,
  tableDeleteRow,
  tableUpdateCell,
  tableSetActiveRow,
  tableSetWatchedRows,
  tableSetActiveState,
} = generalSlice.actions;

export default generalSlice.reducer;
