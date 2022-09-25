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
import { useTranslation } from "react-i18next";
import * as React from "react";

export default function Band() {
  const dispatch = useDispatch();

  const currentZustand = useSelector(
    (state: RootState) => state.general.activeState
  );

  const currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );

  const showWarning = useSelector((state: RootState) => state.band.showWarning);

  /////////// Band from State ///////////
  const currentBand = useSelector((state: RootState) => state.band.currentBand);

  /////////// Eingabealphabet from State ///////////
  const bandAlphabet = useSelector(
    (state: RootState) => state.general.bandAlphabet
  );
  React.useEffect(() => {
    let bandVal: string[] = [];
    // wenn banditem nicht in Eingabealphabet vorhanden, dann warning auf true
    bandAlphabet.forEach((item) => {
      bandVal.push(item.value);
    });

    let found = false;

    currentBand.forEach((bandItem) => {
      if (!bandVal.includes(bandItem.value)) {
        found = true;
      }
    });

    if (found) {
      dispatch(bandSetWarning(true));
    } else {
      dispatch(bandSetWarning(false));
    }
  }, [bandAlphabet]);

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

  //Internationalization
  const { t } = useTranslation(["general"]);

  return (
    <div className={"w-full"}>
      <div className={"flex m-2 h-32"}>
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
              bandIndex={0}
              pointer={value.pointer!}
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
            title={t("band.warningInputValueNotAllowed")}
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
            {t("band.warningNoStateAvailable")}
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
            + {t("band.addLeft")}
          </button>
          <button
            onClick={(e) => {
              dispatch(bandDeleteAll());
            }}
            className={"w-36 invertedButton"}
          >
            {t("band.clearBand")}
          </button>
          <button
            className={"w-36 invertedButton"}
            onClick={() => dispatch(bandAddField("after"))}
          >
            {t("band.addRight")} +
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
