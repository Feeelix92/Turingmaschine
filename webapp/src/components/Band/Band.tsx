import { Component, useEffect } from "react";
import BandItem from "./BandItem";
import { BandProps } from "../../interfaces/CommonInterfaces";
import { eingabeAlphabetOptionen, currentBand } from "../../data/Alphabet";
import { FaRedo, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default class Band extends Component<{}, BandProps> {
  constructor(props: BandProps) {
    super(props);
    this.state = {
      alphabet: eingabeAlphabetOptionen,
      currentBand: currentBand,
      skin: "paper",
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
        if (index == defaultPointerPos) {
          currentBand[index] = { value: "", label: "B", pointer: true };
          console.log(currentBand);
        } else {
          currentBand[index] = { value: "", label: "B", pointer: false };
        }
      }

      this.setState({
        currentBand: currentBand,
      });
    };

    /**
     * fügt ein neues leeres Bandfeld an der Position "before" oder "after" hinzu
     * @param position
     */
    const addField = (position: string) => {
      if (position === "before") {
        currentBand.unshift({ value: "", label: "B", pointer: false });
      } else {
        currentBand.push({ value: "", label: "B", pointer: false });
      }

      this.setState({
        currentBand: currentBand,
      });
    };

    const changeSkin = () => {
      //Übergangsfunktion? -> ändert den Skin
      if (this.state.skin === "paper") {
        this.setState({
          skin: "tech",
        });
      } else {
        this.setState({
          skin: "paper",
        });
      }
    };

    function test() {
      useEffect(() => {
        console.log("useEffect", currentBand);
      }, [currentBand]);
    }

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
      console.log(
        "changed Band at: ",
        index,
        " -> ",
        currentBand[index as number].value
      );
    };

    const deleteItemAt = (index: any) => {
      const thisPointer = currentBand[index].pointer;

      currentBand[index as number] = {
        value: "",
        label: "B",
        pointer: thisPointer,
      };

      this.setState({
        currentBand: currentBand,
      });
    };


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

    // Für Touch nach links:
    const setPointerLeft = () => {
  
        let oldPointerIndex = 0;

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

      //Für Touch nach rechts:
    const setPointerRight = () => {
  
        let oldPointerIndex = 0;

          // Alle alten Pointer entfernen:
          for (let index = 0; index < bandLength; index++) {
            if(currentBand[index].pointer == true) {
                oldPointerIndex = index;
            }
              currentBand[index] = { pointer: false };
          }

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

    return (
      <div className={"bg-white w-screen border rounded"}>
        <div className="band-container flex flex-row mb-5 overflow-x-auto">
          <button
            className="left-band-button bg-transparent hover:bg-gray-100 text-gray-900 font-semibold hover:text-gray-900  border border-gray-900 hover:border-transparent rounded"
            onClick={() => addField("before")}
          >
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
              setPointerAt={setPointerAt} 
              movePointer={logPointerPos}
            />
          ))}
          <button
            className="right-band-button bg-transparent hover:bg-gray-100 text-gray-900 font-semibold hover:text-gray-900 border border-gray-900 hover:border-transparent rounded"
            onClick={() => addField("after")}
          >
            +
          </button>
        </div>

{/*
        <button
          className="primaryBtn text-white font-bold py-1 px-2 rounded"
          onClick={() => changeSkin()}
        >
          Skin ändern
        </button>
          */}
          <div className="flex mb-4">
            <div className="w-3/4 text-left">
                <button
                    className={"primaryBtn text-white font-bold py-1 px-2 rounded m-2 md:invisible"}
                    onClick={() => setPointerLeft()}
                    >
                    <FaArrowAltCircleLeft/>
                </button>

                <button
                    className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 md:invisible"
                    onClick={() => setPointerRight()}
                    >
                    <FaArrowAltCircleRight/>
                </button>
            </div>

            <div className="w-1/4 text-right">   
                <button
                    className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
                    onClick={() => deleteAll()}
                    >
                    <FaRedo />
                </button>
            </div>
          </div>

      </div>
    );
  }
}
