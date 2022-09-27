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
      <div
          className={
            "currentZustand flex-col content-center items-center justify-center mb-4 mt-4 flex md:hidden"
          }
      >
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
      <div className={"flex m-2 h-40"}>
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
        <div className="flex justify-center m-2 gap-2">
            <button
                className={"secondaryButton"}
                onClick={() => setPointerLeft()}
            >
              <FaAngleLeft />
            </button>
            <button
                className={"secondaryButton"}
                onClick={() => setPointerRight()}
            >
              <FaAngleRight />
            </button>
        </div>
        <div className={"flex justify-center gap-2 pl-2 pr-2 pb-2"}>
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
  );
}
