import React, { Key, useEffect } from "react";
import { useSelector } from "react-redux";
import Select, { OnChangeValue } from "react-select";
import {
  CellProps,
  Direction,
  directions,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import { RootState } from "../../redux/store";
import EditField from "./EditField";

export default function Cell(props: CellProps) {
  const wrapperRef: React.RefObject<HTMLTableCellElement> = React.createRef();
  const zustandsmenge = useSelector(
    (state: RootState) => state.general.zustandsmenge
  );
  const eingabeAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
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

  useEffect(() => {
    // event to handle click outside to hide the edit-buttons
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef) {
        if (
          wrapperRef.current != null && event.target != null &&
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
    eingabeAlphabet.alphabet.map((entry) => {
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

  return (
    <td
      ref={wrapperRef}
      className="px-2 py-4 w-1/6 whitespace-nowrap text-sm font-medium text-gray-900 border-r flex justify-center"
    >
      {props.value instanceof Zustand ? (
        <Select
          placeholder={props.value.value}
          blurInputOnSelect={false}
          className={"text-black p-3 text-base"}
          onChange={handleChange}
          options={zustandsmenge}
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

      {typeof props.value === "string" ? (
        <input
          type="text"
          name="value"
          id="tableValueInput"
          className={"w-full min-w-full rounded text-gray-700 focus:outline-none items-center border rounded text-center"}
          value={props.value}
          onChange={(e) => checkValue(props.index, e.target.value)}
          onClick={toggleEditMode}
        />
      ) : (
        ""
      )}

      {editMode && props.showEditField ? (
        <EditField
          options={eingabeAlphabet.alphabet}
          updateValue={chooseOption}
        />
      ) : (
        ""
      )}
    </td>
  );
}
