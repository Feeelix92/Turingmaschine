// src/Tiptap.jsx
import "./styles.css";
import {useEditor, EditorContent, Editor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {CodeEditorProps, Zustand} from "../../interfaces/CommonInterfaces";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {RootState, store} from "../../redux/store";
import watch from "redux-watch";
import {
    alphabetChangeAnfangszustand,
    alphabetChangeEndzustand,
    alphabetDeleteCustom,
    alphabetPushToCustom, alphabetPushToDialogOptions
} from "../../redux/generalStore";
import {bandChangeItemAt, bandDeleteAll, BandItemToChange} from "../../redux/bandStore";

export default function Tiptap(props: CodeEditorProps) {
    const dispatch = useDispatch();
    const currentBand = useSelector((state: RootState) => state.band.currentBand);
    const currentAlphabet = useSelector(
        (state: RootState) => state.general.currentAlphabet
    );
    const initZustandsmenge = useSelector(
        (state: RootState) => state.general.zustandsmenge
    );
    const initAnfangsZustand = useSelector(
        (state: RootState) => state.general.anfangsZustand
    );
    const initEndZustand = useSelector(
        (state: RootState) => state.general.endZustand
    );
    // @TODO convert and insert current Table
    const [tempEditorText, setTempEditorText] = useState(`
         {
           "band":{
              "input":[`+convertCurrentBand()+`]
           },
           "specifications":{
              "alphabet":[`+convertCurrentAlphabet()+`],
              "states":[`+convertZustandsmenge()+`],
              "startState":[`+convertAnfangsZustand()+`],
              "endState":[`+convertEndZustand()+`]
           },
           "table":{
              "q1":{
                 "1":["q1","R","0"],
                 "0":["q1","R"],
                 "B":["q2","N"]
              }
           }
         }`,
    );

    // following functions are used to convert stored Data, to use in Editor
    function convertCurrentBand(){
        return currentBand.map(({value}) => `"${value}"`).join(',');
    }

    function convertCurrentAlphabet(){
        return currentAlphabet.alphabet.map(({value}) => `"${value}"`).join(',');
    }

    function convertZustandsmenge(){
        return initZustandsmenge.map(({value}) => `"${value}"`).join(',');
    }

    function convertAnfangsZustand(){
        return `"${initAnfangsZustand.value}"`;
    }

    function convertEndZustand(){
        return initEndZustand.map(({value}) => `"${value}"`).join(',');
    }

    // function to close the Editor
    function toggleEditor() {
        props.toggleEditor();
    }

    // function to convert Editor content to JSON and save entries to store
    function parseToJSON() {
        if (tempEditorText){
            try {
                let json = JSON.parse(tempEditorText);
                dispatch(bandDeleteAll());
                // save Band to store
                // json.band.input...
                const bandItems = json.band.input;
                for (let index = 0; index < bandItems.length; index++) {
                    const temp: BandItemToChange = {
                        index: index,
                        value: bandItems[index],
                        label: bandItems[index],
                    };
                    dispatch(bandChangeItemAt(temp));
                }
                // save alphabet from editor to store
                // json.specifications.alphabet...
                const alphabet = json.specifications.alphabet;
                console.log(alphabet);
                if (alphabet.length > 0) {
                    dispatch(alphabetDeleteCustom());
                    alphabet.forEach((value: string) => {
                        dispatch(alphabetPushToCustom(value));
                    });
                    dispatch(alphabetPushToDialogOptions(alphabet.toString()));
                } else {
                    alert("Ein leeres Alphabet ist nicht erlaubt!");
                }

                // @TODO save states from editor to store
                // json.specifications.states...

                // save Anfangszustand from editor to store
                const newAnfangszustand = new Zustand(
                    json.specifications.startState,
                    json.specifications.startState,
                    true,
                    false,
                    false
                );
                dispatch(alphabetChangeAnfangszustand(newAnfangszustand));

                // save Endzustand to store
                // json.specifications.endState...
                // console.log(json.specifications.endState);
                const endStates = json.specifications.endState;
                let temp: Zustand[] = [];
                for (let index = 0; index < endStates.length; index++) {
                    let startState = false;
                    if(endStates[index] == json.specifications.startState){
                        startState = true;
                    }
                    temp.push(
                        new Zustand(
                            endStates[index],
                            endStates[index],
                            startState,
                            true,
                            false
                        )
                    );
                }
                dispatch(alphabetChangeEndzustand(temp));

                // @TODO save table store
                // json.table...
                // console.log(json.table);

                toggleEditor();
            } catch (e){
                // Error message is shown, if the entered code in editor is no valid JSON
                alert("Kein gültiges JSON! Ihre Eingabe muss im JSON-Format erfolgen! \n" + e);
            }
        }
    }
    // Editor 
    const editor = useEditor({
        extensions: [StarterKit],
        content: `<pre><code className={"language-json"}>
         ${tempEditorText}
      </code></pre>`,
        // triggered on every change
        onUpdate: ({editor}) => {
            setTempEditorText(editor.getText());
        },
        // triggered on create
        onCreate: ({editor}) => {
            setTempEditorText(editor.getText());
        },
    });

    return (

        <div>
            <div id="defaultModal"
                 className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
                 aria-modal="true" role="dialog">
                <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                Code-Editor
                            </h3>
                            <button type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-toggle="defaultModal" onClick={toggleEditor}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule={"evenodd"}
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule={"evenodd"}/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6 text-left">
                            <EditorContent editor={editor}/>
                        </div>
                        <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button data-modal-toggle="defaultModal" type="button" onClick={parseToJSON}
                                    className="bg-thm-primary">speichern
                            </button>
                            <button data-modal-toggle="defaultModal" type="button" onClick={toggleEditor}
                                    className="bg-thm-secondary hover:bg-thm-primary2">abrechen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

