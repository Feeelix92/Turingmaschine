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
import { RootState, store } from "../../redux/store";
import Cell from "./Cell";
import watch from "redux-watch";

export default function Row(props: RowProps) {
  // create flat copy of all existing cells
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(props.isFinal);

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
        value.endzustand,
        value.warningModus
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

  const activeRow = useSelector((state: RootState) => state.table.activeRow);
  /////////// Active-Row from State ///////////
  let row = activeRow;
  let wRow = watch(store.getState, "table.activeRow");
  store.subscribe(
    wRow((newVal) => {
      row = newVal;
    })
  );

  useEffect(() => {
    if (props.isFinal) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [props.isFinal]);

  return (
    <tr
      className={`border-b flex w-full hover:bg-gray-100 ${
        row != undefined && row.cells === props.cells ? "bg-lime-300" : ""
      }`}
    >
      {visible
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
      {visible ? (
        <td className="w-3/6 whitespace-nowrap text-gray-900 border-r">
          STOPP
        </td>
      ) : null}
      <td className="w-1/6 text-gray-900 items-center ">
        <a
          href="#"
          className="w-full min-w-full text-gray-700 focus:outline-none"
          onClick={() => dispatch(tableDeleteRow(props.index))}
        >
          <div className={"p-7"}>
            <button className={"invertedButton"}>
              <FaTrash />
            </button>
          </div>
        </a>
      </td>
    </tr>
  );
}
