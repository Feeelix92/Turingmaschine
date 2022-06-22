import React, { useEffect, useState } from "react";
import {
  Direction,
  RowProps,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  initialZustand,
  tableDeleteRow,
  tableUpdateCell,
} from "../../redux/tableStore";
import { RootState } from "../../redux/store";
import Cell from "./Cell";

export default function Row(props: RowProps) {
  // create flat copy of all existing cells
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(props.isFinal);
  const test = useSelector((state: RootState) => state.table.rows[0].cells);

  function setCellValue(index: React.Key, value: string | Zustand | Direction) {
    // pass new data to table to update its rows-array

    if (typeof value === "string") {
      dispatch(
        tableUpdateCell({
          cellIndex: index,
          rowIndex: props.index,
          value: value,
        })
      );
    } else if (value instanceof Direction) {
      const tempDirection = new Direction(value.label, value.value);
      dispatch(
        tableUpdateCell({
          cellIndex: index,
          rowIndex: props.index,
          value: tempDirection,
        })
      );
    } else {
      const tempZustand = new Zustand(
        value.label,
        value.value,
        value.anfangszustand,
        value.endzustand
      );
      dispatch(
        tableUpdateCell({
          cellIndex: index,
          rowIndex: props.index,
          value: tempZustand,
        })
      );
    }
  }

  useEffect(() => {
    if (props.isFinal === true) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [props.isFinal]);

  return (
    <tr className="border-b flex w-full hover:bg-gray-100">
      {visible === true
        ? props.cells
            .slice(0, 2)
            .map((value, key: React.Key) => (
              <Cell
                key={key}
                value={value.value}
                index={key}
                showEditField={value.editField}
                updateCellValue={setCellValue}
              />
            ))
        : props.cells.map((value, key: React.Key) => (
            <Cell
              key={key}
              value={value.value}
              index={key}
              showEditField={value.editField}
              updateCellValue={setCellValue}
            />
          ))}
      {visible === true ? (
        <td className="py-4 w-3/6 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
          STOPP
        </td>
      ) : null}
      <td className="py-4 w-1/6 whitespace-nowrap text-sm font-medium text-gray-900">
        <a
          href="#"
          className="w-full min-w-full text-gray-700 focus:outline-none items-center"
          onClick={() => dispatch(tableDeleteRow(props.index))}
        >
          <FaTrash />
        </a>
      </td>
    </tr>
  );
}
