import {
  CodeEditorProps,
  Direction,
  tableRowToAdd,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { RootState } from "../../redux/store";
import AceEditor from "react-ace";
import { setCompleters } from "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import {
  alphabetChangeAnfangszustand,
  alphabetChangeCurrentMespuma,
  alphabetChangeEndzustand,
  alphabetDeleteCustom,
  alphabetDeleteZustand,
  alphabetGenerateBand,
  alphabetPushToCustom,
  alphabetPushToDialogOptions,
  alphabetPushToIdxZustand,
  tableAddEditorRow,
  tableCheckWarning,
  tableDeleteAll,
  tableSetActiveState,
} from "../../redux/generalStore";
import {
  bandChangeItemAt,
  bandChangeItemAtMespuma,
  bandDeleteAll,
  bandDeleteAllMespuma,
  BandItemToChange,
  BandItemToChangeMespuma,
} from "../../redux/bandStore";
import Row from "../Zustandsüberführungsfunktion/Row";
import { FiDownload, FiSave, FiUpload } from "react-icons/all";
import { Tab } from "@headlessui/react";
import Tutorial from "./Tutorial";
import { cartesianProduct } from "../../interfaces/CommonFunctions";
import i18next from "i18next";
import {useTranslation} from "react-i18next";

interface tableZustand {
  [key: string]: tableZeichen;
}
interface tableZeichen {
  [key: string]: string[];
}

export default function AceJsonEditor(props: CodeEditorProps) {
  const dispatch = useDispatch();

  const currentMode = useSelector((state: RootState) => state.general.mode);

  // Editor content
  const currentBand = useSelector((state: RootState) => state.band.currentBand);
  const currentMespumaBand = useSelector(
    (state: RootState) => state.band.mespumaBand
  );
  const anzahlSpuren = useSelector(
    (state: RootState) => state.general.anzahlSpuren
  );
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
  const initTable = useSelector((state: RootState) => state.general.rows);

  const initRows = useSelector((state: RootState) => state.general.rows);

  // @TODO convert and insert current Table
  const [tempEditorText, setTempEditorText] = useState(
    `{
  "band":{
    "input":[` +
      convertCurrentBand() +
      `]
  },
  "specifications":{
    "alphabet":[` +
      convertCurrentAlphabet() +
      `],
    "states":[` +
      convertZustandsmenge() +
      `],
    "startState":[` +
      convertAnfangsZustand() +
      `],
    "endStates":[` +
      convertEndZustand() +
      `]
  },
  "table":{             
    ` +
      convertCurrentTable() +
      `
  }
}`
  );

  // following functions are used to convert stored Data, to use in Editor
  function convertCurrentBand() {
    if (currentMode === "mespuma") {
      let mBand = "";
      currentMespumaBand.forEach((band, idx) => {
        mBand += "[" + band.map(({ value }) => `"${value}"`).join(",");
        mBand += currentMespumaBand.length - 1 === idx ? "]" : "],";
      });
      return mBand;
    } else {
      return currentBand.map(({ value }) => `"${value}"`).join(",");
    }
  }

  function convertCurrentAlphabet() {
    return currentAlphabet.alphabet.map(({ value }) => `"${value}"`).join(",");
  }

  function convertZustandsmenge() {
    return initZustandsmenge.map(({ value }) => `"${value}"`).join(",");
  }

  function convertAnfangsZustand() {
    return `"${initAnfangsZustand.value}"`;
  }

  function convertEndZustand() {
    return initEndZustand.map(({ value }) => `"${value}"`).join(",");
  }

  function convertCurrentTable() {
    //ToDo richtig einrücken
    let lastZustand = "q1";
    //der muss eingerückt werden jaja
    let finalString = `"q1":{}`;
    if (initTable.length > 0) {
      initTable.forEach((row) => {
        let tempZustand = row.cells[0].value as Zustand;
        let tempToBeZustand = row.cells[2].value as Zustand;
        let tempDirection = row.cells[4].value as Direction;
        //wenn es Zustand schon gibt
        if (lastZustand === tempZustand.value) {
          let tempIdx = finalString.search(`"${lastZustand}":{`) + 6;
          let tempString = `\n\t\t\t"${row.cells[1].value}":["${tempToBeZustand.value}", "${row.cells[3].value}", "${tempDirection.label}"],`;
          finalString =
            finalString.slice(0, tempIdx) +
            tempString +
            finalString.slice(tempIdx);
          lastZustand = tempZustand.value;
          //TODO richtige Reihenfolge
          // let tempIdx = finalString.search(`"${lastZustand}":{}`)
          // let tempString = `\n"${row.cells[1].value}":["${tempToBeZustand.value}, ${row.cells[3].value}"", "${tempDirection.label}""],`
          // if(tempIdx !== undefined){
          //     tempIdx = tempIdx + 6
          //     finalString = finalString.slice(0, tempIdx) + tempString + finalString.slice(tempIdx);
          // } else{
          //    tempIdx = finalString.search(`"${lastZustand}":{`) + 6
          //    let lastIdx = finalString.indexOf('],}', tempIdx) + 2;
          //    finalString = finalString.slice(0, lastIdx) + tempString + finalString.slice(lastIdx);
          // }
        }
        //wenn Zustand neu hinzugefügt werden muss
        else {
          finalString =
            finalString +
            `,\n\t\t"${tempZustand.value}":{\n\t\t\t"${row.cells[1].value}":["${tempToBeZustand.value}", "${row.cells[3].value}", "${tempDirection.label}"]\n\t\t}`;
          lastZustand = tempZustand.value;
        }
        finalString = finalString.replace("],}", "]\n\t\t}");
      });
    } else {
      finalString = "";
    }
    finalString = finalString.replace("],}", "]\n}");
    return finalString;
  }

  // function to close the Editor
  function toggleEditor() {
    props.toggleEditor();
  }

  // function to convert Editor content to JSON and save entries to store
  function parseToJSON() {
    if (tempEditorText) {
      try {
        let json = JSON.parse(tempEditorText);

        // save alphabet from editor to store
        // json.specifications.alphabet...
        const alphabet = json.specifications.alphabet;

        if (currentMode === "mespuma") {
          dispatch(bandDeleteAllMespuma());
          // save Band to store
          // json.band.input...
          const bands = json.band.input;

          bands.forEach((bandItems: string[], bandIndex: number) => {
            for (let index = 0; index < bandItems.length; index++) {
              const temp: BandItemToChangeMespuma = {
                bandIndex: bandIndex,
                index: index,
                value: bandItems[index],
                label: bandItems[index],
              };
              dispatch(bandChangeItemAtMespuma(temp));
            }
          });

          if (alphabet.length > 0) {
            dispatch(alphabetDeleteCustom());
            alphabet.forEach((value: string) => {
              dispatch(alphabetPushToCustom(value));
            });
            dispatch(alphabetPushToDialogOptions(alphabet.toString()));

            let literalArr: string[] = [];

            alphabet.forEach((literal: string) => {
              literalArr.push(literal);
            });

            literalArr.push("B");

            let combinationArr: string[][] = [];

            for (let i = 0; i < anzahlSpuren; i++) {
              combinationArr.push(literalArr);
            }

            let cartesianArr = cartesianProduct(combinationArr);

            let finalBandAlphabet: string[] = [];

            cartesianArr.forEach((element: any[]) => {
              let el = "(" + element.join() + ")";
              finalBandAlphabet.push(el);
            });

            dispatch(
              alphabetChangeCurrentMespuma({
                cartesian: finalBandAlphabet,
                alphabet: alphabet,
              })
            );
          } else {
            alert(i18next.t("codeEditor.warningEmptyIsNotAllowed"));
          }
        } else {
          alert(i18next.t("codeEditor.warningEmptyIsNotAllowed"));
        }

        //save states from editor to store
        //json.specifications.states...
        initZustandsmenge.forEach((_value) => {
          // delete old store states
          dispatch(alphabetDeleteZustand());
        });

        const states = json.specifications.states;

        states.forEach((value: string) => {
          //push new states to store
          dispatch(alphabetPushToIdxZustand(value));
        });

        // save Anfangszustand from editor to store
        const newAnfangszustand = new Zustand(
          json.specifications.startState[0],
          json.specifications.startState[0],
          true,
          false,
          false
        );
        dispatch(alphabetChangeAnfangszustand(newAnfangszustand));
        dispatch(tableSetActiveState(initAnfangsZustand));

        // save Endzustand to store
        // json.specifications.endStates...
        // console.log(json.specifications.endStates);
        const endStates = json.specifications.endStates;
        let temp: Zustand[] = [];
        for (let index = 0; index < endStates.length; index++) {
          let startState = false;
          if (endStates[index] == json.specifications.startState) {
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

        // save table to store
        // first step -> delete oldTable
        dispatch(tableDeleteAll());
        // json.table...
        Object.entries(json.table).forEach(([zustandName, zustandArray]) => {
          let tempZustandArray = zustandArray as tableZeichen;
          Object.entries(tempZustandArray).forEach(
            ([zeichenName, zeichenArray]) => {
              let tempTableRowToAdd: tableRowToAdd = {
                zustand: "",
                lese: "",
                neuerZustand: "",
                schreibe: "",
                gehe: "",
              };
              tempTableRowToAdd.zustand = zustandName;
              tempTableRowToAdd.lese = zeichenName;
              tempTableRowToAdd.neuerZustand = zeichenArray[0];
              tempTableRowToAdd.schreibe = zeichenArray[1];
              tempTableRowToAdd.gehe = zeichenArray[2];

              dispatch(tableAddEditorRow(tempTableRowToAdd));
            }
          );
        });

        if (currentMode === "mespuma") {
          let literalArr: string[] = [];

          alphabet.forEach((literal: string) => {
            literalArr.push(literal);
          });

          literalArr.push("B");

          let combinationArr: string[][] = [];

          for (let i = 0; i < anzahlSpuren; i++) {
            combinationArr.push(literalArr);
          }

          let cartesianArr = cartesianProduct(combinationArr);
          dispatch(
            tableCheckWarning({
              rows: initRows,
              alphabet: cartesianArr,
            })
          );
        } else {
          dispatch(
            tableCheckWarning({
              rows: initRows,
              alphabet: alphabet,
            })
          );
        }

        toggleEditor();
      } catch (e) {
        // Error message is shown, if the entered code in editor is no valid JSON
        alert(
            i18next.t("codeEditor.warningNoValidJSON") + " \n" +
            e
        );
      }
    }
  }

  // Editor value
  function onChange(newValue: any) {
    setTempEditorText(newValue);
  }

  useEffect(() => {
    const completer = {
      getCompletions: function (
        editor: any,
        session: any,
        pos: any,
        prefix: any,
        callback: (
          arg0: null,
          arg1: { caption: string; snippet: string; type: string }[]
        ) => void
      ) {
        const completions = [
          {
            caption: "q1",
            snippet: `"q1":{}`,
            type: "snippet",
          },
          {
            caption: "band",
            snippet: `"band":{
    "input":["B","B","B","B","B","B","B","B"]
  },`,
            type: "snippet",
          },
          {
            caption: "specifications",
            snippet: `"specifications":{
    "alphabet":[],
    "states":[],
    "startState":[],
    "endStates":[]
  },`,
            type: "snippet",
          },
          {
            caption: "alphabet",
            snippet: `"alphabet":[],`,
            type: "snippet",
          },
          {
            caption: "alphabet_1_#",
            snippet: `"alphabet":["1","#"],`,
            type: "snippet",
          },
          {
            caption: "alphabet_1_0",
            snippet: `"alphabet":["1","0"],`,
            type: "snippet",
          },
          {
            caption: "states",
            snippet: `"states":[],`,
            type: "snippet",
          },
          {
            caption: "states_q1_q2",
            snippet: `"states":["q1", "q2"],`,
            type: "snippet",
          },
          {
            caption: "startState",
            snippet: `"startState":[],`,
            type: "snippet",
          },
          {
            caption: "startState_q1",
            snippet: `"startState":["q1"],`,
            type: "snippet",
          },
          {
            caption: "endStates",
            snippet: `"endStates":[],`,
            type: "snippet",
          },
          {
            caption: "endStates_q2",
            snippet: `"endStates":["q2"],`,
            type: "snippet",
          },
          {
            caption: "table",
            snippet: `"table":{
            
}`,
            type: "snippet",
          },
          {
            caption: "example",
            snippet: `{
  "band":{
    "input":["B","B","1","#","1","B","B","B"]
  },
  "specifications":{
    "alphabet":["1","#"],
    "states":["q1","q2","q3","q4","q5"],
    "startState":["q1"],
    "endStates":["q5"]
  },
  "table":{             
    "q1":{
      "#":["q2", "#", "R"],
      "1":["q1", "1", "R"]
    },
    "q2":{
      "B":["q4", "B", "L"],
      "1":["q3", "#", "L"]
    },
    "q3":{
      "#":["q1", "1", "R"]
    },
    "q4":{
      "B":["q5", "B", "R"],
      "#":["q4", "B", "L"],
      "1":["q4", "1", "L"]
    },
    "q5":{
      "B":["q5", "B", "R"]
    }
  }
}`,
            type: "snippet",
          },
        ];

        completions.forEach((i) => {
          completions.push({
            caption: i.caption,
            snippet: i.snippet,
            type: i.type,
          });
        });
        callback(null, completions);
      },
    };
    setCompleters([completer]);
  }, []);

  // file download
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      tempEditorText
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "turingmachine.json";
    link.click();
  };

  // file upload
  const inputRef = useRef(null);
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const jsonFile = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const fileContent = fileReader.result;
      if (fileContent) {
        setTempEditorText(fileContent.toString());
      }
    };
    fileReader.readAsText(jsonFile);
    // clear fileinput
    // @ts-ignore
    event.target.value = null;
  };
  const fileUpload = () => {
    // @ts-ignore
    inputRef.current.click();
  };

  //Internationalization
  const { t } = useTranslation(["general"])

  return (
    <div>
      <div
        id="defaultModal"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-gray-400 dark:bg-gray-500"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative w-full max-w-7xl h-full md:h-auto">
          <div className="relative bg-gray-700 rounded-lg shadow">
            <div className="flex items-center p-2 rounded-t dark:border-gray-600">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
                onClick={toggleEditor}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule={"evenodd"}
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule={"evenodd"}
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <Tab.Group>
              <Tab.List>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? "bg-thm-primary2 text-white hover:bg-thm-primary2 rounded-b-none"
                          : "bg-thm-primary text-white rounded-b-none"
                      }
                    >
                      Code-Editor
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? "bg-thm-primary2 text-white hover:bg-thm-primary2 rounded-b-none"
                          : "bg-thm-primary text-white rounded-b-none"
                      }
                    >
                      Tutorial
                    </button>
                  )}
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="text-left min-h-[300px]">
                    <AceEditor
                      mode="json5"
                      theme="twilight"
                      onChange={onChange}
                      name="json-editor"
                      fontSize={16}
                      width={"100%"}
                      showPrintMargin={true}
                      showGutter={true}
                      editorProps={{ $blockScrolling: true }}
                      value={tempEditorText}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                      }}
                    />
                    <div className="flex items-center justify-center p-2 space-x-2 rounded-b border-gray-200 dark:border-gray-600">
                      <button
                        data-modal-toggle="defaultModal"
                        type="button"
                        onClick={parseToJSON}
                        className="bg-thm-primary"
                      >
                        konfigurieren
                      </button>
                      <button
                        data-modal-toggle="defaultModal"
                        type="button"
                        onClick={toggleEditor}
                        className="bg-thm-secondary hover:bg-thm-primary2"
                      >
                        abbrechen
                      </button>
                      <button
                        data-modal-toggle="defaultModal"
                        type="button"
                        onClick={exportData}
                        className="bg-thm-primary"
                      >
                        <FiDownload />
                      </button>
                      <button onClick={fileUpload}>
                        <FiUpload />
                      </button>
                      <input
                        hidden
                        ref={inputRef}
                        type="file"
                        accept={".json"}
                        onChange={onFileInputChange}
                      />
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="p-6 space-y-6 text-left bg-white max-h-[500px] overflow-y-auto">
                    <Tutorial />
                  </div>
                  <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"></div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
