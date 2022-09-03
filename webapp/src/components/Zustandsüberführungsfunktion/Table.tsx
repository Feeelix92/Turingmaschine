import { useDispatch, useSelector } from "react-redux";
import watch from "redux-watch";
import { RootState, store } from "../../redux/store";
import {
  tableDeleteRow,
  tableAddRow,
  maschineCheckExecutable,
} from "../../redux/generalStore";
import Row from "./Row";
import {useTranslation} from "react-i18next";
import i18next from "i18next";

export default function Table() {
  const loadedRows = useSelector((state: RootState) => state.general.rows);
  const dispatch = useDispatch();

  const headerArray = [
      i18next.t("table.currentState"),
      i18next.t("table.read"),
      i18next.t("table.newState"),
      i18next.t("table.write"),
      i18next.t("table.direction"),
  ]

  /////////// Rows from State ///////////
  let rows = loadedRows;
  let wRows = watch(store.getState, "general.rows");
  store.subscribe(
    wRows((newVal) => {
      rows = newVal;
      // let executable = true;

      // rows.forEach((row) => {
      //   row.cells.forEach((cell) => {
      //     if (cell.warningMode === true) {
      //       executable = false;
      //     }
      //   });
      // });
      // dispatch(maschineChangeExecutable(executable))
      dispatch(maschineCheckExecutable());
    })
  );

  const zustandsmenge = useSelector(
    (state: RootState) => state.general.zustandsmenge
  );

  // /////////// States from State ///////////
  // let states = zustandsmenge;
  // let wStates = watch(store.getState, "general.zustandsmenge");
  // store.subscribe(
  //   wStates((newVal) => {
  //     states = newVal;
  //   })
  // );

  ///internationalization
  const { t } = useTranslation(["general"])

  return (
    <div className="flex flex-col col-span-2 border rounded p-0 w-screen md:w-auto">
      <div className="sm:-mx-0 lg:-mx-0">
        <div className=" sm:px-6 lg:px-8">
          <div className="overflow-x-auto items-center">
            <div className="flex w-full text-left text-sm font-medium text-gray-900">
              <div className="w-1/2 pl-2">{t("table.when")}...</div>
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
              <tbody className="flex flex-col items-center justify-between overflow-y-auto md:max-h-48 xl:max-h-96">
                {rows.map((value, key: React.Key) => (
                  // TODO functions still not working
                  <Row
                    key={key}
                    index={key}
                    cells={value.cells}
                    isFinal={value.isFinal}
                    deleteRow={() => dispatch(tableDeleteRow(key))}
                  />
                ))}
              </tbody>
            </table>
            <button
              className={`w-full addRow`}
              disabled={zustandsmenge.length === 0 ? true : false}
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
