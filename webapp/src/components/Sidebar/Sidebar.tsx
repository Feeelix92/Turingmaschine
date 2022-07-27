import React, {useState} from "react";
import {slide as Menu} from "react-burger-menu"
import {useDispatch, useSelector} from "react-redux";
import { bandChangeSkin } from "../../redux/bandStore";
import {alphabetDeleteZustand, changeToiletPaperMode} from "../../redux/generalStore";
import {RootState} from "../../redux/store";
import { Routes, Route, Link } from "react-router-dom";


function Sidebar() {
    const dispatch = useDispatch()
    const toiletPaperMode = useSelector((state: RootState) => state.general.toiletPaperMode)

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
                    <Link to="/">
                        <button type="button">
                            normal
                        </button>
                    </Link>
                </a>
            </div>
            <div className={""}>
                <a className={"menu-item text-white text-lg no-underline"}>
                    <Link to="/papier">
                        <button type="button">
                            Toilettenpapiermodus
                        </button>
                    </Link>
                </a>
            </div>
        </Menu>
    );
}

export default Sidebar;