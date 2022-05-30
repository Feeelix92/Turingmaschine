import anime from 'animejs';
import { useState, useEffect, SetStateAction, Component } from 'react';
import BandItem  from './BandItem';
import { BandProps } from "../../interfaces/CommonInterfaces";
import { eingabeAlphabetOptionen, initBand } from '../../data/Alphabet';

// function Band(props: BandProps){
export default class Band extends Component<{}, BandProps> {
    constructor(props: BandProps) {
        super(props);
        this.state = {
        alphabet: eingabeAlphabetOptionen,
        currentBand: initBand,
        skin: "paper"
        };
    }
    
    render() {    
    const bandLength = this.state.currentBand.length;

    const deleteAll = () => {
        let bandCopy = this.state.currentBand.slice(0, this.state.currentBand.length);
        
        for (let index = 0; index < bandLength; index++) {
            bandCopy[index] = {value: "", label: "B"}
        }   

        this.setState({
            currentBand: bandCopy
        });

    };

    const changeSkin = () => {     
        if(this.state.skin === "paper"){
            this.setState({
                skin: "tech",
            });
        }else {
            this.setState({
                skin: "paper",
            });
        }
    };


    const changeItemAt = (index: any, value: string) => {
        let bandCopy = this.state.currentBand.slice(0, this.state.currentBand.length);

        bandCopy[index as number].value = value;
        
        this.setState({
            currentBand: bandCopy,
        });
    };

    return <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 p-3 border rounded"}>
        <div className={""}>
            <h2 >Band: </h2>
        </div>
        <div className={"band-container"}>
            {this.state.currentBand.map((value, index) => (                
                <BandItem
                value={value.value}
                index={index}
                skin={this.state.skin}
                key={index}
                alphabet={eingabeAlphabetOptionen}
                showEditField={true}
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
}

// export default Band;