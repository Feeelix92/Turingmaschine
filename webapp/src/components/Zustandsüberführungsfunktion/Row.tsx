import React from "react";
import { Direction, RowProps, Zustand } from "../../interfaces/CommonInterfaces";
import Cell from "./Cell";
import { FaTrash } from "react-icons/fa";

export default function Row(props: RowProps) {
  function setCellValue(index: React.Key, value: string | Zustand | Direction) {
    // create flat copy of all existing cells
    let cellCopy = props.cells.slice(0, props.cells.length);

    // overwrite cells at certain index with new value
    cellCopy[index as number].value = value;

    // pass new data to table to update its rows-array
    props.updateRow(props.index, cellCopy);
  }

  function setFinal() {
    // pass new data to table to update its rows-array
    props.setFinal(props.index);
  }

  return (
    <tr
      className="border-b flex w-full hover:bg-gray-100"
      onDoubleClick={() => setFinal()}
    >
      {props.cells.map((value, key: React.Key) => (
        <Cell
          key={key}
          value={value.value}
          index={key}
          alphabet={props.alphabet}
          showEditField={value.editField}
          updateCellValue={setCellValue}
        />
      ))}
      <td className="py-4 w-1/6 whitespace-nowrap text-sm font-medium text-gray-900">
        <a
          href="#"
          className="w-full min-w-full text-gray-700 focus:outline-none items-center"
          onClick={props.deleteRow}
        >
          <FaTrash />
        </a>
      </td>
    </tr>
  );
}
