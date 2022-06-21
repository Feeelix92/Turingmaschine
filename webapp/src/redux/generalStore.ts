import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { Zustand } from '../interfaces/CommonInterfaces';

export interface EingabeAlphabetDialogOptions {
    label: string,
    alphabet: Alphabet,
    icon?: boolean
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
    alphabet: []
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
    {label: 'erstellen', alphabet: defaultCustomAlphabet, icon: true},
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
    endZustand: initialEndZustandsmenge,
    pauseMaschine: false,
    stoppMaschine: false,
  },
  reducers: {    
    /**
     * function alphabetChangeCurrent changes current Alphabet
     */
    alphabetChangeCurrent: (state, alphabet: PayloadAction<Alphabet>) => { 
        state.dialogOptions.forEach(option => {
            if(option.alphabet.key === alphabet.payload.key) {
                state.currentAlphabet.alphabet = option.alphabet.alphabet
                state.currentDialogOption = option
            }
        });
        let tempAlphabet = Object.assign([], alphabet.payload.alphabet)
        tempAlphabet.push({value: "B", label: "B"})
        state.bandAlphabet = tempAlphabet
        console.log("alphabetChangeCurrent",current(state))
    },
    /**
     * function alphabetPushToCustom pushes a new Value to the customAlphabet
     * @param value
     */
    alphabetPushToCustom: (state, value: PayloadAction<string>) => {
        state.customAlphabet.alphabet.push({value: value.payload, label: value.payload})
    },
    alphabetPushToDialogOptions: (state, optionName: PayloadAction<string>) => {
        state.customAlphabet.key = customKey;
        state.dialogOptions.push({label:`{${optionName.payload}}`, alphabet: state.customAlphabet})
        state.currentAlphabet = state.customAlphabet
        state.dialogOptions.forEach(option => {
            if(option.alphabet.key ===  state.customAlphabet.key) {
                state.currentDialogOption = option
            }
        });
        console.log("alphabetPushToDialogOptions",current(state))
        customKey++
    },
    /**
     * function alphabetDeleteCustom deletes the customAlphabet
     * @param value
     */
    alphabetDeleteCustom: (state) => {
        state.customAlphabet.alphabet = []
    },
    /**
     * function alphabetDeleteCustom deletes the customAlphabet
     * @param value
     */
    alphabetPushToZustand: (state) => {
        let tempNumber = state.zustandsmenge.length + 1
        state.zustandsmenge.push({value: "q" + tempNumber,label: "q" + tempNumber, anfangszustand: false, endzustand: false})
        console.log( current(state.zustandsmenge))
    },
      alphabetDeleteZustand: (state) => {
        state.zustandsmenge.pop()
      },

    alphabetChangeAnfangszustand: (state, zustand: PayloadAction<Zustand>) => {
        state.zustandsmenge.forEach(option => {
            if(option.value === zustand.payload.value){
                option.anfangszustand = true
                option.endzustand = false
            } else {
                option.anfangszustand = false
            }
        })
        state.anfangsZustand = zustand.payload
        console.log(current(state.zustandsmenge))
    },
    alphabetChangeEndzustand: (state, zustand: PayloadAction<Zustand[]>) => {
        console.log(zustand.payload)
        state.endZustand = zustand.payload
        state.zustandsmenge.forEach(option => {
            zustand.payload.forEach(innerzustand => {
                if( option.value === innerzustand.value){
                    option.endzustand = true
                } else{
                    option.endzustand = false
                }
            })
        })
        console.log(current(state.zustandsmenge))
    },
    alphabetClearEndzustand: (state) => {
        state.zustandsmenge.forEach(option => {
                option.endzustand = false
        })
        state.endZustand = []
    },
    alphabetChangePauseMaschine: (state, value: PayloadAction<boolean>) => {
        state.pauseMaschine = value.payload;
    },
    alphabetChangeStoppMaschine: (state, value: PayloadAction<boolean>) => {
        state.stoppMaschine = value.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
    alphabetChangeCurrent, 
    alphabetPushToCustom, 
    alphabetPushToDialogOptions, 
    alphabetDeleteCustom, 
    alphabetPushToZustand, 
    alphabetChangeAnfangszustand, 
    alphabetChangeEndzustand,
    alphabetClearEndzustand,
    alphabetDeleteZustand,
    alphabetChangePauseMaschine,
    alphabetChangeStoppMaschine
} = generalSlice.actions

export default generalSlice.reducer