import anime from 'animejs';
import { useState, useEffect, SetStateAction } from 'react';
import {EingabelphabetOption} from "../../data/Alphabet";
import { BandItem } from './BandItem';

function Band(){

    const initialItems = [ //TODO: Nicht die beste Lösung, habe noch keine bessere gefunden...
        { value: "", label: "B"},
        { value: "", label: "B"},
        { value: "", label: "B"},
        { value: "", label: "B"},
        { value: "", label: "B"},
        { value: "", label: "B"},
    ];
    const bandLength = initialItems.length;

    const [bandArray, setBand] = useState<EingabelphabetOption[]>(initialItems);
    const [skin, setSkin] = useState("paper")
    const [item, setBandItem] = useState({value:"", label: "B"});

    /*
    for (let index = 0; index < bandLength; index++) {
        bandArray.push(item);   
        console.log("testeteste");
    }
    */

    const [myArray, setBandArray] = useState([bandArray]);

    const deleteAll = () => {
        const newBandItem = {value: "", label: "B"};
        setBandItem(newBandItem);

        let newBandArray: EingabelphabetOption[] = [];
        for (let index = 0; index < bandLength; index++) {
            newBandArray.push(newBandItem); 
        }
        //setBandArray([newBandArray]);
        setBand(newBandArray);
        console.log(newBandItem);
        console.log("Band: ->", bandArray);
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

        //TEST:
        const newTest = [...bandArray];
        setBand(newTest);
    };

    //TODO:Reload doesnt work right 
    const changeItemAt = (index: any, e: { target: { value: string; }; }) => {
        console.log("....................... :)");
        console.log("change item! - value: " + e.target.value);

        bandArray[index] = {
            value: e.target.value,
            label: e.target.value 
        };
        setBand(bandArray)        
        console.log("Band: ->", bandArray)
    };
    useEffect(() => {
        setBand(bandArray)
    })


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
                changeItemAt={changeItemAt}
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