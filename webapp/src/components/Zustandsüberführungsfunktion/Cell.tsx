import React, { Key, useEffect } from "react";
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
import { initialZustand3, maschineChangeExecutable } from "../../redux/generalStore";
import EditField from "./EditField";
import ZustandSelect from "./ZustandSelect";
import BrickWhite from "../../assets/images/brick_white.svg";

export default function Cell(props: CellProps) {
  
  const mode = useSelector(
    (state: RootState) => state.general.mode
);
  const wrapperRef: React.RefObject<HTMLTableCellElement> = React.createRef();

  const dispatch = useDispatch();

  const zustandsmenge = useSelector(
    (state: RootState) => state.general.zustandsmenge
  );
  const endzustandsMenge = useSelector(
    (state: RootState) => state.general.endZustand
  );
  const initialRows = useSelector((state: RootState) => state.general.rows);

  const temp = [initialZustand3];

  const [warningMode, setWarningMode] = React.useState(false);

  /////////// States from State ///////////
  let states = zustandsmenge.concat(temp);
  let wStates = watch(store.getState, "general.zustandsmenge");
  store.subscribe(
    wStates((newVal) => {
      states = newVal;
      checkWarningModus();
    })
  );

  /////////// States from State ///////////
  let rows = initialRows;
  let wRows = watch(store.getState, "general.rows");
  store.subscribe(
    wRows((newVal) => {
      rows = newVal;
    })
  );

  /////////// States from State ///////////
  let finalStates = endzustandsMenge;
  let wFinalStates = watch(store.getState, "general.endZustand");
  store.subscribe(
    wFinalStates((newVal) => {
      finalStates = newVal;

      checkWarningModus();

      if (props.value instanceof Zustand) {
        let found = false;

        finalStates.forEach((state) => {
          if (props.value instanceof Zustand) {
            if (state.value === props.value.value) {
              found = true;
              handleChange(state);
            }
          }
        });

        if (!found) {
          states.forEach((state) => {
            if (props.value instanceof Zustand) {
              if (state.value === props.value.value) {
                handleChange(state);
              }
            }
          });
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
      checkWarningModus();
    })
  );

  const [editMode, setEditMode] = React.useState(false);

  function toggleEditMode() {
    // hide/show the edit-buttons
    setEditMode(!editMode);
  }

  function chooseOption(option: string) {
    // pass chosen options to the parent to update the cell
    props.updateCellValue(props.index, option);
    // close the edit-buttons
    setEditMode(false);
  }

  function handleChange(newValue: OnChangeValue<Direction | Zustand, false>) {
    if (newValue) {
      // pass chosen options to the parent to update the cell
      props.updateCellValue(props.index, newValue);
    }
  }

  function setWarning(newValue: boolean) {
    setWarningMode(newValue);
    // props.updateCellValue(props.index, newValue);
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
        props.updateCellValue(index, value);
        allowed = true;
      }
    });

    if (!allowed) {
      alert("Wert ist nicht im Alphabet enthalten!");
    }
  }

  function checkWarningModus() {
    if (props.value instanceof Zustand) {
      let tempBool = states.some((value) => {
        let val = props.value as Zustand;
        return value.value === val.value;
      });
      if (tempBool) {
        setWarning(false);
      } else {
        setWarning(true);
        dispatch(maschineChangeExecutable(false));
      }
    } else if (!(props.value instanceof Direction)) {
      let tempBool = eALphabet.some((value) => {
        return value.value === props.value;
      });
      if (tempBool) {
        setWarning(false);
      } else {
        setWarning(true);
        dispatch(maschineChangeExecutable(false));
      }
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
      {mode=="default" &&
        typeof props.value === "string" ? (
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
        )
      }
      {mode=="toiletpaper" &&
        props.value == "B" &&
          <input value={"leer"} className={
            "w-full rounded text-gray-700 focus:outline-none items-center border rounded text-center"
          }/>
      }
      {mode=="toiletpaper" &&
          props.value == "1" &&
          <input value={"weiß"} className={
            "w-full rounded text-gray-700 focus:outline-none items-center border rounded text-center"
          }/>
      }
      {mode=="toiletpaper" &&
          props.value == "#" &&
          <input value={"schwarz"} className={
            "w-full rounded text-gray-700 focus:outline-none items-center border rounded text-center"
          }/>
      }

      {/* TODO: Mehrspurenmaschine:  */}
      {mode=="mespuba" &&
        typeof props.value === "string" ? (
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
        )
      }

      {warningMode ? (
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
