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
export interface PointerItemToChange {
  index: number;
  value: boolean;
}
let emptyBandValue = "B";

const initBand: EingabeAlphabetOption[] = [
  { value: emptyBandValue, label: "", warningMode: false },
  { value: emptyBandValue, label: "", warningMode: false },
  { value: emptyBandValue, label: "", warningMode: false },
  { value: emptyBandValue, label: "", warningMode: false },
  { value: emptyBandValue, label: "", warningMode: false },
  { value: emptyBandValue, label: "", warningMode: false },
  { value: emptyBandValue, label: "", warningMode: false },
  { value: emptyBandValue, label: "", warningMode: false },
];

const initMespumaBand: EingabeAlphabetOption[][] = [initBand, initBand];

export const bandSlice = createSlice({
  name: "band",
  initialState: {
    emptyBandValue: emptyBandValue,
    currentBand: initBand,
    mespumaBand: initMespumaBand,
    bandSkin: "paper",
    pointerPosition: 0,
    showWarning: false,
  },
  reducers: {
    /**
     * function bandChangeItemAt changes the Band at the index
     * @param state
     * @param bandItem
     */
    bandChangeItemAt: (state, bandItem: PayloadAction<BandItemToChange>) => {
      state.currentBand[bandItem.payload.index].value = bandItem.payload.value;

      if (bandItem.payload.label != state.emptyBandValue) {
        state.currentBand[bandItem.payload.index].label =
          bandItem.payload.label;
      } else {
        state.currentBand[bandItem.payload.index].label = "";
      }
    },
    /**
     * function bandDeleteItemAt deletes the Band Values at the index
     * @param index
     */
    bandDeleteItemAt: (state, index: PayloadAction<number>) => {
      state.currentBand[index.payload as number] = {
        value: state.emptyBandValue,
        label: "",
        warningMode: state.currentBand[index.payload].warningMode,
      };
    },
    /**
     * fügt ein neues leeres Bandfeld an der Position "before" oder "after" hinzu
     * @param state
     * @param position
     */
    bandAddField: (state, position: PayloadAction<string>) => {
      if (position.payload === "before") {
        state.currentBand.unshift({
          value: state.emptyBandValue,
          label: "",
          warningMode: false,
        });
      } else {
        state.currentBand.push({
          value: state.emptyBandValue,
          label: "",
          warningMode: false,
        });
      }
    },
    /**
     * setzt Band auf Default zurück & löscht Inhalt der BandItems
     */
    bandDeleteAll: (state) => {
      for (let index = 0; index < state.currentBand.length; index++) {
        state.currentBand[index] = {
          value: state.emptyBandValue,
          label: "",
          warningMode: false,
        };
      }
      state.pointerPosition = 0;
    },
    bandResetAll: (state) => {
      state.currentBand = initBand;
    },
    bandChangeSkin: (state) => {
      if (state.bandSkin === "paper") {
        state.bandSkin = "tech";
      } else {
        state.bandSkin = "paper";
      }
    },
    bandChangePointPos: (state, step: PayloadAction<number>) => {
      if (
        step.payload > 0 &&
        state.pointerPosition >= state.currentBand.length - 1
      ) {
        // BandItem rechts hinzufügen
        state.currentBand.push({
          value: state.emptyBandValue,
          label: "",
          warningMode: false,
        });
      } else if (step.payload < 0 && state.pointerPosition == 0) {
        // BandItem links hinzufügen
        state.currentBand.unshift({
          value: state.emptyBandValue,
          label: "",
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
    bandSetPointPos: (state, step: PayloadAction<number>) => {
      state.pointerPosition = step.payload;
    },
    bandResetPointer: (state) => {
      state.pointerPosition = 0;
    },
    bandSetWarning: (state, value: PayloadAction<boolean>) => {
      state.showWarning = value.payload;
    },
    ///////////// MeSpuMa //////////////////
    /**
     * function bandChangeItemAtMespuma changes the Band at the index and the BandIndex, at MeSpuMa
     * @param state
     * @param bandItem
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
        ].label = "";
      }
    },
    /**
     * function bandChangeItemAtMespuma changes the Band at the index and the BandIndex, at MeSpuMa
     * @param state
     * @param bandItem
     */
    bandAddBandMespuma: (state) => {
      state.mespumaBand.push(initBand);
    },
    bandDeleteBandMespuma: (state) => {
      if (state.mespumaBand.length > 2) {
        state.mespumaBand.pop();
      }
    },
    bandDeleteAllMespuma: (state) => {
      state.mespumaBand.forEach((band) => {
        for (let index = 0; index < band.length; index++) {
          band[index] = {
            value: state.emptyBandValue,
            label: "",
            warningMode: false,
          };
        }
      });
      state.pointerPosition = 0;
    },
    bandResetAllMespuma: (state) => {
      state.mespumaBand = initMespumaBand;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  bandChangeItemAt,
  bandDeleteItemAt,
  bandAddField,
  bandDeleteAll,
  bandResetAll,
  bandChangeSkin,
  bandChangePointPos,
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
