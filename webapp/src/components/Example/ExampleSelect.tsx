import { useDispatch, useSelector } from "react-redux";
import Select, { OnChangeValue } from "react-select";
import watch from "redux-watch";
import { cartesianProduct } from "../../interfaces/CommonFunctions";
import {
  CodeExample,
  ExampleSelectProps,
  tableRowToAdd,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import {
  bandChangeItemAt,
  bandChangeItemAtMespuma,
  bandDeleteAll,
  bandDeleteAllMespuma,
  BandItemToChange,
  BandItemToChangeMespuma,
  bandSetPointPos,
} from "../../redux/bandStore";
import {
  alphabetChangeAnfangszustand,
  alphabetChangeCurrentMespuma,
  alphabetChangeEndzustand,
  alphabetDeleteCustom,
  alphabetGenerateBand,
  alphabetPushToCustom,
  alphabetPushToDialogOptions,
  alphabetPushToIdxZustand,
  tableAddEditorRow,
  tableCheckWarning,
  tableDeleteAll,
  tableSetActiveState,
} from "../../redux/generalStore";
import { RootState, store } from "../../redux/store";
import { tableZeichen } from "../codeEditor/AceJsonEditor";
import { toast } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction/
import { useTranslation } from "react-i18next";

export default function ExampleSelect(props: ExampleSelectProps) {
  //Internationalization
  const { t } = useTranslation(["general"]);

  const dispatch = useDispatch();

  const currentMode = useSelector((state: RootState) => state.general.mode);

  // Editor content
  const setPointerAt = (index: number) => {
    dispatch(bandSetPointPos(index));
  };
  const anzahlSpuren = useSelector(
    (state: RootState) => state.general.anzahlSpuren
  );
  const initAnfangsZustand = useSelector(
    (state: RootState) => state.general.anfangsZustand
  );

  /////////// Band from State MeSpuMa ///////////
  let rows = useSelector((state: RootState) => state.general.rows);
  let wRows = watch(store.getState, "general.rows");
  store.subscribe(
    wRows((newVal, oldVal) => {
      if (newVal != oldVal) {
        rows = newVal;
      }
    })
  );

  function isNotBlank(element: string) {
    return element != "\u212c";
  }

  function getIndexOfFirstValue(array: string[]) {
    return array.findIndex(isNotBlank);
  }

  function getCombinationArray(alphabet: string[]) {
    let literalArr: string[] = [];

    alphabet.forEach((literal: string) => {
      literalArr.push(literal);
    });

    literalArr.push("\u212c");

    let combinationArr: string[][] = [];

    for (let i = 0; i < anzahlSpuren; i++) {
      combinationArr.push(literalArr);
    }
    return combinationArr;
  }

  /**
   * function handleChange checks if the selected option has changed
   * @param newValue
   */
  function handleChange(newValue: OnChangeValue<CodeExample, false>) {
    if (newValue) {
      try {
        let json = JSON.parse(newValue.value);

        // save alphabet from editor to store
        // json.specifications.alphabet...
        const alphabet = json.specifications.alphabet;

        if (currentMode === "mespuma" && newValue.type === "mespuma") {
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
          // set Pointer at first Element which is not Blank ("\u212c")
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
          // set Pointer at first Element which is not Blank ("\u212c")
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

        if (currentMode === "mespuma" && newValue.type === "mespuma") {
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
          checkAlphabet.push("\u212c");

          dispatch(
            tableCheckWarning({
              rows: rows,
              alphabet: checkAlphabet,
            })
          );
        }
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
    }
  }

  return (
    <div>
      <div className={"flex gap-5 items-center mt-2"}>
        <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
          {t("calculator.chooseExample")}
        </span>
        <Select
          blurInputOnSelect={true}
          className={
            "block appearance-none w-full bg-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          }
          onChange={handleChange}
          options={props.examples}
          // @ts-ignore
          getOptionLabel={(e) => (
            <div className={"flex items-center place-content-start"}>
              <span className={"m-2"}>{e.label}</span>
            </div>
          )}
          menuPortalTarget={document.querySelector("body")}
          isSearchable={false}
          hideSelectedOptions={true}
          placeholder={t("calculator.chooseExamplePlaceholder")}
        />
      </div>
    </div>
  );
}
