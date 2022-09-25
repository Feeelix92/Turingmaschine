import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import Select, { OnChangeValue } from "react-select";
import { bandChangeItemAt, bandDeleteAll } from "../../redux/bandStore";
import {
  OperationType,
  tableRowToAdd,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabetChangeAnfangszustand,
  alphabetChangeEndzustand,
  alphabetDeleteCustom,
  alphabetGenerateBand,
  alphabetPushToCustom,
  alphabetPushToDialogOptions,
  alphabetPushToIdxZustand,
  tableAddEditorRow,
  tableDeleteAll,
  tableSetActiveState,
} from "../../redux/generalStore";
import AdditionExample from "../../examples/addition.json";
import SubstractionExample from "../../examples/substraction.json";
import MultiplicationExample from "../../examples/multiplication.json";
import DivisionExample from "../../examples/division.json";
import { tableZeichen } from "../codeEditor/AceJsonEditor";
import { RootState } from "../../redux/store";

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

  const initAnfangsZustand = useSelector(
    (state: RootState) => state.general.anfangsZustand
  );

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

  const operations = [
    new OperationType(t("calculator.addition"), t("calculator.addition")),
    new OperationType(
      t("calculator.multiplication"),
      t("calculator.multiplication")
    ),
    new OperationType(
      t("calculator.substraction"),
      t("calculator.substraction")
    ),
    new OperationType(t("calculator.division"), t("calculator.division")),
  ];

  const [selectedOperation, setSelectedOperation] = useState(operations[0]);

  function selectOperation(type: OnChangeValue<OperationType, false>) {
    if (type) {
      setSelectedOperation(type);
    }
  }

  function computeNumbers() {
    dispatch(bandDeleteAll());
    dispatch(alphabetDeleteCustom());

    if (selectedType.value === t("calculator.binary")) {
      const operandOne = toBinary(number1);
      const operandTwo = toBinary(number2);
      // Binary alphabet
      const alphabet = ["1", "0", "#"];
      saveOperandsToBand(alphabet, operandOne, operandTwo);
    } else {
      const operandOne = toUnary(number1);
      const operandTwo = toUnary(number2);
      // Unary alphabet
      const alphabet = ["1", "#"];
      saveOperandsToBand(alphabet, operandOne, operandTwo);
    }
  }

  function saveOperandsToBand(
    alphabet: string[],
    operandOne: string[],
    operandTwo: string[]
  ) {
    alphabet.forEach((value: string) => {
      dispatch(alphabetPushToCustom(value));
    });
    dispatch(alphabetPushToDialogOptions(alphabet.toString()));
    dispatch(alphabetGenerateBand(alphabet));

    dispatch(bandDeleteAll());

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

  function computeOperation() {
    const additionFile = AdditionExample as any;
    const substractionFile = SubstractionExample;
    const multiplicationFile = MultiplicationExample;
    const divisionFile = DivisionExample;

    if (selectedOperation.value === t("calculator.addition")) {
      additionFile.specifications.states.forEach((value: any) => {
        //push new states to store
        dispatch(alphabetPushToIdxZustand(value));
      });

      // save Anfangszustand from editor to store
      const newAnfangszustand = new Zustand(
        additionFile.specifications.startState[0],
        additionFile.specifications.startState[0],
        true,
        false,
        false
      );
      dispatch(alphabetChangeAnfangszustand(newAnfangszustand));
      dispatch(tableSetActiveState(initAnfangsZustand));

      // save Endzustand to store
      // json.specifications.endStates...
      const endStates = additionFile.specifications.endStates;
      let temp: Zustand[] = [];
      for (let index = 0; index < endStates.length; index++) {
        let startState = false;
        if (endStates[index] == additionFile.specifications.startState) {
          startState = true;
        }
        temp.push(
          new Zustand(
            endStates[index],
            endStates[index],
            startState,
            true,
            false
          )
        );
      }
      dispatch(alphabetChangeEndzustand(temp));
      // save table to store
      // first step -> delete oldTable
      dispatch(tableDeleteAll());
      // json.table...
      Object.entries(additionFile.table).forEach(
        ([zustandName, zustandArray]) => {
          let tempZustandArray = zustandArray as tableZeichen;
          Object.entries(tempZustandArray).forEach(
            ([zeichenName, zeichenArray]) => {
              let tempTableRowToAdd: tableRowToAdd = {
                zustand: "",
                lese: "",
                neuerZustand: "",
                schreibe: "",
                gehe: "",
              };
              tempTableRowToAdd.zustand = zustandName;
              tempTableRowToAdd.lese = zeichenName;
              tempTableRowToAdd.neuerZustand = zeichenArray[0];
              tempTableRowToAdd.schreibe = zeichenArray[1];
              tempTableRowToAdd.gehe = zeichenArray[2];

              dispatch(tableAddEditorRow(tempTableRowToAdd));
            }
          );
        }
      );
    }
  }

  return (
    <div
      className={
        "border-solid border rounded bg-white p-2 border rounded items-center hover:bg-gray-100 col-span-2"
      }
    >
      <div className={"mb-2"} onClick={() => setisOpen(!isOpen)}>
        <div className={"flex xl:grid xl:grid-cols-3 gap-5 items-center"}>
          <span className={""}>{isOpen ? closeAccordion : openAccordion}</span>
          <span>{title}</span>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-wrap mb-2">
          <div className="w-full px-2 mb-2">
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
              onChange={(newValue) =>
                setNumber1(parseInt(newValue.target.value))
              }
            />
            {/* <p className="text-red-500 text-xs italic">
              {t("calculator.request")}
            </p> */}
          </div>
          <div className="w-full md:w-1/3 px-2 mb-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor={"grid-number-two"}
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
          <div className="w-full md:w-2/3 px-2 mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor={"grid-operation"}
            >
              Operation
            </label>
            <div className="relative">
              <Select
                className="block appearance-none w-full bg-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                options={operations}
                value={selectedOperation}
                blurInputOnSelect={false}
                onChange={selectOperation}
              />
            </div>
          </div>
          <button
            className={`w-full md:w-1/3 px-3 self-center`}
            onClick={computeOperation}
          >
            {" "}
            {t("calculator.insert")}{" "}
          </button>
        </div>
      )}
    </div>
  );
}
