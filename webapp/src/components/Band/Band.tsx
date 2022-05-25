import { useState } from 'react';
import {Eingabelphabet} from "../../data/Alphabet";

function Band(){
    const bandArray:Eingabelphabet[] = []

    for (let index = 0; index <= 20; index++) {
        bandArray.push({value:["B"],label: "B"})        
    }
    const [skin, setSkin] = useState("paper")

    const changeSkin = () => {     
        if(skin === "paper"){
            setSkin("tech")
        }else {
            setSkin("paper")
        }
    }

    const handleClick = () => {
        console.log("hier erscheinen nun die Auswahlmöglichkeiten")
    }

    return <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 p-3 border rounded"}>
        <div className={""}>
            <h2 >Band: </h2>
        </div>
        <div className={"band-container"}>
            {bandArray.map((value, index) => (
                <div 
                className={`band-container__band ${skin}`} 
                key={index}
                onClick={() => handleClick()}>
                    {value.value}
                </div>
            ))}            
        </div>
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        onClick={() => changeSkin()}>
            Change skin
        </button>
    </div>
}

export default Band;