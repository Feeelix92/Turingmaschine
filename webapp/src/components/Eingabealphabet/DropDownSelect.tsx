import { useState } from "react";
import { CgAddR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import { cartesianProduct } from "../../interfaces/CommonFunctions";
import {
  EingabeAlphabet,
  EingabeAlphabetDialogOptions,
} from "../../interfaces/CommonInterfaces";
import {
  alphabetChangeCurrent,
  alphabetChangeCurrentMespuma,
} from "../../redux/generalStore";
import { RootState, store } from "../../redux/store";
import MultiselectDropDown from "./DropDownMultiselect";
import { useTranslation } from "react-i18next";
import watch from "redux-watch";

export default function DropDownSelect() {
  // mode für alle:
  const mode = useSelector((state: RootState) => state.general.mode);

  const anzahlSpuren = useSelector(
    (state: RootState) => state.general.anzahlSpuren
  );

  const dialogOptions = useSelector(
    (state: RootState) => state.general.dialogOptions
  );

  const currentDialogOption = useSelector(
    (state: RootState) => state.general.currentDialogOption
  );
  const dispatch = useDispatch();
  let currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );
  let wAlphabet = watch(store.getState, "general.currentAlphabet");
  store.subscribe(
    wAlphabet((newVal, oldVal) => {
      if (newVal != oldVal) {
        currentAlphabet = newVal;
      }
    })
  );

  /**
   * checks if Dialog opened or closed
   */
  const [openDialog, setOpenDialog] = useState(false);

  const onCloseDialog = () => {
    setOpenDialog(false);

    if (mode === "mespuma") {
      let literalArr: string[] = [];

      let tempAlphabet = Object.assign(
        [],
        currentAlphabet.alphabet
      ) as EingabeAlphabet[];
      tempAlphabet.push({ value: "ß", label: "ß", warningMode: false });

      tempAlphabet.forEach((literal) => {
        literalArr.push(literal.value);
      });

      let combinationArr: string[][] = [];

      for (let i = 0; i < anzahlSpuren; i++) {
        combinationArr.push(literalArr);
      }

      let cartesianArr = cartesianProduct(combinationArr);

      let finalBandAlphabet: string[] = [];

      cartesianArr.forEach((element: any[]) => {
        let el = "(" + element.join() + ")";
        finalBandAlphabet.push(el);
      });

      dispatch(
        alphabetChangeCurrentMespuma({
          cartesian: finalBandAlphabet,
          alphabet: currentAlphabet,
        })
      );
    } else {
      dispatch(alphabetChangeCurrent(currentAlphabet));
    }
  };

  /**
   * function handleChange checks if the selected option has changed
   * @param newValue
   * @param _actionMeta
   */
  function handleChange(
    newValue: OnChangeValue<EingabeAlphabetDialogOptions, false>,
    _actionMeta: ActionMeta<EingabeAlphabetDialogOptions>
  ) {
    if (newValue) {
      if (newValue.alphabet.key !== 0) {
        if (mode === "mespuma") {
          let literalArr: string[] = [];

          let tempAlphabet = Object.assign(
            [],
            newValue.alphabet.alphabet
          ) as EingabeAlphabet[];
          tempAlphabet.push({ value: "ß", label: "ß", warningMode: false });

          tempAlphabet.forEach((literal) => {
            literalArr.push(literal.value);
          });

          let combinationArr: string[][] = [];

          for (let i = 0; i < anzahlSpuren; i++) {
            combinationArr.push(literalArr);
          }

          let cartesianArr = cartesianProduct(combinationArr);

          let finalBandAlphabet: string[] = [];

          cartesianArr.forEach((element: any[]) => {
            let el = "(" + element.join() + ")";
            finalBandAlphabet.push(el);
          });

          dispatch(
            alphabetChangeCurrentMespuma({
              cartesian: finalBandAlphabet,
              alphabet: newValue.alphabet,
            })
          );
        } else {
          dispatch(alphabetChangeCurrent(newValue.alphabet));
        }
        setOpenDialog(false);
      } else {
        dispatch(alphabetChangeCurrent(newValue.alphabet));
        setOpenDialog(true);
      }
      // dispatch(bandDeleteAll());
    }
  }

  ///internationalization
  const { t } = useTranslation(["general"]);

  return (
    <div>
      <div
        className={
          "flex grid grid-cols-3 lg:grid-cols-4 gap-5 items-center mt-2"
        }
      >
        <p className={"col-span-3 lg:col-span-2 text-left"}>
          {" "}
          {t("list.dropdown.inputSymbols")} ∑ =
        </p>
        <Select
          value={currentDialogOption}
          blurInputOnSelect={false}
          className={"col-span-3 lg:col-span-2"}
          onChange={handleChange}
          options={dialogOptions}
          getOptionValue={(option) => option.alphabet.key.toString()}
          //@ts-ignore
          getOptionLabel={(e) => (
            <div className={"flex items-center place-content-start"}>
              {e.icon ? <CgAddR /> : ""}
              <span className={"m-2"}>{e.label === "ß" ? "" : e.label}</span>
            </div>
          )}
          menuPortalTarget={document.querySelector("body")}
          isSearchable={false}
          hideSelectedOptions={true}
        />
      </div>
      <div>
        {openDialog && (
          <div className={"text-white text-lg col-span-2"}>
            <MultiselectDropDown
              customSelect={true}
              onCloseDialog={() => onCloseDialog()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
