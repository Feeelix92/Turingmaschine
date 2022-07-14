import BandItem from "./BandItem";
import { FaAngleLeft, FaAngleRight, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  bandAddField,
  bandChangePointPos,
  bandDeleteAll,
  bandSetPointPos,
  bandSetWarning,
} from "../../redux/bandStore";
import { RootState, store } from "../../redux/store";
import { IoIosWarning } from "react-icons/io";
import watch from "redux-watch";
import { useState } from "react";
import { EingabeAlphabetOption } from "../../data/Alphabet";

export default function Band() {
  const dispatch = useDispatch();

  const currentZustand = useSelector(
    (state: RootState) => state.general.activeState
  );
  const currentBand = useSelector((state: RootState) => state.band.currentBand);
  const currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );
  const bandAlphabet = useSelector(
    (state: RootState) => state.general.bandAlphabet
  );
  const showWarning = useSelector((state: RootState) => state.band.showWarning);

  /////////// Band from State ///////////
  let cBand = currentBand;
  let wBand = watch(store.getState, "general.currentBand");
  store.subscribe(
    wBand((newVal) => {
      cBand = newVal;
    })
  );

  /////////// Eingabealphabet from State ///////////
  let bAlphabet = bandAlphabet;
  let wEingabeAlphabet = watch(store.getState, "general.bandAlphabet");
  store.subscribe(
    wEingabeAlphabet((newVal) => {
      bAlphabet = newVal;

      let bandVal: string[] = [];
      // wenn banditem nicht in Eingabealphabet vorhanden, dann warning auf true
      bAlphabet.forEach((item) => {
        bandVal.push(item.value);
      });

      let found = false;

      cBand.forEach((bandItem) => {
        if (!bandVal.includes(bandItem.value)) {
          found = true;
        }
      });

      if (found) {
        dispatch(bandSetWarning(true));
      } else {
        dispatch(bandSetWarning(false));
      }
    })
  );

  const setPointerAt = (index: number) => {
    dispatch(bandSetPointPos(index));
  };

  // Für Touch nach rechts & links:
  const setPointerLeft = () => {
    dispatch(bandChangePointPos(-1));
  };

  //Für Touch nach rechts:
  const setPointerRight = () => {
    dispatch(bandChangePointPos(1));
  };

  return (
    <div className={"w-screen"}>
      <div className={"flex m-2 h-40"}>
        <button
          className={"mt-10 rounded-r-none md:rounded md:invisible"}
          onClick={() =>
            dispatch(bandAddField("before")) && dispatch(bandChangePointPos(1))
          }
        >
          +
        </button>
        <div className="band-container overflow-x-auto col-span-12">
          {currentBand.map((value, index) => (
            <BandItem
              value={value.value}
              label={value.label}
              index={index}
              key={index}
              alphabet={currentAlphabet.alphabet}
              showEditField={true}
              setPointerAt={() => setPointerAt(index)}
            />
          ))}
        </div>
        <button
          className={"mt-10 rounded-l-none md:rounded md:invisible"}
          onClick={() => dispatch(bandAddField("after"))}
        >
          +
        </button>
      </div>
      {showWarning ? (
        <div className="flex justify-center">
          <IoIosWarning          
            color="orange"
            title="Dieser Eingabewert ist nicht länger zulässig!"
            size = '48'
          />
          </div>
        ) : null}
      <div
        className={
          "currentZustand flex flex-col content-center items-center justify-center mb-8"
        }
      >        
        {/* <span className="relative">
                <span className="block absolute -inset-1 w-12 rounded-full bg-thm-primary" aria-hidden="true"></span>
                <span className="relative text-white text-center"> {currentZustand.value}</span>
            </span>                */}
        {currentZustand ? (
          <div className={"rounded-full w-12 bg-thm-primary text-white h-8"}>
            {currentZustand.value}
          </div>
        ) : (
          <div className={"rounded-full bg-thm-primary text-white h-8"}>
            Kein Zustand vorhanden!
          </div>
        )}
      </div>
      <div className={"hidden md:block"}>
        <div className={"flex justify-center gap-2"}>
          <button
            className={"w-36 invertedButton"}
            onClick={() =>
              dispatch(bandAddField("before")) &&
              dispatch(bandChangePointPos(1))
            }
          >
            + Feld links
          </button>
          <button
            onClick={() => dispatch(bandDeleteAll())}
            className={"w-36 invertedButton"}
          >
            leeren
          </button>
          <button
            className={"w-36 invertedButton"}
            onClick={() => dispatch(bandAddField("after"))}
          >
            Feld rechts +
          </button>
        </div>
      </div>
      <div className="flex">
        <div className={"w-3/4 text-left"}>
          <button
            className={"m-2 md:invisible secondaryButton"}
            onClick={() => setPointerLeft()}
          >
            <FaAngleLeft />
          </button>

          <button
            className={"md:invisible secondaryButton"}
            onClick={() => setPointerRight()}
          >
            <FaAngleRight />
          </button>
        </div>

        <div className={"w-1/4 text-right md:hidden"}>
          <button onClick={() => dispatch(bandDeleteAll())} className={"m-2"}>
            {/* <RiDeleteBin2Fill/> */}
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
