import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { EingabeAlphabetDialog, EingabeAlphabetOption } from '../data/Alphabet';
import {CgAddR} from "react-icons/all";
import { Zustand } from '../interfaces/CommonInterfaces';

export interface EingabeAlphabetDialogOptions {
    label: string,
    alphabet: Alphabet
}

export interface Alphabet {
    key: number,
    alphabet: EingabeAlphabet[]
}

export interface EingabeAlphabet {
    label: string;
    value: string;
}

export const initialAnfangszustand: Zustand = {value: "q1",label: "q1", anfangszustand: true, endzustand: false}
const initialZustandsmenge: Zustand[] = [
    {value: "q1", label: "q1", anfangszustand: true, endzustand: false},
    {value: "q2", label: "q2", anfangszustand: false, endzustand: true}
]
const initialEndZustandsmenge: Zustand[] = [
    {value: "q2", label: "q2", anfangszustand: false, endzustand: true}
]
let initialBandAlphabet: EingabeAlphabet[] = [
    {label: '1', value: '1'},
    {label: 'B', value: 'B'}
]

const defaultCustomAlphabet: Alphabet = {
    key: 0,
    alphabet: [{value:"",label:""}]
}

const defaultAlphabetOption1: Alphabet = {
    key: 1,
    alphabet: [{label: '1', value: '1'}]
}
const defaultAlphabetOption2: Alphabet = {
    key: 2,
    alphabet: [
        {label: '1', value: '1'},
        {label: '#', value: '#'}
    ]
}
const defaultAlphabetOption3: Alphabet = {
    key: 3,
    alphabet: [
        {label: '1', value: '1'},
        {label: '0', value: '0'}
    ]
}
export const defaultAlphabetOption4: Alphabet = {
    key: 4,
    alphabet: [
        {label: '1', value: '1'},
        {label: '0', value: '0'},
        {label: '#', value: '#'}
    ]
}
const initialDialogOption:EingabeAlphabetDialogOptions = {label: '{1}', alphabet: defaultAlphabetOption1}

export const eingabeAlphabetDialogOptions: EingabeAlphabetDialogOptions[] = [
    {label: 'erstellen', alphabet: defaultCustomAlphabet},
    {label: '{1}', alphabet: defaultAlphabetOption1},
    {label: '{1,#}', alphabet: defaultAlphabetOption2},
    {label: '{0,1}', alphabet: defaultAlphabetOption3},
    {label: '{0,1,#}', alphabet: defaultAlphabetOption4},
]

let customKey = 5;

export const generalSlice = createSlice({
  name: 'general',
  initialState:{
    currentAlphabet: defaultAlphabetOption1,
    dialogOptions: eingabeAlphabetDialogOptions,
    currentDialogOption: initialDialogOption,
    customAlphabet: defaultCustomAlphabet,
    bandAlphabet: initialBandAlphabet,
    zustandsmenge: initialZustandsmenge,
    anfangsZustand: initialAnfangszustand,
    endZustand: initialEndZustandsmenge
  },
  reducers: {    
    /**
     * function alphabetChangeCurrent changes current Alphabet
     */
    alphabetChangeCurrent: (state, alphabet: PayloadAction<Alphabet>) => { 
        eingabeAlphabetDialogOptions.forEach(option => {
            if(option.alphabet.key === alphabet.payload.key) {
                state.currentAlphabet.alphabet = option.alphabet.alphabet
                state.currentDialogOption = option
            }
        });
        let tempAlphabet = state.currentAlphabet.alphabet
        console.log(tempAlphabet)
        tempAlphabet.push({value: "B", label: "B"})
        state.bandAlphabet = tempAlphabet
    },
    /**
     * function alphabetPushToCustom pushes a new Value to the customAlphabet
     * @param value
     */
    alphabetPushToCustom: (state, value: PayloadAction<string>) => {
        state.customAlphabet.alphabet.push({value: value.payload, label: value.payload})
        
        state.dialogOptions.push({label:`custom ${customKey}`, alphabet: state.customAlphabet})
        // state.currentAlphabet = state.customAlphabet
        customKey++
    },
    /**
     * function alphabetDeleteCustom deletes the customAlphabet
     * @param value
     */
    alphabetDeleteCustom: (state) => {
        // state.customAlphabet = [] 
    }
  },
})

// Action creators are generated for each case reducer function
export const { alphabetChangeCurrent, alphabetPushToCustom, alphabetDeleteCustom } = generalSlice.actions

export default generalSlice.reducer