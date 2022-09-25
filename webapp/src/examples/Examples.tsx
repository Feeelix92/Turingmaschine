import { CodeExample } from "../interfaces/CommonInterfaces";
import example1 from "./example1.json";
import AdditionExample from "./addition.json";
import SubstractionExample from "./substraction.json";
import MultiplicationExample from "./multiplication.json";
import DivisionExample from "./division.json";

export const examples: CodeExample[] = [
  { label: "example1", value: JSON.stringify(example1), type: "normal" },
  {
    label: "AdditionExample",
    value: JSON.stringify(AdditionExample),
    type: "normal",
  },
  {
    label: "SubstractionExample",
    value: JSON.stringify(SubstractionExample),
    type: "normal",
  },
  {
    label: "MultiplicationExample",
    value: JSON.stringify(MultiplicationExample),
    type: "normal",
  },
  {
    label: "DivisionExample",
    value: JSON.stringify(DivisionExample),
    type: "normal",
  },
];
