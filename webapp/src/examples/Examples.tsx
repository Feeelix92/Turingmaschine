import { CodeExample } from "../interfaces/CommonInterfaces";
import addUn from "./addUn.json";
import incUn from "./incUn.json";
import accEvenUn from "./accEvenUn.json";
import incBin from "./incBin.json";

export const examples: CodeExample[] = [
  { label: "addUn", value: JSON.stringify(addUn), type: "normal" },
  { label: "incUn", value: JSON.stringify(incUn), type: "normal" },
  { label: "incBin", value: JSON.stringify(incBin), type: "normal" },
  { label: "accEvenUn", value: JSON.stringify(accEvenUn), type: "normal" },
];
