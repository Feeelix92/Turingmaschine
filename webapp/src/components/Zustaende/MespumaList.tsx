import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select, { ActionMeta, OnChangeValue } from "react-select";
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
  mespumaPushToSpuren,
  mespumaDeleteSpuren,
  alphabetChangeCurrentMespuma,
} from "../../redux/generalStore";
import { RootState, store } from "../../redux/store";
import DropDownSelect from "../Eingabealphabet/DropDownSelect";
import { BiCaretDown, BiCaretUp, IoIosWarning } from "react-icons/all";
import {
  bandAddBandMespuma,
  bandDeleteBandMespuma,
} from "../../redux/bandStore";
import { cartesianProduct } from "../../interfaces/CommonFunctions";
import { useTranslation } from "react-i18next";
import watch from "redux-watch";

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
  // Spuren-Anzahl:
  const anzahlSpuren = useSelector(
    (state: RootState) => state.general.anzahlSpuren
  );
  const zustandsmenge = useSelector(
    (state: RootState) => state.general.zustandsmenge
  );
  const anfangsZustand = useSelector(
    (state: RootState) => state.general.anfangsZustand
  );
  const endZustand = useSelector(
    (state: RootState) => state.general.endZustand
  );
  let final = endZustand;
  let wFinal = watch(store.getState, "general.endZustand");
  store.subscribe(
    wFinal((newVal, oldVal) => {
      if (newVal != oldVal) {
        final = newVal;
      }
    })
  );
  const currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );

  const dispatch = useDispatch();

  const kA = "{";
  const kZ = "}";

  ///internationalization
  const { t } = useTranslation(["general"]);

  /**
   * Accordion data (Title, Icons)
   */
  const accordionData = {
    title: <h2>{t("list.headline")}</h2>,
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
      newValue.anfangszustand = true;
      dispatch(alphabetChangeAnfangszustand(newValue));
      checkWarningModus();
      setShowZustandsfunktion(false);
    }
  }

  function handleChangeMulti(
    newValues: OnChangeValue<Zustand, true>,
    _actionMeta: ActionMeta<Zustand>
  ) {
    if (newValues) {
      const endStatesArray = Array.from(newValues.values());
      dispatch(alphabetChangeEndzustand(endStatesArray));
      checkWarningModus();
      setShowZustandsfunktion(false);
    }
  }

  const loadedRows = useSelector((state: RootState) => state.general.rows);
  let [zustandsFunktion] = useState([""]);

  function getZustandsFunktion() {
    let tempLenght = zustandsFunktion.length;
    for (let i = 0; i <= tempLenght; i++) {
      zustandsFunktion.pop();
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
            tempCellsString = tempCellsString + cell.value.toString() + ") = (";
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

    if (zustandsFunktion.length < 1) {
      zustandsFunktion.push("δ() = ()");
    }

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
    final.forEach((endZustand) => {
      let tempBool2 = zustandsmenge.some((value) => {
        return value.value === endZustand.value;
      });
      endZustand.warningMode = !tempBool2;
    });
    dispatch(
      alphabetChangeWarningMode({
        prop: "endZustand",
        value: true,
        payload: final,
      })
    );
    final.forEach((endZustand) => {
      if (endZustand.warningMode === true) {
        setEndZustandWarningOn(true);
      }
    });
    setShowZustandsfunktion(false);
  }

  function changeZustandsmenge(push: boolean) {
    if (push === false) {
      dispatch(alphabetDeleteZustand());
    } else {
      dispatch(alphabetPushToZustand());
    }
    checkWarningModus();
    setShowZustandsfunktion(false);
  }

  function addSpur() {
    if (anzahlSpuren < 5) {
      dispatch(bandAddBandMespuma());

      dispatch(mespumaPushToSpuren());

      let literalArr: string[] = [];

      let tempAlphabet = Object.assign(
        [],
        currentAlphabet.alphabet
      ) as EingabeAlphabet[];
      tempAlphabet.push({ value: "ß", label: "ß", warningMode: false });

      tempAlphabet.forEach((literal) => {
        literalArr.push(literal.value);
      });

      let combinationArr: string[][] = [];

      for (let i = 0; i < anzahlSpuren + 1; i++) {
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
      setShowZustandsfunktion(false);
    }
  }

  function deleteSpur() {
    dispatch(bandDeleteBandMespuma());

    dispatch(mespumaDeleteSpuren());

    let literalArr: string[] = [];

    let tempAlphabet = Object.assign(
      [],
      currentAlphabet.alphabet
    ) as EingabeAlphabet[];
    tempAlphabet.push({ value: "ß", label: "ß", warningMode: false });

    tempAlphabet.forEach((literal) => {
      literalArr.push(literal.value);
    });

    let combinationArr: string[][] = [];

    for (let i = 0; i < anzahlSpuren - 1; i++) {
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

    setShowZustandsfunktion(false);
  }

  const [endZustandWarningOn, setEndZustandWarningOn] = useState(false);

  return (
    <div
      className={
        "border-solid border rounded bg-white p-2 items-center hover:bg-gray-100 col-span-2"
      }
    >
      <div className={""} onClick={() => setIsActive(!isActive)}>
        <div className={"flex grid grid-cols-3 gap-5 items-center"}>
          <span className={""}>
            {isActive ? closeAccordion : openAccordion}
          </span>
          <span>{title}</span>
        </div>
      </div>
      {isActive && (
        <div className={""}>
          {/* Auswahl für Anzahl Spuren: */}
          <div
            className={
              "flex grid grid-cols-3 lg:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <div className={"flex col-span-1 lg:col-span-2 justify-between"}>
              <div>{t("list.mespumaExtension.NumberOfTracks")} =</div>
            </div>

            <div
              className={
                "col-span-1 border border-solid bg-gray-100 rounded p-2 break-all"
              }
            >
              {anzahlSpuren}
            </div>
            <div className={"flex justify-end gap-2 col-span-1"}>
              <button
                className={`w-10 ${
                  anzahlSpuren > 2 ? "" : "pointer-events-none bg-gray-700"
                }`}
                onClick={() => deleteSpur()}
              >
                -
              </button>
              <button
                className={`w-10 ${
                  anzahlSpuren < 5 ? "" : "pointer-events-none bg-gray-700"
                }`}
                onClick={() => addSpur()}
              >
                +
              </button>
            </div>
          </div>

          <div onClick={() => setShowZustandsfunktion(false)}>
            <DropDownSelect />
          </div>
          <div
            className={
              "flex grid grid-cols-3 lg:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <div className={"col-span-3 lg:col-span-2"}>
              {t("list.tapeAlphabetSymbols")} &Gamma; =
            </div>
            <div
              className={
                "border border-solid bg-gray-100 rounded p-2 col-span-3 lg:col-span-2 max-h-60 overflow-y-scroll"
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
              "flex grid grid-cols-3 lg:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <div className={"col-span-3 lg:col-span-2"}>
              {t("list.states")} Q =
            </div>
            <div
              className={
                "border border-solid bg-gray-100 rounded p-2 break-all col-span-2 lg:col-span-1"
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
                className={`w-10 ${
                  zustandsmenge.length > 1
                    ? ""
                    : "pointer-events-none bg-gray-700"
                }`}
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
              "flex grid grid-cols-3 lg:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <div className={"flex col-span-3 lg:col-span-2 justify-between"}>
              {t("list.initialState")} q0 = {anfangsZustand.value}{" "}
              {anfangsZustand.warningMode ? (
                <IoIosWarning
                  color="orange"
                  title={t("list.warningInitialState")}
                  size="32"
                />
              ) : null}
            </div>
            <div className="flex col-span-3 lg:col-span-2">
              <Select
                value={anfangsZustand}
                blurInputOnSelect={false}
                className={"w-full"}
                onChange={handleChange}
                options={zustandsmenge}
                // filter options to exclude endzustand
                menuPortalTarget={document.querySelector("body")}
                isSearchable={false}
                hideSelectedOptions={true}
                noOptionsMessage={() => t("list.dropdown.noStatesLeftMessage")}
              />
            </div>
          </div>
          <div
            className={
              "flex grid grid-cols-3 lg:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <div className={"flex col-span-3 lg:col-span-2 justify-between"}>
              <div>
                {t("list.finalStates")} F = {kA}
                {final.map((value, index) => (
                  <span key={index}>
                    {value.value}
                    {index === final.length - 1 ? "" : ","}
                  </span>
                ))}
                {kZ}
              </div>
              {endZustandWarningOn ? (
                <IoIosWarning
                  color="orange"
                  title={t("list.warningFinalState")}
                  size="32"
                />
              ) : null}
            </div>
            <div className="flex col-span-3 lg:col-span-2">
              <Select
                blurInputOnSelect={false}
                className={"w-full"}
                onChange={handleChangeMulti}
                options={zustandsmenge}
                value={final}
                // filter options to exclude anfangszustand
                isMulti
                placeholder={t("list.finalStatesSelection")}
                menuPortalTarget={document.querySelector("body")}
                isSearchable={false}
                hideSelectedOptions={true}
                noOptionsMessage={() => t("list.dropdown.noStatesLeftMessage")}
              />
            </div>
          </div>
          <div
            className={
              "flex grid grid-cols-3 lg:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <span className={"col-span-3 lg:col-span-2"}>
              {t("list.transitionFunction")} &delta; =
            </span>
            <div
              className={
                "border border-solid bg-gray-100 rounded p-2 col-span-3 lg:col-span-2 max-h-60 overflow-y-auto cursor-pointer"
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConditionsList;
