import React, { Key, useEffect, useRef } from "react";
import EditField from "../Zustandsüberführungsfunktion/EditField";
import { BandItemProps } from "../../interfaces/CommonInterfaces";
import { FaTimes, FaTrash } from "react-icons/fa";

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

  function deleteValue(index: Key) {
    props.deleteItemAt(props.index);
  }

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e: React.DragEvent<HTMLDivElement>, position: any) => {
    dragItem.current = position;
    console.log("dragStart " + e);
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>, position: any) => {
    // TODO: Richtige position -> Von BandItems?
    dragOverItem.current = position;
    console.log("dragEnter " + e);
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
  };

  /* TODO: Set Boolean pointer in parent to true for new position, and false for old position */
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    //let thisPointer = props.pointer;

    props.setPointerAt();

    console.log("changed props.pointer");
    /*
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
    */
  };

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


  return (
    <div
      className={`band-container__band ${props.skin} flex justify-center ${
        props.pointer ? "pointerBorder" : ""
      }`}
      key={props.index}
      ref={wrapperRef}
    >
      {props.pointer ? (
        <div
          className="pointer"
          /*onMouseDown={e => startDrag(e)}
          onMouseMove={e => onDrag(e)}
          onMouseUp={e => endDrag(e)}*/


          draggable
        ></div>
      ) : (
        ""
      )}

      <input
        type="text"
        name="value"
        id="valueInput"
        className="bandInput bg-transparent w-8 "
        value={props.value}
        onChange={(e) => checkValue(props.index, e.target.value)}
        onClick={toggleEditMode}
        onDragOver={(e) => props.setPointerAt(props.index)}
        
      />
      {editMode && props.showEditField ? (
        <EditField options={props.alphabet} updateValue={chooseOption} />
      ) : (
        ""
      )}
      {editMode && props.showEditField ? (
        <a
          href="#"
          className="delete-value-button w-full text-gray-700 focus:outline-none items-center"
          onClick={() => deleteValue(props.index)}
        >
          <FaTrash />
        </a>
      ) : (
        ""
      )}
    </div>
  );
}
