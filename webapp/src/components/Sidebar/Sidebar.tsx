import React from "react";
import {slide as Menu} from "react-burger-menu"


function Sidebar() {
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