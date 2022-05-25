import anime from 'animejs';
import { useState } from 'react';
import {EingabelphabetOption} from "../../data/Alphabet";

function Band(){
    const bandArray:EingabelphabetOption[] = []

    for (let index = 0; index <= 20; index++) {
        bandArray.push({value:"B",label: "B"})        
    }
    const [skin, setSkin] = useState("paper")

    const changeSkin = () => {     
        if(skin === "paper"){
            setSkin("tech")
        }else {
            setSkin("paper")
        }
    }


    const handleClick = (value: EingabelphabetOption, index: number) => {
        console.log("value", value)
        console.log("index", index)
        anime({
            targets: `.button.btn-one.index-${index}`,
            width: [0, 30],
            height: [0, 30],
            translateY: [0, -50], 
            translateX: [0, -20],               
            backgroundColor: '#0000ff',
            easing: 'easeInOutQuad',
        });
        anime({
            targets: `.button.btn-two.index-${index}`,
            width: [0, 30],
            height: [0, 30],
            translateY: [0, -55],
            translateX: [0, 10],             
            backgroundColor: '#0000ff',
            easing: 'easeInOutQuad',
        });
        anime({
            targets: `.button.btn-three.index-${index}`,
            width: [0, 30],
            height: [0, 30],
            translateY: [0, -50],
            translateX: [0, 40],          
            backgroundColor: '#0000ff',
            easing: 'easeInOutQuad',
        });
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
                onClick={() => handleClick(value, index)}>
                    {value.value}
                    <div className={`band__buttons`}>
                        <div className={`button btn-one index-${index}`}></div>
                        <div className={`button btn-two index-${index}`}></div>
                        <div className={`button btn-three index-${index}`}></div>
                    </div>
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