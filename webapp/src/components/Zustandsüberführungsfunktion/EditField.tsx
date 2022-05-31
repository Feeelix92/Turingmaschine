import React, { useEffect } from "react";
import anime from 'animejs';
import { EingabelphabetOption } from "../../data/Alphabet";
import { EditProps } from "../../interfaces/CommonInterfaces";

export default function EditField(props: EditProps) {
  
  useEffect(() => {
    let tl =  anime.timeline({
      easing: 'easeOutExpo',
      duration: 750
    })
    tl.add({
      targets: '.editBtn',
      scale: ['0', '1'],
      delay: anime.stagger(100)
    })    
  });
  

  return (
    <div className="editBtnDiv flex space-x-2 absolute mt-6" role="group">
      {props.options.map((value: EingabelphabetOption, key: React.Key) => (
        <button
          key={key}
          type="button"
          className="editBtn rounded-full text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          onClick={() => props.updateValue(value.label)}
        >
          {value.label}
        </button>
      ))}
    </div>
  );
}
