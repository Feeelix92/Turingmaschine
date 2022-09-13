import { useState } from "react";
import { CgAddR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Select, { OnChangeValue } from "react-select";
import { Zustand, ZustandSelectProps } from "../../interfaces/CommonInterfaces";
import { alphabetPushToZustand } from "../../redux/generalStore";
import { RootState } from "../../redux/store";

export default function ZustandSelect(props: ZustandSelectProps) {
  const dispatch = useDispatch();
  /**
   * function handleChange checks if the selected option has changed
   * @param newValue
   * @param actionMeta
   */
  function handleChange(newValue: OnChangeValue<Zustand, false>) {
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
        dispatch(alphabetPushToZustand());
      }
    }

    props.updateValue(state);
  }

  const mode = useSelector((state: RootState) => state.general.mode);

  return (
    <div>
      <div className={"flex gap-5 items-center mt-2"}>
        {mode === "toiletpaper" ? (
          <Select
            value={props.current}
            blurInputOnSelect={false}
            className={"col-span-2"}
            onChange={handleChange}
            options={props.states}
            menuPortalTarget={document.querySelector("body")}
          />
        ) : (
          <Select
            value={props.current}
            blurInputOnSelect={false}
            className={"col-span-2 xl:w-32 p-1"}
            onChange={handleChange}
            options={props.states}
            // @ts-ignore
            getOptionLabel={(e) => (
              <div className={"flex items-center place-content-start"}>
                {e.icon ? <CgAddR /> : ""}
                <span className={"m-2"}>{e.label}</span>
              </div>
            )}
            menuPortalTarget={document.querySelector("body")}
          />
        )}
      </div>
    </div>
  );
}
