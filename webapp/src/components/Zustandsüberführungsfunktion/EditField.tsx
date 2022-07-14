import React, { useEffect } from "react";
import anime from "animejs";
import { EingabeAlphabetOption } from "../../data/Alphabet";
import { EditProps } from "../../interfaces/CommonInterfaces";
import { FaTrash } from "react-icons/fa";

export default function EditField(props: EditProps) {
  useEffect(() => {
    let tl = anime.timeline({
      easing: "easeOutExpo",
      duration: 750,
    });
    tl.add({
      targets: ".editBtn",
      scale: ["0", "1"],
      delay: anime.stagger(100),
    });
  });

  return (
    <div className="flex gap-2 z-10" role="group">
      {props.options.map((value: EingabeAlphabetOption, key: React.Key) => (
        <button
          key={key}
          type="button"
          className={"editBtn"}
          onClick={() => props.updateValue(value.value)}
        >
          {value.value}
        </button>
      ))}
    </div>
  );
}
