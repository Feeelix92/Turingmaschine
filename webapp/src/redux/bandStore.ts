import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EingabeAlphabetOption } from "../data/Alphabet";

export interface BandItemToChange {
  index: number;
  value: string;
  label: string;
}
export interface PointerItemToChange {
  index: number;
  value: boolean;
}

const currentBand: EingabeAlphabetOption[] = [
  { value: "B", label: "", pointer: false },
  { value: "B", label: "", pointer: true },
  { value: "B", label: "", pointer: false },
  { value: "B", label: "", pointer: false },
  { value: "B", label: "", pointer: false },
];

export const bandSlice = createSlice({
  name: "band",
  initialState: {
    currentBand: currentBand,
    bandSkin: "paper",
    pointerPosition: 0,
  },
  reducers: {
    /**
     * function bandChangeItemAt changes the Band at the index
     * @param index
     * @param value
     */
    bandChangeItemAt: (state, bandItem: PayloadAction<BandItemToChange>) => {
      state.currentBand[bandItem.payload.index].value = bandItem.payload.value;

      if (bandItem.payload.label != "B") {
        state.currentBand[bandItem.payload.index].label =
          bandItem.payload.label;
      } else {
        state.currentBand[bandItem.payload.index].label = "";
      }
    },
    bandChangePointer: (
      state,
      pointerItem: PayloadAction<PointerItemToChange>
    ) => {
      state.currentBand[pointerItem.payload.index as number].pointer =
        pointerItem.payload.value;
    },
    /**
     * function bandDeleteItemAt deletes the Band Values at the index
     * @param index
     */
    bandDeleteItemAt: (state, index: PayloadAction<number>) => {
      state.currentBand[index.payload as number] = {
        value: "B",
        label: "",
        pointer: false,
      };
    },
    /**
     * fügt ein neues leeres Bandfeld an der Position "before" oder "after" hinzu
     * @param position
     */
    bandAddField: (state, position: PayloadAction<string>) => {
      if (position.payload === "before") {
        state.currentBand.unshift({ value: "B", label: "", pointer: false });
      } else {
        state.currentBand.push({ value: "B", label: "", pointer: false });
      }
    },
    /**
     * setzt Band auf Default zurück & löscht Inhalt der BandItems
     */
    bandDeleteAll: (state) => {
      for (let index = 0; index < state.currentBand.length; index++) {
        if (index == 1) {
          state.currentBand[index] = { value: "B", label: "", pointer: true };
        } else {
          state.currentBand[index] = { value: "B", label: "", pointer: false };
        }
      }
    },
    bandChangeSkin: (state) => {
      if (state.bandSkin === "paper") {
        state.bandSkin = "tech";
      } else {
        state.bandSkin = "paper";
      }
    },
    bandChangePointPos: (state, step: PayloadAction<number>) => {
      state.pointerPosition += step.payload;
    },
    bandResetPointer: (state) => {
      state.pointerPosition = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  bandChangeItemAt,
  bandDeleteItemAt,
  bandAddField,
  bandDeleteAll,
  bandChangeSkin,
  bandChangePointer,
  bandChangePointPos,
  bandResetPointer,
} = bandSlice.actions;

export default bandSlice.reducer;
