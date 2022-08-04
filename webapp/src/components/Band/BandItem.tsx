import React, { Key, useEffect } from "react";
import EditField from "../Zustandsüberführungsfunktion/EditField";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  BandItemToChange,
  bandChangeItemAt,
  bandDeleteItemAt,
} from "../../redux/bandStore";
import { BsFillEraserFill } from "react-icons/bs";
import { BandItemProps } from "../../interfaces/CommonInterfaces";

export default function BandItem(props: BandItemProps) {
  const wrapperRef: React.RefObject<HTMLInputElement> = React.createRef();

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


  const [editMode, setEditMode] = React.useState(false);
  function toggleEditMode() {
    setEditMode(!editMode);
  }

  const [displayKeyboard, setKeyboard] = React.useState(false); // Damit Keyboard sich erst beim 2. Klick öffnet
  function disableKeyboard() {
    setKeyboard(false);
  }
  function enableKeyboard() {
    setKeyboard(true);
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

  function deleteValue() {
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

    if (!allowed) {
      alert("Wert ist nicht im Alphabet enthalten!");
    }
  }

  return (
    <div
      className={`band-container__band ${currentBandSkin} flex justify-center ${
        pointerIdx === props.index ? "pointerBorder" : ""
      }`}
      key={props.index}
      ref={wrapperRef}
    >
      <div>
        {pointerIdx === props.index ? ( 
          <div className="pointer scroll-mx-16" ref={fieldRef} draggable></div>
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
          onDragOver={props.setPointerAt}
          autoComplete="0" // Bringt das schon was gegen die Vorschläge vom Browser?
          inputMode={displayKeyboard ? "text" : "none"}
          onClick={() => {
            disableKeyboard();
            toggleEditMode();
          }}
          onDoubleClick={() => {
            enableKeyboard();
          }}
        />
        {editMode && props.showEditField ? (
          <div className={"editBtnDiv"}>
            <EditField options={props.alphabet} updateValue={chooseOption} />
            <button className={"editBtn delete"} onClick={() => deleteValue()}>
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
