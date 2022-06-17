import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { tableDeleteRow, tableUpdateRow, tableAddRow } from "../../redux/tableStore";
import Row from "./Row";

export default function Table() {

  const loadedRows = useSelector((state: RootState) => state.table.rows)
  const alphabet = useSelector((state: RootState) => state.general.currentAlphabet)
  const header = useSelector((state: RootState) => state.table.header)
  const dispatch = useDispatch() 
  
  return (
    <div className="flex flex-col">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <div className="flex w-full items-center text-left text-sm px-2 font-medium text-gray-900 py-4">
              <div className="w-1/2">Wenn...</div>
              <div className="w-1/2">Dann...</div>
            </div>
            <table className="min-w-full w-full">
              <thead className="flex border-b w-full">
                <tr className="flex w-full">
                  {header.map((value, key: React.Key) => (
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
              <tbody className="flex flex-col items-center justify-between overflow-y-auto max-h-44">
                {loadedRows.map((value, key: React.Key) => (
                  // TODO functions still not working
                  <Row
                    key={key}
                    index={key}
                    cells={value.cells}
                    alphabet={alphabet}
                    isFinal={value.isFinal}
                    deleteRow={() => dispatch(tableDeleteRow(key))}
                  />
                ))}
              </tbody>
            </table>
            <button
              className="w-full bg-transparent hover:bg-gray-100 text-gray-900 font-semibold hover:text-gray-900 py-2 px-4 border border-gray-900 hover:border-transparent rounded"
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
