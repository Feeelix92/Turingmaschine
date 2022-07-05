import { useState } from "react";
import { CgAddR } from "react-icons/cg";
import { useDispatch } from "react-redux";
import Select, { OnChangeValue } from "react-select";
import { Zustand, ZustandSelectProps } from "../../interfaces/CommonInterfaces";
import { alphabetPushToZustand } from "../../redux/generalStore";

export default function ZustandSelect(props: ZustandSelectProps) {
  const dispatch = useDispatch();
  /**
   * function handleChange checks if the selected option has changed
   * @param newValue
   * @param actionMeta
   */
  function handleChange(newValue: OnChangeValue<Zustand, false>) {
    let state = newValue as Zustand;

    if (newValue?.label === "erstellen") {
      state = new Zustand(
        `q${props.states.length}`,
        `q${props.states.length}`,
        false,
        false
      );
    }

    props.updateValue(state);
    dispatch(alphabetPushToZustand());

    console.log(newValue);
  }

  return (
    <div>
      <div className={"flex xl:grid xl:grid-cols-4 gap-5 items-center mt-2"}>
        <Select
          value={props.current}
          blurInputOnSelect={false}
          className={"col-span-2"}
          onChange={handleChange}
          options={props.states}
          // @ts-ignore
          getOptionLabel={(e) => (
            <div className={"flex items-center place-content-start"}>
              {e.icon ? <CgAddR /> : ""}
              <span className={"m-2"}>{e.label}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
}
