import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useDispatch, useSelector } from "react-redux";
import { bandChangeSkin } from "../../redux/bandStore";
import {
  alphabetDeleteZustand,
  changeToiletPaperMode,
} from "../../redux/generalStore";
import { RootState } from "../../redux/store";
import Tiptap from "../codeEditor/CodeEditor";

function Sidebar() {
  const dispatch = useDispatch();
  const toiletPaperMode = useSelector(
    (state: RootState) => state.general.toiletPaperMode
  );

//   const [showModal, setShowModal] = useState(false);

//   function toggleModal() {
//     console.log("toggle");
//     setShowModal(!showModal);
//   }

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
            className={"w-50"}
            onClick={() => dispatch(changeToiletPaperMode())}
          >
            Toiletenpapiermodus {toiletPaperMode ? "aus" : "an"}
          </button>
        </a>
      </div>
      {/* <button onClick={toggleModal}>Drück mich!</button> */}
    </Menu>
  );
}

export default Sidebar;
