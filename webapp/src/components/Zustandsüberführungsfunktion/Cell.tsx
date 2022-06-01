import React, { Key, useEffect } from "react";
import { CellProps } from "../../interfaces/CommonInterfaces";
import EditField from "./EditField";

export default function Cell(props: CellProps) {
  const wrapperRef: React.RefObject<HTMLTableCellElement> = React.createRef();

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

  useEffect(() => {
    // event to handle click outside to hide the edit-buttons
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef) {
        if (
          wrapperRef != null &&
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
    props.alphabet.map((entry) => {
      if (
        entry.value === value ||
        props.showEditField === false ||
        value === ""
      ) {
        // if its allowed, we pass the new value to the parent to update the cell value
        props.updateCellValue(index, value);
        allowed = true;
      }
    });

    if (allowed === false) {
      alert("Wert ist nicht im Alphabet enthalten!");
    }
  }

  return (
    <td
      ref={wrapperRef}
      className="px-2 py-4 w-1/6 whitespace-nowrap text-sm font-medium text-gray-900 border-r flex justify-center"
    >
      <input
        type="text"
        name="value"
        id="valueInput"
        className="w-full min-w-full rounded text-gray-700 focus:outline-none items-center"
        value={props.value}
        onChange={(e) => checkValue(props.index, e.target.value)}
        onClick={toggleEditMode}
      />
      {editMode && props.showEditField ? (
        <EditField options={props.alphabet} updateValue={chooseOption} />
      ) : (
        ""
      )}
    </td>
  );
}
