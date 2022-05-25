import React from "react";
import {
  EingabelphabetOption,
  eingabeAlphabetOptionen,
} from "../../data/Alphabet";

export default function EditField() {
  return(
  eingabeAlphabetOptionen.map((value: EingabelphabetOption, key: React.Key) => {
    return <div key={key}>{value.label}</div>;
  }))
}
