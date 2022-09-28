import { CodeExample } from "../interfaces/CommonInterfaces";
import addUn from "./addUn.json";
import incUn from "./incUn.json";
import incBin from "./incBin.json";
import bitNot from "./bitNot.json";
import accEvenUn from "./accEvenUn.json";
import accEvenBin from "./accEvenBin.json";
import hello from "./hello.json";

export const examples: CodeExample[] = [
  { label: "addUn", value: JSON.stringify(addUn), type: "normal" },
  { label: "incUn", value: JSON.stringify(incUn), type: "normal" },
  { label: "incBin", value: JSON.stringify(incBin), type: "normal" },
  { label: "bitNot", value: JSON.stringify(bitNot), type: "normal" },
  // { label: "accEvenUn", value: JSON.stringify(accEvenUn), type: "normal" },
  // { label: "accEvenBin", value: JSON.stringify(accEvenBin), type: "normal" },
  { label: "hello", value: JSON.stringify(hello), type: "normal" },
];
