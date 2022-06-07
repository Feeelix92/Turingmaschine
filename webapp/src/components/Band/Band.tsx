import { Component, useEffect } from 'react';
import BandItem  from './BandItem';
import { BandProps } from "../../interfaces/CommonInterfaces";
import { eingabeAlphabetOptionen, currentBand } from '../../data/Alphabet';
import { FaRedo } from "react-icons/fa";


export default class Band extends Component<{}, BandProps> {
    constructor(props: BandProps) {
        super(props);
        this.state = {
        alphabet: eingabeAlphabetOptionen,
        currentBand: currentBand,
        skin: "paper"
        };
    }   
    
    render() {    
    const bandLength = currentBand.length;
    const defaultPointerPos = 1; // Feld, auf dem Pointer im Default stehen soll   
    
    
    /**
     * setzt Band auf Default zurück & löscht Inhalt der BandItems
     */
    const deleteAll = () => {         
        for (let index = 0; index < bandLength; index++) {
            if(index == defaultPointerPos) {
                currentBand[index] = {value: "", label: "B", pointer: true}
                console.log(currentBand)
            } else {
                currentBand[index] = {value: "", label: "B", pointer: false}
            }            
        }   

        this.setState({
            currentBand: currentBand
        });
    };

    /**
     * fügt ein neues leeres Bandfeld an der Position "before" oder "after" hinzu
     * @param position
     */
    const addField = (position: string) => {         
        if (position === "before"){
            currentBand.unshift({value: "", label: "B", pointer: false})
        } else {
            currentBand.push({value: "", label: "B", pointer: false})
        }

        this.setState({
            currentBand: currentBand
        });
    }

    const changeSkin = () => { //Übergangsfunktion? -> ändert den Skin     
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

    /**
     * function changeItemAt changes the Band at the index
     * @param index
     * @param value
     */
    const changeItemAt = (index: any, value: string) => { 
        currentBand[index as number].value = value;
        
        this.setState({
            currentBand: currentBand,
        });
    };

    const deleteItemAt = (index: any) => {
        currentBand[index as number] = {value: "", label: "B", pointer: false};
        
        this.setState({
            currentBand: currentBand,
        });
    };

    const setPointer = (index: any, value: boolean) => {
        console.log("setPointer function called!");

        currentBand[index as number].pointer = value;
        
        this.setState({
            currentBand: currentBand,
        });        
    };

    
    const setPointerAt = () => {
        console.log("setPointerAt function called!");

        // TODO: Nicht richtige Indexdaten, nur zum Test:
        let oldIndex = defaultPointerPos;  
        let newIndex = defaultPointerPos+1; 

        currentBand[oldIndex as number].pointer = false;
        currentBand[newIndex as number].pointer = true;
        
        this.setState({
            currentBand: currentBand,
        });        
    };

    return <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 p-3 border rounded"}>
        <div className="mb-5">
            <h2 >Band: </h2>
        </div>
        <div className="band-container flex flex-row mb-5 overflow-x-auto">
            <button 
            className="left-band-button bg-transparent hover:bg-gray-100 text-gray-900 font-semibold hover:text-gray-900  border border-gray-900 hover:border-transparent rounded"
            onClick={() => addField('before')}>
               +
            </button>
            {currentBand.map((value, index) => (                
                <BandItem
                value={value.value}
                index={index}
                skin={this.state.skin}
                pointer={value.pointer}
                key={index}
                alphabet={eingabeAlphabetOptionen}
                showEditField={true}
                changeItemAt={changeItemAt}
                deleteItemAt={deleteItemAt}
                setPointer={setPointer}
                setPointerAt={setPointerAt} //TODO
                />                
            ))}
            <button 
            className="right-band-button bg-transparent hover:bg-gray-100 text-gray-900 font-semibold hover:text-gray-900 border border-gray-900 hover:border-transparent rounded"
            onClick={() => addField('after')}>
               +
            </button>
          
        </div>

        <button 
        className="primaryBtn text-white font-bold py-1 px-2 rounded"
        onClick={() => changeSkin()}>
            Skin ändern
        </button>

        
        <button
        className="primaryBtn text-white font-bold py-1 px-2 rounded ml-5 fixed right-5"
        onClick={() => deleteAll()}>
            <FaRedo />
        </button>
    </div>
    }
}
