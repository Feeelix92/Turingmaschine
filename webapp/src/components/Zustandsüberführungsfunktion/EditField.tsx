import React, { useEffect } from "react";
import anime from "animejs";
import { EingabeAlphabetOption } from "../../data/Alphabet";
import { EditProps } from "../../interfaces/CommonInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import BrickBlack from "../../assets/images/brick_black.svg";
import BrickWhite from "../../assets/images/brick_white.svg";

export default function EditField(props: EditProps) {
  const mode = useSelector((state: RootState) => state.general.mode);

  useEffect(() => {
    let tl = anime.timeline({
      easing: "easeOutExpo",
      duration: 750,
    });
    tl.add({
      targets: ".editPill",
      scale: ["0", "1"],
      delay: anime.stagger(100),
    });
  });

  return (
    <div className="flex gap-2 z-10" role="group">
      {mode == "default" &&
        props.options.map((value: EingabeAlphabetOption, key: React.Key) => (
          <button
            key={key}
            type="button"
            className={"editPill"}
            onClick={() => props.updateValue(value.value)}
          >
            {value.value}
          </button>
        ))}
      {mode == "toiletpaper" &&
        props.options.map((value: EingabeAlphabetOption, key: React.Key) => (
          <button
            key={key}
            type="button"
            className={"brickEditBtn"}
            onClick={() => props.updateValue(value.value)}
          >
            {value.label == "1" && (
              <img
                draggable={false}
                src={BrickWhite}
                className={""}
                alt="brick black"
              />
            )}
            {value.label == "#" && (
              <img
                draggable={false}
                src={BrickBlack}
                className={""}
                alt="brick white"
              />
            )}
            {value.label == "leer" && (
              <p className={"text-white text-2xl"}>B</p>
            )}
          </button>
        ))}

      {mode == "mespuma" &&
        props.options.map((value: EingabeAlphabetOption, key: React.Key) => (
          <button
            key={key}
            type="button"
            className={"editPill"}
            onClick={() => props.updateValue(value.value)}
          >
            {value.value}
          </button>
        ))}
    </div>
  );
}
