import BandItem  from './BandItem';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaRedo } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { bandAddField, bandChangePointer, bandDeleteAll } from '../../redux/bandStore';
import { RootState } from '../../redux/store';


export default function Band () {   
    const defaultPointerPos = 1; // Feld, auf dem Pointer im Default stehen soll   

    const currentBand = useSelector((state: RootState) => state.band.currentBand)
    const currentAlphabet = useSelector((state: RootState) => state.general.currentAlphabet)
    const dispatch = useDispatch() 

    const setPointerAt = (index: number) => {
        let newIndex = index;
  
        if(currentBand[newIndex as number] != null) {
  
          // Alle alten Pointer entfernen:
          for (let index = 0; index < currentBand.length; index++) {
            dispatch(bandChangePointer({index:index, value: false}))
          }  
          // Neuen Pointer auf true:
          dispatch(bandChangePointer({index:newIndex, value: true}))
        }  
      };

    //TODO: Für Touch nach rechts & links:
    const setPointerLeft = () => {
    
        let oldPointerIndex = 0;

        // Alle alten Pointer entfernen:
        for (let index = 0; index < currentBand.length; index++) {
            if(currentBand[index].pointer == true) {
                oldPointerIndex = index;
            }
            dispatch(bandChangePointer({index:index, value: false}))
        }

        let newPointerIndex = oldPointerIndex;
        if(oldPointerIndex>0 ) {
            newPointerIndex = oldPointerIndex - 1;
        }

        // Neuen Pointer auf true:
        dispatch(bandChangePointer({index:newPointerIndex, value: true}))
    };

    //TODO: Für Touch nach rechts & links:
    const setPointerRight = () => {
  
        let oldPointerIndex = 0;

          // Alle alten Pointer entfernen:
          for (let index = 0; index < currentBand.length; index++) {
            if(currentBand[index].pointer == true) {
                oldPointerIndex = index;
            }
            dispatch(bandChangePointer({index:index, value: false}))
          }

          let newPointerIndex = oldPointerIndex;
          if(oldPointerIndex < currentBand.length-1 ) {
            newPointerIndex = oldPointerIndex + 1;
          }
  
          // Neuen Pointer auf true:
          dispatch(bandChangePointer({index:newPointerIndex, value: true}))
      };


    const logPointerPos = (idx: number) => {
      console.log(idx);
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
                alphabet={currentAlphabet.alphabet}
                showEditField={true}
                setPointerAt={() => setPointerAt(index)} //TODO
                movePointer={() => logPointerPos(index)} 
                />                
            ))}
            <button 
              
            className="right-band-button bg-transparent hover:bg-gray-100 text-gray-900 font-semibold hover:text-gray-900 border border-gray-900 hover:border-transparent rounded"
            onClick={() => dispatch(bandAddField('after'))}>
               +
            </button>
          
        </div>        
          <div className="flex mb-4">
            <div className="w-3/4 text-left">
                <button className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 md:invisible"
                    onClick={() => setPointerLeft()}>
                    <FaArrowAltCircleLeft/>
                </button>
                    
                <button className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 md:invisible"
                    onClick={() => setPointerRight()}>
                    <FaArrowAltCircleRight/>
                </button>
            </div>

            <div className="w-1/4 text-right">   
                <button
                    onClick={() => dispatch(bandDeleteAll())}
                    className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
                    >
                    <FaRedo />
                </button>
            </div>
          </div>

      </div>
    );
  }

