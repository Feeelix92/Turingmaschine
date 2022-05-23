import React, { Component } from 'react'
import Select from 'react-select'
import {EingabelphabetOption, eingabeAlphabete} from "../../data/Alphabet";

const DropDownSelect = () => (
    <div className={"bg-white w-screen grid grid-cols-2 gap-2"}>
        <h4>Eingabealphabet ∑ =</h4>
        <Select placeholder={<p>wählen Sie Ihr Eingabealphabet...</p>} blurInputOnSelect={false} className={"text-black p-3 px-5"} options={eingabeAlphabete} />
    </div>

)

export default DropDownSelect;

