import { t } from "i18next";
import { useState } from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { OnChangeValue } from "react-select";
import Select from "react-select";
import { OperationType } from "../../interfaces/CommonInterfaces";
import { useDispatch } from "react-redux";
import { bandChangeItemAt, bandDeleteAll } from "../../redux/bandStore";
import {
  alphabetDeleteCustom,
  alphabetGenerateBand,
  alphabetPushToCustom,
  alphabetPushToDialogOptions,
} from "../../redux/generalStore";

export default function Calculator() {
  const dispatch = useDispatch();
  /**
   * To check if Accordion opened or closed
   */
  const [isOpen, setisOpen] = useState(true);

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
    const returnResult = result.split("");
    return returnResult;
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

  function compute() {
    dispatch(bandDeleteAll());
    dispatch(alphabetDeleteCustom());

    if (selectedType.value === t("calculator.binary")) {
      const operandOne = toBinary(number1);
      const operandTwo = toBinary(number2);

      const alphabet = ["1", "0", "#"];
      alphabet.forEach((value: string) => {
        dispatch(alphabetPushToCustom(value));
      });
      dispatch(alphabetPushToDialogOptions(alphabet.toString()));
      dispatch(alphabetGenerateBand(alphabet));

      operandOne.forEach((param, idx) => {
        dispatch(bandChangeItemAt({ index: idx, value: param, label: param }));
      });

      dispatch(
        bandChangeItemAt({ index: operandOne.length, value: "#", label: "#" })
      );

      operandTwo.forEach((param, idx) => {
        dispatch(
          bandChangeItemAt({
            index: operandOne.length + idx + 1,
            value: param,
            label: param,
          })
        );
      });
    } else {
      const operandOne = toUnary(number1);
      const operandTwo = toUnary(number2);

      const alphabet = ["1", "#"];
      alphabet.forEach((value: string) => {
        dispatch(alphabetPushToCustom(value));
      });
      dispatch(alphabetPushToDialogOptions(alphabet.toString()));
      dispatch(alphabetGenerateBand(alphabet));

      operandOne.forEach((param, idx) => {
        dispatch(bandChangeItemAt({ index: idx, value: param, label: param }));
      });

      dispatch(
        bandChangeItemAt({ index: operandOne.length, value: "#", label: "#" })
      );

      operandTwo.forEach((param, idx) => {
        dispatch(
          bandChangeItemAt({
            index: operandOne.length + idx + 1,
            value: param,
            label: param,
          })
        );
      });
    }
  }

  return (
    <div
      className={
        "border-solid border rounded bg-white w-screen sm:w-3/4 lg:w-3/4 3xl:w-2/4 p-2 border rounded items-center hover:bg-gray-100 col-span-2 max-w-screen-sm"
      }
    >
      <div className={"mb-2"} onClick={() => setisOpen(!isOpen)}>
        <div className={"flex xl:grid xl:grid-cols-3 gap-5 items-center"}>
          <span className={""}>{isOpen ? closeAccordion : openAccordion}</span>
          <span>{title}</span>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6">
            <div className="relative">
              <Select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                options={types}
                value={selectedType}
                blurInputOnSelect={false}
                onChange={selectType}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-number-one"
            >
              {t("calculator.number")} 1
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-number-one"
              type="number"
              value={number1}
              onChange={(newValue) =>
                setNumber1(parseInt(newValue.target.value))
              }
            />
            <p className="text-red-500 text-xs italic">
              {t("calculator.request")}
            </p>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-operation"
            >
              Operation
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-operation"
              >
                <option> {t("calculator.addition")} </option>
                <option> {t("calculator.multiplication")} </option>
                <option> {t("calculator.substraction")} </option>
                <option> {t("calculator.division")} </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-number-two"
            >
              {t("calculator.number")} 2
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-number-two"
              type="number"
              value={number2}
              onChange={(newValue) =>
                setNumber2(parseInt(newValue.target.value))
              }
            />
            <p className="text-red-500 text-xs italic">
              {t("calculator.request")}
            </p>
          </div>
          <button className={`w-full`} onClick={compute}>
            {" "}
            {t("calculator.calculate")}{" "}
          </button>
        </div>
      )}
    </div>
  );
}
