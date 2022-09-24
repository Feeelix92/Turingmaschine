import { KeyboardEventHandler, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import { EingabeAlphabet } from "../../interfaces/CommonInterfaces";
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
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction/
import "react-toastify/dist/ReactToastify.css";

export default function MultiselectDropDown(props: any) {
  ///internationalization
  const { t } = useTranslation(["general"]);

  const dispatch = useDispatch();

  const dialogOptions = useSelector(
    (state: RootState) => state.general.dialogOptions
  );

  let currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );

  let wAlphabet = watch(store.getState, "general.currentAlphabet");
  store.subscribe(
    wAlphabet((newVal) => {
      currentAlphabet = newVal;
    })
  );

  const [optionString, setOptionString] = useState("");
  const [optionArray, setOptionArray] = useState<EingabeAlphabet[]>([]);

  /**
   * function handleChange checks if the selected option has changed
   * @param newValues
   * @param _actionMeta
   */
  function handleChange(
    newValues: OnChangeValue<EingabeAlphabet, true>,
    _actionMeta: ActionMeta<EingabeAlphabet>
  ) {
    // // converting the object to an iteratable Array
    const temp = Array.from(newValues.values());
    setOptionArray(temp);
  }

  function handleInputChange(inputValue: string) {
    if (inputValue) {
      setOptionString(inputValue);
    }
  }

  function handleKeyDown(event: KeyboardEventHandler<HTMLDivElement>) {
    if (!optionString) return;
    switch (event.key) {
      case "Enter":
      case "Tab": {
        let temp = optionArray.slice(0, optionArray.length);

        const exists = temp.some((el) => {
          return el.label === optionString;
        });

        if (!exists) {
          temp.push({
            label: optionString,
            value: optionString,
            warningMode: false,
          });
          setOptionArray(temp);
          setOptionString("");
        } else {
          // display warning
          toast.error("" + t("list.dropdown.alphabetAlreadyExists"), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        event.preventDefault();
        break;
      }
      case "Backspace": {
        setOptionString("");
        event.preventDefault();
        break;
      }
    }
  }

  const pushOptions = () => {
    const uniqueOptions = dialogOptions.filter(
      (item) =>
        item.label.split("").sort().toString() ===
        optionString.split("").sort().toString()
    );
    if (optionArray.length > 0 && uniqueOptions.length - 1 < 1) {
      dispatch(alphabetDeleteCustom());
      let tempOptions: string[] = [];
      optionArray.forEach((value) => {
        dispatch(alphabetPushToCustom(value.value));
        tempOptions.push(value.value);
      });

      dispatch(alphabetPushToDialogOptions(tempOptions.toString()));

      dispatch(alphabetChangeCurrent(currentAlphabet));
      props.onCloseDialog();
      toast.success("" + t("list.dropdown.alphabetCreated"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (optionArray.length > 0 && uniqueOptions.length - 1 >= 1) {
      toast.error("" + t("list.dropdown.alphabetAlreadyExists"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("" + t("list.dropdown.emptyIsNotAllowed"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className={"border rounded p-2"}>
      <div className={"text-left"}>
        <h4>{t("list.dropdown.addInputSymbols")}:</h4>
      </div>
      <div className={""}>
        <p className={"text-left"}>{t("list.dropdown.description")}</p>
        <div className={"text-lg pb-2 pt-2"}>
          <CreatableSelect
            inputValue={optionString}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={handleChange}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type something and press enter..."
            value={optionArray}
          />
        </div>
        <div className={"text-right"}>
          <button onClick={pushOptions} className={"col-start-3 col-span-2"}>
            {t("list.dropdown.saveAdding")}
          </button>
        </div>
      </div>
    </div>
  );
}
