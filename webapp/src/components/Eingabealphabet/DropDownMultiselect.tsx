import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import {
  EingabeAlphabet,
  ZustandCustomProp,
} from "../../interfaces/CommonInterfaces";
import { useDispatch } from "react-redux";
import {
  alphabetDeleteCustom,
  alphabetPushToCustom,
  alphabetPushToDialogOptions,
  defaultAlphabetOption4,
} from "../../redux/generalStore";

export default function MultiselectDropDown(props: ZustandCustomProp) {
  const dispatch = useDispatch();

  // valuesArray = current selected options as Array
  let valuesArray: string[] = [];
  // valuesString = current selected options as String to use it as label
  let valuesString = "";

  const [placeholderText, setPlaceholderText] = useState("Erstellen sie ");

  /**
   * function handleChange checks if the selected option has changed
   * @param newValues
   * @param actionMeta
   */
  function handleChange(
    newValues: OnChangeValue<EingabeAlphabet, true>,
    _actionMeta: ActionMeta<EingabeAlphabet>
  ) {
    // converting the object to an iteratable Array
    const optionsArray = Array.from(newValues.values());
    valuesArray = optionsArray.map(({ value }) => value);
    valuesString = valuesArray.toString();
  }

  return (
    <div className={""}>
      <div className={""}>
        <h2>Eingabealphabet hinzufügen:</h2>
      </div>
      <div className={""}>
        <p>
          Sie können Zeichen eingeben oder Zeichen aus den
          Standard-Eingabealphabeten auswählen!
        </p>
        <div className={"text-lg p-3"}>
          <CreatableSelect
            allowCreateWhileLoading={false}
            formatCreateLabel={(inputValue) => inputValue + " hinzufügen"}
            noOptionsMessage={() => "Geben Sie neues Zeichen ein!"}
            placeholder={placeholderText}
            className={"text-base text-black"}
            isMulti
            onChange={handleChange}
            options={defaultAlphabetOption4.alphabet}
            onInputChange={(inputValue) =>
              inputValue.length <= 1 ? inputValue : inputValue.substr(0, 1)
            }
          />
        </div>
        <div className={""}>
          <button
            onClick={() => {
              if (valuesArray.length > 0) {
                dispatch(alphabetDeleteCustom());
                valuesArray.forEach((value) => {
                  dispatch(alphabetPushToCustom(value));
                });
                dispatch(alphabetPushToDialogOptions(valuesArray.toString()));
              } else {
                alert("Ein leeres Alphabet ist nicht erlaubt!");
              }
              props.onCloseDialog();
            }}
            className={"col-start-3 col-span-2 m-2"}
          >
            speichern
          </button>
        </div>
      </div>
    </div>
  );
}
