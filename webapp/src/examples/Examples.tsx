import { CodeExample } from "../interfaces/CommonInterfaces";
import example1 from "./example1.json";
import additionUnär from "./additionUnär.json";

export const examples: CodeExample[] = [
  { label: "example1", value: JSON.stringify(example1), type: "normal" },
  {
    label: "AdditionUnär",
    value: JSON.stringify(additionUnär),
    type: "normal",
  },
];
