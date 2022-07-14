import React, { useEffect, useState } from "react";
import {
  Direction,
  RowProps,
  Zustand,
    RowInterface
} from "../../interfaces/CommonInterfaces";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { tableDeleteRow, tableUpdateCell } from "../../redux/generalStore";
import { RootState, store } from "../../redux/store";
import Cell from "./Cell";
import watch from "redux-watch";

export default function Row(props: RowProps) {
  // create flat copy of all existing cells
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(props.isFinal);

    let rows: RowInterface[] = [];
    let wRows = watch(store.getState, "general.rows");
    store.subscribe(
        wRows((newVal) => {
            rows = newVal;
            console.log(newVal, 'rows')

            })
)
  function setCellValue(index: React.Key, value: string | Zustand | Direction) {
    // pass new data to table to update its rows-array
      let possibleRow = false

      rows.forEach((value, idx) => {
          if(idx === index ) {
              possibleRow = true
          }
      });

    if (typeof value === "string" && possibleRow) {
      dispatch(
        tableUpdateCell({
          cellIndex: index,
          rowIndex: props.index,
          value: value,
        })
      );
    } else if (value instanceof Direction && possibleRow) {
      const tempDirection = new Direction(value.label, value.value);
      dispatch(
        tableUpdateCell({
          cellIndex: index,
          rowIndex: props.index,
          value: tempDirection,
        })
      );
    } else if (typeof value === "boolean" && possibleRow) {
      dispatch(
        tableUpdateCell({
          cellIndex: index,
          rowIndex: props.index,
          value: value,
        })
      );
    } else if (possibleRow) {
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

  const activeRow = useSelector((state: RootState) => state.general.activeRow);
  /////////// Active-Row from State ///////////
  let row = activeRow;
  let wRow = watch(store.getState, "general.activeRow");
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

    const toiletPaperMode = useSelector((state: RootState) => state.general.toiletPaperMode)

  return (
    <tr
      className={`border-b flex w-full hover:bg-gray-100 ${
        activeRow != undefined && activeRow.cells === props.cells
          ? "bg-lime-300"
          : ""
      } ${toiletPaperMode ? "disableTableRow" : ""} `}
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
                warningMode={value.warningMode}
              />
            ))
        : props.cells.map((value, key: React.Key) => (
            <Cell
              key={key}
              value={value.value}
              index={key}
              showEditField={value.editField}
              updateCellValue={setCellValue}
              warningMode={value.warningMode}
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
