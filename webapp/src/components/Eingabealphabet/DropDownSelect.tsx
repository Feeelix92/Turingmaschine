import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select, { ActionMeta, OnChangeValue } from "react-select";

import { bandDeleteAll } from "../../redux/bandStore";
import {
  alphabetChangeCurrent,
  EingabeAlphabetDialogOptions,
} from "../../redux/generalStore";
import { RootState } from "../../redux/store";
import MultiselectDropDown from "./DropDownMultiselect";

export default function DropDownSelect() {
  const dialogOptions = useSelector(
    (state: RootState) => state.general.dialogOptions
  );
  const currentDialogOption = useSelector(
    (state: RootState) => state.general.currentDialogOption
  );
  const dispatch = useDispatch();
  /**
   * checks if Dialog opened or closed
   */
  const [openDialog, setOpenDialog] = useState(false);
  // const [showPlaceholder, setShowPlaceholder] = useState(true);

  /**
   * checks if Button on DropDownMultiselect is clicked
   * @param data
   */

  /**
   * function handleChange checks if the selected option has changed
   * @param newValue
   * @param actionMeta
   */
  function handleChange(
    newValue: OnChangeValue<EingabeAlphabetDialogOptions, false>,
    actionMeta: ActionMeta<EingabeAlphabetDialogOptions>
  ) {
    console.group("Value Changed");
    console.log(newValue);
    if (newValue) {
      if (newValue.alphabet.key !== 0) {
        dispatch(alphabetChangeCurrent(newValue.alphabet));
      } else {
        dispatch(alphabetChangeCurrent(newValue.alphabet));
        setOpenDialog(true);
      }
      dispatch(bandDeleteAll());
    }
    console.groupEnd();
  }
  return (
    <div
      className={
        "bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 grid grid-cols-2 gap-2 items-center"
      }
    >
      <p className={"p-3"}>Eingabealphabet ∑ =</p>
      <Select
        value={currentDialogOption}
        blurInputOnSelect={false}
        className={"text-black p-3 text-base"}
        onChange={handleChange}
        options={dialogOptions}
        // @ts-ignore
        getOptionLabel={(e) => (
          <div className={"flex items-center place-content-start"}>
            {e.icon}
            <span className={"m-2"}>{e.label}</span>
          </div>
        )}
      />
      {/*}*/}
      {openDialog && (
        <div className={"text-white text-lg col-span-2"}>
          <MultiselectDropDown
            customSelect={true}
            onCloseDialog={() => setOpenDialog(false)}
          />
        </div>
      )}
    </div>
  );
}
