import BandItem from "./BandItem";
import { FaAngleLeft, FaAngleRight, FaRedo, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  bandAddField,
  bandChangePointPos,
  bandDeleteAll,
  bandSetPointPos,
  bandSetWarning,
} from "../../redux/bandStore";
import { RootState, store } from "../../redux/store";
import party from "party-js";
import { IoIosWarning } from "react-icons/io";
import watch from "redux-watch";
import { useState } from "react";
import { EingabeAlphabetOption } from "../../data/Alphabet";

export default function Band() {
  const dispatch = useDispatch();

  const currentZustand = useSelector(
    (state: RootState) => state.general.activeState
  );
  const mespumaBand = useSelector((state: RootState) => state.band.mespumaBand);
  const currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );
  const bandAlphabet = useSelector(
    (state: RootState) => state.general.bandAlphabet
  );
  const showWarning = useSelector((state: RootState) => state.band.showWarning);

  /////////// Band from State ///////////
  let mBand = mespumaBand;
  let wBand = watch(store.getState, "general.mespumaBand");
  store.subscribe(
    wBand((newVal) => {
      mBand = newVal;
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

      mBand.forEach((band) => {
        band.forEach((bandItem) => {
          if (!bandVal.includes(bandItem.value)) {
            found = true;
          }
        });
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
      <h4 className="pb-3 pt-5">Mehrspuren-Maschine</h4>

      <div className={"flex flex-col"}>
        <button
          className={"mt-10 rounded-r-none md:rounded md:invisible"}
          onClick={() =>
            dispatch(bandAddField("before")) && dispatch(bandChangePointPos(1))
          }
        >
          +
        </button>
        {mBand.map((band, bandIndex) => (
          <div className="band-container overflow-x-auto col-span-12">
            {band.map((value, index) => (
              <BandItem
                value={value.value}
                label={value.label}
                index={index}
                bandIndex={bandIndex}
                pointer={value.pointer!}
                key={bandIndex + index}
                alphabet={currentAlphabet.alphabet}
                showEditField={true}
                setPointerAt={() => setPointerAt(index)}
              />
            ))}
          </div>
        ))}
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
            size="48"
          />
        </div>
      ) : null}

      <div
        className={
          "currentZustand flex-col content-center items-center justify-center mb-8 flex md:hidden"
        }
      >
        {/* <span className="relative">
                <span className="block absolute -inset-1 w-12 rounded-full bg-thm-primary" aria-hidden="true"></span>
            </span>                */}
        {currentZustand ? (
          <div
            className={"rounded-full w-12 bg-thm-primary text-white h-8 mt-3"}
          >
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
            onClick={(e) => {
              dispatch(bandDeleteAll());
            }}
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
      <div className="flex md:pb-10">
        <div className={"w-3/4 text-left"}>
          <button
            className={"m-2 md:hidden secondaryButton"}
            onClick={() => setPointerLeft()}
          >
            <FaAngleLeft />
          </button>
          <button
            className={"md:hidden secondaryButton"}
            onClick={() => setPointerRight()}
          >
            <FaAngleRight />
          </button>
        </div>

        <div className={"w-1/4 text-right md:hidden"}>
          <button onClick={() => dispatch(bandDeleteAll())} className={"m-2"}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}