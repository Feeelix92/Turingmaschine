import { FaPlay, FaPause, FaStop, FaStepForward } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Row, Zustand } from "../../interfaces/CommonInterfaces";
import { RootState, store } from "../../redux/store";
import { tableSetWatchedRows } from "../../redux/tableStore";
import watch from "redux-watch";

function Control() {
  const dispatch = useDispatch();

  const initialZustand = useSelector(
    (state: RootState) => state.general.anfangsZustand
  );

  const currentBand = useSelector((state: RootState) => state.band.currentBand);

  const currentTable = useSelector((state: RootState) => state.table.rows);

  let selectedRows: Row[] = [];
  let wSelectedRows = watch(store.getState, "table.watchedRows");

  store.subscribe(
    wSelectedRows((newVal) => {
      selectedRows = newVal;
    })
  );

  const setSelectedRows = () => {
    let rows: Row[] = [];

    if (currentBand.length > 0) {
      currentTable.forEach((row) => {
        if (row.cells[0].value instanceof Zustand) {
          if (row.cells[0].value.value === initialZustand.value) {
            rows.push(row);
          }
        }
      });
    }
    dispatch(tableSetWatchedRows(rows));
  };

  const onClick = () => {
    setSelectedRows();

    if (selectedRows.length > 0) {
      console.log("selectedRows: ", selectedRows);

      //   selectedRows.forEach((row) => {});
    }
  };

  return (
    <div className={"control w-screen"}>
      <div className="flex mb-4">
        <div className="w-3/4 text-left">
          <button
            className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
            onClick={onClick}
          >
            <FaPlay />
          </button>

          <button className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 ">
            <FaPause />
          </button>

          <button className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 ">
            <FaStop />
          </button>

          <button className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 ">
            <FaStepForward />
          </button>
          <button className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "></button>
        </div>

        <div className="m-2 text-black">
          {/*<label htmlFor="velSlider" className="form-label ">Geschwindigkeit</label>*/}

          <input
            id="velSlider"
            type="range"
            className="w-full h-2 bg-gray-500 rounded-lg 
                    appearance-none cursor-pointer"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Control;
