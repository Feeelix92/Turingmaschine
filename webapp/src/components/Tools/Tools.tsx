import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import Select, { OnChangeValue } from "react-select";
import { bandChangeItemAt, bandDeleteAll } from "../../redux/bandStore";
import { OperationType } from "../../interfaces/CommonInterfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabetDeleteCustom,
  alphabetGenerateBand,
  alphabetPushToCustom,
  alphabetPushToDialogOptions,
} from "../../redux/generalStore";
import { RootState } from "../../redux/store";
import ExampleSelect from "../Example/ExampleSelect";
import { CodeExample } from "../../interfaces/CommonInterfaces";
import { examples } from "../../examples/Examples";

const currentOptions: CodeExample[] = examples;

export default function Calculator() {
  const { t } = useTranslation(["general"]);

  const dispatch = useDispatch();

  /**
   * To check if Accordion opened or closed
   */
  const [isOpen, setisOpen] = useState(false);

  /**
   * First Number
   */
  const [number1, setNumber1] = useState(0);

  /**
   * Second Number
   */
  const [number2, setNumber2] = useState(1);

  /**
   * Accordion data (Title, Icons)
   */
  const accordionData = {
    title: <h2> {t("calculator.name")} </h2>,
    openAccordion: (
      <button className={"float-left"}>
        <BiCaretDown />
      </button>
    ),
    closeAccordion: (
      <button className={"float-left"}>
        <BiCaretUp />
      </button>
    ),
  };

  const { title, openAccordion, closeAccordion } = accordionData;

  function toBinary(literal: number): string[] {
    const result = literal.toString(2);
    return result.split("");
  }

  function toUnary(literal: number): string[] {
    let returnResult = [];
    for (let i = 0; i < literal; i++) {
      returnResult.push("1");
    }
    return returnResult;
  }

  const types = [
    new OperationType(t("calculator.binary"), t("calculator.binary")),
    new OperationType(t("calculator.unary"), t("calculator.unary")),
  ];

  const [selectedType, setSelectedType] = useState(types[0]);

  function selectType(type: OnChangeValue<OperationType, false>) {
    if (type) {
      setSelectedType(type);
    }
  }

  const currentPointerPos = useSelector(
    (state: RootState) => state.band.pointerPosition
  );

  function computeNumbers() {
    dispatch(alphabetDeleteCustom());

    if (selectedType.value === t("calculator.binary")) {
      const operandOne = toBinary(number1);
      // Binary alphabet
      const alphabet = ["1", "0", "#"];
      saveOperandsToBand(alphabet, operandOne);
    } else {
      const operandOne = toUnary(number1);
      // Unary alphabet
      const alphabet = ["1", "#"];
      saveOperandsToBand(alphabet, operandOne);
    }
  }

  function saveOperandsToBand(alphabet: string[], operandOne: string[]) {
    alphabet.forEach((value: string) => {
      dispatch(alphabetPushToCustom(value));
    });
    dispatch(alphabetPushToDialogOptions(alphabet.toString()));
    dispatch(alphabetGenerateBand(alphabet));

    operandOne.forEach((param, idx) => {
      dispatch(
        bandChangeItemAt({
          index: currentPointerPos + idx,
          value: param,
          label: param,
        })
      );
    });
  }
  return (
    <div
      className={
        "border-solid border rounded bg-white p-2 border rounded items-center hover:bg-gray-100 col-span-2"
      }
    >
      <div className={"mb-2"} onClick={() => setisOpen(!isOpen)}>
        <div className={"flex grid grid-cols-3 gap-5 items-center"}>
          <span className={""}>{isOpen ? closeAccordion : openAccordion}</span>
          <span>{title}</span>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-wrap mb-2">
          <div className="w-full md:w-1/3 px-2 mb-2 self-center">
            <div className="relative">
              <Select
                className="block appearance-none w-full bg-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                options={types}
                value={selectedType}
                blurInputOnSelect={false}
                onChange={selectType}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2 mb-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-number-one"
            >
              {t("calculator.number")} 1
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
              id="grid-number-one"
              type="number"
              value={number1}
              min="0"
              onChange={(newValue) =>
                setNumber1(parseInt(newValue.target.value))
              }
            />
            {/* <p className="text-red-500 text-xs italic">
              {t("calculator.request")}
            </p> */}
          </div>

          <button
            className={`w-full md:w-1/3 px-2 self-center`}
            onClick={computeNumbers}
          >
            {" "}
            {t("calculator.insert")}{" "}
          </button>
          <div className="w-full px-2 mb-4">
            <ExampleSelect examples={currentOptions} />
          </div>
        </div>
      )}
    </div>
  );
}
