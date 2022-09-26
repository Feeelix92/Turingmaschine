import { createRef, Key, RefObject, useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Select, {ActionMeta, OnChangeValue} from "react-select";
import {
  CellProps,
  Direction,
  directions,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import { RootState } from "../../redux/store";
import {
  initialZustand3,
  maschineChangeExecutable,
  tableCheckWarning,
  tableUpdateCell,
  tableUpdateRowIsFinal,
} from "../../redux/generalStore";
import EditField from "./EditField";
import ZustandSelect from "./ZustandSelect";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction/
import "react-toastify/dist/ReactToastify.css";

export default function Cell(props: CellProps) {
  const mode = useSelector((state: RootState) => state.general.mode);
  const wrapperRef: RefObject<HTMLTableCellElement> = createRef();

  const dispatch = useDispatch();

  const alphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );

  const rows = useSelector((state: RootState) => state.general.rows);

  const temp = [initialZustand3];

    //Internationalization
    const {t} = useTranslation(["general"]);

  /////////// States from State ///////////
  const zustandsmenge = useSelector(
    (state: RootState) => state.general.zustandsmenge
  );
  let states =
    mode !== "toiletpaper" ? zustandsmenge.concat(temp) : zustandsmenge;

  useEffect(() => {
    states = zustandsmenge;
    const failure = checkWarningModus();

    if (failure !== props.warningMode) {
      const tempAlphabet: string[] = [];
      alphabet.alphabet.forEach((entry) => {
        tempAlphabet.push(entry.value);
      });
      dispatch(tableCheckWarning({ rows: rows, alphabet: tempAlphabet }));
    }
  }, [zustandsmenge]);

  /////////// finalStates from State ///////////
  const endzustandsMenge = useSelector(
    (state: RootState) => state.general.endZustand
  );
  let finalStates = endzustandsMenge;
  useEffect(() => {
    finalStates = endzustandsMenge;
    const failure = checkWarningModus();
    if (failure !== props.warningMode) {
      dispatch(
        tableUpdateCell({
          cellIndex: props.index,
          rowIndex: props.rowIndex,
          value: props.value,
          warningMode: failure,
        })
      );
    }
    if (props.value instanceof Zustand) {
      let foundInFinal = false;

      console.log("Zustand Check");

      finalStates.forEach((state) => {
        if (props.value instanceof Zustand) {
          if (state.value === props.value.value) {
            foundInFinal = true;
            setFinal(true);
          }
        }
      });
      if (!foundInFinal) {
        setFinal(false);
      }
    }
  }, [endzustandsMenge]);

  /////////// Eingabealphabet from State ///////////
  const eingabeAlphabet = useSelector(
    (state: RootState) => state.general.bandAlphabet
  );
  let eALphabet = eingabeAlphabet;
  useEffect(() => {
    eALphabet = eingabeAlphabet;
    const failure = checkWarningModus();
    if (failure !== props.warningMode) {
      dispatch(
        tableUpdateCell({
          cellIndex: props.index,
          rowIndex: props.rowIndex,
          value: props.value,
          warningMode: failure,
        })
      );
    }
  }, [eingabeAlphabet]);

    const [editMode, setEditMode] = useState(false);

    function toggleEditMode() {
        // hide/show the edit-buttons
        setEditMode(!editMode);
    }

    function chooseOption(option: string) {
        const failure = checkWarningModus(option);
        // pass chosen options to the parent to update the cell
        dispatch(
            tableUpdateCell({
                cellIndex: props.index,
                rowIndex: props.rowIndex,
                value: option,
                warningMode: failure,
            })
        );
        // close the edit-buttons
        setEditMode(false);
    }

    function handleChange(
        newValue: OnChangeValue<Direction | Zustand, false>,
        _actionMeta: ActionMeta<Direction | Zustand>
        ) {
        if (newValue) {
            const failure = checkWarningModus(newValue);
            if ((mode == "mespuma" || mode == "default" || mode == "toiletpaper") && (props.index === 1 || props.index === 3)) {
                dispatch(
                    tableUpdateCell({
                        cellIndex: props.index,
                        rowIndex: props.rowIndex,
                        value: newValue.value,
                        warningMode: failure,
                    })
                );
            } else {
                dispatch(
                    tableUpdateCell({
                        cellIndex: props.index,
                        rowIndex: props.rowIndex,
                        value: newValue,
                        warningMode: failure,
                    })
                );
            }
        }
    }

    function setFinal(newValue: boolean) {
        dispatch(
            tableUpdateRowIsFinal({
                cellIndex: props.index,
                rowIndex: props.rowIndex,
                value: newValue,
            })
        );
    }

    useEffect(() => {
        // event to handle click outside to hide the edit-buttons
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
    // map the passed alphabet to check whether the alphabet contains the new input value
    eingabeAlphabet.map((entry) => {
      if (
        entry.value === value ||
        !props.showEditField ||
        value === "" ||
        value === "B"
      ) {
        // if its allowed, we pass the new value to the parent to update the cell value
        const failure = checkWarningModus(value);
        dispatch(
          tableUpdateCell({
            cellIndex: props.index,
            rowIndex: props.rowIndex,
            value: value,
            warningMode: failure,
          })
        );
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

  function checkWarningModus(newValue?: any) {
    let tempVar = newValue ? newValue : props.value;
    if (tempVar instanceof Zustand) {
      let tempBool = states.some((value) => {
        let val = tempVar as Zustand;
        return value.value === val.value;
      });
      if (tempBool) {
        return false;
      } else {
        dispatch(maschineChangeExecutable(false));
        return true;
      }
    } else if (!(tempVar instanceof Direction)) {
      let tempBool = eALphabet.some((value) => {
        if (tempVar.value) {
          return value.value === tempVar.value;
        } else {
          return value.value === tempVar;
        }
      });
      if (tempBool) {
        return false;
      } else {
        dispatch(maschineChangeExecutable(false));
        return true;
      }
    } else {
      return false;
    }
  }

    const placeholderTP = eALphabet.find(e => e.value === props.value)
    const placeholderTpMultiLang = () => {
        if (placeholderTP?.label === "\u26AA") {
            return '\u26AA'
        }
        if (placeholderTP?.label === "\u26AB") {
            return '\u26AB'
        }
        if (placeholderTP?.label === "\u2205") {
            return '\u2205'
        }

    }

    return (
    <td
      ref={wrapperRef}
      className="px-2 py-2 w-1/6 whitespace-nowrap text-sm text-gray-900 border-r flex justify-center items-center"
    >
      {props.value instanceof Zustand ? (
        <ZustandSelect
          states={states}
          current={props.value}
            // @ts-ignore
          updateValue={handleChange}
        />
      ) : (
        ""
      )}

      {props.value instanceof Direction ? (
        <Select
          value={props.value}
          blurInputOnSelect={false}
          className={"text-black text-base"}
          onChange={handleChange}
          options={directions}
          menuPortalTarget={document.querySelector("body")}
          isSearchable={false}
          hideSelectedOptions={true}
        />
      ) : (
        ""
      )}
      {mode == "default" && typeof props.value === "string" ? (
          <Select
              value={eALphabet.filter(item => item.label === props.value)}
              blurInputOnSelect={false}
              className={"text-black text-base"}
              onChange={handleChange}
              options={eALphabet.filter(item => item.label != "")}
              menuPortalTarget={document.querySelector("body")}
              isSearchable={false}
              hideSelectedOptions={true}
          />
      ) : (
        ""
      )}
      {/* Toilettenpapiermodus */}
        {mode == "toiletpaper" && typeof props.value === "string" ? (
            <Select
                value={eALphabet.filter(item => item.label === placeholderTpMultiLang())}
                blurInputOnSelect={false}
                className={"text-black text-base"}
                onChange={handleChange}
                options={eALphabet}
                menuPortalTarget={document.querySelector("body")}
                isSearchable={false}
                hideSelectedOptions={true}
            />
        ) : (
            ""
        )}

      {/* Mehrspurenmaschine:  */}
      {mode == "mespuma" && typeof props.value === "string" ? (
        <Select
          value={eALphabet.filter(item => item.label === props.value)}
          blurInputOnSelect={false}
          className={"text-black text-base"}
          onChange={handleChange}
          options={eALphabet.filter(
            (Eingabealphabet) => Eingabealphabet.value.length > 1
          )}
          menuPortalTarget={document.querySelector("body")}
          isSearchable={false}
          hideSelectedOptions={true}
        />
      ) : (
        ""
      )}

            {props.warningMode ? (
                <IoIosWarning
                    color="orange"
                    title={t("cell.warningInputValueNotAllowed")}
                    size="32"
                />
            ) : null}

      {editMode && props.showEditField ? (
        <EditField options={eingabeAlphabet} updateValue={chooseOption} />
      ) : (
        ""
      )}
    </td>
  );
}
