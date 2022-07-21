import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export default function Dice() {
    const faces = {value: "1", label:"q1"};
    const [diceFace, setDiceFace] = useState(1);
    const rollDice = () => {
         setDiceFace(Math.round(Math.random() * (5 - 1 + 1) + 1));
    }
    const currentZustand = useSelector(
        (state: RootState) => state.general.activeState
    );
    console.log(currentZustand.value);


    return (
        <div onClick={() => rollDice()} className={`dice face face${diceFace}`}>
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