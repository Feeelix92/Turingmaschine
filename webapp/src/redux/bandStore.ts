import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EingabeAlphabetOption } from "../data/Alphabet";

export interface BandItemToChange {
  index: number;
  value: string;
  label: string;
}
export interface BandItemToChangeMespuma {
  bandIndex: number;
  index: number;
  value: string;
  label: string;
}
export interface MespumaIndex {
  bandIndex: number;
  index: number;
}
export interface PointerItemToChange {
  index: number;
  value: boolean;
}
let emptyBandValue = "ß";

const initBand: EingabeAlphabetOption[] = [
  { value: emptyBandValue, label: "ß", warningMode: false },
  { value: emptyBandValue, label: "ß", warningMode: false },
  { value: emptyBandValue, label: "ß", warningMode: false },
  { value: emptyBandValue, label: "ß", warningMode: false },
  { value: emptyBandValue, label: "ß", warningMode: false },
  { value: emptyBandValue, label: "ß", warningMode: false },
  { value: emptyBandValue, label: "ß", warningMode: false },
  { value: emptyBandValue, label: "ß", warningMode: false },
];

let initBandTmp: EingabeAlphabetOption[] = [];

const initMespumaBand: EingabeAlphabetOption[][] = [initBand, initBand];

export const bandSlice = createSlice({
  name: "band",
  initialState: {
    emptyBandValue: emptyBandValue,
    currentBand: initBand,
    mespumaBand: initMespumaBand,
    pointerPosition: 0,
    showWarning: false,
  },
  reducers: {
    /**
     * function bandChangeItemAt changes the Band at the index
     */
    bandChangeItemAt: (state, bandItem: PayloadAction<BandItemToChange>) => {
      if (bandItem.payload.index >= state.currentBand.length - 1) {
        state.currentBand.push({
          value: state.emptyBandValue,
          label: "ß",
          warningMode: false,
        });
      }

      state.currentBand[bandItem.payload.index].value = bandItem.payload.value;

      if (bandItem.payload.label != state.emptyBandValue) {
        state.currentBand[bandItem.payload.index].label =
          bandItem.payload.label;
      } else {
        state.currentBand[bandItem.payload.index].label = "ß";
      }
    },
    /**
     * function bandDeleteItemAt deletes the Band Values at the index
     */
    bandDeleteItemAt: (state, index: PayloadAction<number>) => {
      state.currentBand[index.payload as number] = {
        value: state.emptyBandValue,
        label: "ß",
        warningMode: state.currentBand[index.payload].warningMode,
      };
    },
    /**
     * function bandDeleteItemAt deletes the Band Values at the index in MespumaMode
     */
    bandDeleteItemAtMespuma: (state, index: PayloadAction<MespumaIndex>) => {
      state.mespumaBand[index.payload.bandIndex as number][
        index.payload.index as number
      ] = {
        value: state.emptyBandValue,
        label: "ß",
        warningMode:
          state.mespumaBand[index.payload.bandIndex as number][
            index.payload.index as number
          ].warningMode,
      };
    },
    /**
     * function bandAddField inserts empty field at position "before" or "after"
     */
    bandAddField: (state, position: PayloadAction<string>) => {
      if (position.payload === "before") {
        state.currentBand.unshift({
          value: state.emptyBandValue,
          label: "ß",
          warningMode: false,
        });
      } else {
        state.currentBand.push({
          value: state.emptyBandValue,
          label: "ß",
          warningMode: false,
        });
      }
    },

    /**
     * function bandAddMespumaField inserts empty field at position "before" or "after" in mespuma mode
     */
    bandAddMespumaField: (state, position: PayloadAction<string>) => {
      if (position.payload === "before") {
        for (let i = 0; i < state.mespumaBand.length; i++) {
          state.mespumaBand[i].unshift({
            value: state.emptyBandValue,
            label: "ß",
            warningMode: false,
          });
        }
      } else {
        for (let i = 0; i < state.mespumaBand.length; i++) {
          state.mespumaBand[i].push({
            value: state.emptyBandValue,
            label: "ß",
            warningMode: false,
          });
        }
      }
    },

    /**
     * function bandDeleteAll resets pointer and deletes Items in Band
     */
    bandDeleteAll: (state) => {
      for (let index = 0; index < state.currentBand.length; index++) {
        state.currentBand[index] = {
          value: state.emptyBandValue,
          label: "ß",
          warningMode: false,
        };
      }
      state.pointerPosition = 0;
      state.showWarning = false;
    },
    /**
     * function bandResetAll resets Band and MespumaBand to initialValue
     */
    bandResetAll: (state) => {
      state.currentBand = initBand;
      state.mespumaBand = initMespumaBand;
    },
    /**
     * function bandResetPointerPos resets Pointer to 0
     */
    bandResetPointerPos: (state) => {
      state.pointerPosition = 0;
    },
    /**
     * function bandChangePointPos changes state.pointerPosition to step-value
     */
    bandChangePointPos: (state, step: PayloadAction<number>) => {
      if (
        step.payload > 0 &&
        state.pointerPosition >= state.currentBand.length - 1
      ) {
        // BandItem rechts hinzufügen
        state.currentBand.push({
          value: state.emptyBandValue,
          label: "ß",
          warningMode: false,
        });
      } else if (step.payload < 0 && state.pointerPosition == 0) {
        // BandItem links hinzufügen
        state.currentBand.unshift({
          value: state.emptyBandValue,
          label: "ß",
          warningMode: false,
        });
      } else if (
        (step.payload < 0 && state.pointerPosition == 0) ||
        (step.payload > 0 &&
          state.pointerPosition >= state.currentBand.length - 1)
      ) {
        state.pointerPosition -= step.payload;
      } else {
        state.pointerPosition += step.payload;
      }
    },

    ///////////// MeSpuMa //////////////////
    /**
     * function bandChangeMespumaPointPos changes state.pointerPosition to step-value in mespuma mode
     */
    bandChangeMespumaPointPos: (state, step: PayloadAction<number>) => {
      if (
        step.payload > 0 &&
        state.pointerPosition >= state.mespumaBand[0].length - 1
      ) {
        for (let i = 0; i < state.mespumaBand.length; i++) {
          state.mespumaBand[i].push({
            value: state.emptyBandValue,
            label: "ß",
            warningMode: false,
          });
        }
        state.pointerPosition += step.payload;
      } else if (step.payload < 0 && state.pointerPosition == 0) {
        for (let i = 0; i < state.mespumaBand.length; i++) {
          state.mespumaBand[i].unshift({
            value: state.emptyBandValue,
            label: "ß",
            warningMode: false,
          });
        }
      } else if (
        (step.payload < 0 && state.pointerPosition == 0) ||
        (step.payload > 0 &&
          state.pointerPosition >= state.mespumaBand[0].length - 1)
      ) {
        state.pointerPosition -= step.payload;
      } else {
        state.pointerPosition += step.payload;
      }
    },
    /**
     * function bandSetPointPos changes state.pointerPosition to step-value
     */
    bandSetPointPos: (state, step: PayloadAction<number>) => {
      state.pointerPosition = step.payload;
    },
    /**
     * function bandSetPointPos resets state.pointerPosition to 0
     */
    bandResetPointer: (state) => {
      state.pointerPosition = 0;
    },
    /**
     * function bandSetPointPos changes state.showWarning
     */
    bandSetWarning: (state, value: PayloadAction<boolean>) => {
      state.showWarning = value.payload;
    },

    /**
     * function bandChangeItemAtMespuma changes the Band at the index and the BandIndex, at MeSpuMa
     */
    bandChangeItemAtMespuma: (
      state,
      bandItem: PayloadAction<BandItemToChangeMespuma>
    ) => {
      state.mespumaBand[bandItem.payload.bandIndex][
        bandItem.payload.index
      ].value = bandItem.payload.value;

      if (bandItem.payload.label != state.emptyBandValue) {
        state.mespumaBand[bandItem.payload.bandIndex][
          bandItem.payload.index
        ].label = bandItem.payload.label;
      } else {
        state.mespumaBand[bandItem.payload.bandIndex][
          bandItem.payload.index
        ].label = "ß";
      }
    },
    /**
     * function bandAddBandMespuma adds a new band in mespuma mode
     */
    bandAddBandMespuma: (state) => {
      initBandTmp = [];
      for (let i = 0; i < state.mespumaBand[0].length; i++) {
        initBandTmp.push({
          value: emptyBandValue,
          label: "ß",
          warningMode: false,
        });
      }
      state.mespumaBand.push(initBandTmp);
    },
    /**
     * function bandDeleteBandMespuma deletes a band in mespuma mode
     * min band-anzahl = 2
     */
    bandDeleteBandMespuma: (state) => {
      if (state.mespumaBand.length > 2) {
        state.mespumaBand.pop();
      }
    },
    /**
     * function bandDeleteAllMespuma deletes the banditems in mespuma and resets pointer to 0
     */
    bandDeleteAllMespuma: (state) => {
      state.mespumaBand.forEach((band) => {
        for (let index = 0; index < band.length; index++) {
          band[index] = {
            value: state.emptyBandValue,
            label: "ß",
            warningMode: false,
          };
        }
      });
      state.pointerPosition = 0;
    },
    /**
     * function bandResetAllMespuma resets state.mespumaBand to the initial Value
     */
    bandResetAllMespuma: (state) => {
      state.mespumaBand = initMespumaBand;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  bandChangeItemAt,
  bandDeleteItemAt,
  bandDeleteItemAtMespuma,
  bandAddField,
  bandAddMespumaField,
  bandDeleteAll,
  bandResetAll,
  bandResetPointerPos,
  bandChangePointPos,
  bandChangeMespumaPointPos,
  bandSetPointPos,
  bandResetPointer,
  bandSetWarning,
  bandChangeItemAtMespuma,
  bandAddBandMespuma,
  bandDeleteBandMespuma,
  bandDeleteAllMespuma,
  bandResetAllMespuma,
} = bandSlice.actions;

export default bandSlice.reducer;
