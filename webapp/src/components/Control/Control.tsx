import { FaPlay, FaPause, FaStop, FaStepForward } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Direction, Row, Zustand } from "../../interfaces/CommonInterfaces";
import { RootState, store } from "../../redux/store";
import {
  tableSetActiveState,
  tableSetWatchedRows,
} from "../../redux/tableStore";
import watch from "redux-watch";
import {
  bandChangeItemAt,
  bandChangePointPos,
  bandResetPointer,
} from "../../redux/bandStore";
import { useEffect, useState } from "react";

function Control() {
  const dispatch = useDispatch();

  // const [pause, setPause] = useState(false);
  // const [end, setEnd] = useState(false);

  const [slider, setSlider] = useState(1000);

  let localCopyPause = false;
  let localCopyEnd = false;

  const changeLocalCopyPause = () => {
    localCopyPause = !localCopyPause;
    console.log("localCopyPause FUNCTION:",localCopyPause)
  }

  // useEffect(() => {
  //   console.log("pause--------------->", pause);
  //   if (pause === true) {
  //     localCopyPause = true;
  //   } else {
  //     localCopyPause = false;
  //   }
  //   console.log("localCopyPause--------------->", localCopyPause);
  // }, [pause]);

  // const handlePauseOn = async () => {
  //   await setPause(true);
  //   localCopyPause = true;
  //   console.log("MOIIIN",localCopyPause)
  // };

  // const handlePauseOff = async () => {
  //   await setPause(false);
  //   localCopyPause = false;
  // };

  const initialZustand = useSelector(
    (state: RootState) => state.general.anfangsZustand
  );

  const currentBand = useSelector((state: RootState) => state.band.currentBand);
  const currentTable = useSelector((state: RootState) => state.table.rows);
  const pointerIdx = useSelector(
    (state: RootState) => state.band.pointerPosition
  );

  /////////// Rows from State ///////////
  let selectedRows: Row[] = [];
  let wSelectedRows = watch(store.getState, "table.watchedRows");
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
  let wActiveState = watch(store.getState, "table.activeState");
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

    console.log("Reihe:", item);

    if (item !== undefined && typeof item.cells[3].value === "string") {
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
            // idx++;
            dispatch(bandChangePointPos(1));
            break;
          }
          case "Links": {
            // idx--;
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
            // await handlePauseOn();
            localCopyPause = true;
            await dispatch(bandResetPointer());
          } else {
            console.log("changeZustand");
            dispatch(tableSetActiveState(item.cells[2].value as Zustand));
            setSelectedRows();
          }
        }
      }
    } else {
      console.log("Else");
      // await handlePauseOn();
      localCopyPause = true;
    }
  };

  const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const onPlay = async () => {
    setSelectedRows();
    localCopyPause = false;
    
    //ToDo: Schleife hört nicht auf Änderungen von außerhalb... 
    //...localCopyPause = true vom Pause Button wird nicht beachtet??
    do {      
      await sleep(slider)
      makeStep(activePointerPosition);
      console.log("localCopyPause DO-WHILE:",localCopyPause)
    } while (localCopyPause === false && localCopyEnd === false);


    console.log("Schleife durchbrochen!");
    dispatch(tableSetActiveState(initialZustand));
    localCopyPause = false;
  };

  const stepByStep = () => {
    setSelectedRows();

    makeStep(activePointerPosition);
  };

  const terminate = () => {
    setEnd(true);
    dispatch(bandResetPointer());
    setEnd(false);
  };

  return (
    <div className={"control w-screen"}>
      <div className="flex mb-4">
        <div className="w-3/4 text-left">
          <button
            className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
            onClick={onPlay}
          >
            <FaPlay />
          </button>

          <button
            className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
            onClick={() => changeLocalCopyPause()}
          >
            <FaPause />
          </button>

          <button
            className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
            onClick={terminate}
          >
            <FaStop />
          </button>

          <button
            className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
            onClick={stepByStep}
          >
            <FaStepForward />
          </button>
        </div>

        <div className="m-2 text-black">
          {/*<label htmlFor="velSlider" className="form-label ">Geschwindigkeit</label>*/}

          <input
            id="velSlider"
            className="w-full h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer"
            type="range"
            min={0}
            max={3000}
            value={slider}            
            onChange={(e) => setSlider(e.target.valueAsNumber)}
            step={500}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Control;
