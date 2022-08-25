import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabetDeleteZustand,
  changeToiletPaperMode,
  changeMespumaMode,
  alphabetChangeCurrentMespuma,
} from "../../redux/generalStore";
import { RootState } from "../../redux/store";
import { bandResetAll } from "../../redux/bandStore";
import { EingabeAlphabet } from "../../interfaces/CommonInterfaces";
import { cartesianProduct } from "../../interfaces/CommonFunctions";
import AceJsonEditor from "../codeEditor/AceJsonEditor";
import { Routes, Route, Link } from "react-router-dom";

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

    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }

  const changeMSMMode = () => {
    dispatch(changeMespumaMode());
    dispatch(bandResetAll());

    let literalArr: string[] = [];

    let tempAlphabet = Object.assign(
      [],
      currentAlphabet.alphabet
    ) as EingabeAlphabet[];
    tempAlphabet.push({ value: "B", label: "", warningMode: false });

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

    dispatch(
      alphabetChangeCurrentMespuma({
        cartesian: finalBandAlphabet,
        alphabet: currentAlphabet,
      })
    );
  };

    return (
        <Menu right>
            <div className={"mt-0"}>
                <a className={"menu-item text-white text-lg no-underline"} href="/">
                    Startseite
                </a>
            </div>

            <hr className="mt-5"/>

            <div className="">Modus</div>

            {/* <div className="inline-flex rounded-md shadow-sm">

              <a href="/" aria-current="page" 
              className="no-underline py-2 px-4 text-sm font-medium text-blue-700 active:bg-thm-primary bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                Normal
              </a>

              <a className="no-underline py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                 <Link to="/papier" className="no-underline py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                  TP
                 </Link>
              </a>

              <a href="/mehrspuren" 
              className="no-underline py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                Mehrspuren
              </a>
              
            </div> */}

          <div className={""}>
                <a className={"menu-item text-white text-lg no-underline"}>
                    <Link to="/">
                        <button className={"w-50"} onClick={() => changeMSMMode()}>
                            Normaler Modus
                        </button>
                    </Link>
                </a>
            </div>

            <div className={""}>
                <a className={"menu-item text-white text-lg no-underline"}>
                    <Link to="/papier">
                        <button
                            className={
                                "w-50" /*  + mode=="toiletpaper" ? 'bg-thm-primary' : 'bg-white text-thm-primary2'*/
                            }
                            onClick={() => changeTpMode()}
                        >
                            Toilettenpapiermodus
                        </button>
                    </Link>
                </a>
            </div>

            <div className={""}>
                <a className={"menu-item text-white text-lg no-underline"}>
                    <Link to="/mehrspuren">
                        <button className={"w-50"} onClick={() => changeMSMMode()}>
                            Mehrspurenmaschine
                        </button>
                    </Link>
                </a>
            </div>

            <hr className="mt-5"/>

            

            <div className={""}>
                <a className={"menu-item text-white text-lg no-underline cursor-pointer"}>
                    Skin ändern
                </a>
            </div>


            <div className={""}>
                <a className={"hidden md:block menu-item text-white text-lg no-underline cursor-pointer"}>
                    <a className="text-white text-lg no-underline" onClick={toggleModal}>Code-Editor</a>
                    {showModal ? <AceJsonEditor toggleEditor={toggleModal} /> : null}
                </a>
            </div>
        </Menu>
    );
}

export default Sidebar;
