import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select, { OnChangeValue } from "react-select";
import {
  Direction,
  EingabeAlphabet,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import {
  alphabetChangeAnfangszustand,
  alphabetChangeEndzustand,
  alphabetPushToZustand,
  alphabetDeleteZustand,
  alphabetChangeWarningMode,
  maschineChangeExecutable,
  maschineCheckExecutable,
  mespumaPushToSpuren,
  mespumaDeleteSpuren,
  alphabetChangeCurrentMespuma,
} from "../../redux/generalStore";
import { RootState, store } from "../../redux/store";
import DropDownSelect from "../Eingabealphabet/DropDownSelect";
import { BiCaretDown, BiCaretUp, IoIosWarning } from "react-icons/all";
import watch from "redux-watch";
import {
  bandAddBandMespuma,
  bandDeleteBandMespuma,
} from "../../redux/bandStore";
import { cartesianProduct } from "../../interfaces/CommonFunctions";

function ConditionsList() {
  /**
   * To check if Accordion opened or closed
   */
  const [isActive, setIsActive] = useState(true);

  /**
   * To show the Zustandsüberführungsfunktion
   */
  const [showZustandsfunktion, setShowZustandsfunktion] = useState(false);

  const bandAlphabet = useSelector(
    (state: RootState) => state.general.bandAlphabet
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
  const possibleEnd = useSelector(
    (state: RootState) => state.general.zustandsmenge
  );

  // TODO: Spuren-Anzahl:
  const anzahlSpuren = useSelector(
    (state: RootState) => state.general.anzahlSpuren
  );
  let spuren = anzahlSpuren;
  let wSpuren = watch(store.getState, "general.anzahlSpuren");
  store.subscribe(
    wSpuren((newVal) => {
      spuren = newVal;
    })
  );

  let zustandsmenge: Zustand[] = initZustandsmenge;
  let wZustandsmenge = watch(store.getState, "general.zustandsmenge");
  store.subscribe(
    wZustandsmenge((newVal) => {
      zustandsmenge = newVal;
    })
  );
  let anfangsZustand: Zustand = initAnfangsZustand;
  let wAnfangsZustand = watch(store.getState, "general.anfangsZustand");
  store.subscribe(
    wAnfangsZustand((newVal) => {
      anfangsZustand = newVal;
    })
  );
  let endZustand: Zustand[] = initEndZustand;
  let wEndZustand = watch(store.getState, "general.endZustand");
  store.subscribe(
    wEndZustand((newVal) => {
      endZustand = newVal;
      dispatch(maschineCheckExecutable());
    })
  );

  const currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );

  const dispatch = useDispatch();

  const kA = "{";
  const kZ = "}";

  /**
   * Accordion data (Title, Icons)
   */
  const accordionData = {
    title: <h2>Spezifikationen</h2>,
    openAccordion: (
      <button className={"float-left"}>
        <BiCaretDown />
      </button>
    ),
    closeAccordion: (
      <button className={"float-left"}>
        <BiCaretUp />
      </button>
    ),
  };
  const { title, openAccordion, closeAccordion } = accordionData;

  function handleChange(newValue: OnChangeValue<Zustand, false>) {
    if (newValue) {
      // if (!newValue.endzustand) {
      //     const newAnfangszustand = new Zustand(newValue.label, newValue.value, true, false)
      //     dispatch(alphabetChangeAnfangszustand(newAnfangszustand))
      // } else {
      const newAnfangszustand = new Zustand(
        newValue.label,
        newValue.value,
        true,
        false,
        false
      );
      dispatch(alphabetChangeAnfangszustand(newAnfangszustand));
      // dispatch(alphabetClearEndzustand())
      // alert("Bitt vergiss nicht deine Endzustandsmenge neu zu setzen!");
      // }
      checkWarningModus();
      setShowZustandsfunktion(false)
    }
  }

  function handleChangeMulti(newValue: OnChangeValue<Zustand[], false>) {
    if (newValue) {
      // if (newValue.filter(zustand => !zustand.anfangszustand)) {
      let temp: Zustand[] = [];
      newValue.forEach((zustand) => {
        temp.push(
          new Zustand(
            zustand.value,
            zustand.label,
            zustand.anfangszustand,
            true,
            false
          )
        );
      });
      dispatch(alphabetChangeEndzustand(temp));
      checkWarningModus();
      setShowZustandsfunktion(false)
      // }
    }
  }

  const loadedRows = useSelector((state: RootState) => state.general.rows);
  const [zustandsFunktion] = useState([""]);

  function getZustandsFunktion() {
    let tempLenght = zustandsFunktion.length
    for(let i=0; i <= tempLenght; i++){
      zustandsFunktion.pop()
    }
      let tempCellsString = "δ(";
      let tempHelper = true;
      loadedRows.forEach((row) => {
        row.cells.forEach((cell) => {
          if (cell.value instanceof Zustand) {
            tempCellsString = tempCellsString + cell.value.value + ",";
          } else if (cell.value instanceof Direction) {
            tempCellsString = tempCellsString + cell.value.value + ")";
          } else {
            if (tempHelper === true) {
              tempCellsString =
                tempCellsString + cell.value.toString() + ") = (";
              tempHelper = false;
            } else {
              tempCellsString = tempCellsString + cell.value.toString() + ",";
              tempHelper = true;
            }
          }
        });
        zustandsFunktion.push(tempCellsString);
        tempCellsString = "δ(";
      });
    
    setShowZustandsfunktion(!showZustandsfunktion);
  }

  function checkWarningModus() {
    setEndZustandWarningOn(false);
    let tempBool = zustandsmenge.some((value) => {
      return value.value === anfangsZustand.value;
    });
    if (tempBool) {
      dispatch(
        alphabetChangeWarningMode({
          prop: "anfangsZustand",
          value: false,
          payload: anfangsZustand,
        })
      );
    } else {
      dispatch(
        alphabetChangeWarningMode({
          prop: "anfangsZustand",
          value: true,
          payload: anfangsZustand,
        })
      );
    }
    endZustand.forEach((endZustand) => {
      let tempBool2 = zustandsmenge.some((value) => {
        return value.value === endZustand.value;
      });

      if (tempBool2) {
        endZustand.warningMode = false;
      } else {
        endZustand.warningMode = true;
      }
    });
    dispatch(
      alphabetChangeWarningMode({
        prop: "endZustand",
        value: true,
        payload: endZustand,
      })
    );
    endZustand.forEach((endZustand) => {
      if (endZustand.warningMode === true) {
        setEndZustandWarningOn(true);
      }
    });
    setShowZustandsfunktion(false)
  }

  function changeZustandsmenge(push: boolean) {
    if (push === false) {
      dispatch(alphabetDeleteZustand());
    } else {
      dispatch(alphabetPushToZustand());
    }
    checkWarningModus();
    setShowZustandsfunktion(false)
  }

  function addSpur() {
    dispatch(bandAddBandMespuma());

    dispatch(mespumaPushToSpuren());
   

    let literalArr: string[] = [];

    let tempAlphabet = Object.assign(
      [],
      currentAlphabet.alphabet
    ) as EingabeAlphabet[];
    tempAlphabet.push({ value: "B", label: "", warningMode: false });

    tempAlphabet.forEach((literal) => {
      literalArr.push(literal.value);
    });

    let combinationArr: string[][] = [];

    for (let i = 0; i < spuren; i++) {
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
      })
    );
    setShowZustandsfunktion(false)
  }

  function deleteSpur() {
    dispatch(bandDeleteBandMespuma());

    dispatch(mespumaDeleteSpuren());

    let literalArr: string[] = [];

    let tempAlphabet = Object.assign(
      [],
      currentAlphabet.alphabet
    ) as EingabeAlphabet[];
    tempAlphabet.push({ value: "B", label: "", warningMode: false });

    tempAlphabet.forEach((literal) => {
      literalArr.push(literal.value);
    });

    let combinationArr: string[][] = [];

    for (let i = 0; i < spuren; i++) {
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
      })
    );
    setShowZustandsfunktion(false)
  }

  const [endZustandWarningOn, setEndZustandWarningOn] = useState(false);

  return (
    <div
      className={
        "border-solid border rounded bg-white w-screen sm:w-3/4 lg:w-3/4 3xl:w-2/4 p-2 items-center hover:bg-gray-100 col-span-2 max-w-screen-sm"
      }
    >
      <div className={""} onClick={() => setIsActive(!isActive)}>
        <div className={"flex xl:grid xl:grid-cols-3 gap-5 items-center"}>
          <span className={""}>
            {isActive ? closeAccordion : openAccordion}
          </span>
          <span>{title}</span>
        </div>
      </div>
      {isActive && (
        <div className={""}>
          {/* TODO: Auswahl für Anzahl Spuren: */}
          <div
            className={
              "flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <div className={"flex col-span-2 justify-between"}>
              <div>Anzahl Spuren =</div>
            </div>

            <div
              className={
                "border border-solid bg-gray-100 rounded p-2 break-all"
              }
            >
              {anzahlSpuren}
            </div>
            <div className={"flex justify-end gap-2 col-span-1"}>
              <button className={"w-10"} onClick={() => deleteSpur()}>
                -
              </button>
              <button className={"w-10"} onClick={() => addSpur()}>
                +
              </button>
            </div>
          </div>

          <div onClick={() => setShowZustandsfunktion(false)}>
            <DropDownSelect />
          </div>
          <div
            className={
              "flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <div className={"col-span-2"}>Bandalphabet &Gamma; =</div>
            <div
              className={
                "border border-solid bg-gray-100 rounded p-2 col-span-2 max-h-60 overflow-y-scroll"
              }
            >
              {kA}
              {bandAlphabet.map((value, index) => (
                <span key={index}>
                  {value.value}
                  {index === bandAlphabet.length - 1 ? "" : ","}
                </span>
              ))}
              {kZ}
            </div>
          </div>
          <div
            className={
              "flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <div className={"col-span-2"}>Zustandsmenge Q =</div>
            <div
              className={
                "border border-solid bg-gray-100 rounded p-2 break-all"
              }
            >
              {kA}
              {zustandsmenge.map((value, index) => (
                <span key={index}>
                  {value.value}
                  {index === zustandsmenge.length - 1 ? "" : ","}
                </span>
              ))}
              {kZ}
            </div>
            <div className={"flex justify-end gap-2 col-span-1"}>
              <button
                className={"w-10"}
                onClick={() => changeZustandsmenge(false)}
              >
                -
              </button>
              <button
                className={"w-10"}
                onClick={() => changeZustandsmenge(true)}
              >
                +
              </button>
            </div>
          </div>
          <div
            className={
              "flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <div className={"flex col-span-2 justify-between"}>
              Anfangszustand q0 = {anfangsZustand.value}{" "}
              {anfangsZustand.warningMode ? (
                <IoIosWarning
                  color="orange"
                  title="Dieser Zustand ist nicht länger vorhanden!"
                  size="32"
                />
              ) : null}
            </div>
            <div className="flex col-span-2">
              <Select
                placeholder={anfangsZustand.value}
                blurInputOnSelect={false}
                className={"col-span-2"}
                onChange={handleChange}
                options={zustandsmenge}
              />
            </div>
          </div>
          <div
            className={
              "flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <div className={"flex col-span-2 justify-between"}>
              <div>
                Endzustand F = {kA}
                {endZustand.map((value, index) => (
                  <span key={index}>
                    {value.value}
                    {index === endZustand.length - 1 ? "" : ","}
                  </span>
                ))}
                {kZ}
              </div>
              {endZustandWarningOn ? (
                <IoIosWarning
                  color="orange"
                  title="Einer der Endzustände ist nicht länger vorhanden!"
                  size="32"
                />
              ) : null}
            </div>
            <div className="flex col-span-2">
              <Select
                value={endZustand}
                blurInputOnSelect={false}
                className={"col-span-2"}
                onChange={handleChangeMulti}
                options={possibleEnd}
                isMulti={true}
              />
            </div>
          </div>
          <div
            className={
              "flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <span className={"col-span-2"}>
              Zustandsüberführungsfunktion &delta; =
            </span>
            <button
              className={
                "text-black font-medium bg-white hover:bg-white text-left border border-solid col-span-2"
              }
              onClick={() => getZustandsFunktion()}
            >
              {showZustandsfunktion ? (
                <div>
                  {zustandsFunktion.map((value) => (
                    <p key={value}>{value}</p>
                  ))}
                </div>
              ) : (
                "δ:Q×Γ → Q×Γ×{R,L,N}"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConditionsList;
