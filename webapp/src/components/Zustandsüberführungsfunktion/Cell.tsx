import React, { Key, useEffect } from "react";
import { CellProps } from "../../interfaces/CommonInterfaces";
import EditField from "./EditField";

export default function Cell(props: CellProps) {
  const wrapperRef: React.RefObject<HTMLInputElement> = React.createRef();

  const [editMode, setEditMode] = React.useState(false);

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function chooseOption(option: string) {
    props.updateCellValue(props.index, option);
  }

  useEffect(() => {
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

    props.alphabet.map((entry) => {
      if (entry.value === value) {
        props.updateCellValue(props.index, event.target.value);
        allowed = true;
      }
    });

    if (allowed === false) {
      alert("Wert ist nicht im Alphabet enthalten!");
    }
  }

  return (
    <td ref={wrapperRef}>
      <input
        type="text"
        name="value"
        id="valueInput"
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300"
        value={props.value}
        onChange={() => props.updateCellValue(props.index, event.target.value)}
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
