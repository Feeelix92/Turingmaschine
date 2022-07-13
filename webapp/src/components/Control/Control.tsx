import { FaPlay, FaPause, FaStop, FaStepForward } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Direction, Row, Zustand } from "../../interfaces/CommonInterfaces";
import { RootState, store } from "../../redux/store";
import {
  tableSetActiveRow,
  tableSetActiveState,
  tableSetWatchedRows,
} from "../../redux/generalStore";
import watch from "redux-watch";
import {
  bandChangeItemAt,
  bandChangePointPos,
  bandResetPointer,
} from "../../redux/bandStore";
import { useState } from "react";
import {
  alphabetChangePauseMaschine,
  alphabetChangeStoppMaschine,
} from "../../redux/generalStore";

function Control() {
  const dispatch = useDispatch();

  const executable = useSelector(
    (state: RootState) => state.general.executable
  );

  let pauseMaschine: Boolean = false;
  let wPauseMaschine = watch(store.getState, "general.pauseMaschine");
  store.subscribe(
    wPauseMaschine((newVal) => {
      pauseMaschine = newVal;
      setMaschineRunning(false);
    })
  );

  let stoppMaschine: Boolean = false;
  let wStoppMaschine = watch(store.getState, "general.stoppMaschine");
  store.subscribe(
    wStoppMaschine((newVal) => {
      stoppMaschine = newVal;
      setMaschineRunning(false);
    })
  );

  const [slider, setSlider] = useState(1);

  const changePause = (value: boolean) => {
    dispatch(alphabetChangePauseMaschine(value));
  };
  const changeStopp = (value: boolean) => {
    dispatch(alphabetChangeStoppMaschine(value));
  };

  const initialZustand = useSelector(
    (state: RootState) => state.general.anfangsZustand
  );

  const currentBand = useSelector((state: RootState) => state.band.currentBand);
  const currentTable = useSelector((state: RootState) => state.general.rows);
  const pointerIdx = useSelector(
    (state: RootState) => state.band.pointerPosition
  );
  const bandWarning = useSelector((state: RootState) => state.band.showWarning);

  /////////// Rows from State ///////////
  let selectedRows: Row[] = [];
  let wSelectedRows = watch(store.getState, "general.watchedRows");
  store.subscribe(
    wSelectedRows((newVal) => {
      selectedRows = newVal;
    })
  );

  /////////// Band from State ///////////
  let selectedBand = currentBand;
  let wSelectedBand = watch(store.getState, "band.currentBand");
  store.subscribe(
    wSelectedBand((newVal) => {
      selectedBand = newVal;
    })
  );

  /////////// ActiveState from State ///////////
  let activeState = initialZustand;
  let wActiveState = watch(store.getState, "general.activeState");
  store.subscribe(
    wActiveState((newVal) => {
      activeState = newVal;
    })
  );

  /////////// PointerPosition from State ///////////
  let activePointerPosition = pointerIdx;
  let wActivePointerPosition = watch(store.getState, "band.pointerPosition");
  store.subscribe(
    wActivePointerPosition((newVal) => {
      activePointerPosition = newVal;
      if (newVal != undefined) {
        console.log("Pointer verschoben nach: ", newVal);
      }
    })
  );

  const setSelectedRows = () => {
    // get all rows, that match our current Zustand and which are therefore relevant
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

  const makeStep = async (idx: number) => {
    // get the row, which matches with the symbol we read on band
    const item = selectedRows.find((elem) => {
      return elem.cells[1].value === selectedBand[idx].value ? elem : undefined;
    });

    if (
      item !== undefined &&
      typeof item.cells[3].value === "string" &&
      item.isFinal === false
    ) {
      store.dispatch(tableSetActiveRow(item));
      console.log("gelesener Wert:", item.cells[1].value);
      if (
        item.cells[0].value instanceof Zustand &&
        item.cells[0].value.endzustand === false
      ) {
        console.log("Veränder mir das hier zu:", item.cells[3].value);
        dispatch(
          bandChangeItemAt({
            index: idx,
            value: item.cells[3].value,
            label: item.cells[3].value,
          })
        );
      }
      if (item.cells[4].value instanceof Direction) {
        switch (item.cells[4].value.label) {
          case "Rechts": {
            dispatch(bandChangePointPos(1));
            break;
          }
          case "Links": {
            dispatch(bandChangePointPos(-1));
            break;
          }
          case "Neutral":
          default: {
            break;
          }
        }
      }
      if (item.cells[0].value instanceof Zustand) {
        if (item.cells[0].value != item.cells[2].value) {
          if (item.cells[0].value.endzustand === true) {
            console.log("Endzustand erreicht!");
            changePause(true);
          } else {
            console.log("changeZustand");
            dispatch(tableSetActiveState(item.cells[2].value as Zustand));
            setSelectedRows();
          }
        }
      }
    } else {
      console.log("Else");
      changePause(true);
    }
  };

  const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const [maschineRunning, setMaschineRunning] = useState(false);

  const onPlay = async () => {
    setMaschineRunning(true);
    setSelectedRows();
    dispatch(alphabetChangeStoppMaschine(false));
    changePause(false);

    //ToDo: Schleife hört nicht auf Änderungen von außerhalb...
    //...localCopyPause = true vom Pause Button wird nicht beachtet??
    while (stoppMaschine === false && pauseMaschine === false) {
      setMaschineRunning(true);
      let tempSlider = 3000 / slider;
      console.log(tempSlider);
      await sleep(tempSlider);
      makeStep(activePointerPosition);
    }

    console.log("Schleife durchbrochen!");
    dispatch(tableSetActiveRow(undefined));
    dispatch(tableSetActiveState(initialZustand));
    changePause(false);
    setMaschineRunning(false);
    dispatch(alphabetChangeStoppMaschine(false));
  };

  const stepByStep = () => {
    setSelectedRows();

    makeStep(activePointerPosition);
  };

  return (
    <div>
      <div className={"control w-screen"}>
        <div className={"p-4 justify-center"}>
          <label htmlFor="velSlider" className="form-label text-black">
            Geschwindigkeit
          </label>
          <div className={"m-2 text-black"}>
            <span>min </span>
            <input
              id="velSlider"
              className={
                "w-5/6 sm:w-1/3 h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer"
              }
              type="range"
              min={1}
              max={10}
              value={slider}
              onChange={(e) => setSlider(e.target.valueAsNumber)}
              step={1}
            />
            <span> max</span>
          </div>
          <div className={""}>
            <button
              className={"invertedButton py-1 px-2 m-2 disabled:opacity-50"}
              disabled={!executable || maschineRunning || bandWarning}
              onClick={onPlay}
            >
              <FaPlay />
            </button>
            <button
              className={"invertedButton py-1 px-2 m-2 disabled:opacity-50"}
              disabled={!executable || maschineRunning || bandWarning}
              onClick={stepByStep}
            >
              <FaStepForward />
            </button>
            <button
              className={"invertedButton py-1 px-2 m-2 disabled:opacity-50"}
              disabled={!executable || !maschineRunning || bandWarning}
              onClick={() => {
                pauseMaschine ? changePause(false) : changePause(true);
              }}
            >
              <FaPause />
            </button>
            <button
              className={"invertedButton py-1 px-2 m-2 disabled:opacity-50"}
              disabled={!executable || !maschineRunning || bandWarning}
              onClick={() => changeStopp(true)}
            >
              <FaStop />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Control;
