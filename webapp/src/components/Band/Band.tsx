import { Component } from 'react';
import BandItem  from './BandItem';
import { BandProps } from "../../interfaces/CommonInterfaces";
import { eingabeAlphabetOptionen, initBand } from '../../data/Alphabet';
import { FaRedo } from "react-icons/fa";


export default class Band extends Component<{}, BandProps> {
    constructor(props: BandProps) {
        super(props);
        this.state = {
        alphabet: eingabeAlphabetOptionen,
        currentBand: initBand,
        skin: "paper"
        };
        console.log(initBand)
    }
    
    render() {    
    const bandLength = this.state.currentBand.length;
    const defaultPointerPos = 1; // Feld, auf dem Pointer im Default stehen soll

    const deleteAll = () => { // setzt Band auf Default zurück & löscht Inhalt der BandItems
        let bandCopy = this.state.currentBand.slice(0, this.state.currentBand.length);
        
        for (let index = 0; index < bandLength; index++) {
            if(index == defaultPointerPos) {
                bandCopy[index] = {value: "", label: "B", pointer: true}
                console.log(bandCopy)
            } else {
                bandCopy[index] = {value: "", label: "B", pointer: false}
            }
            
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

    const setPointer = (index: any, value: boolean) => {
        console.log("setPointer function called!");
        
        let bandCopy = this.state.currentBand.slice(0, this.state.currentBand.length);

        bandCopy[index as number].pointer = value;
        
        this.setState({
            currentBand: bandCopy,
        });
        
    };

    
    const setPointerAt = () => {
        console.log("setPointerAt function called!");
        
        let bandCopy = this.state.currentBand.slice(0, this.state.currentBand.length);

        // TODO: Nicht richtige Indexdaten, nur zum Test:
        let oldIndex = defaultPointerPos;  
        let newIndex = defaultPointerPos+1; 

        bandCopy[oldIndex as number].pointer = false;
        bandCopy[newIndex as number].pointer = true;
        
        this.setState({
            currentBand: bandCopy,
        });
        
    };

    return <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 p-3 border rounded"}>
        <div className="mb-5">
            <h2 >Band: </h2>
        </div>
        <div className="band-container flex flex-row mb-5 overflow-x-auto">
            {this.state.currentBand.map((value, index) => (                
                <BandItem
                value={value.value}
                index={index}
                skin={this.state.skin}
                pointer={value.pointer}
                key={index}
                alphabet={eingabeAlphabetOptionen}
                showEditField={true}
                changeItemAt={changeItemAt}
                setPointer={setPointer}
                setPointerAt={setPointerAt} //TODO
                />                
            ))}
          
        </div>

        <button 
        className="primaryBtn text-white font-bold py-1 px-2 rounded"
        onClick={() => changeSkin()}>
            Skin ändern
        </button>

        
        <button
        className="primaryBtn text-white font-bold py-1 px-2 rounded ml-5"
        onClick={() => deleteAll()}>
            <FaRedo />
        </button>
    </div>
    }
}
