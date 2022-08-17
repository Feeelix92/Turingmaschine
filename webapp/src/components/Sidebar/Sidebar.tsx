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

    let literalArr: string[] = [];

    let tempAlphabet = Object.assign(
      [],
      currentAlphabet.alphabet
    ) as EingabeAlphabet[];
    tempAlphabet.push({ value: "B", label: "", warningMode: false });

    console.log(tempAlphabet);

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

    console.log(finalBandAlphabet);

    dispatch(alphabetChangeCurrent(currentAlphabet));
  };

  function cartesianProduct(arr: any[]) {
    return arr.reduce(
      function (a: any[], b: any[]) {
        return a
          .map(function (x: any[]) {
            return b.map(function (y: any) {
              return x.concat([y]);
            });
          })
          .reduce(function (a: string | any[], b: any) {
            return a.concat(b);
          }, []);
      },
      [[]]
    );
  }

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
