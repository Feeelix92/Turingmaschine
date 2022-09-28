import React, { Key, useEffect } from "react";
import EditField from "../Zustandsüberführungsfunktion/EditField";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  BandItemToChange,
  bandChangeItemAt,
  bandDeleteItemAt,
  bandChangeItemAtMespuma,
  BandItemToChangeMespuma,
  bandDeleteItemAtMespuma,
} from "../../redux/bandStore";
import { BsFillEraserFill } from "react-icons/bs";
import { BandItemProps } from "../../interfaces/CommonInterfaces";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction/
import "react-toastify/dist/ReactToastify.css";

export default function BandItem(props: BandItemProps) {
  const wrapperRef: React.RefObject<HTMLInputElement> = React.createRef();

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

  const currentMode = useSelector((state: RootState) => state.general.mode);

  const dispatch = useDispatch();

  const pointerIdx = useSelector(
    (state: RootState) => state.band.pointerPosition
  );

  //Internationalization
  const { t } = useTranslation(["general"]);

  function chooseOption(option: string) {
    if (currentMode === "mespuma") {
      const tempMespuma: BandItemToChangeMespuma = {
        bandIndex: props.bandIndex,
        index: props.index,
        value: option,
        label: option,
      };
      dispatch(bandChangeItemAtMespuma(tempMespuma));
    } else {
      const temp: BandItemToChange = {
        index: props.index,
        value: option,
        label: option,
      };
      dispatch(bandChangeItemAt(temp));
    }
    setEditMode(false);
  }

  function deleteValue() {
    if (currentMode === "mespuma") {
      dispatch(
        bandDeleteItemAtMespuma({
          bandIndex: props.bandIndex,
          index: props.index,
        })
      );
    } else {
      dispatch(bandDeleteItemAt(props.index));
    }
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
      if (entry.value === value || value === "ß") {
        if (currentMode === "mespuma") {
          const tempMespuma: BandItemToChangeMespuma = {
            bandIndex: props.bandIndex,
            index: index as number,
            value: value,
            label: value,
          };
          dispatch(bandChangeItemAtMespuma(tempMespuma));
        } else {
          const temp: BandItemToChange = {
            index: index as number,
            value: value,
            label: value,
          };
          dispatch(bandChangeItemAt(temp));
        }
        allowed = true;
      } else if (value === "ß") {
        const temp: BandItemToChange = {
          index: index as number,
          value: value,
          label: "ß",
        };
        if (currentMode === "mespuma") {
          const tempMespuma: BandItemToChangeMespuma = {
            bandIndex: props.bandIndex,
            index: index as number,
            value: value,
            label: "ß",
          };
          dispatch(bandChangeItemAtMespuma(tempMespuma));
        } else {
          const temp: BandItemToChange = {
            index: index as number,
            value: value,
            label: "ß",
          };
          dispatch(bandChangeItemAt(temp));
        }
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
      className={`band-container__band flex justify-center ${
        pointerIdx === props.index ? "pointerBorder" : ""
      }`}
      key={props.index}
      ref={wrapperRef}
    >
      {pointerIdx === props.index ? (
        <div
          className={"scroll-mx-16" + (props.bandIndex == 0 ? " pointer" : "")}
          ref={fieldRef}
          draggable
        >
          {" "}
        </div>
      ) : (
        ""
      )}
      <input
        type="text"
        name="value"
        id="valueInput"
        className={"bandInput bg-transparent"}
        value={props.label === "ß" ? "" : props.label}
        onChange={(e) => checkValue(props.index, e.target.value)}
        onDragOver={props.setPointerAt}
        autoComplete="off"
        // autoComplete="0" // Bringt das schon was gegen die Vorschläge vom Browser?
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
          <button
            className={"editBtn editPill delete z-50 "}
            onClick={() => deleteValue()}
          >
            <BsFillEraserFill className={""} />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
