import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export default function Dice() {
    const currentZustand = useSelector(
        (state: RootState) => state.general.activeState
    );
    /*const [diceFace, setDiceFace] = useState(currentZustand.value.slice(1,2));
    const rollDice = () => {
        setDiceFace(currentZustand.value.slice(1,2));
    }*/

    return (
        <div className={`dice face face${currentZustand.value.slice(1,2)}`}>
            <div className={`dot-container`}>
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