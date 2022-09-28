import BandItem from "./BandItem";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
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

  // Für Touch nach rechts:
  const setPointerRight = () => {
    dispatch(bandChangeMespumaPointPos(1));
  };

  // Für Internationalisierung
  const { t } = useTranslation(["general"]);

  return (
    <div className={"w-full"}>
      <h4 className="pb-3 pt-5">{t("band.mespumaExtension.headline")}</h4>
      <div
          className={
            "currentZustand flex-col content-center items-center justify-center mb-8 flex md:hidden"
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
      <div className="flex overflow-x-auto">
        <div className="pb-0 mb-16 mt-10 pl-1 pr-1 pt-0 ml-auto mr-auto">
          {mespumaBand.map((band, bandIndex) => (
            <div
              key={bandIndex}
              className={
                "band-container-mespuma overflow-auto" +
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
      {showWarning ? (
        <div className="flex justify-center">
          <IoIosWarning
            color="orange"
            title={t("band.warningInputValueNotAllowed")}
            size="48"
          />
        </div>
      ) : null}

        <div className={"flex justify-center gap-2 pl-2 pr-2 m-2"}>
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
        <div className={"flex justify-center gap-2 m-2"}>
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
  );
}
