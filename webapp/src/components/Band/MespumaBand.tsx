import BandItem from "./BandItem";
import { FaAngleLeft, FaAngleRight, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  bandAddMespumaField,
  bandChangeMespumaPointPos,
  bandDeleteAllMespuma,
  bandSetPointPos,
  bandSetWarning,
} from "../../redux/bandStore";
import { RootState } from "../../redux/store";
import { IoIosWarning } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Band() {
  const dispatch = useDispatch();

  const currentZustand = useSelector(
    (state: RootState) => state.general.activeState
  );

  const currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );
  const bandAlphabet = useSelector(
    (state: RootState) => state.general.bandAlphabet
  );
  const showWarning = useSelector((state: RootState) => state.band.showWarning);

  /////////// Band from State ///////////
  const mespumaBand = useSelector((state: RootState) => state.band.mespumaBand);

  /////////// Eingabealphabet from State ///////////
  let bAlphabet = bandAlphabet;
  useEffect(() => {
    bAlphabet = bandAlphabet;

    let bandVal: string[] = [];
    // wenn banditem nicht in Eingabealphabet vorhanden, dann warning auf true
    bAlphabet.forEach((item) => {
      bandVal.push(item.value);
    });

    let found = false;

    mespumaBand.forEach((band) => {
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
  }, [bandAlphabet]);

  const setPointerAt = (index: number) => {
    dispatch(bandSetPointPos(index));
  };

  // Für Touch nach rechts & links:
  const setPointerLeft = () => {
    dispatch(bandChangeMespumaPointPos(-1));
  };

  //Für Touch nach rechts:
  const setPointerRight = () => {
    dispatch(bandChangeMespumaPointPos(1));
  };

  //Für Internationalisierung
  const { t } = useTranslation(["general"]);

  return (
    <div className={"w-full"}>
      <h4 className="pb-3 pt-5">{t("band.mespumaExtension.headline")}</h4>

      <div className="flex ">
        <div className="flex-none mx-1 ">
          <button
            className={"mt-10 rounded-r-none md:rounded md:invisible"}
            onClick={() =>
              dispatch(bandAddMespumaField("before")) &&
              dispatch(bandChangeMespumaPointPos(1))
            }
          >
            +
          </button>
        </div>

        <div className="flex-1 w-64 overflow-x-auto mx-2">
          <div className="pb-0 mb-14 mt-10">
            {mespumaBand.map((band, bandIndex) => (
              <div
                key={bandIndex}
                className={
                  "band-container-mespuma overflow-auto col-span-12  z-" +
                  (mespumaBand.length * 10 - bandIndex * 10)
                }
              >
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
          </div>
        </div>

        <div className="flex-none  mx-1">
          <button
            className={"mt-10 rounded-l-none md:rounded md:invisible"}
            onClick={() => dispatch(bandAddMespumaField("after"))}
          >
            +
          </button>
        </div>
      </div>

      {/* <div className={"flex flex-col overflow-x-auto"}> */}

      {/*  Button für Felderhinzufügen - mobile: */}

      {/* <button
          className={"mt-10 rounded-r-none md:rounded md:invisible"}
          onClick={() =>
            dispatch(bandAddField("before")) && dispatch(bandChangePointPos(1))
          }
        >
          +
        </button> */}
      {/* <div className="pb-0 my-10 ">
          {mBand.map((band, bandIndex) => (
            <div className={"band-container-mespuma col-span-12 overflow-auto z-" + (mBand.length*10-bandIndex*10)}>
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
        </div> */}

      {/* Button für Felderhinzufügen - mobile: */}
      {/* <button
          className={"mt-10 rounded-l-none md:rounded md:invisible"}
          onClick={() => dispatch(bandAddField("after"))}
        >
          +
        </button> */}

      {/* </div> */}

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
              dispatch(bandAddMespumaField("before")) &&
              dispatch(bandChangeMespumaPointPos(1))
            }
          >
            + {t("band.addLeft")}
          </button>
          <button
            onClick={(e) => {
              dispatch(bandDeleteAllMespuma());
            }}
            className={"w-36 invertedButton"}
          >
            {t("band.clearBand")}
          </button>
          <button
            className={"w-36 invertedButton"}
            onClick={() => dispatch(bandAddMespumaField("after"))}
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
          <button
            onClick={() => dispatch(bandDeleteAllMespuma())}
            className={"m-2"}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
