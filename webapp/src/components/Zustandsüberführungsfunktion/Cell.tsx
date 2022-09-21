import { createRef, Key, RefObject, useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Select, { OnChangeValue } from "react-select";
import watch from "redux-watch";
import {
  CellProps,
  Direction,
  directions,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import { RootState, store } from "../../redux/store";
import {
  initialZustand3,
  maschineChangeExecutable,
  tableUpdateCell,
  tableUpdateRowIsFinal,
} from "../../redux/generalStore";
import EditField from "./EditField";
import ZustandSelect from "./ZustandSelect";
import { useTranslation } from "react-i18next";
import * as React from "react";
import { ToastContainer, toast } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction/
import "react-toastify/dist/ReactToastify.css";

export default function Cell(props: CellProps) {
  const mode = useSelector((state: RootState) => state.general.mode);
  const wrapperRef: RefObject<HTMLTableCellElement> = createRef();

  const dispatch = useDispatch();

  const zustandsmenge = useSelector(
    (state: RootState) => state.general.zustandsmenge
  );
  const endzustandsMenge = useSelector(
    (state: RootState) => state.general.endZustand
  );

  // const initialRows = useSelector((state: RootState) => state.general.rows);

  const temp = [initialZustand3];

  //Internationalization
  const { t } = useTranslation(["general"]);

  /////////// States from State ///////////
  let states =
    mode !== "toiletpaper" ? zustandsmenge.concat(temp) : zustandsmenge;
  let wStates = watch(store.getState, "general.zustandsmenge");
  store.subscribe(
    wStates((newVal) => {
      states = newVal;
      const failure = checkWarningModus();

      if (failure !== props.warningMode) {
        // props.updateCellValue(props.index, props.value, failure);
        dispatch(
          tableUpdateCell({
            cellIndex: props.index,
            rowIndex: props.rowIndex,
            value: props.value,
            warningMode: failure,
          })
        );
      }
    })
  );

  /////////// finalStates from State ///////////
  let finalStates = endzustandsMenge;
  let wFinalStates = watch(store.getState, "general.endZustand");
  store.subscribe(
    wFinalStates((newVal) => {
      finalStates = newVal;

      const failure = checkWarningModus();

      if (failure !== props.warningMode) {
        // props.updateCellValue(props.index, props.value, failure);
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
    })
  );

  const eingabeAlphabet = useSelector(
    (state: RootState) => state.general.bandAlphabet
  );
  /////////// Eingabealphabet from State ///////////
  let eALphabet = eingabeAlphabet;
  let wEingabeAlphabet = watch(store.getState, "general.bandAlphabet");
  store.subscribe(
    wEingabeAlphabet((newVal) => {
      eALphabet = newVal;

      const failure = checkWarningModus();

      if (failure !== props.warningMode) {
        // props.updateCellValue(props.index, props.value, failure);
        dispatch(
          tableUpdateCell({
            cellIndex: props.index,
            rowIndex: props.rowIndex,
            value: props.value,
            warningMode: failure,
          })
        );
      }
    })
  );

  const [editMode, setEditMode] = useState(false);

  function toggleEditMode() {
    // hide/show the edit-buttons
    setEditMode(!editMode);
  }

  function chooseOption(option: string) {
    const failure = checkWarningModus(option);
    // pass chosen options to the parent to update the cell
    // props.updateCellValue(props.index, option, failure);
    dispatch(
      tableUpdateCell({
        cellIndex: props.index,
        rowIndex: props.rowIndex,
        value: option,
        warningMode: failure,
      })
    );
    // close the edit-buttons
    setEditMode(false);
  }

  function handleChange(newValue: OnChangeValue<Direction | Zustand, false>) {
    if (newValue) {
      const failure = checkWarningModus(newValue);
      if (mode == "mespuma" && (props.index === 1 || props.index === 3)) {
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
    // props.updateCellValueIsFinal(props.index, newValue);
  }

  useEffect(() => {
    // event to handle click outside to hide the edit-buttons
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef) {
        if (
          wrapperRef.current != null &&
          event.target != null &&
          event.target instanceof Node
        ) {
          if (!wrapperRef.current.contains(event.target)) {
            setEditMode(false);
          }
        }
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  function checkValue(index: Key, value: string) {
    let allowed = false;

    // map the passed alphabet to check whether the alphabet contains the new input value
    eingabeAlphabet.map((entry) => {
      if (
        entry.value === value ||
        props.showEditField === false ||
        value === "" ||
        value === "B"
      ) {
        // if its allowed, we pass the new value to the parent to update the cell value
        const failure = checkWarningModus(value);
        // props.updateCellValue(index, value, failure);
        dispatch(
          tableUpdateCell({
            cellIndex: props.index,
            rowIndex: props.rowIndex,
            value: value,
            warningMode: failure,
          })
        );
        allowed = true;
      }
    });

    if (!allowed) {
      toast.error("" + t("bandItem.warningValueNotIncluded"), {
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

  function checkWarningModus(newValue?: Direction | Zustand | String) {
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
      let tempBool = eALphabet.some((value) => {
        return value.value === tempVar;
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

  return (
    <td
      ref={wrapperRef}
      className="px-2 py-4 w-auto whitespace-nowrap text-sm font-medium text-gray-900 border-r flex justify-center items-center"
    >
      {props.value instanceof Zustand ? (
        <ZustandSelect
          states={states}
          current={props.value}
          updateValue={handleChange}
        />
      ) : (
        ""
      )}

      {props.value instanceof Direction ? (
        <Select
          placeholder={props.value.value}
          blurInputOnSelect={false}
          className={"text-black p-3 text-base xl:w-24"}
          onChange={handleChange}
          options={directions}
          menuPortalTarget={document.querySelector("body")}
          isSearchable={false}
        />
      ) : (
        ""
      )}
      {mode == "default" && typeof props.value === "string" ? (
        <input
          type="text"
          name="value"
          id="tableValueInput"
          className={
            "w-full rounded text-gray-700 focus:outline-none items-center border text-center"
          }
          value={props.value}
          onChange={(e) => checkValue(props.index, e.target.value)}
          onClick={toggleEditMode}
        />
      ) : (
        ""
      )}
      {/* onChange needed (to change the value) OR defaultValue instead of value */}
      {mode == "toiletpaper" && props.value == "B" && (
        <input
          value={t("cell.toiletPaperMode.empty")}
          className={
            "w-full rounded text-gray-700 focus:outline-none items-center border text-center"
          }
        />
      )}
      {mode == "toiletpaper" && props.value == "1" && (
        <input
          value={t("cell.toiletPaperMode.white")}
          className={
            "w-full rounded text-gray-700 focus:outline-none items-center border text-center"
          }
        />
      )}
      {mode == "toiletpaper" && props.value == "#" && (
        <input
          value={t("cell.toiletPaperMode.black")}
          className={
            "w-full rounded text-gray-700 focus:outline-none items-center border text-center"
          }
        />
      )}

      {/* Mehrspurenmaschine:  */}
      {mode == "mespuma" && typeof props.value === "string" ? (
        <Select
          placeholder={props.value}
          blurInputOnSelect={false}
          className={"text-black py-3 px-2 text-base xl:w-32"}
          onChange={handleChange}
          options={eALphabet}
          menuPortalTarget={document.querySelector("body")}
          isSearchable={false}
        />
      ) : (
        ""
      )}

      {props.warningMode === true ? (
        <IoIosWarning
          color="orange"
          title={t("cell.warningInputValueNotAllowed")}
          size="32"
        />
      ) : null}

      {editMode && props.showEditField ? (
        <EditField options={eingabeAlphabet} updateValue={chooseOption} />
      ) : (
        ""
      )}
    </td>
  );
}
