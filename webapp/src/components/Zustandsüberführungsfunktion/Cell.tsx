import React, { ChangeEvent, Component } from "react";
import { CellProps } from "../../interfaces/CommonInterfaces";
import EditField from "./EditField";
import { EingabelphabetOption } from "../../data/Alphabet";

export default function Cell(props: CellProps) {
  const wrapperRef: React.RefObject<HTMLInputElement> = React.createRef();
  let show = false;
  const options: EingabelphabetOption[] = [];

  function editMode() {
    show = !show;
  }

  function chooseOption(option: string) {
    props.updateCellValue(props.index, option);
  }

  function componentDidMount() {
    document.addEventListener("mousedown", handleClickOutside);
  }

  function componentWillUnmount() {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef) {
      if (
        wrapperRef != null &&
        wrapperRef.current != null &&
        event.target != null &&
        event.target instanceof Node
      ) {
        if (!wrapperRef.current.contains(event.target)) {
          show = false;
        }
      }
    }
  }

  return (
    <td ref={wrapperRef} className="px-6 py-4">
      <input
        type="text"
        name="value"
        id="valueInput"
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300"
        value={props.value}
        onChange={() => props.updateCellValue(props.index, event.target.value)}
        onClick={editMode}
      />
      {show ? <EditField options={options} updateValue={chooseOption} /> : ""}
    </td>
  );
}
