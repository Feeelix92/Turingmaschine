import { useEffect, useState } from "react";
import * as React from "react";
import { RowProps } from "../../interfaces/CommonInterfaces";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { tableDeleteRow } from "../../redux/generalStore";
import { RootState } from "../../redux/store";
import Cell from "./Cell";
import { useTranslation } from "react-i18next";

export default function Row(props: RowProps) {

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(props.isFinal);

  /////////// Active-Row from State ///////////
  const activeRow = useSelector((state: RootState) => state.general.activeRow);

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
      className={`border-b flex w-full ${
        activeRow != undefined && activeRow.cells === props.cells
          ? "bg-lime-300 hover:bg-lime-3000"
          : " hover:bg-gray-100"
      }`}
    >
      {visible
        ? props.cells
            .slice(0, 1)
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
        <td className="w-4/6 whitespace-nowrap text-gray-900 border-r self-center">
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
