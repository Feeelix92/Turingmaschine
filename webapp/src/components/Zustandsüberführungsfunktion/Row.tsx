import { Component } from "react";
import { RowProps } from "../../interfaces/CommonInterfaces";
import Cell from "./Cell";

export default function Row(props: RowProps) {
  function setCellValue(index: React.Key, value: string) {
    let cellCopy = props.cells.slice(0, props.cells.length);

    cellCopy[index as number] = value;

    console.log(cellCopy);

    props.updateRow(props.index, cellCopy);
  }

  return (
    <tr className="bg-white hover:bg-gray-20 dark:hover:bg-gray-200">
      {props.cells.map((value: string, key: React.Key) => (
        <Cell
          key={key}
          value={value}
          index={key}
          alphabet={props.alphabet}
          updateCellValue={setCellValue}
        />
      ))}
      <td className="px-6 py-4 text-right">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={props.deleteRow}
        >
          Delete
        </a>
      </td>
    </tr>
  );
}
