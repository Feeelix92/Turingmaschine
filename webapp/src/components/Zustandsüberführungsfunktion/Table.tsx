import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  tableDeleteRow,
  tableAddRow,
  maschineCheckExecutable,
} from "../../redux/generalStore";
import Row from "./Row";
import { useTranslation } from "react-i18next";
import * as React from "react";

export default function Table() {
  const loadedRows = useSelector((state: RootState) => state.general.rows);
  const dispatch = useDispatch();

  ///internationalization
  const { t } = useTranslation(["general"]);

  const headerArray = [
    t("table.currentState"),
    t("table.read"),
    t("table.newState"),
    t("table.write"),
    t("table.direction"),
  ];

  /////////// Rows from State ///////////
  let rows = loadedRows;
  React.useEffect(() => {
    console.log("WATCHER TABLE ROWS");
    rows = loadedRows;
    dispatch(maschineCheckExecutable());
  }, [loadedRows]);

  const zustandsmenge = useSelector(
    (state: RootState) => state.general.zustandsmenge
  );

  const mode = useSelector((state: RootState) => state.general.mode);

  return (
    <div className="flex flex-col col-span-2 border rounded p-0 w-screen md:w-full">
      <div className="sm:-mx-0 lg:-mx-0">
        <div className=" sm:px-6 lg:px-8">
          <div className="overflow-x-hidden items-center">
            <div className="flex w-full text-left text-sm font-medium text-gray-900">
              <div className="w-1/2 pl-2">{t("table.if")}...</div>
              <div className="w-1/2 pl-2">{t("table.then")}...</div>
            </div>
            <table className="min-w-full w-full">
              <thead className="flex border-b w-full">
                <tr className="flex w-full">
                  {headerArray.map((value, key: React.Key) => (
                    <th
                      key={key}
                      scope="col"
                      className="text-sm px-2 font-medium text-gray-900 py-4 w-1/6 text-left border-r"
                    >
                      {value}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="flex flex-col items-center justify-between md:max-h-48 xl:max-h-96 overflow-y-auto overflow-x-hidden">
                {rows.map((value, key: React.Key) =>
                  mode === "toiletpaper" && value.isFinal ? null : (
                    <Row
                      key={key}
                      index={key}
                      cells={value.cells}
                      isFinal={value.isFinal}
                      deleteRow={() => dispatch(tableDeleteRow(key))}
                    />
                  )
                )}
              </tbody>
            </table>
            <button
              className={`w-full addRow`}
              disabled={zustandsmenge.length === 0}
              onClick={() => dispatch(tableAddRow())}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
