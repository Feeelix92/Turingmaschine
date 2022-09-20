import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import {
  EingabeAlphabet,
  ZustandCustomProp,
} from "../../interfaces/CommonInterfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabetChangeCurrent,
  alphabetDeleteCustom,
  alphabetPushToCustom,
  alphabetPushToDialogOptions,
  defaultAlphabetOption4,
} from "../../redux/generalStore";
import { RootState, store } from "../../redux/store";
import watch from "redux-watch";
import {useTranslation} from "react-i18next";
import { ToastContainer, toast } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';

export default function MultiselectDropDown(props: ZustandCustomProp) {
  ///internationalization
  const { t } = useTranslation(["general"])

  const dispatch = useDispatch();
  let currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );
  let wAlphabet = watch(store.getState, "general.currentAlphabet");
  store.subscribe(
    wAlphabet((newVal) => {
      currentAlphabet = newVal;
    })
  );

  // valuesArray = current selected options as Array
  let valuesArray: string[] = [];
  // valuesString = current selected options as String to use it as label
  let valuesString = "";

  const [placeholderText, setPlaceholderText] = useState(t("list.dropdown.inputPlaceholder"));

  /**
   * function handleChange checks if the selected option has changed
   * @param newValues
   * @param _actionMeta
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
        <h2>{t("list.dropdown.addInputSymbols")}:</h2>
      </div>
      <div className={""}>
        <p>
          {t("list.dropdown.description")}
        </p>
        <div className={"text-lg p-3"}>
          <CreatableSelect
            allowCreateWhileLoading={false}
            formatCreateLabel={(inputValue) => inputValue + " " + t("list.dropdown.addNewValue")}
            noOptionsMessage={() => t("list.dropdown.noOptionsMessage")}
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
                dispatch(alphabetChangeCurrent(currentAlphabet))
                props.onCloseDialog();
              } else {
                toast.error('Ein leeres Alphabet ist nicht erlaubt!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  }); 
              }
            }}
            className={"col-start-3 col-span-2 m-2"}
          >
            {t("list.dropdown.saveAdding")}
          </button>
        </div>
      </div>
    </div>
  );
}
