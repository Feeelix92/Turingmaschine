import React, { useEffect, useState } from "react";
import {
  Direction,
  RowProps,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  tableDeleteRow,
  tableUpdateCell,
  tableUpdateRowIsFinal,
} from "../../redux/generalStore";
import { RootState, store } from "../../redux/store";
import Cell from "./Cell";
import watch from "redux-watch";
import {useTranslation} from "react-i18next";

export default function Row(props: RowProps) {
  // create flat copy of all existing cells
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(props.isFinal);

  /////////// States from State ///////////
  const zustandsmenge = useSelector(
    (state: RootState) => state.general.zustandsmenge
  );
  let states = zustandsmenge;
  let wStates = watch(store.getState, "general.zustandsmenge");
  store.subscribe(
    wStates((newVal) => {
      states = newVal;
    })
  );

  function setCellValue(
    index: React.Key,
    value: string | boolean | Zustand | Direction,
    warningMode: boolean
  ) {
    // pass new data to table to update its rows-array
    if (typeof value === "string") {
      dispatch(
        tableUpdateCell({
          cellIndex: index,
          rowIndex: props.index,
          value: value,
          warningMode: warningMode,
        })
      );
    } else if (value instanceof Direction) {
      const tempDirection = new Direction(value.value, value.label);
      dispatch(
        tableUpdateCell({
          cellIndex: index,
          rowIndex: props.index,
          value: tempDirection,
          warningMode: warningMode,
        })
      );
    } else if (typeof value === "boolean") {
      dispatch(
        tableUpdateCell({
          cellIndex: index,
          rowIndex: props.index,
          value: value,
          warningMode: warningMode,
        })
      );
    } else {
      const tempZustand = new Zustand(
        value.label,
        value.value,
        value.anfangszustand,
        value.endzustand,
        value.warningMode
      );

      dispatch(
        tableUpdateCell({
          cellIndex: index,
          rowIndex: props.index,
          value: tempZustand,
          warningMode: warningMode,
        })
      );
    }
  }

  function setCellValueIsFinal(index: React.Key, value: boolean) {
    dispatch(
      tableUpdateRowIsFinal({
        cellIndex: index,
        rowIndex: props.index,
        value: value,
      })
    );
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

  const mode = useSelector((state: RootState) => state.general.mode);

    //Internationalization
    const { t } = useTranslation(["general"])

  //TODO wie gewünscht?
  return (
    <div>
      {mode === "toiletpaper" || !visible ? (
        <tr
          className={`border-b flex w-full hover:bg-gray-100 ${
            activeRow != undefined && activeRow.cells === props.cells
              ? "bg-lime-300"
              : ""
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
                    warningMode={value.warningMode}
                    updateCellValue={setCellValue}
                    updateCellValueIsFinal={setCellValueIsFinal}
                  />
                ))
            : props.cells.map((value, key: React.Key) => (
                <Cell
                  key={key}
                  value={value.value}
                  index={key}
                  showEditField={value.editField}
                  warningMode={value.warningMode}
                  updateCellValue={setCellValue}
                  updateCellValueIsFinal={setCellValueIsFinal}
                />
              ))}
          {visible ? (
            <td className="w-3/6 whitespace-nowrap text-gray-900 border-r items-center flex justify-center">
                {t("row.stop")}
            </td>
          ) : null}
          <td className="w-1/6 text-gray-900 items-center ">
            <a
              href="#"
              className="w-full min-w-full text-gray-700 focus:outline-none"
              onClick={() => dispatch(tableDeleteRow(props.index))}
            >
              <div className={"p-7 px-1 xl:px-7"}>
                <button className={"invertedButton"}>
                  <FaTrash />
                </button>
              </div>
            </a>
          </td>
        </tr>
      ) : null}
    </div>
  );
}
