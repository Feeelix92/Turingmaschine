import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EingabeAlphabetOption } from '../data/Alphabet';


export interface BandItemToChange {
    index: number,
    value: string
}
export interface PointerItemToChange {
    index: number,
    value: boolean
}

const currentBand: EingabeAlphabetOption[] = [
    {value: "", label: "B", pointer: false},
    {value: "", label: "B", pointer: true},
    {value: "", label: "B", pointer: false},
    {value: "", label: "B", pointer: false},
    {value: "", label: "B", pointer: false},
];

export const bandSlice = createSlice({
  name: 'band',
  initialState:{
    currentBand: currentBand,
    bandSkin: "paper"
  },
  reducers: {    
    /**
     * function bandChangeItemAt changes the Band at the index
     * @param index
     * @param value
     */
    bandChangeItemAt: (state, bandItem: PayloadAction<BandItemToChange>) => { 
        state.currentBand[bandItem.payload.index as number].value = bandItem.payload.value;      
        console.log("item changed!")
    },
    bandChangePointer: (state, pointerItem: PayloadAction<PointerItemToChange>) => { 
        state.currentBand[pointerItem.payload.index as number].pointer = pointerItem.payload.value;      
        console.log("pointer changed!")
    },
     /**
     * function bandDeleteItemAt deletes the Band Values at the index
     * @param index
     */
    bandDeleteItemAt: (state, index: PayloadAction<number>) => { 
        state.currentBand[index.payload as number] = {value: "", label: "B", pointer: false};      
    },
    /**
     * fügt ein neues leeres Bandfeld an der Position "before" oder "after" hinzu
     * @param position
     */
    bandAddField: (state, position: PayloadAction<string>) => {         
        if (position.payload === "before"){
            state.currentBand.unshift({value: "", label: "B", pointer: false})
        } else {
            state.currentBand.push({value: "", label: "B", pointer: false})
        }
    },
    /**
     * setzt Band auf Default zurück & löscht Inhalt der BandItems
     */
    bandDeleteAll: (state) => {            
        for (let index = 0; index <  state.currentBand.length; index++) {
            if(index == 1) {
                state.currentBand[index] = {value: "", label: "B", pointer: true}
            } else {
                state.currentBand[index] = {value: "", label: "B", pointer: false}
            }            
        }   
        console.log("delete all")    
    },
    bandChangeSkin: (state) => {
        if(state.bandSkin === "paper"){
            state.bandSkin = "tech"
        }else{
            state.bandSkin = "paper"
        }
    }    
  },
})

// Action creators are generated for each case reducer function
export const { bandChangeItemAt, bandDeleteItemAt, bandAddField, bandDeleteAll, bandChangeSkin, bandChangePointer } = bandSlice.actions

export default bandSlice.reducer