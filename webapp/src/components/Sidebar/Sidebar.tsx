import React from "react";
import {slide as Menu} from "react-burger-menu"


function Sidebar() {
    return (
        <Menu>
            <a className="menu-item text-white no-underline" href="/">
            Startseite
            </a>

            <a className="menu-item text-white no-underline">
            Skin ändern
            </a>

      </Menu>
    );
}

export default Sidebar;