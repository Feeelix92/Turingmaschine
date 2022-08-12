import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabetDeleteZustand,
  changeToiletPaperMode,
} from "../../redux/generalStore";
import { RootState } from "../../redux/store";
import { bandResetAll } from "../../redux/bandStore";
import AceJsonEditor from "../codeEditor/AceJsonEditor";

function Sidebar() {
  const dispatch = useDispatch();
  const toiletPaperMode = useSelector(
    (state: RootState) => state.general.toiletPaperMode
  );

    const changeTpMode = () => {
        dispatch(changeToiletPaperMode())
        dispatch(bandResetAll())
    }
    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        console.log("toggle");
        setShowModal(!showModal);
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
                    <button className={"w-50"} onClick={() => changeTpMode()}>Toilettenpapiermodus { toiletPaperMode ? 'aus' : 'an'}</button>
                </a>
            </div>
            <div className={""}>
                <a className={"menu-item text-white text-lg no-underline"}>
                    <button onClick={toggleModal}>Code-Editor</button>
                    {showModal ? <AceJsonEditor toggleEditor={toggleModal} /> : null}
                </a>
            </div>
        </Menu>
    );
}

export default Sidebar;
