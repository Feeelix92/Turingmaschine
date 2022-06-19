import React from "react";
import {slide as Menu} from "react-burger-menu"
import { useDispatch } from "react-redux";
import { bandChangeSkin } from "../../redux/bandStore";


function Sidebar() {
    const dispatch = useDispatch()
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
        </Menu>
    );
}

export default Sidebar;