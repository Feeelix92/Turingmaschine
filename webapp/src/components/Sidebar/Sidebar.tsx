import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabetDeleteZustand,
  changeToiletPaperMode,
  changeMespumaMode
} from "../../redux/generalStore";
import { RootState } from "../../redux/store";
import Tiptap from "../codeEditor/CodeEditor";
import { bandChangeSkin, bandResetAll } from "../../redux/bandStore";

function Sidebar() {
  const dispatch = useDispatch();
  const toiletPaperMode = useSelector(
    (state: RootState) => state.general.toiletPaperMode
  );

  const mespumaMode = useSelector(
    (state: RootState) => state.general.mespumaMode
  );

    const changeTpMode = () => {
        dispatch(changeToiletPaperMode())
        dispatch(bandResetAll())
    }

    const changeMSMMode = () => {
        dispatch(changeMespumaMode())
        dispatch(bandResetAll())
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
                    <button className={"w-50"} onClick={() => changeTpMode()}>Toilettenpapiermodus { toiletPaperMode ? 'aus' : 'an'}</button>
                </a>
            </div>

            <div className={""}>
                <a className={"menu-item text-white text-lg no-underline"}>
                    <button className={"w-50"} onClick={() => changeMSMMode()}>Mehrspurenmaschine { mespumaMode ? 'aus' : 'an'}</button>
                </a>
            </div>
        </Menu>
    );
}

export default Sidebar;
