import React, { Key, useEffect, useRef } from "react";
import EditField from "../Zustandsüberführungsfunktion/EditField";
import { BandItemProps } from "../../interfaces/CommonInterfaces";
import { FaTimes, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  BandItemToChange,
  bandChangeItemAt,
  bandDeleteItemAt,
} from "../../redux/bandStore";

export default function BandItem(props: BandItemProps) {
  const wrapperRef: React.RefObject<HTMLInputElement> = React.createRef();

  const [editMode, setEditMode] = React.useState(false);
  function toggleEditMode() {
    setEditMode(!editMode);
  }

  const currentBandSkin = useSelector(
    (state: RootState) => state.band.bandSkin
  );
  const dispatch = useDispatch();

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
          wrapperRef != null &&
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
      if (entry.value === value || value === "") {
        const temp: BandItemToChange = {
          index: index as number,
          value: value,
          label: value,
        };
        dispatch(bandChangeItemAt(temp));
        allowed = true;
      } else if (value === "") {
        const temp: BandItemToChange = {
          index: index as number,
          value: value,
          label: "",
        };
        dispatch(bandChangeItemAt(temp));
        allowed = true;
      }
    });

    if (allowed === false) {
      alert("Wert ist nicht im Alphabet enthalten!");
    }
  }

  return (
    <div
      className={`band-container__band ${currentBandSkin} flex justify-center ${
        props.pointer ? "pointerBorder" : ""
      }`}
      key={props.index}
      ref={wrapperRef}
    >
      {props.pointer ? (
        <div
          className="pointer"

          draggable
        ></div>
      ) : (
        ""
      )}

      <input
        type="text"
        name="value"
        id="valueInput"
        className="bandInput bg-transparent w-8 "
        value={props.label}
        onChange={(e) => checkValue(props.index, e.target.value)}
        onClick={toggleEditMode}
        onDragOver={(e) => props.setPointerAt()}
      />
      {editMode && props.showEditField ? (
        <EditField options={props.alphabet} updateValue={chooseOption} />
      ) : (
        ""
      )}
      {editMode && props.showEditField ? (
        <a
          href="#"
          className="delete-value-button w-full text-gray-700 focus:outline-none items-center"
          onClick={() => deleteValue(props.index)}
        >
          <FaTrash />
        </a>
      ) : (
        <a
          href="#"
          className="invisible delete-value-button w-full text-gray-700 focus:outline-none items-center"
        >
          <FaTrash />
        </a>
      )}
    </div>
  );
}
