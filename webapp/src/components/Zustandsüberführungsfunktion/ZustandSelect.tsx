import { CgAddR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import {
  Direction,
  Zustand,
  ZustandSelectProps,
} from "../../interfaces/CommonInterfaces";
import { alphabetPushToZustand } from "../../redux/generalStore";
import { RootState } from "../../redux/store";

export default function ZustandSelect(props: ZustandSelectProps) {
  const dispatch = useDispatch();
  /**
   * function handleChange checks if the selected option has changed
   * @param newValue
   * @param _actionMeta
   */
  function handleChange(
    newValue: OnChangeValue<Zustand, false>,
    _actionMeta: ActionMeta<Direction | Zustand>
  ) {
    let state = newValue as Zustand;

    if (mode !== "toiletpaper") {
      if (newValue?.label === "+") {
        state = new Zustand(
          `q${props.states.length}`,
          `q${props.states.length}`,
          false,
          false,
          false
        );
        dispatch(alphabetPushToZustand(state));
      }
    }
    props.updateValue(state);
  }

  const mode = useSelector((state: RootState) => state.general.mode);

  return (
    <div>
      <div className={"flex gap-5 items-center"}>
        {mode === "toiletpaper" ? (
          <Select
            value={props.current}
            blurInputOnSelect={true}
            className={""}
            onChange={handleChange}
            options={props.states}
            menuPortalTarget={document.querySelector("body")}
            isSearchable={false}
            hideSelectedOptions={true}
          />
        ) : (
          <Select
            value={props.current}
            blurInputOnSelect={true}
            className={""}
            onChange={handleChange}
            options={props.states}
            // @ts-ignore
            getOptionLabel={(e) => (
              <div className={"flex items-center place-content-start"}>
                {e.icon ? <CgAddR /> : ""}
                <span className={""}>{e.label}</span>
              </div>
            )}
            menuPortalTarget={document.querySelector("body")}
            isSearchable={false}
            hideSelectedOptions={true}
          />
        )}
      </div>
    </div>
  );
}
