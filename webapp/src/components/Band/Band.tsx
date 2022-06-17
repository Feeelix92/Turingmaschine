import BandItem  from './BandItem';
import { FaRedo } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { bandAddField, bandDeleteAll } from '../../redux/bandStore';
import { RootState } from '../../redux/store';


export default function Band () {   
    const defaultPointerPos = 1; // Feld, auf dem Pointer im Default stehen soll   

    const currentBand = useSelector((state: RootState) => state.band.currentBand)
    const currentAlphabet = useSelector((state: RootState) => state.general.currentAlphabet)
    const dispatch = useDispatch() 

    const setPointer = (index: any, value: boolean) => {
        console.log("setPointer function called!");
    const setPointerAt = (index: number) => {
      let newIndex = index;

      if(currentBand[newIndex as number] != null) {

        // Alle alten Pointer entfernen:
        for (let index = 0; index < bandLength; index++) {
            currentBand[index] = { pointer: false };
        }

        this.setState({
            currentBand: currentBand,
        });

        // Neuen Pointer auf true:
        currentBand[newIndex as number].pointer = true;
      }

      this.setState({
        currentBand: currentBand,
      });
    };

    //TODO: Für Touch nach rechts & links:
    const setPointerLeft = () => {
  
        let oldPointerIndex = 0;

        currentBand[index as number].pointer = value;       
    };
    
    const setPointerAt = () => {
        console.log("setPointerAt function called!");
          // Alle alten Pointer entfernen:
          for (let index = 0; index < bandLength; index++) {
            if(currentBand[index].pointer == true) {
                oldPointerIndex = index;
            }
              currentBand[index] = { pointer: false };
          }

          let newPointerIndex = oldPointerIndex;
          if(oldPointerIndex>0 ) {
            newPointerIndex = oldPointerIndex - 1;
          }
  
          this.setState({
              currentBand: currentBand,
          });
  
          // Neuen Pointer auf true:
          currentBand[newPointerIndex as number].pointer = true;

          
        this.setState({
          currentBand: currentBand,
        });
      };

          //TODO: Für Touch nach rechts & links:
    const setPointerRight = () => {
  
        let oldPointerIndex = 0;

          // Alle alten Pointer entfernen:
          for (let index = 0; index < bandLength; index++) {
            if(currentBand[index].pointer == true) {
                oldPointerIndex = index;
            }
              currentBand[index] = { pointer: false };
          }

        currentBand[oldIndex as number].pointer = false;
        currentBand[newIndex as number].pointer = true;            
    };   
          let newPointerIndex = oldPointerIndex;
          if(oldPointerIndex < bandLength-1 ) {
            newPointerIndex = oldPointerIndex + 1;
          }
  
          this.setState({
              currentBand: currentBand,
          });
  
          // Neuen Pointer auf true:
          currentBand[newPointerIndex as number].pointer = true;

          
        this.setState({
          currentBand: currentBand,
        });
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
                alphabet={currentAlphabet}
                showEditField={true}
                setPointerAt={setPointerAt} //TODO
                movePointer={logPointerPos} 
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
                <button
                    className={"primaryBtn text-white font-bold py-1 px-2 rounded m-2 md:invisible"}
                    >
                    onClick={() => setPointerLeft()}
                    <FaArrowAltCircleLeft/>

                </button>
                    className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 md:invisible"
                <button
                    onClick={() => setPointerRight()}
                    >
                    <FaArrowAltCircleRight/>
            </div>
                </button>

            <div className="w-1/4 text-right">   
                <button
                    onClick={() => deleteAll()}
                    className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
                    >
                    <FaRedo />
                </button>
            </div>
          </div>

      </div>
    );
  }
}
