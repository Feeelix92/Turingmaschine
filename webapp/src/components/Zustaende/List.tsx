import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select, { OnChangeValue } from "react-select";
import { Direction, Zustand } from "../../interfaces/CommonInterfaces";
import {
  alphabetChangeAnfangszustand,
  alphabetChangeEndzustand,
  alphabetPushToZustand,
  alphabetDeleteZustand,
  alphabetChangeWarningMode,
  maschineChangeExecutable,
  maschineCheckExecutable,
  tableCheckWarning,
} from "../../redux/generalStore";
import { RootState, store } from "../../redux/store";
import DropDownSelect from "../Eingabealphabet/DropDownSelect";
import {
  BiCaretDown,
  BiCaretUp,
  GiConsoleController,
  IoIosWarning,
} from "react-icons/all";
import watch from "redux-watch";
import { useTranslation } from "react-i18next";

function ConditionsList() {
  /**
   * To check if Accordion opened or closed
   */
  const [isActive, setIsActive] = useState(true);

  /**
   * To show the Zustandsüberführungsfunktion
   */
  const [showZustandsfunktion, setShowZustandsfunktion] = useState(false);

  const alphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );

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

  ///internationalization
  const { t } = useTranslation(["general"]);

  let zustandsmenge: Zustand[] = initZustandsmenge;
  let wZustandsmenge = watch(store.getState, "general.zustandsmenge");
  store.subscribe(
    wZustandsmenge((newVal) => {
      zustandsmenge = newVal;
      // checkWarningModus();
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

  const dispatch = useDispatch();

  const kA = "{";
  const kZ = "}";

  /**
   * Accordion data (Title, Icons)
   */
  const accordionData = {
    title: <h2> {t("list.headline")}</h2>,
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
      const newAnfangszustand = new Zustand(
        newValue.label,
        newValue.value,
        true,
        false,
        false
      );
      dispatch(alphabetChangeAnfangszustand(newAnfangszustand));
      checkWarningModus();
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
      // }
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
    var tempAlphabet: string[] = [];
    alphabet.alphabet.forEach((entry) => {
      tempAlphabet.push(entry.value);
    });
    dispatch(tableCheckWarning({ rows: loadedRows, alphabet: tempAlphabet }));

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
  }

  function changeZustandsmenge(push: boolean) {
    if (push === false) {
      dispatch(alphabetDeleteZustand());
    } else {
      dispatch(alphabetPushToZustand());
    }
    checkWarningModus();
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
          <div>
            <DropDownSelect />
          </div>
          <div
            className={
              "flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <div className={"col-span-2"}>
              {t("list.tapeAlphabetSymbols")} &Gamma; =
            </div>
            <div
              className={
                "border border-solid bg-gray-100 rounded p-2 col-span-2"
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
            <div className={"col-span-2"}>{t("list.states")} Q =</div>
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
              {t("list.initialState")} q0 = {anfangsZustand.value}{" "}
              {anfangsZustand.warningMode ? (
                <IoIosWarning
                  color="orange"
                  title={t("list.warningInitialState")}
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
                menuPortalTarget={document.querySelector("body")}
                isSearchable={false}
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
                {t("list.finalStates")} F = {kA}
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
                  title={t("list.warningFinalState")}
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
                placeholder={t("list.finalStatesSelection")}
                menuPortalTarget={document.querySelector("body")}
                isSearchable={false}
              />
            </div>
          </div>
          <div
            className={
              "flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"
            }
          >
            <span className={"col-span-2"}>
              {t("list.transitionFunction")} &delta; =
            </span>
            <div
              className={
                "text-black font-medium bg-white hover:bg-white text-left border border-solid col-span-2 cursor-pointer p-2 max-h-60 overflow-y-scroll"
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
