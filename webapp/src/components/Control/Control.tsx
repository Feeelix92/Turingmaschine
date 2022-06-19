import { FaPlay, FaPause, FaStop, FaStepForward } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Direction, Row, Zustand } from "../../interfaces/CommonInterfaces";
import { RootState, store } from "../../redux/store";
import {
  tableSetActiveState,
  tableSetWatchedRows,
} from "../../redux/tableStore";
import watch from "redux-watch";
import { bandChangeItemAt } from "../../redux/bandStore";

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

  let selectedBand = currentBand;

  let wSelectedBand = watch(store.getState, "band.currentBand");

  store.subscribe(
    wSelectedBand((newVal) => {
      selectedBand = newVal;
    })
  );

  let activeState = initialZustand;

  let wActiveState = watch(store.getState, "table.activeState");

  store.subscribe(
    wActiveState((newVal) => {
      activeState = newVal;
      console.log("neuer Zustand", newVal);
    })
  );

  const setSelectedRows = () => {
    let rows: Row[] = [];

    if (currentBand.length > 0) {
      currentTable.forEach((row) => {
        if (row.cells[0].value instanceof Zustand) {
          if (row.cells[0].value.value === activeState.value) {
            rows.push(row);
          }
        }
      });
    }
    dispatch(tableSetWatchedRows(rows));
  };

  const updateStep = (index: number) => {
    let idx = index;

    let band = [];
    for (let i = idx; i < selectedBand.length; i++) {
      band.push(selectedBand[i]);
    }

    console.log(selectedRows);

    band.forEach((item) => {
      selectedRows.forEach((row) => {
        if (
          row.cells[1].value === item.value &&
          typeof row.cells[3].value === "string"
        ) {
          if (
            row.cells[0].value instanceof Zustand &&
            row.cells[0].value.endzustand === false
          ) {
            dispatch(
              bandChangeItemAt({
                index: idx,
                value: row.cells[3].value,
                label: row.cells[3].value,
              })
            );
          }

          if (row.cells[4].value instanceof Direction) {
            switch (row.cells[4].value.label) {
              case "Rechts": {
                idx++;
                break;
              }
              case "Links": {
                idx--;
                break;
              }
              case "Neutral":
              default: {
                break;
              }
            }
          }

          if (row.cells[0].value instanceof Zustand) {
            if (row.cells[0].value != row.cells[2].value) {
              if (row.cells[0].value.endzustand === true) {
                console.log("Endzustand erreicht!");
              } else {
                console.log("changeZustand");
                dispatch(tableSetActiveState(row.cells[2].value as Zustand));
                setSelectedRows();
                updateStep(idx);
              }
            }
          }
        }
      });
    });
  };

  const onClick = () => {
    setSelectedRows();

    updateStep(0);
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
