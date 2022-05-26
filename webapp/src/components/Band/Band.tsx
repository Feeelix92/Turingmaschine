import anime from 'animejs';
import { useState } from 'react';
import {EingabelphabetOption} from "../../data/Alphabet";
import { BandItem } from './BandItem';

function Band(){
    const bandLength = 20;
    const bandArray:EingabelphabetOption[] = []
    const [skin, setSkin] = useState("paper")
    const [item, setBandItem] = useState({value:"", label: "B"});

    for (let index = 0; index <= bandLength; index++) {
        bandArray.push(item);   
    }

    const [myArray, setBandArray] = useState([bandArray]);


    const deleteAll = () => {
        const newBandItem = {value: "", label: "B"};
        setBandItem(newBandItem);
    };

    const changeSkin = () => {     
        if(skin === "paper"){
            setSkin("tech")
        }else {
            setSkin("paper")
        }
    };

    const changeItem = (e: { target: { value: string; }; }) => {
        console.log("change item! - value: " + e.target.value);
        setBandItem({
            value: e.target.value, 
            label: e.target.value
        });

        const newArray = [...myArray];
        setBandArray(newArray);
        console.log(newArray);
    };

    //TODO:Item in Array an richtiger Stelle ändern?
    const changeItemAt = (index: any, e: { target: { value: string; }; }) => {
        console.log("change item! - value: " + e.target.value);

        const newArray = [];
        newArray[index] = {
            value: e.target.value,
            label: e.target.value 
        };
        //setBandArray(newArray);
        console.log(newArray);
    };


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

                <BandItem
                value={value}
                index={index}
                skin={skin}
                key={index}
                handleClick={handleClick}
                changeItem={changeItem}
                />
                
            ))}
          
        </div>
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        onClick={() => changeSkin()}>
            Change skin
        </button>

        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        onClick={() => deleteAll()}>
            Delete All
        </button>
    </div>
}

export default Band;