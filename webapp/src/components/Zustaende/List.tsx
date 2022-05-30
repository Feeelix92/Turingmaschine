import React from 'react';

function conditionsList() {
    return (
            <div className="accordion" id="accordionExample">
                <div className="accordion-item bg-white border border-gray-200">
                    <h2 className="accordion-header mb-0" id="headingOne">
                        <button className="
        accordion-button
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
                                aria-controls="collapseOne">
                            Spezifikation
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body py-4 px-5">
                            <div>
                                <p>Eingabealphabet ∑ = { }</p>

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
                                <div>
                                    <!--Richtiges Zeichen finden-->
                                    <p>Zustandsüberführungsfunktion S =</p> <button >...</button>
                                </div>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default conditionsList;