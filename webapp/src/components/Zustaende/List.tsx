import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import { Direction, Zustand } from "../../interfaces/CommonInterfaces";
import {
  alphabetChangeAnfangszustand,
  alphabetChangeEndzustand,
  alphabetPushToZustand,
  alphabetDeleteZustand,
  alphabetChangeWarningMode,
  tableCheckWarning,
} from "../../redux/generalStore";
import { RootState, store } from "../../redux/store";
import DropDownSelect from "../Eingabealphabet/DropDownSelect";
import { BiCaretDown, BiCaretUp, IoIosWarning } from "react-icons/all";
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

  ///internationalization
  const { t } = useTranslation(["general"]);

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
        console.log("changed!", newVal);
        final = newVal;
      }
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

  function handleChange(
    newValue: OnChangeValue<Zustand, false>,
    _actionMeta: ActionMeta<Zustand>) {
    if (newValue) {
      newValue.anfangszustand = true;
      dispatch(alphabetChangeAnfangszustand(newValue));
      checkWarningModus();
      console.log(anfangsZustand);
    }
  }
  function handleChangeMulti(
    newValues: OnChangeValue<Zustand, true>,
    _actionMeta: ActionMeta<Zustand>
  ) {
    if (newValues) {
      const endStatesArray = Array.from(newValues.values());
      console.log(endStatesArray);
      dispatch(alphabetChangeEndzustand(endStatesArray));
      checkWarningModus();
      console.log(endZustand);
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
          if (tempHelper) {
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
        payload: final,
      })
    );
    endZustand.forEach((endZustand) => {
      if (endZustand.warningMode) {
        setEndZustandWarningOn(true);
      }
    });
    const tempAlphabet: string[] = [];
    bandAlphabet.forEach((entry) => {
      tempAlphabet.push(entry.value);
    });
    dispatch(tableCheckWarning({ rows: loadedRows, alphabet: tempAlphabet }));
  }

  function changeZustandsmenge(push: boolean) {
    if (!push) {
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
          <div>
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
                "border border-solid bg-gray-100 rounded p-2 col-span-3 lg:col-span-2"
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
                "col-span-2 lg:col-span-1 border border-solid bg-gray-100 rounded p-2 break-all"
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
              "flex grid grid-cols-3 lg:grid-cols-4  gap-5 items-center mt-2 text-left"
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
                // options={zustandsmenge.filter(Zustand => !Zustand.endzustand)}
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
            {/*<div className={"flex col-span-3 lg:col-span-2 justify-between"}>*/}
            <div className={"col-span-3 lg:col-span-2"}>
              {t("list.finalStates")} F = {kA}
              {final.map((value, index) => (
                <span key={index + value.label}>
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
            {/*</div>*/}
            <div className="flex col-span-3 lg:col-span-2">
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
                "text-black font-medium bg-white hover:bg-white text-left border border-solid col-span-3 lg:col-span-2 cursor-pointer p-2 max-h-60 overflow-y-scroll"
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
