import React, { Key, useEffect, useRef } from "react";
import EditField from "../Zustandsüberführungsfunktion/EditField";
import { BandItemProps } from "../../interfaces/CommonInterfaces";
import { FaRedo, FaTimes, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import brickWhite from "../../assets/images/brick_white.svg";
import brickBlack from "../../assets/images/brick_black.svg";
import {
  BandItemToChange,
  bandChangeItemAt,
  bandDeleteItemAt,
} from "../../redux/bandStore";
import { icons } from "react-icons";
import { BsFillEraserFill } from "react-icons/bs";
import BrickWhite from "../../assets/images/brick_white.svg";
import BrickBlack from "../../assets/images/brick_black.svg";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction/
import "react-toastify/dist/ReactToastify.css";

export default function BandItem(props: BandItemProps) {
  const wrapperRef: React.RefObject<HTMLInputElement> = React.createRef();

  const [editMode, setEditMode] = React.useState(false);
  function toggleEditMode() {
    setEditMode(!editMode);
  }

  // Zum Pointer scrollen:
  const fieldRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  });

  const dispatch = useDispatch();

  const pointerIdx = useSelector(
    (state: RootState) => state.band.pointerPosition
  );

  //Internationalization
  const { t } = useTranslation(["general"]);

  function chooseOption(option: string) {
    const temp: BandItemToChange = {
      index: props.index,
      value: option,
      label: option,
    };
    dispatch(bandChangeItemAt(temp));
    setEditMode(false);
  }

  function deleteValue(index: Key) {
    dispatch(bandDeleteItemAt(props.index));
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef) {
        if (
          wrapperRef.current != null &&
          event.target != null &&
          event.target instanceof Node
        ) {
          if (!wrapperRef.current.contains(event.target)) {
            setEditMode(false);
          }
        }
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  function checkValue(index: Key, value: string) {
    let allowed = false;

    props.alphabet.map((entry) => {
      if (entry.value === value || value === "ß") {
        const temp: BandItemToChange = {
          index: index as number,
          value: value,
          label: value,
        };
        dispatch(bandChangeItemAt(temp));
        allowed = true;
      } else if (value === "ß") {
        const temp: BandItemToChange = {
          index: index as number,
          value: value,
          label: "ß",
        };
        dispatch(bandChangeItemAt(temp));
        allowed = true;
      }
    });

    if (!allowed) {
      toast.error("" + t("bandItem.warningValueNotIncluded"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div
      className={`teepeeBandItem flex justify-center ${
        pointerIdx === props.index ? "teepeePointerBorder" : ""
      }`}
      key={props.index}
      ref={wrapperRef}
    >
      <div className={""}>
        {pointerIdx === props.index ? (
          <div
            className="teepeePointer scroll-mx-16"
            ref={fieldRef}
            draggable
          />
        ) : (
          ""
        )}
        <input
          type="text"
          name="value"
          id="teepeeValueInput"
          className={"teepeeBandInput"}
          value={props.label}
          onChange={(e) => checkValue(props.index, e.target.value)}
          onClick={toggleEditMode}
          onDragOver={props.setPointerAt}
          inputMode="none"
          autoComplete="off"
        />
        {props.label == "1" && (
          <img
            draggable={false}
            className={"brick"}
            src={BrickWhite}
            alt="brick black"
            onClick={toggleEditMode}
          />
        )}
        {props.label == "#" && (
          <img
            draggable={false}
            className={"brick"}
            src={BrickBlack}
            alt="brick white"
            onClick={toggleEditMode}
          />
        )}
        {editMode && props.showEditField ? (
          <div className={"brickEditBtnDiv"}>
            <EditField options={props.alphabet} updateValue={chooseOption} />
            <button
              className={"brickDeleteBtn"}
              onClick={() => deleteValue(props.index)}
            >
              <BsFillEraserFill />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
