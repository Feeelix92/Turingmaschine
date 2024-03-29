import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Alphabet,
  Cell,
  ChangeWarningModus,
  checkWarning,
  Direction,
  directions,
  EingabeAlphabet,
  EingabeAlphabetDialogOptions,
  MespumaChangeAlphabet,
  RowInterface,
  tableRowToAdd,
  updateCellType,
  Zustand,
} from "../interfaces/CommonInterfaces";
import { cartesianProduct } from "../interfaces/CommonFunctions";
import * as React from "react";

///////////////////// Zustandsmenge /////////////////////
const initialZustandsmenge: Zustand[] = [
  new Zustand("q1", "q1", true, false, false),
];
export const initialAnfangszustand: Zustand = initialZustandsmenge[0];
const initialEndZustandsmenge: Zustand[] = [];

///////////////////// BandAlphabet /////////////////////
const initialBandAlphabet: EingabeAlphabet[] = [
  { label: "1", value: "1", warningMode: false },
  { label: "ß", value: "ß", warningMode: false },
];
const initialTeepeeBandAlphabet: EingabeAlphabet[] = [
  { label: "\u26AA", value: "1", warningMode: false },
  { label: "\u26AB", value: "#", warningMode: false },
  { label: "\u2205", value: "ß", warningMode: false },
];
const defaultCustomAlphabet: Alphabet = {
  key: 0,
  alphabet: [],
};
export const defaultAlphabetOption1: Alphabet = {
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
    { label: "0", value: "0", warningMode: false },
    { label: "1", value: "1", warningMode: false },
  ],
};
export const defaultAlphabetOption4: Alphabet = {
  key: 4,
  alphabet: [
    { label: "0", value: "0", warningMode: false },
    { label: "1", value: "1", warningMode: false },
    { label: "#", value: "#", warningMode: false },
  ],
};

///////////////////// DialogOption /////////////////////
const initialDialogOption: EingabeAlphabetDialogOptions = {
  label: "{1}",
  alphabet: defaultAlphabetOption1,
};
export const eingabeAlphabetDialogOptions: EingabeAlphabetDialogOptions[] = [
  { label: "ß", alphabet: defaultCustomAlphabet, icon: true },
  { label: "{1}", alphabet: defaultAlphabetOption1 },
  { label: "{1,#}", alphabet: defaultAlphabetOption2 },
  { label: "{0,1}", alphabet: defaultAlphabetOption3 },
  { label: "{0,1,#}", alphabet: defaultAlphabetOption4 },
];

///////////////////// Table /////////////////////
export const initialZustand3: Zustand = new Zustand(
  "+",
  "+",
  false,
  false,
  false
);

const watchedRows: RowInterface[] = [];

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

// eine Variable für alle modu:
const initialMode: String = "default";

// Anzahl Spuren:
const initialanzahlSpuren: number = 2;

//// Zustandsmenge
const initialZustandsmengeTP: Zustand[] = [
  new Zustand("1", "q1", true, false, false),
  new Zustand("2", "q2", false, false, false),
  new Zustand("3", "q3", false, false, false),
  new Zustand("4", "q4", false, false, false),
  new Zustand("5", "q5", false, true, false),
  new Zustand("6", "q6", false, false, false),
];

export const initialAnfangszustandTP: Zustand = initialZustandsmengeTP[0];
const initialEndZustandsmengeTP: Zustand[] = [initialZustandsmengeTP[4]];

//Cells for TP Mode
export const initialCellTP: Cell[] = [
  //1
  {
    value: initialZustandsmengeTP[0],
    editField: false,

    warningMode: false,
  },
  { value: "1", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[0],
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
export const initialCellTP2: Cell[] = [
  //2
  {
    value: initialZustandsmengeTP[0],
    editField: false,
    warningMode: false,
  },
  { value: "#", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[1],
    editField: false,
    warningMode: false,
  },
  { value: "#", editField: true, warningMode: false },
  {
    value: new Direction(directions[0].value, directions[0].label),
    editField: false,
    warningMode: false,
  },
];
export const initialCellTP3: Cell[] = [
  //3
  {
    value: initialZustandsmengeTP[1],
    editField: false,
    warningMode: false,
  },
  { value: "1", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[2],
    editField: false,
    warningMode: false,
  },
  { value: "#", editField: true, warningMode: false },
  {
    value: new Direction(directions[1].value, directions[1].label),
    editField: false,
    warningMode: false,
  },
];
export const initialCellTP4: Cell[] = [
  //4
  {
    value: initialZustandsmengeTP[1],
    editField: false,
    warningMode: false,
  },
  { value: "ß", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[3],
    editField: false,
    warningMode: false,
  },
  { value: "ß", editField: true, warningMode: false },
  {
    value: new Direction(directions[1].value, directions[1].label),
    editField: false,
    warningMode: false,
  },
];
export const initialCellTP5: Cell[] = [
  //5
  {
    value: initialZustandsmengeTP[2],
    editField: false,
    warningMode: false,
  },
  { value: "#", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[0],
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
export const initialCellTP6: Cell[] = [
  //6
  {
    value: initialZustandsmengeTP[3],
    editField: false,
    warningMode: false,
  },
  { value: "1", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[3],
    editField: false,
    warningMode: false,
  },
  { value: "1", editField: true, warningMode: false },
  {
    value: new Direction(directions[1].value, directions[1].label),
    editField: false,
    warningMode: false,
  },
];
export const initialCellTP7: Cell[] = [
  //7
  {
    value: initialZustandsmengeTP[3],
    editField: false,
    warningMode: false,
  },
  { value: "#", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[3],
    editField: false,
    warningMode: false,
  },
  { value: "ß", editField: true, warningMode: false },
  {
    value: new Direction(directions[1].value, directions[1].label),
    editField: false,
    warningMode: false,
  },
];
export const initialCellTP8: Cell[] = [
  //8
  {
    value: initialZustandsmengeTP[3],
    editField: false,
    warningMode: false,
  },
  { value: "ß", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[4],
    editField: false,
    warningMode: false,
  },
  { value: "ß", editField: true, warningMode: false },
  {
    value: new Direction(directions[0].value, directions[0].label),
    editField: false,
    warningMode: false,
  },
];
export const initialCellTP9: Cell[] = [
  //9
  {
    value: initialZustandsmengeTP[4],
    editField: false,
    warningMode: false,
  },
  { value: "ß", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[4],
    editField: false,
    warningMode: false,
  },
  { value: "ß", editField: true, warningMode: false },
  {
    value: new Direction(directions[0].value, directions[0].label),
    editField: false,
    warningMode: false,
  },
];

//Rows wechsel
const initialRowTP: RowInterface[] = [
  {
    cells: initialCellTP,
    isFinal: false,
  },
  {
    cells: initialCellTP2,
    isFinal: false,
  },
  {
    cells: initialCellTP3,
    isFinal: false,
  },
  {
    cells: initialCellTP4,
    isFinal: false,
  },
  {
    cells: initialCellTP5,
    isFinal: false,
  },
  {
    cells: initialCellTP6,
    isFinal: false,
  },
  {
    cells: initialCellTP7,
    isFinal: false,
  },
  {
    cells: initialCellTP8,
    isFinal: false,
  },
  {
    cells: initialCellTP9,
    isFinal: true,
  },
];

//Rows
const initialRow: RowInterface[] = [];
let activeRow: RowInterface | undefined;

const activeState: Zustand | undefined = initialZustandsmenge[0];

///////////////////// Other /////////////////////
let customKey = 5;

const initialSliderNumber = 4;

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
    rows: initialRow,
    activeRow: activeRow,
    watchedRows: watchedRows,
    activeState: activeState,
    // Mode für alle:
    mode: initialMode,
    //// Mehrspurenmaschine ////
    anzahlSpuren: initialanzahlSpuren,
    sliderNumber: initialSliderNumber,
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
      let tempAlphabet = Object.assign(
        [],
        alphabet.payload.alphabet
      ) as EingabeAlphabet[];
      tempAlphabet.push({ value: "ß", label: "ß", warningMode: false });

      state.bandAlphabet = tempAlphabet;
    },
    /**
     * function alphabetChangeCurrentMespuma changes current Alphabet in MespumaMode
     */
    alphabetChangeCurrentMespuma: (
      state,
      data: PayloadAction<MespumaChangeAlphabet>
    ) => {
      if (data.payload.alphabet) {
        state.dialogOptions.forEach((option) => {
          if (data.payload.alphabet) {
            if (option.alphabet.key === data.payload.alphabet.key) {
              state.currentAlphabet.alphabet = option.alphabet.alphabet;
              state.currentDialogOption = option;
            }
          }
        });
      }

      let tupelArray: EingabeAlphabet[] = [];

      data.payload.cartesian.forEach((literal) => {
        tupelArray.push({
          value: literal,
          label: literal,
          warningMode: false,
        });
      });

      state.currentAlphabet.alphabet.forEach((element) => {
        tupelArray.push(element);
      });

      tupelArray.push({ value: "ß", label: "ß", warningMode: false });

      state.bandAlphabet = tupelArray;
    },
    /**
     * function alphabetPushToCustom pushes a new Value to the customAlphabet
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
     */
    alphabetDeleteCustom: (state) => {
      state.customAlphabet.alphabet = [];
    },
    /**
     * function alphabetGenerateBand creates a new Band from String Array
     * primary used by CodeEditor & ExampleSelect
     */
    alphabetGenerateBand: (state, alphabet: PayloadAction<string[]>) => {
      let finalArray: EingabeAlphabet[] = [];
      alphabet.payload.forEach((literal) => {
        finalArray.push({
          value: literal,
          label: literal,
          warningMode: false,
        });
      });
      finalArray.push({ value: "ß", label: "ß", warningMode: false });
      state.bandAlphabet = finalArray;
    },

    ///////////////////// Dialog /////////////////////
    /**
     * function alphabetPushToDialogOptions pushes a new Alphabet to the Options in Eingabealphabet Select
     */
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
     * function alphabetPushToZustand adds a new Zustand
     */
    alphabetPushToZustand: (
      state,
      payload: PayloadAction<Zustand | undefined>
    ) => {
      let states = state.zustandsmenge.slice(0, state.zustandsmenge.length);
      if (!payload.payload) {
        let tempNumber = state.zustandsmenge.length + 1;
        states.push(
          new Zustand("q" + tempNumber, "q" + tempNumber, false, false, false)
        );
      } else {
        states.push(payload.payload);
      }

      if (states.length === 1) {
        state.activeState = states[0];
      }

      state.zustandsmenge = states;
    },
    /**
     * function alphabetPushToIdxZustand adds a new Zustand with a unique Name
     * primary used by CodeEditor & ExampleSelect
     */
    alphabetPushToIdxZustand: (state, zustandsName: PayloadAction<string>) => {
      state.zustandsmenge.forEach((value, index) => {
        if (value.value === zustandsName.payload) {
          state.zustandsmenge.splice(index, 1);
        }
      });

      state.zustandsmenge.push(
        new Zustand(
          zustandsName.payload,
          zustandsName.payload,
          false,
          false,
          false
        )
      );

      if (state.zustandsmenge.length === 1) {
        state.activeState = state.zustandsmenge[0];
      }
    },
    /**
     * function alphabetDeleteZustand deletes the last Zustand
     */
    alphabetDeleteZustand: (state) => {
      if (state.zustandsmenge.length > 1) {
        // Es muss immer mindestens ein Zustand vorhanden sein
        state.zustandsmenge.pop();
      }
      if (state.zustandsmenge.length <= 0) {
        let stateCopy = state.activeState;
        state.activeState = stateCopy;
      }
    },
    /**
     * function alphabetClearZustand deletes whole Zustandsmenge
     * primary used by CodeEditor & ExampleSelect
     */
    alphabetClearZustand: (state) => {
      state.zustandsmenge = [];
    },
    /**
     * function alphabetChangeAnfangszustand changes state.anfangszustand
     */
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
    /**
     * function alphabetChangeAnfangszustand changes state.endZustand
     */
    alphabetChangeEndzustand: (state, zustand: PayloadAction<Zustand[]>) => {
      state.endZustand = zustand.payload;

      state.zustandsmenge.forEach((option) => {
        const result = state.endZustand.some((value) => {
          return value.value === option.value;
        });
        option.endzustand = !!result;
      });
    },
    /**
     * function alphabetClearEndzustand deletes everything from state.endZustand
     */
    alphabetClearEndzustand: (state) => {
      state.zustandsmenge.forEach((option) => {
        option.endzustand = false;
      });
      state.endZustand = [];
    },

    ///////////////////// Maschine /////////////////////
    /**
     * function alphabetChangePauseMaschine changes state.pauseMaschine
     */
    alphabetChangePauseMaschine: (state, value: PayloadAction<boolean>) => {
      state.pauseMaschine = value.payload;
    },
    /**
     * function alphabetChangeStoppMaschine changes state.stoppMaschine
     */
    alphabetChangeStoppMaschine: (state, value: PayloadAction<boolean>) => {
      state.stoppMaschine = value.payload;
      state.activeRow = activeRow;
    },
    /**
     * function maschineChangeExecutable changes state.executable
     */
    maschineChangeExecutable: (state, value: PayloadAction<boolean>) => {
      state.executable = value.payload;
    },
    /**
     * function maschineChangeExecutable checks if Maschine is executable
     * no warnings = executable
     */
    maschineCheckExecutable: (state) => {
      if (state.rows.length === 0) {
        state.executable = false;
      } else {
        let danger = false;

        state.rows.forEach((row) => {
          row.cells.forEach((cell) => {
            if (cell.warningMode === true) {
              danger = true;
            }
          });
        });

        if (state.anfangsZustand.warningMode === true) {
          danger = true;
        }

        state.endZustand.forEach((state) => {
          if (state.warningMode === true) {
            danger = true;
          }
        });

        if (danger === false) {
          state.executable = true;
        } else {
          state.executable = false;
        }
      }
    },
    /**
     * function maschineSetSlider changes state.sliderNumber to specific number
     */
    maschineSetSlider: (state, value: PayloadAction<number>) => {
      state.sliderNumber = value.payload;
    },
    /**
     * function maschineSliderIncreaseNumber changes state.sliderNumber + 1
     */
    maschineSliderIncreaseNumber: (state) => {
      let val = state.sliderNumber;
      if (val < 100) {
        val = val + 1;
        state.sliderNumber = val;
      }
    },
    /**
     * function maschineSliderDecreaseNumber changes state.sliderNumber - 1
     */
    maschineSliderDecreaseNumber: (state) => {
      let val = state.sliderNumber;
      if (val > 1) {
        val = val - 1;
        state.sliderNumber = val;
      }
    },
    ///////////////////// Table /////////////////////
    /**
     * function tableAddRow adds a new empty Row to the table
     */
    tableAddRow: (state) => {
      // create flat copy of all existing rows
      const newRows = state.rows.slice(0, state.rows.length);

      // add new row to existing rows
      if (state.mode === "mespuma") {
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
            {
              value: state.bandAlphabet[0].value,
              editField: false,
              warningMode: false,
            },
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
            {
              value: state.bandAlphabet[0].value,
              editField: false,
              warningMode: false,
            },
            {
              value: new Direction(directions[0].value, directions[0].label),
              editField: false,
              warningMode: false,
            },
          ],
          isFinal: false,
        });
      } else {
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
            {
              value: state.bandAlphabet[0].value,
              editField: true,
              warningMode: false,
            },
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
            {
              value: state.bandAlphabet[0].value,
              editField: true,
              warningMode: false,
            },
            {
              value: new Direction(directions[0].value, directions[0].label),
              editField: false,
              warningMode: false,
            },
          ],
          isFinal: false,
        });
      }

      // update the rows in state with our new rows-array
      state.rows = newRows;
    },
    /**
     * function tableAddEditorRow adds a new empty Row to the table from JSON
     * primary used by CodeEditor & ExampleSelect
     */
    tableAddEditorRow: (state, zustandToAdd: PayloadAction<tableRowToAdd>) => {
      // create flat copy of all existing rows
      const newRows = state.rows.slice(0, state.rows.length);

      // add new row to existing rows

      let tempAnfangszustand = false;
      let tempEndzustand = false;

      let newTempAnfangszustand = false;
      let newTempEndzustand = false;

      if (zustandToAdd.payload.zustand === state.anfangsZustand.value) {
        tempAnfangszustand = true;
      }
      if (zustandToAdd.payload.neuerZustand === state.anfangsZustand.value) {
        newTempAnfangszustand = true;
      }
      if (
        state.endZustand.find(
          (element) => element.value === zustandToAdd.payload.zustand
        ) !== undefined
      ) {
        tempEndzustand = true;
      }
      if (
        state.endZustand.find(
          (element) => element.value === zustandToAdd.payload.neuerZustand
        ) !== undefined
      ) {
        newTempEndzustand = true;
      }

      newRows.push({
        cells: [
          {
            value: new Zustand(
              zustandToAdd.payload.zustand,
              zustandToAdd.payload.zustand,
              tempAnfangszustand,
              tempEndzustand,
              false
            ),
            editField: false,
            warningMode: false,
          },
          {
            value: zustandToAdd.payload.lese,
            editField: true,
            warningMode: false,
          },
          {
            value: new Zustand(
              zustandToAdd.payload.neuerZustand,
              zustandToAdd.payload.neuerZustand,
              newTempAnfangszustand,
              newTempEndzustand,
              false
            ),
            editField: false,
            warningMode: false,
          },
          {
            value: zustandToAdd.payload.schreibe,
            editField: true,
            warningMode: false,
          },
          {
            value: new Direction(
              zustandToAdd.payload.gehe,
              zustandToAdd.payload.gehe
            ),
            editField: false,
            warningMode: false,
          },
        ],
        isFinal: tempEndzustand,
      });

      // update the rows in state with our new rows-array
      state.rows = newRows;
    },
    /**
     * function tableDeleteRow deletes a row from the table
     */
    tableDeleteRow: (state, i: PayloadAction<React.Key>) => {
      // create flat copy of all existing rows
      const newRows = state.rows.slice(0, state.rows.length);

      // delete element at index
      newRows.splice(i.payload as number, 1);

      // update the rows in state with our new rows-array
      state.rows = newRows;
    },
    /**
     * function tableDeleteAll deletes whole table
     */
    tableDeleteAll: (state) => {
      state.rows = initialRow;
    },
    /**
     * function tableUpdateCell changes the value of a cell
     */
    tableUpdateCell: (state, updateCell: PayloadAction<updateCellType>) => {
      if (state.rows.length > 0) {
        const newCells: Cell[] = state.rows[
          updateCell.payload.rowIndex as number
        ].cells.slice(
          0,
          state.rows[updateCell.payload.rowIndex as number].cells.length
        );

        if (typeof updateCell.payload.value !== "boolean") {
          newCells[updateCell.payload.cellIndex as number].value =
            updateCell.payload.value;
          if (updateCell.payload.warningMode !== undefined) {
            newCells[updateCell.payload.cellIndex as number].warningMode =
              updateCell.payload.warningMode;
          }
        }
        const newRows: RowInterface[] = state.rows.slice(
          0,
          state.rows.length
        ) as RowInterface[];
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
    /**
     * function tableUpdateRowIsFinal changes isFinal prop at Row
     */
    tableUpdateRowIsFinal: (state, newValue: PayloadAction<updateCellType>) => {
      const newRows: RowInterface[] = state.rows.slice(
        0,
        state.rows.length
      ) as RowInterface[];

      if (newValue.payload.cellIndex === 0 && newRows.length > 0) {
        newRows[newValue.payload.rowIndex as number].isFinal = newValue.payload
          .value as boolean;
      }
    },
    /**
     * function tableSetActiveRow changes state.activeRow
     */
    tableSetActiveRow: (
      state,
      row: PayloadAction<RowInterface | undefined>
    ) => {
      state.activeRow = row.payload;
    },
    /**
     * function tableSetWatchedRows changes state.watchedRows
     */
    tableSetWatchedRows: (state, rows: PayloadAction<RowInterface[]>) => {
      state.watchedRows = rows.payload;
    },
    /**
     * function tableSetActiveState changes state.activeState
     */
    tableSetActiveState: (state, newVal: PayloadAction<Zustand>) => {
      state.activeState = newVal.payload;
    },
    /**
     * function tableCheckWarning checkes if table is filled correctly
     */
    tableCheckWarning: (state, checkVal: PayloadAction<checkWarning>) => {
      // create flat copy of all existing rows
      const newRows = checkVal.payload.rows;
      const copy = state.rows.slice(0, state.rows.length);

      newRows.forEach((row, rowIndex) => {
        row.cells.forEach((cell, cellIndex) => {
          if (cell.value instanceof Zustand) {
            let tempBool = state.zustandsmenge.some((value) => {
              let newState = cell.value as Zustand;
              return value.value === newState.value;
            });
            if (!tempBool) {
              maschineChangeExecutable(false);
              copy[rowIndex].cells[cellIndex].warningMode = true;
            } else {
              maschineChangeExecutable(true);
              copy[rowIndex].cells[cellIndex].warningMode = false;
            }
          } else if (!(cell.value instanceof Direction)) {
            let tempBool: boolean;
            if (state.mode === "mespuma") {
              let checkCellValue: string | string[];
              let temp = cell.value.substring(1, cell.value.length - 1);
              checkCellValue = temp.split(",");
              tempBool = checkVal.payload.alphabet.some((value) => {
                return (
                  value[0] === checkCellValue[0] &&
                  value[1] === checkCellValue[1]
                );
              });
            } else {
              tempBool = checkVal.payload.alphabet.some((value) => {
                return value === cell.value;
              });
            }

            if (!tempBool) {
              maschineChangeExecutable(false);
              copy[rowIndex].cells[cellIndex].warningMode = true;
            } else {
              maschineChangeExecutable(true);
              copy[rowIndex].cells[cellIndex].warningMode = false;
            }
          }
        });
      });

      state.rows = copy;
    },

    ///////////////////// Other /////////////////////
    /**
     * function alphabetChangeWarningMode changes the warningMode for state.anfangsZustand or state.endZustand
     */
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

    /**
     * function changeToiletPaperMode switches from or to the toilet paper views
     */
    changeToiletPaperMode: (state) => {
      // mode für alle:
      if (state.mode != "toiletpaper") {
        activateToiletPaperMode();
      } else {
        activateNormalMode();
      }
    },

    /**
     * function activateToiletPaperMode activate toilet paper view
     */
    activateToiletPaperMode: (state) => {
      state.mode = "toiletpaper";
      state.rows = initialRowTP;
      state.zustandsmenge = initialZustandsmengeTP;
      state.anfangsZustand = initialAnfangszustandTP;
      state.endZustand = initialEndZustandsmengeTP;
      state.currentAlphabet = defaultAlphabetOption2;
      state.bandAlphabet = initialTeepeeBandAlphabet;
      state.executable = true;
    },

    /**
     * function activateNormalMode activate normal view
     */
    activateNormalMode: (state) => {
      state.mode = "default";
      state.rows = initialRow;
      state.zustandsmenge = initialZustandsmenge;
      state.anfangsZustand = initialAnfangszustand;
      state.endZustand = initialEndZustandsmenge;
      state.currentAlphabet = defaultAlphabetOption1;
      state.bandAlphabet = initialBandAlphabet;
    },

    ///////// MeSpuMa //////////////
    /**
     * function mespumaPushToSpuren changes state.anzahlSpuren + 1
     */
    mespumaPushToSpuren: (state) => {
      state.anzahlSpuren += 1;
    },
    /**
     * function bandResetAnzahlSpuren resets state.anzahlSpuren to 2
     */
    bandResetAnzahlSpuren: (state) => {
      state.anzahlSpuren = initialanzahlSpuren;
    },
    /**
     * function mespumaDeleteSpuren changes state.anzahlSpuren - 1
     * min 2 Spuren has to be left
     */
    mespumaDeleteSpuren: (state) => {
      if (state.anzahlSpuren > 2) {
        state.anzahlSpuren -= 1;
      }
    },

    /**
     * function changeMespumaMode switches from or to the Mespuma views
     */
    changeMespumaMode: (state, mespuma: PayloadAction<boolean>) => {
      if (mespuma.payload) {
        state.mode = "mespuma";
        state.rows = initialRow;
        state.zustandsmenge = initialZustandsmenge;
        state.anfangsZustand = initialAnfangszustand;
        state.endZustand = initialEndZustandsmenge;

        let literalArr: string[] = [];

        let tempAlphabet = Object.assign(
          [],
          state.currentAlphabet.alphabet
        ) as EingabeAlphabet[];
        tempAlphabet.push({ value: "ß", label: "ß", warningMode: false });

        tempAlphabet.forEach((literal) => {
          literalArr.push(literal.value);
        });

        let combinationArr: string[][] = [];

        for (let i = 0; i < state.anzahlSpuren; i++) {
          combinationArr.push(literalArr);
        }

        let cartesianArr = cartesianProduct(combinationArr);

        let finalBandAlphabet: string[] = [];

        cartesianArr.forEach((element: any[]) => {
          let el = "(" + element.join() + ")";
          finalBandAlphabet.push(el);
        });

        if (state.currentAlphabet) {
          state.dialogOptions.forEach((option) => {
            if (state.currentAlphabet) {
              if (option.alphabet.key === state.currentAlphabet.key) {
                state.currentAlphabet.alphabet = option.alphabet.alphabet;
                state.currentDialogOption = option;
              }
            }
          });
        }

        let tupelArray: EingabeAlphabet[] = [];

        finalBandAlphabet.forEach((literal) => {
          tupelArray.push({
            value: literal,
            label: literal,
            warningMode: false,
          });
        });

        state.currentAlphabet.alphabet.forEach((element) => {
          tupelArray.push(element);
        });

        tupelArray.push({ value: "ß", label: "ß", warningMode: false });

        state.bandAlphabet = tupelArray;
        state.currentAlphabet = defaultAlphabetOption1;
      } else {
        state.mode = "default";
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  alphabetChangeCurrent,
  alphabetChangeCurrentMespuma,
  alphabetPushToCustom,
  alphabetPushToDialogOptions,
  alphabetDeleteCustom,
  alphabetGenerateBand,
  alphabetPushToZustand,
  alphabetPushToIdxZustand,
  alphabetChangeAnfangszustand,
  alphabetChangeEndzustand,
  alphabetClearEndzustand,
  alphabetDeleteZustand,
  alphabetClearZustand,
  alphabetChangePauseMaschine,
  alphabetChangeStoppMaschine,
  maschineChangeExecutable,
  maschineCheckExecutable,
  maschineSetSlider,
  maschineSliderIncreaseNumber,
  maschineSliderDecreaseNumber,
  alphabetChangeWarningMode,
  tableAddRow,
  tableAddEditorRow,
  tableDeleteRow,
  tableDeleteAll,
  tableUpdateCell,
  tableUpdateRowIsFinal,
  tableSetActiveRow,
  tableSetWatchedRows,
  tableSetActiveState,
  tableCheckWarning,
  changeToiletPaperMode,
  activateToiletPaperMode,
  activateNormalMode,
  changeMespumaMode,
  mespumaPushToSpuren,
  bandResetAnzahlSpuren,
  mespumaDeleteSpuren,
} = generalSlice.actions;

export default generalSlice.reducer;
