import React, {Key, useEffect, useRef} from "react";
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
import { FiDelete } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { RiDeleteBack2Fill, RiDeleteBin4Fill, RiDeleteBin7Fill } from "react-icons/ri";

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
            className={`band-container__band ${currentBandSkin} flex justify-center ${(pointerIdx===props.index) ? 'pointerBorder' : ''}`}
            key={props.index}
            ref={wrapperRef}>
            <div>
                {pointerIdx===props.index ? (
                    <div className="pointer"
                         draggable
                    ></div>
                ) : (
                    ""
                )}
                <input
                    type="text"
                    name="value"
                    id="valueInput"
                    className={"bandInput bg-transparent"}
                    value={props.label}
                    onChange={(e) => checkValue(props.index, e.target.value)}
                    onClick={toggleEditMode}
                    onDragOver={props.setPointerAt}

                />
                {editMode && props.showEditField ? (
                    <div className={"editBtnDiv"}>
                        <EditField options={props.alphabet} updateValue={chooseOption}/>
                        <button
                            className={"editBtn delete"}
                            onClick={() => deleteValue(props.index)}
                            
                        >
                            <TiDelete size={20}/>
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
