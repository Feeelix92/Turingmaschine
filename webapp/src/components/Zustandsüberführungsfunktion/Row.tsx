import { useEffect, useState } from "react";
import * as React from "react";
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
import { useTranslation } from "react-i18next";

export default function Row(props: RowProps) {
  // create flat copy of all existing cells
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(props.isFinal);

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

  //Internationalization
  const { t } = useTranslation(["general"]);

  return (
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
                rowIndex={props.index}
                showEditField={value.editField}
                warningMode={value.warningMode}
              />
            ))
        : props.cells.map((value, key: React.Key) => (
            <Cell
              key={key}
              value={value.value}
              index={key}
              rowIndex={props.index}
              showEditField={value.editField}
              warningMode={value.warningMode}
            />
          ))}
      {visible ? (
        <td className="w-3/6 whitespace-nowrap text-gray-900 border-r">
          {t("row.stop")}
        </td>
      ) : null}
      <td className="w-1/6 text-gray-900 items-center">
        <a
          href="#"
          className="text-gray-700 focus:outline-none"
          onClick={() => dispatch(tableDeleteRow(props.index))}
        >
          <div className={"py-2 px-2"}>
            <button className={"invertedButton"}>
              <FaTrash />
            </button>
          </div>
        </a>
      </td>
    </tr>
  );
}
