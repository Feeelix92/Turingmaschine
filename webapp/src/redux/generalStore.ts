import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { EingabeAlphabetOption } from "../data/Alphabet";
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

///////////////////// Zustandsmenge /////////////////////
const initialZustandsmenge: Zustand[] = [
  new Zustand("q1", "q1", true, false, false),
];
export const initialAnfangszustand: Zustand = initialZustandsmenge[0];
const initialEndZustandsmenge: Zustand[] = [];

///////////////////// BandAlphabet /////////////////////
const initialBandAlphabet: EingabeAlphabet[] = [
  { label: "1", value: "1", warningMode: false },
  { label: "", value: "B", warningMode: false },
];
const initialTeepeeBandAlphabet: EingabeAlphabet[] = [
  { label: "1", value: "1", warningMode: false },
  { label: "#", value: "#", warningMode: false },
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
  { label: "", alphabet: defaultCustomAlphabet, icon: true },
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

//Zellen
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
  { value: "B", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[3],
    editField: false,
    warningMode: false,
  },
  { value: "B", editField: true, warningMode: false },
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
  { value: "B", editField: true, warningMode: false },
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
  { value: "B", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[4],
    editField: false,
    warningMode: false,
  },
  { value: "B", editField: true, warningMode: false },
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
  { value: "B", editField: true, warningMode: false },
  {
    value: initialZustandsmengeTP[4],
    editField: false,
    warningMode: false,
  },
  { value: "B", editField: true, warningMode: false },
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

///////////
/*
const initialRow: RowInterface[] = [
  {
    cells: initialCell,
    isFinal: false,
  },
];
*/
// const initialRow: RowInterface[] = [
//   {
//     cells: initialCell,
//     isFinal: false,
//   },
// ];
const initialRow: RowInterface[] = [];
let activeRow: RowInterface | undefined;

const activeState: Zustand | undefined = initialZustandsmenge[0];

///////////////////// Other /////////////////////
let customKey = 5;

const initialSliderNumber = 4;

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    //// ZustandTP ////
    // zustandsmenge: initialZustandsmengeTP,
    // anfangsZustand: initialAnfangszustandTP,
    // endZustand: initialEndZustandsmengeTP,
    //// Zustand ////
    zustandsmenge: initialZustandsmenge,
    anfangsZustand: initialAnfangszustand,
    endZustand: initialEndZustandsmenge,
    //// Alphabet ////
    currentAlphabet: defaultAlphabetOption1,
    //currentAlphabet: defaultAlphabetOption1,
    bandAlphabet: initialBandAlphabet,
    customAlphabet: defaultCustomAlphabet,
    //// Dialog ////
    dialogOptions: eingabeAlphabetDialogOptions,
    currentDialogOption: initialDialogOption,
    //// Maschine ////
    pauseMaschine: false,
    stoppMaschine: false,
    executable: false,
    // rows: initialRowTP,
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
      tempAlphabet.push({ value: "B", label: "", warningMode: false });

      let finalArray = tempAlphabet;

      state.bandAlphabet = finalArray;
    },
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

      tupelArray.push({ value: "B", label: "", warningMode: false });

      state.bandAlphabet = tupelArray;
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
     * @param state
     */
    alphabetDeleteCustom: (state) => {
      state.customAlphabet.alphabet = [];
    },
    alphabetGenerateBand: (state, alphabet: PayloadAction<string[]>) => {
      let finalArray: EingabeAlphabet[] = [];
      alphabet.payload.forEach((literal) => {
        finalArray.push({
          value: literal,
          label: literal,
          warningMode: false,
        });
      });
      finalArray.push({ value: "B", label: "", warningMode: false });
      state.bandAlphabet = finalArray;
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
     * @param state
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
      state.activeRow = activeRow;
    },
    maschineChangeExecutable: (state, value: PayloadAction<boolean>) => {
      state.executable = value.payload;
    },
    maschineCheckExecutable: (state) => {
      if (state.rows.length === 0 || state.endZustand.length === 0) {
        state.executable = false;
      } else {
        state.executable = true;
      }
    },
    maschineSetSlider: (state, value: PayloadAction<number>) => {
      state.sliderNumber = value.payload;
    },
    maschineSliderIncreaseNumber: (state) => {
      let val = state.sliderNumber;
      if (val < 100) {
        val = val + 1;
        state.sliderNumber = val;
      }
    },
    maschineSliderDecreaseNumber: (state) => {
      let val = state.sliderNumber;
      if (val > 0) {
        val = val - 1;
        state.sliderNumber = val;
      }
    },
    ///////////////////// Table /////////////////////
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
    tableDeleteRow: (state, i: PayloadAction<React.Key>) => {
      // create flat copy of all existing rows
      const newRows = state.rows.slice(0, state.rows.length);

      // delete element at index
      newRows.splice(i.payload as number, 1);

      // update the rows in state with our new rows-array
      state.rows = newRows;
    },
    tableDeleteAll: (state) => {
      state.rows = initialRow;
    },
    tableUpdateCell: (state, updateCell: PayloadAction<updateCellType>) => {
      if (state.rows.length > 0) {
        const newCells: Cell[] = state.rows[
          updateCell.payload.rowIndex as number
        ].cells.slice(
          0,
          state.rows[updateCell.payload.rowIndex as number].cells.length
        );

        if (typeof updateCell.payload.value === "boolean") {
          // tableUpdateRow({index: updateCell.payload.index, cells: newCells})

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
        } else {
          newCells[updateCell.payload.cellIndex as number].value =
            updateCell.payload.value;
          if (updateCell.payload.warningMode !== undefined) {
            newCells[updateCell.payload.cellIndex as number].warningMode =
              updateCell.payload.warningMode;
          }

          // tableUpdateRow({index: updateCell.payload.index, cells: newCells})

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
      }
    },
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
    tableSetActiveRow: (
      state,
      row: PayloadAction<RowInterface | undefined>
    ) => {
      state.activeRow = row.payload;
    },
    tableSetWatchedRows: (state, rows: PayloadAction<RowInterface[]>) => {
      state.watchedRows = rows.payload;
    },
    tableSetActiveState: (state, newVal: PayloadAction<Zustand>) => {
      state.activeState = newVal.payload;
    },
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
              copy[rowIndex].cells[cellIndex].warningMode = !tempBool;
            }
          }
        });
      });

      state.rows = copy;
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

    /**
     * This function switches from or to the toilet paper views
     * @param state
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
     * This function activate toilet paper view
     * @param state
     */
    activateToiletPaperMode: (state) => {
      state.mode = "toiletpaper";
      state.rows = initialRowTP;
      state.zustandsmenge = initialZustandsmengeTP;
      state.anfangsZustand = initialAnfangszustandTP;
      state.endZustand = initialEndZustandsmengeTP;
      state.currentAlphabet = defaultAlphabetOption2;
      state.bandAlphabet = initialTeepeeBandAlphabet;
    },

    /**
     * This function activate normal view
     * @param state
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
    mespumaPushToSpuren: (state) => {
      state.anzahlSpuren += 1;
    },

    mespumaDeleteSpuren: (state) => {
      if (state.anzahlSpuren > 2) {
        state.anzahlSpuren -= 1;
      }
    },

    /**
     * This function switches from or to the Mespuma views
     * @param state
     * @param mespuma
     */
    changeMespumaMode: (state, mespuma: PayloadAction<boolean>) => {
      if (mespuma.payload) {
        state.mode = "mespuma";
        state.rows = initialRow;
        state.zustandsmenge = initialZustandsmenge;
        state.anfangsZustand = initialAnfangszustand;
        state.endZustand = initialEndZustandsmenge;
        // state.bandAlphabet = initialBandAlphabet;

        let literalArr: string[] = [];

        let tempAlphabet = Object.assign(
          [],
          state.currentAlphabet.alphabet
        ) as EingabeAlphabet[];
        tempAlphabet.push({ value: "B", label: "", warningMode: false });

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

        // alphabetChangeCurrentMespuma({
        //   cartesian: finalBandAlphabet,
        //   alphabet: state.currentAlphabet,
        // });

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

        tupelArray.push({ value: "B", label: "", warningMode: false });

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
  mespumaDeleteSpuren,
} = generalSlice.actions;

export default generalSlice.reducer;
