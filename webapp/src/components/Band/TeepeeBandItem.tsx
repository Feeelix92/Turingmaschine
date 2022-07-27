import React, {Key, useEffect, useRef} from "react";
import EditField from "../Zustandsüberführungsfunktion/EditField";
import { BandItemProps } from "../../interfaces/CommonInterfaces";
import {FaRedo, FaTimes, FaTrash} from "react-icons/fa";
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
import {BsFillEraserFill} from "react-icons/bs";
import BrickWhite from "../../assets/images/brick_white.svg";
import BrickBlack from "../../assets/images/brick_black.svg";

export default function BandItem(props: BandItemProps) {
  const wrapperRef: React.RefObject<HTMLInputElement> = React.createRef();

  const [editMode, setEditMode] = React.useState(false);
  function toggleEditMode() {
    setEditMode(!editMode);
  }

  // Zum Pointer scrollen:
  const fieldRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if(fieldRef.current) {
      fieldRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  });

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
            <div className={""}>
                {pointerIdx===props.index ? (
                    <div className="teepeePointer scroll-mx-16" ref={fieldRef}  draggable/>
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
                    inputMode='none'
                />
                {props.label == "1" &&
                    <img draggable={false} className={"brick"} src={BrickWhite} alt="brick black" onClick={toggleEditMode}/>
                }
                {props.label == "#" &&
                    <img draggable={false} className={"brick"} src={BrickBlack} alt="brick white" onClick={toggleEditMode}/>
                }
                {editMode && props.showEditField ? (
                    <div className={"editBtnDiv"}>
                      <EditField options={props.alphabet} updateValue={chooseOption}/>
                      <button
                          className={"brickDeleteBtn"}
                          onClick={() => deleteValue(props.index)}
                      >
                        <p className={"text-white"}><BsFillEraserFill/></p>
                      </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
