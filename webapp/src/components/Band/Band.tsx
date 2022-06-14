import { Component } from 'react';
import BandItem  from './BandItem';
import { BandProps } from "../../interfaces/CommonInterfaces";
import { FaRedo } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { bandAddField, bandChangeItemAt, bandDeleteItemAt, bandDeleteAll, bandChangeSkin } from '../../redux/bandStore';
import { RootState } from '../../redux/store';


export default function Band () {   
    const defaultPointerPos = 1; // Feld, auf dem Pointer im Default stehen soll   

    const currentBand = useSelector((state: RootState) => state.band.currentBand)
    const currentAlphabet = useSelector((state: RootState) => state.general.currentAlphabet)
    const dispatch = useDispatch() 

    const setPointer = (index: any, value: boolean) => {
        console.log("setPointer function called!");

        currentBand[index as number].pointer = value;       
    };
    
    const setPointerAt = () => {
        console.log("setPointerAt function called!");

        // TODO: Nicht richtige Indexdaten, nur zum Test:
        let oldIndex = defaultPointerPos;  
        let newIndex = defaultPointerPos+1; 

        currentBand[oldIndex as number].pointer = false;
        currentBand[newIndex as number].pointer = true;            
    };   

    return ( <div className={"bg-white w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4 p-3 border rounded"}>
        <div className="mb-5">
            <h2 >Band: </h2>
        </div>
        <div className="band-container flex flex-row mb-5 overflow-x-auto">
            <button 
            className="left-band-button bg-transparent hover:bg-gray-100 text-gray-900 font-semibold hover:text-gray-900  border border-gray-900 hover:border-transparent rounded"
            onClick={() => dispatch(bandAddField('before'))}>
               +
            </button>
            {currentBand.map((value, index) => (                
                <BandItem
                value={value.value}
                index={index}
                pointer={value.pointer}
                key={index}
                alphabet={currentAlphabet}
                showEditField={true}
                setPointer={setPointer}
                setPointerAt={setPointerAt} //TODO
                />                
            ))}
            <button 
            className="right-band-button bg-transparent hover:bg-gray-100 text-gray-900 font-semibold hover:text-gray-900 border border-gray-900 hover:border-transparent rounded"
            onClick={() => dispatch(bandAddField('after'))}>
               +
            </button>
          
        </div>        
        <button
        className="primaryBtn text-white font-bold py-1 px-2 rounded ml-5 fixed right-5"
        onClick={() => dispatch(bandDeleteAll())}>
            <FaRedo />
        </button>
    </div>
    )
}
