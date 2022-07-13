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
  { value: "B", label: "", warningMode: false },
  { value: "B", label: "", warningMode: false },
  { value: "B", label: "", warningMode: false },
  { value: "B", label: "", warningMode: false },
  { value: "B", label: "", warningMode: false },
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
     * @param state
     * @param bandItem
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
    /**
     * function bandDeleteItemAt deletes the Band Values at the index
     * @param index
     */
    bandDeleteItemAt: (state, index: PayloadAction<number>) => {
      state.currentBand[index.payload as number] = {
        value: "B",
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
        state.currentBand.unshift({ value: "B", label: "", warningMode: false });
      } else {
        state.currentBand.push({ value: "B", label: "", warningMode: false });
      }
    },
    /**
     * setzt Band auf Default zurück & löscht Inhalt der BandItems
     */
    bandDeleteAll: (state) => {
      for (let index = 0; index < state.currentBand.length; index++) {        
        state.currentBand[index] = { value: "B", label: "", warningMode: false };        
      }
      state.pointerPosition = 0;
    },
    bandChangeSkin: (state) => {
      if (state.bandSkin === "paper") {
        state.bandSkin = "tech";
      } else {
        state.bandSkin = "paper";
      }
    },
    bandChangePointPos: (state, step: PayloadAction<number>) => {
      console.log("movePointer", step);
      if((step.payload<0 && state.pointerPosition==0) || (step.payload>0 && state.pointerPosition>=state.currentBand.length-1) ) {
        state.pointerPosition -= step.payload;
      } else {
        state.pointerPosition += step.payload;
      }

    },
    bandSetPointPos: (state, step: PayloadAction<number>) => {
      state.pointerPosition = step.payload;
    },
    bandResetPointer: (state) => {
      console.log("Reset!");
      state.pointerPosition = 0;
      console.log("state.PointerPosition: ", state.pointerPosition);
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
  bandChangePointPos,
  bandSetPointPos,
  bandResetPointer,
} = bandSlice.actions;

export default bandSlice.reducer;
