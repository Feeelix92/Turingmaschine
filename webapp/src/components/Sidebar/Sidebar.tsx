import React from "react";
import {slide as Menu} from "react-burger-menu"
import { useDispatch } from "react-redux";
import { bandChangeSkin } from "../../redux/bandStore";


function Sidebar() {
    const dispatch = useDispatch()
    return (
        <Menu>
            <a className="menu-item text-white no-underline" href="/">
            Startseite
            </a>

            <a className="menu-item text-white no-underline"
             onClick={() => dispatch(bandChangeSkin())}>
            Skin ändern
            </a>

      </Menu>
    );
}

export default Sidebar;