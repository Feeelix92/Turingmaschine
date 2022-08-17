import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabetDeleteZustand,
  changeToiletPaperMode,
  changeMespumaMode,
  alphabetChangeCurrent,
} from "../../redux/generalStore";
import { RootState } from "../../redux/store";
import Tiptap from "../codeEditor/CodeEditor";
import { bandChangeSkin, bandResetAll } from "../../redux/bandStore";
import { eingabeAlphabetOptionen } from "../../data/Alphabet";
import { EingabeAlphabet } from "../../interfaces/CommonInterfaces";

function Sidebar() {
  const dispatch = useDispatch();

  const mode = useSelector((state: RootState) => state.general.mode);
  const currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );
  const anzahlSpuren = useSelector(
    (state: RootState) => state.general.anzahlSpuren
  );

  const changeTpMode = () => {
    dispatch(changeToiletPaperMode());
    dispatch(bandResetAll());
  };

  const changeMSMMode = () => {
    dispatch(changeMespumaMode());
    dispatch(bandResetAll());

    let nArray: EingabeAlphabet[] = [];

    let finalString = "";

    finalString =
      finalString + alphabetRecursiveFunction(anzahlSpuren, finalString);

    console.log("!!!!!!!!!!!", finalString);

    // let array = nArray.push({
    //   value: `(${firstAlphabetItem.value},${secondAlphabetItem.value})`,
    //   label: `(${firstAlphabetItem.value},${secondAlphabetItem.value})`,
    //   warningMode: false,
    // });

    dispatch(alphabetChangeCurrent(currentAlphabet));
  };

  function alphabetRecursiveFunction(
    counter: number,
    finalString: string
  ): string {
    if (counter > 1) {
      let tempAlphabet = Object.assign(
        [],
        currentAlphabet.alphabet
      ) as EingabeAlphabet[];
      tempAlphabet.push({ value: "B", label: "", warningMode: false });

      tempAlphabet.forEach((item) => {
        finalString += item.value;
        counter -= 1;
        alphabetRecursiveFunction(counter, finalString);
      });
    }

    console.log(counter, finalString);
    return finalString;
  }

  // if (state.mode === "mespuma") {
  //   let tupelArray: EingabeAlphabet[] = [];
  //   finalArray = [];
  //   tempAlphabet.forEach((firstAlphabetItem) => {
  //     tempAlphabet.forEach((secondAlphabetItem) => {
  //       tupelArray.push({
  //         value: `(${firstAlphabetItem.value},${secondAlphabetItem.value})`,
  //         label: `(${firstAlphabetItem.value},${secondAlphabetItem.value})`,
  //         warningMode: false,
  //       });
  //     });
  //   });
  //   finalArray = tupelArray.concat(tempAlphabet);
  // }

  // function alphabetRecursiveFunction(arr: string[][]) {
  //   return arr.reduce(function (a: string[], b: string[]) {
  //     return a
  //       .map(function (x: string) {
  //         return b.map(function (y: string) {
  //           return x.concat(y);
  //         });
  //       })
  //       .reduce(function (a: string[], b: string[]) {
  //         return a.concat(b);
  //       }, []);
  //   }, []);
  // }

  return (
    <Menu right>
      <div className={""}>
        <a className={"menu-item text-white text-lg no-underline"} href="/">
          Startseite
        </a>
      </div>
      <div className={""}>
        <a className={"menu-item text-white text-lg no-underline"}>
          Skin ändern
        </a>
      </div>

      <div className={""}>
        <a className={"menu-item text-white text-lg no-underline"}>
          <button
            className={
              "w-50" /*  + mode=="toiletpaper" ? 'bg-thm-primary' : 'bg-white text-thm-primary2'*/
            }
            onClick={() => changeTpMode()}
          >
            Toilettenpapiermodus {mode == "toiletpaper" ? "aus" : "an"}
          </button>
        </a>
      </div>

      <div className={""}>
        <a className={"menu-item text-white text-lg no-underline"}>
          <button className={"w-50"} onClick={() => changeMSMMode()}>
            Mehrspurenmaschine {mode == "mespuma" ? "aus" : "an"}
          </button>
        </a>
      </div>
    </Menu>
  );
}

export default Sidebar;
