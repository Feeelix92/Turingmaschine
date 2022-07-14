import React, {Key, useEffect, useRef} from "react";
import EditField from "../Zustandsüberführungsfunktion/EditField";
import { BandItemProps } from "../../interfaces/CommonInterfaces";
import { FaTimes, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import brickWhite from "../../assets/images/brick_white.svg"
import brickBlack from "../../assets/images/brick_black.svg"
import {
  BandItemToChange,
  bandChangeItemAt,
  bandDeleteItemAt,
} from "../../redux/bandStore";
import {icons} from "react-icons";

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

  const pointerIdx = useSelector(
    (state: RootState) => state.band.pointerPosition
  );

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
          wrapperRef.current != null && event.target != null &&
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
  })  

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

      if (!allowed) {
          alert("Wert ist nicht im Alphabet enthalten!");
      }
  }


    return (
        <div
            className={`teepeeBandItem flex justify-center ${(pointerIdx===props.index) ? 'teepeePointerBorder' : ''}`}
            key={props.index}
            ref={wrapperRef}>
            <div>
                {pointerIdx===props.index ? (
                    <div className="teepeePointer"  draggable/>
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

                />
                {editMode && props.showEditField ? (
                    <div className={"editBtnDiv"}>
                      {/*<button className={""}>*/}
                      {/*  <img className={"w-[100px] h-[100px]"} src={brickWhite} alt={"SVG brick white"}/>*/}
                      {/*</button>*/}
                      {/*<button className={""}>*/}
                      {/*  <img className={"w-[100px] h-[100px]"} src={brickBlack} alt={"SVG brick black"}/>*/}
                      {/*</button>*/}
                        <EditField options={props.alphabet} updateValue={chooseOption}/>
                      <button
                          className={"brickEditBtn"}
                          onClick={() => deleteValue(props.index)}
                      >
                          <FaTrash/>
                      </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
