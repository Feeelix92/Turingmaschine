import { createRef, Key, RefObject, useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import {
  CellProps,
  Direction,
  directions,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import { RootState } from "../../redux/store";
import {
  initialZustand3,
  maschineChangeExecutable,
  tableCheckWarning,
  tableUpdateCell,
  tableUpdateRowIsFinal,
} from "../../redux/generalStore";
import EditField from "./EditField";
import ZustandSelect from "./ZustandSelect";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction/
import "react-toastify/dist/ReactToastify.css";

export default function Cell(props: CellProps) {
  const mode = useSelector((state: RootState) => state.general.mode);
  const wrapperRef: RefObject<HTMLTableCellElement> = createRef();

  const dispatch = useDispatch();

  // needed if use alternative
  
  // const alphabet = useSelector(
  //   (state: RootState) => state.general.bandAlphabet
  // );

  const temp = [initialZustand3];

  //Internationalization
  const { t } = useTranslation(["general"]);

  /////////// States from State ///////////
  const zustandsmenge = useSelector(
    (state: RootState) => state.general.zustandsmenge
  );
  let states =
    mode !== "toiletpaper" ? zustandsmenge.concat(temp) : zustandsmenge;

  useEffect(() => {
    states = zustandsmenge;
    const failure = checkWarningModus();

    if (failure !== props.warningMode) {
      // alternative if other is not working

      // const tempAlphabet: string[] = [];
      // alphabet.forEach((entry) => {
      //   tempAlphabet.push(entry.value);
      // });
      // dispatch(tableCheckWarning({ rows: rows, alphabet: tempAlphabet }));

      // changed cause warning appeared

      dispatch(
        tableUpdateCell({
          cellIndex: props.index,
          rowIndex: props.rowIndex,
          value: props.value,
          warningMode: failure,
        })
      );
    }
  }, [zustandsmenge]);

  /////////// finalStates from State ///////////
  const endzustandsMenge = useSelector(
    (state: RootState) => state.general.endZustand
  );
  let finalStates = endzustandsMenge;
  useEffect(() => {
    finalStates = endzustandsMenge;
    const failure = checkWarningModus();
    if (failure !== props.warningMode) {
      dispatch(
        tableUpdateCell({
          cellIndex: props.index,
          rowIndex: props.rowIndex,
          value: props.value,
          warningMode: failure,
        })
      );
    }
    if (props.value instanceof Zustand) {
      let foundInFinal = false;

      finalStates.forEach((state) => {
        if (props.value instanceof Zustand) {
          if (state.value === props.value.value) {
            foundInFinal = true;
            setFinal(true);
          }
        }
      });
      if (!foundInFinal) {
        setFinal(false);
      }
    }
  }, [endzustandsMenge]);

  /////////// Bandalphabet from State ///////////
  const bandAlphabet = useSelector(
    (state: RootState) => state.general.bandAlphabet
  );
  let bALphabet = bandAlphabet;
  useEffect(() => {
    bALphabet = bandAlphabet;
    const failure = checkWarningModus();
    if (failure !== props.warningMode) {
      dispatch(
        tableUpdateCell({
          cellIndex: props.index,
          rowIndex: props.rowIndex,
          value: props.value,
          warningMode: failure,
        })
      );
    }
  }, [bandAlphabet]);

  function handleChange(
    newValue: OnChangeValue<Direction | Zustand, false>,
    _actionMeta: ActionMeta<Direction | Zustand>
  ) {
    if (newValue) {
      const failure = checkWarningModus(newValue);
      if (
        (mode == "mespuma" || mode == "default" || mode == "toiletpaper") &&
        (props.index === 1 || props.index === 3)
      ) {
        dispatch(
          tableUpdateCell({
            cellIndex: props.index,
            rowIndex: props.rowIndex,
            value: newValue.value,
            warningMode: failure,
          })
        );
      } else {
        dispatch(
          tableUpdateCell({
            cellIndex: props.index,
            rowIndex: props.rowIndex,
            value: newValue,
            warningMode: failure,
          })
        );
      }
    }
  }

  function setFinal(newValue: boolean) {
    dispatch(
      tableUpdateRowIsFinal({
        cellIndex: props.index,
        rowIndex: props.rowIndex,
        value: newValue,
      })
    );
  }

  function checkWarningModus(newValue?: any) {
    let tempVar = newValue ? newValue : props.value;
    if (tempVar instanceof Zustand) {
      let tempBool = states.some((value) => {
        let val = tempVar as Zustand;
        return value.value === val.value;
      });
      if (tempBool) {
        return false;
      } else {
        dispatch(maschineChangeExecutable(false));
        return true;
      }
    } else if (!(tempVar instanceof Direction)) {
      let tempBool = bALphabet.some((value) => {
        if (tempVar.value) {
          return value.value === tempVar.value;
        } else {
          return value.value === tempVar;
        }
      });
      if (tempBool) {
        return false;
      } else {
        dispatch(maschineChangeExecutable(false));
        return true;
      }
    } else {
      return false;
    }
  }

  const placeholderTP = bALphabet.find((e) => e.value === props.value);
  const placeholderTpMultiLang = () => {
    if (placeholderTP?.label === "\u26AA") {
      return "\u26AA";
    }
    if (placeholderTP?.label === "\u26AB") {
      return "\u26AB";
    }
    if (placeholderTP?.label === "\u2205") {
      return "\u2205";
    }
  };

  return (
    <td
      ref={wrapperRef}
      className="px-2 py-2 w-1/6 whitespace-nowrap text-sm text-gray-900 border-r flex justify-center items-center"
    >
      {props.value instanceof Zustand ? (
        <ZustandSelect
          states={states}
          current={props.value}
          // @ts-ignore
          updateValue={handleChange}
        />
      ) : (
        ""
      )}

      {props.value instanceof Direction ? (
        <Select
          value={props.value}
          blurInputOnSelect={false}
          className={"text-black text-base"}
          onChange={handleChange}
          options={directions}
          menuPortalTarget={document.querySelector("body")}
          isSearchable={false}
          hideSelectedOptions={true}
        />
      ) : (
        ""
      )}
      {mode == "default" && typeof props.value === "string" ? (
        <Select
          value={
            bALphabet.filter((item) => item.label === props.value)[0]
              ? bALphabet.filter((item) => item.label === props.value)[0]
              : { value: props.value, label: props.value, warningMode: true }
          }
          blurInputOnSelect={false}
          className={"text-black text-base"}
          onChange={handleChange}
          options={bALphabet}
          menuPortalTarget={document.querySelector("body")}
          isSearchable={false}
          hideSelectedOptions={true}
        />
      ) : (
        ""
      )}
      {/* Toilettenpapiermodus */}
      {mode == "toiletpaper" && typeof props.value === "string" ? (
        <Select
          value={bALphabet.filter(
            (item) => item.label === placeholderTpMultiLang()
          )}
          blurInputOnSelect={false}
          className={"text-black text-base"}
          onChange={handleChange}
          options={bALphabet}
          menuPortalTarget={document.querySelector("body")}
          isSearchable={false}
          hideSelectedOptions={true}
        />
      ) : (
        ""
      )}

      {/* Mehrspurenmaschine:  */}
      {mode == "mespuma" && typeof props.value === "string" ? (
        <Select
          value={
            bALphabet.filter((item) => item.label === props.value)[0]
              ? bALphabet.filter((item) => item.label === props.value)[0]
              : { value: props.value, label: props.value, warningMode: true }
          }
          blurInputOnSelect={false}
          className={"text-black text-base"}
          onChange={handleChange}
          options={bALphabet.filter(
            (Eingabealphabet) => Eingabealphabet.value.length > 1
          )}
          menuPortalTarget={document.querySelector("body")}
          isSearchable={false}
          hideSelectedOptions={true}
        />
      ) : (
        ""
      )}

      {props.warningMode ? (
        <IoIosWarning
          color="orange"
          title={t("cell.warningInputValueNotAllowed")}
          size="32"
        />
      ) : null}
    </td>
  );
}
