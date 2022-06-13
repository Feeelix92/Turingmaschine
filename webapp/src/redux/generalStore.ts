import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { EingabeAlphabet, EingabeAlphabetDialog, EingabeAlphabetOption } from '../data/Alphabet';
import {CgAddR} from "react-icons/all";

export interface CounterState {
  value: number
}

interface EingabeAlphabetDialogOptions {
    label: string,
    value: string
}

export const defaultCustomAlphabet: EingabeAlphabet[] = []
export const defaultAlphabetOption1: EingabeAlphabet[] = [
    {label: '1', value: '1'},
]
export const defaultAlphabetOption2: EingabeAlphabet[] = [
    {label: '1', value: '1'},
    {label: '#', value: '#'}
]
export const defaultAlphabetOption3: EingabeAlphabet[] = [
    {label: '1', value: '1'},
    {label: '0', value: '0'}
]
export const defaultAlphabetOption4: EingabeAlphabet[] = [
    {label: '1', value: '1'},
    {label: '0', value: '0'},
    {label: '#', value: '#'}
]
export const eingabeAlphabetDialogOptions: EingabeAlphabetDialogOptions[] = [
    {label: 'erstellen', value: '0'},
    {label: '{1}', value: '1'},
    {label: '{1,#}', value: '2'},
    {label: '{0,1}', value: '3'},
    {label: '{0,1,#}', value: '4'},
]

export const generalSlice = createSlice({
  name: 'general',
  initialState:{
    currentAlphabet: defaultAlphabetOption1,
    alphabetOptions: eingabeAlphabetDialogOptions,
    customAlphabet: defaultCustomAlphabet
  },
  reducers: {    
    /**
     * function bandChangeItemAt changes the Band at the index
     * @param index
     * @param value
     */
    alphabetChangeCurrent: (state, option: PayloadAction<string>) => { 
        switch (option.payload) {
            case '0':
                state.currentAlphabet = state.customAlphabet
                break;
            case '1':
                state.currentAlphabet = defaultAlphabetOption1
                break;
            case '2':
                state.currentAlphabet = defaultAlphabetOption2
                break;
            case '3':
                state.currentAlphabet = defaultAlphabetOption3
                break;
            case '4':
                state.currentAlphabet = defaultAlphabetOption4
                break;
            default:
                break;
        } 
    },
    alphabetPushToCustom: (state, value: PayloadAction<string>) => {
        state.customAlphabet.push({label: value.payload, value: value.payload});     
        state.currentAlphabet = state.customAlphabet
    },
    alphabetDeleteCustom: (state) => {
        state.customAlphabet = [] 
    },   
  },
})

// Action creators are generated for each case reducer function
export const { alphabetChangeCurrent, alphabetPushToCustom, alphabetDeleteCustom } = generalSlice.actions

export default generalSlice.reducer