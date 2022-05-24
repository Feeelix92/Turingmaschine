import React, { Component } from 'react'
import Select from 'react-select'
import {EingabelphabetOption, eingabeAlphabete} from "../../data/Alphabet";

const DropDownSelect = () => (
    <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 grid grid-cols-2 gap-2 items-center"}>
        <p className={"p-3"}>Eingabealphabet ∑ =</p>
        <Select placeholder={<p>wählen Sie Ihr Eingabealphabet...</p>} blurInputOnSelect={false} className={"text-black p-3 text-lg"} options={eingabeAlphabete}/>
    </div>

)
export default DropDownSelect;

