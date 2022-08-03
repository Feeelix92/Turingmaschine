import React, {useState} from "react";
import {slide as Menu} from "react-burger-menu"
import {useDispatch, useSelector} from "react-redux";
import { bandChangeSkin, bandResetAll } from "../../redux/bandStore";
import { changeToiletPaperMode} from "../../redux/generalStore";
import {RootState} from "../../redux/store";


function Sidebar() {
    const dispatch = useDispatch()
    const toiletPaperMode = useSelector((state: RootState) => state.general.toiletPaperMode)

    const changeTpMode = () => {
        dispatch(changeToiletPaperMode())
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
        </Menu>
    );
}

export default Sidebar;