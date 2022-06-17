import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { EingabeAlphabet, EingabeAlphabetDialog, EingabeAlphabetOption } from '../data/Alphabet';
import {CgAddR} from "react-icons/all";

interface EingabeAlphabetDialogOptions {
    label: string,
    value: string
}

interface Zustand {
    value: string,
    label: string,
    anfangszustand: boolean,
    endzustand: boolean
}

const initialAnfangszustand: Zustand = {value: "q1",label: "q1", anfangszustand: true, endzustand: false}
const initialZustandsmenge: Zustand[] = [
    {value: "q1", label: "q1", anfangszustand: true, endzustand: false},
    {value: "q2", label: "q2", anfangszustand: false, endzustand: true}
]
const initialEndZustandsmenge: Zustand[] = [
    {value: "q2", label: "q2", anfangszustand: false, endzustand: true}
]
const initialBandAlphabet: EingabeAlphabet[] = [
    {label: '1', value: '1'},
    {label: 'B', value: 'B'}
]

const defaultCustomAlphabet: EingabeAlphabet[] = []
const defaultAlphabetOption1: EingabeAlphabet[] = [
    {label: '1', value: '1'},
]
const defaultAlphabetOption2: EingabeAlphabet[] = [
    {label: '1', value: '1'},
    {label: '#', value: '#'}
]
const defaultAlphabetOption3: EingabeAlphabet[] = [
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
        alphabetChangeBandAlphabet()
    },
    /**
     * function alphabetPushToCustom pushes a new Value to the customAlphabet
     * @param value
     */
    alphabetPushToCustom: (state, value: PayloadAction<string>) => {
        state.customAlphabet.push({label: value.payload, value: value.payload});     
        state.currentAlphabet = state.customAlphabet
    },
    /**
     * function alphabetDeleteCustom deletes the customAlphabet
     * @param value
     */
    alphabetDeleteCustom: (state) => {
        state.customAlphabet = [] 
    },  
    alphabetChangeBandAlphabet: (state) => {
        let tempAlphabet = state.currentAlphabet
        tempAlphabet.push({value: "B", label: "B"})
        state.bandAlphabet = tempAlphabet
    }
  },
})

// Action creators are generated for each case reducer function
export const { alphabetChangeCurrent, alphabetPushToCustom, alphabetDeleteCustom, alphabetChangeBandAlphabet } = generalSlice.actions

export default generalSlice.reducer