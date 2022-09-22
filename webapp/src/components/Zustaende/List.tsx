import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select, {ActionMeta, OnChangeValue} from "react-select";
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

  ///internationalization
  const { t } = useTranslation(["general"]);

  const alphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );

  let zustandsmenge: Zustand[] = initZustandsmenge;
  let wZustandsmenge = watch(store.getState, "general.zustandsmenge");
  store.subscribe(
    wZustandsmenge((newVal) => {
      zustandsmenge = newVal;
      console.log("WATCHER LIST ZUSTANDSMENGE");
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
      newValue.anfangszustand = true;
      dispatch(alphabetChangeAnfangszustand(newValue));
      checkWarningModus();
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
    endZustand.forEach((endZustand) => {
      let tempBool2 = zustandsmenge.some((value) => {
        return value.value === endZustand.value;
      });
      endZustand.warningMode = !tempBool2;
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
    const tempAlphabet: string[] = [];
    alphabet.alphabet.forEach((entry) => {
      tempAlphabet.push(entry.value);
    });
    dispatch(tableCheckWarning({ rows: loadedRows, alphabet: tempAlphabet }));
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
          <div className={"flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"}>
            <div className={"col-span-2"}>
              {t("list.tapeAlphabetSymbols")} &Gamma; =
            </div>
            <div className={"border border-solid bg-gray-100 rounded p-2 col-span-2"}>
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
          <div className={"flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"}>
            <div className={"col-span-2"}>{t("list.states")} Q =</div>
            <div className={"border border-solid bg-gray-100 rounded p-2 break-all"}>
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
          <div className={"flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"}>
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
                className={"w-full"}
                onChange={handleChange}
                options={zustandsmenge}
                // filter options to exclude endzustand
                // options={zustandsmenge.filter(Zustand => !Zustand.endzustand)}
                menuPortalTarget={document.querySelector("body")}
                isSearchable={false}
                hideSelectedOptions={true}
                noOptionsMessage={() => t("list.dropdown.noStatesLeftMessage")}
              />
            </div>
          </div>
          <div className={"flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"}>
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
                blurInputOnSelect={false}
                className={"w-full"}
                onChange={handleChangeMulti}
                options={zustandsmenge}
                // filter options to exclude anfangszustand
                // options={zustandsmenge.filter(Zustand => !Zustand.anfangszustand)}
                isMulti
                placeholder={t("list.finalStatesSelection")}
                menuPortalTarget={document.querySelector("body")}
                isSearchable={false}
                noOptionsMessage={() => t("list.dropdown.noStatesLeftMessage")}
              />
            </div>
          </div>
          <div className={"flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2 text-left"}>
            <span className={"col-span-2"}>
              {t("list.transitionFunction")} &delta; =
            </span>
            <div className={"text-black font-medium bg-white hover:bg-white text-left border border-solid col-span-2 cursor-pointer p-2 max-h-60 overflow-y-scroll"}
                 onClick={() => getZustandsFunktion()}>
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
