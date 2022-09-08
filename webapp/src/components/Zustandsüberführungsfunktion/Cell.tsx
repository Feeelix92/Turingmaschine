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
} from "../../redux/generalStore";
import EditField from "./EditField";
import ZustandSelect from "./ZustandSelect";

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

  /////////// States from State ///////////
  let states =
    mode !== "toiletpaper" ? zustandsmenge.concat(temp) : zustandsmenge;
  let wStates = watch(store.getState, "general.zustandsmenge");
  store.subscribe(
    wStates((newVal) => {
      states = newVal;

      const failure = checkWarningModus();

      props.updateCellValue(props.index, props.value, failure);
    })
  );

  // check in store after codeEditor push
  /////////// States from State ///////////
  // let rows = initialRows;
  // let wRows = watch(store.getState, "general.rows");
  // store.subscribe(
  //   wRows((newVal) => {
  //     rows = newVal;

  // const failure = checkWarningModus();

  // console.log("rows watcher");

  // props.updateCellValue(props.index, props.value, failure);
  //   })
  // );

  /////////// finalStates from State ///////////
  let finalStates = endzustandsMenge;
  let wFinalStates = watch(store.getState, "general.endZustand");
  store.subscribe(
    wFinalStates((newVal) => {
      finalStates = newVal;

      const failure = checkWarningModus();

      props.updateCellValue(props.index, props.value, failure);

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

      props.updateCellValue(props.index, props.value, failure);
    })
  );

  const [editMode, setEditMode] = useState(false);

  function toggleEditMode() {
    // hide/show the edit-buttons
    setEditMode(!editMode);
  }

  function chooseOption(option: string) {
    // pass chosen options to the parent to update the cell
    props.updateCellValue(props.index, option, props.warningMode);
    // close the edit-buttons
    setEditMode(false);
  }

  function handleChange(newValue: OnChangeValue<Direction | Zustand, false>) {
    if (newValue) {
      // pass chosen options to the parent to update the cell
      if (mode == "mespuma" && (props.index === 1 || props.index === 3)) {
        props.updateCellValue(props.index, newValue.value, props.warningMode);
      } else {
        props.updateCellValue(props.index, newValue, props.warningMode);
      }
    }
  }

  function setFinal(newValue: boolean) {
    props.updateCellValueIsFinal(props.index, newValue);
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
        props.updateCellValue(index, value, props.warningMode);
        allowed = true;
      }
    });

    if (!allowed) {
      alert("Wert ist nicht im Alphabet enthalten!");
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
      className="px-2 py-4 w-1/6 whitespace-nowrap text-sm font-medium text-gray-900 border-r flex justify-center items-center"
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
          className={"text-black p-3 text-base"}
          onChange={handleChange}
          options={directions}
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
            "w-full rounded text-gray-700 focus:outline-none items-center border rounded text-center"
          }
          value={props.value}
          onChange={(e) => checkValue(props.index, e.target.value)}
          onClick={toggleEditMode}
        />
      ) : (
        ""
      )}
      {mode == "toiletpaper" && props.value == "B" && (
        <input
          value={"leer"}
          className={
            "w-full rounded text-gray-700 focus:outline-none items-center border rounded text-center"
          }
        />
      )}
      {mode == "toiletpaper" && props.value == "1" && (
        <input
          value={"weiß"}
          className={
            "w-full rounded text-gray-700 focus:outline-none items-center border rounded text-center"
          }
        />
      )}
      {mode == "toiletpaper" && props.value == "#" && (
        <input
          value={"schwarz"}
          className={
            "w-full rounded text-gray-700 focus:outline-none items-center border rounded text-center"
          }
        />
      )}

      {/* TODO: Mehrspurenmaschine:  */}
      {mode == "mespuma" && typeof props.value === "string" ? (
        <Select
          placeholder={props.value}
          blurInputOnSelect={false}
          className={"text-black p-3 text-base"}
          onChange={handleChange}
          options={eALphabet}
        />
      ) : (
        ""
      )}

      {props.warningMode ? (
        <IoIosWarning
          color="orange"
          title="Dieser Eingabewert ist nicht länger zulässig!"
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
