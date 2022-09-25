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
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction/
import "react-toastify/dist/ReactToastify.css";
import watch from "redux-watch";

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

  // valuesArray = current selected options as Array
  let valuesArray: string[] = [];
  // valuesString = current selected options as String to use it as label
  let valuesString = "";

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
    valuesString = "{" + valuesArray.toString() + "}";
  }

  return (
    <div className={"border rounded p-2"}>
      <div className={"text-left"}>
        <h4>{t("list.dropdown.addInputSymbols")}:</h4>
      </div>
      <div className={""}>
        <p className={"text-left"}>{t("list.dropdown.description")}</p>
        <div className={"text-lg pb-2 pt-2"}>
          <CreatableSelect
            allowCreateWhileLoading={false}
            formatCreateLabel={(inputValue) =>
              inputValue + " " + t("list.dropdown.addNewValue")
            }
            noOptionsMessage={() => t("list.dropdown.noOptionsMessage")}
            placeholder={t("list.dropdown.inputPlaceholder")}
            className={"text-base text-black"}
            isMulti
            onChange={handleChange}
            options={defaultAlphabetOption4.alphabet}
            onInputChange={(inputValue) =>
              inputValue.length <= 1 ? inputValue : inputValue.substr(0, 1)
            }
          />
        </div>
        <div className={"text-right"}>
          <button
            onClick={() => {
              const uniqueOptions = dialogOptions.filter(
                (item) =>
                  item.label.split("").sort().toString() ===
                  valuesString.split("").sort().toString()
              );
              if (valuesArray.length > 0 && uniqueOptions.length < 1) {
                dispatch(alphabetDeleteCustom());
                valuesArray.forEach((value) => {
                  dispatch(alphabetPushToCustom(value));
                });
                dispatch(alphabetPushToDialogOptions(valuesArray.toString()));
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
              } else if (valuesArray.length > 0 && uniqueOptions.length >= 1) {
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
            }}
            className={"col-start-3 col-span-2"}
          >
            {t("list.dropdown.saveAdding")}
          </button>
        </div>
      </div>
    </div>
  );
}
