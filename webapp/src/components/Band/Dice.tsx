import React, {useState, useEffect} from "react";
import {bandAddField} from "../../redux/bandStore";

export default function Dice() {
    const faces = 6;
    const [diceFace, setDiceFace] = useState(6);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const rollDice = (key: number) => {
         setDiceFace(2);
    }


    return (
            <div onClick={() => setDiceFace(Math.round(Math.random() * (5 - 1 + 1) + 1))} className={`dice face${diceFace}`}>
                <div className={`dot-container justify-items-center items-center`}>
                    <div className="dot dot1"/>
                    <div className="dot dot2"/>
                    <div className="dot dot3"/>
                    <div className="dot dot4"/>
                    <div className="dot dot5"/>
                    <div className="dot dot6"/>
                    <div className="dot dot7"/>
                </div>
            </div>
    );
}