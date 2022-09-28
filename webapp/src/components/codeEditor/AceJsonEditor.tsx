import {
  CodeEditorProps,
  Direction,
  tableRowToAdd,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useRef, useState } from "react";
import { RootState, store } from "../../redux/store";
import AceEditor from "react-ace";
import { setCompleters } from "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import {
  alphabetChangeAnfangszustand,
  alphabetChangeCurrentMespuma,
  alphabetChangeEndzustand,
  alphabetClearZustand,
  alphabetDeleteCustom,
  alphabetGenerateBand,
  alphabetPushToCustom,
  alphabetPushToDialogOptions,
  alphabetPushToIdxZustand,
  tableAddEditorRow,
  tableCheckWarning,
  tableDeleteAll,
  tableSetActiveState,
  mespumaPushToSpuren,
  bandResetAnzahlSpuren,
} from "../../redux/generalStore";
import {
  bandAddBandMespuma,
  bandChangeItemAt,
  bandChangeItemAtMespuma,
  bandDeleteAll,
  bandDeleteAllMespuma,
  BandItemToChange,
  BandItemToChangeMespuma,
  bandResetAllMespuma,
  bandSetPointPos,
} from "../../redux/bandStore";
import { FiDownload, FiUpload } from "react-icons/all";
import { Tab } from "@headlessui/react";
import Tutorial from "./Tutorial";
import { cartesianProduct } from "../../interfaces/CommonFunctions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction/
import "react-toastify/dist/ReactToastify.css";
import watch from "redux-watch";

export interface tableZustand {
  [key: string]: tableZeichen;
}
export interface tableZeichen {
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
  const setPointerAt = (index: number) => {
    dispatch(bandSetPointPos(index));
  };

  let anzahlSpuren = useSelector(
    (state: RootState) => state.general.anzahlSpuren
  );
  let wSpuren = watch(store.getState, "general.anzahlSpuren");
  store.subscribe(
    wSpuren((newVal, oldVal) => {
      if (newVal != oldVal) {
        anzahlSpuren = newVal;
      }
    })
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

  /////////// Band from State MeSpuMa ///////////
  let rows = useSelector((state: RootState) => state.general.rows);

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
        props.checkIfOpen(false);

        // save alphabet from editor to store
        // json.specifications.alphabet...
        const alphabet = json.specifications.alphabet;

        if (currentMode === "mespuma") {
          dispatch(bandResetAllMespuma());
          dispatch(bandResetAnzahlSpuren());
          // save Band to store
          // json.band.input...
          const bands = json.band.input;
          for (let i = 1; i < bands.length - 1; i++) {
            dispatch(bandAddBandMespuma());
            dispatch(mespumaPushToSpuren());
          }
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
          // set Pointer at first Element which is not Blank ("ß")
          setPointerAt(getIndexOfFirstValue(bands[0]));

          if (alphabet.length > 0) {
            dispatch(alphabetDeleteCustom());
            alphabet.forEach((value: string) => {
              dispatch(alphabetPushToCustom(value));
            });
            dispatch(alphabetPushToDialogOptions(alphabet.toString()));

            let combinationArr = getCombinationArray(alphabet);
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
            toast.error("" + t("bandItem.warningEmptyIsNotAllowed"), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
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
          // set Pointer at first Element which is not Blank ("ß")
          setPointerAt(getIndexOfFirstValue(bandItems));
          // save alphabet from editor to store
          // json.specifications.alphabet...
          const alphabet = json.specifications.alphabet;
          if (alphabet.length > 0) {
            dispatch(alphabetDeleteCustom());
            alphabet.forEach((value: string) => {
              dispatch(alphabetPushToCustom(value));
            });
            dispatch(alphabetPushToDialogOptions(alphabet.toString()));
            dispatch(alphabetGenerateBand(alphabet));
          } else {
            toast.error("" + t("codeEditor.warningEmptyIsNotAllowed"), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }

        dispatch(alphabetClearZustand());

        const states = json.specifications.states;

        states.forEach((value: any) => {
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
          let combinationArr = getCombinationArray(alphabet);
          let cartesianArr = cartesianProduct(combinationArr);
          dispatch(
            tableCheckWarning({
              rows: rows,
              alphabet: cartesianArr,
            })
          );
        } else {
          const checkAlphabet = alphabet;
          checkAlphabet.push("ß");

          dispatch(
            tableCheckWarning({
              rows: rows,
              alphabet: checkAlphabet,
            })
          );
        }

        toggleEditor();
      } catch (e) {
        // Error message
        toast.error("Error!  " + e, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      reloadPage();
    }
  }

  function isNotBlank(element: string) {
    return element != "ß";
  }

  function getIndexOfFirstValue(array: string[]) {
    return array.findIndex(isNotBlank);
  }

  function getCombinationArray(alphabet: string[]) {
    let literalArr: string[] = [];

    alphabet.forEach((literal: string) => {
      literalArr.push(literal);
    });

    literalArr.push("ß");

    let combinationArr: string[][] = [];

    for (let i = 0; i < anzahlSpuren; i++) {
      combinationArr.push(literalArr);
    }
    return combinationArr;
  }

  // Page reload
  function reloadPage() {
    window.location.reload();
  }

  // Editor value
  function onChange(newValue: any) {
    setTempEditorText(newValue);
  }

  useEffect(() => {
    props.checkIfOpen(true);

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
    "input":["ß","ß","ß","ß","ß","ß","ß","ß"]
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
            caption: "addUn",
            snippet: `{
  "band":{
    "input":["1","#","1","ß","ß","ß","ß","ß"]
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
      "ß":["q4", "ß", "L"],
      "1":["q3", "#", "L"]
    },
    "q3":{
      "#":["q1", "1", "R"]
    },
    "q4":{
      "ß":["q5", "ß", "R"],
      "#":["q4", "ß", "L"],
      "1":["q4", "1", "L"]
    }
  }
}`,
            type: "snippet",
          },
          {
            caption: "mespuma_addBin",
            snippet: `{
  "band":{
    "input":[["ß","1","0","0","1","1","0","ß"],["ß","1","1","1","0","0","0","ß"],["ß","ß","ß","ß","ß","ß","ß","ß"]]
  },
  "specifications":{
    "alphabet":["0","1"],
    "states":["q1","q2","q3","q4"],
    "startState":["q1"],
    "endStates":["q4"]
  },
  "table":{             
    "q1":{
			"(0,0,ß)":["q1", "(0,0,ß)", "R"],
			"(0,1,ß)":["q1", "(0,1,ß)", "R"],
			"(1,0,ß)":["q1", "(1,0,ß)", "R"],
			"(1,1,ß)":["q1", "(1,1,ß)", "R"],
			"(ß,ß,ß)":["q2", "(ß,ß,ß)", "L"]
		},
		"q2":{
			"(0,0,ß)":["q2", "(0,0,0)", "L"],
			"(0,1,ß)":["q2", "(0,1,1)", "L"],
			"(1,0,ß)":["q2", "(1,0,1)", "L"],
			"(1,1,ß)":["q3", "(1,1,0)", "L"],
			"(ß,ß,ß)":["q4", "(ß,ß,ß)", "R"]
		},
		"q3":{
			"(0,0,ß)":["q2", "(0,0,1)", "L"],
			"(0,1,ß)":["q3", "(0,1,0)", "L"],
			"(1,0,ß)":["q3", "(1,0,0)", "L"],
			"(1,1,ß)":["q3", "(1,1,1)", "L"],
			"(ß,ß,ß)":["q4", "(ß,ß,1)", "N"]
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

  //clear Editor
  const clearEditor = () => {
    const emptyString = "";
    setTempEditorText(emptyString);
  };

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
  const { t } = useTranslation(["general"]);

  return (
    <div>
      <div
        id="defaultModal"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-gray-200 dark:bg-gray-200"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative w-full max-w-7xl h-full md:h-auto">
          <div className="relative bg-thm-primary2 rounded-lg shadow">
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
                          ? "bg-thm-primary text-white rounded-b-none pointer-events-none"
                          : "bg-gray-700 hover:bg-gray-900 text-white rounded-b-none"
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
                          ? "bg-thm-primary text-white rounded-b-none pointer-events-none"
                          : "bg-gray-700 hover:bg-gray-900 text-white rounded-b-none"
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
                      {/*Konfigurieren Button*/}
                      <button
                        data-modal-toggle="defaultModal"
                        type="button"
                        onClick={parseToJSON}
                        className="greenButton"
                      >
                        {t("codeEditor.saveButton")}
                      </button>
                      {/*Leeren Button*/}
                      <button
                        data-modal-toggle="defaultModal"
                        type="button"
                        onClick={clearEditor}
                        className="redButton"
                      >
                        {t("codeEditor.clearButton")}
                      </button>
                      {/*Abbrechen Button*/}
                      <button
                        data-modal-toggle="defaultModal"
                        type="button"
                        onClick={toggleEditor}
                        className="redButton"
                      >
                        {t("codeEditor.cancelButton")}
                      </button>
                      <button
                        data-modal-toggle="defaultModal"
                        type="button"
                        onClick={exportData}
                        className="greenButton"
                      >
                        <FiDownload />
                      </button>
                      <button onClick={fileUpload} className={"greenButton"}>
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
                  <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600" />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
