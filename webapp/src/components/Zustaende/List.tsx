import React, { useState } from 'react';
import DropDownSelect from "../Eingabealphabet/DropDownSelect";

function ConditionsList() {
    const [isActive, setIsActive] = useState(false);
    const accordionData = {
        title: 'Spezifikationen'
    };
    const { title } = accordionData;

    return (
        <div className="accordion">
            <div className="accordion-item">
                <div
                    className="accordion-title"
                    onClick={() => setIsActive(!isActive)}
                >
                    <div>{title}</div>
                    <div>{isActive ? '-' : '+'}</div>
                </div>
                {isActive && <div className="accordion-content">
                    <div>
                        <p>Eingabealphabet ∑ = {}</p>
                    </div>
                    <div>
                        <p>Bandalphabet &Gamma; = { }</p>
                    </div>
                    <div>
                        <p>Zustandsmenge Q = { }</p>
                    </div>
                    <div>
                        <p>Anfangszustand q0 = </p>
                    </div>
                    <div>
                        <p>Endzustand F = { }</p>
                    </div>
                    <div>
                        <div className="grid grid-col-2">
                            <p>Zustandsüberführungsfunktion S =</p>
                            <button >...</button>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}
export default ConditionsList;