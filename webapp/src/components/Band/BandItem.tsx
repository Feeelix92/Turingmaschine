import React, { Key, useEffect } from 'react'
import EditField from "../Zustandsüberführungsfunktion/EditField";
import { BandItemProps } from "../../interfaces/CommonInterfaces";


export default function BandItem(props: BandItemProps) {
  const wrapperRef: React.RefObject<HTMLInputElement> = React.createRef();  

  const [editMode, setEditMode] = React.useState(false);
  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function chooseOption(option: string) {
    props.changeItemAt(props.index, option);
    setEditMode(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef) {
        if (
          wrapperRef != null &&
          wrapperRef.current != null &&
          event.target != null &&
          event.target instanceof Node
        ) {
          if (!wrapperRef.current.contains(event.target)) {
            setEditMode(false);
          }
        }
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  function checkValue(index: Key, value: string) {
    let allowed = false;

    props.alphabet.map((entry) => {
      if (entry.value === value || value === "") {
        props.changeItemAt(index, value);
        allowed = true;        
      }
    });

    if (allowed === false) {
      alert("Wert ist nicht im Alphabet enthalten!");
    }
  }

  let dragModeActivated = false;

  function startDrag (e: MouseEvent) {
    dragModeActivated = true;
    console.log("startDrag: ", e)
  }
  function onDrag (e: MouseEvent) {
    if (dragModeActivated){
      console.log("onDrag: ", e)
    }
  }
  function endDrag (e: MouseEvent) {
    dragModeActivated = false;
    console.log("endDrag: ", e)
  }

  return (
    <div 
        className={`band-container__band ${props.skin} flex justify-center ${props.pointer ? 'pointerBorder' : ''}`} 
        key={props.index}
        ref={wrapperRef}>    

        {props.pointer ? (
          <div className="pointer"
          onMouseDown={e => startDrag(e)}
          onMouseMove={e => onDrag(e)}
          onMouseUp={e => endDrag(e)}></div>
        ) : (
          ""
        )}  
           
        <input
        type="text"
        name="value"
        id="valueInput"
        className="bandInput bg-transparent w-8 "
        value={props.value}
        onChange={e => checkValue(props.index, e.target.value)}
        onClick={toggleEditMode}        
      />           
      {editMode && props.showEditField ? (        
        <EditField options={props.alphabet} updateValue={chooseOption} />        
      ) : (
        ""
      )}        
    </div>    
  )
}
