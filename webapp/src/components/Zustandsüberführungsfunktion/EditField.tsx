import React, { useEffect } from "react";
import anime from 'animejs';
import { EingabeAlphabetOption } from "../../data/Alphabet";
import {EditProps} from "../../interfaces/CommonInterfaces";
import {FaTrash} from "react-icons/fa";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Band from "../Band/Band";
import BrickBlack from "../../assets/images/brick_black.svg";
import BrickWhite from "../../assets/images/brick_white.svg";

export default function EditField(props: EditProps) {
  const toiletPaperMode = useSelector((state: RootState) => state.general.toiletPaperMode)

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
    <div className="flex gap-2 z-10" role="group">
      {!toiletPaperMode &&
          props.options.map((value: EingabeAlphabetOption, key: React.Key) => (
                <button
                    key={key}
                    type="button"
                    className={"editBtn"}
                    onClick={() => props.updateValue(value.label)}
                >
                  {value.label}
                </button>
            ))
      }
      {toiletPaperMode &&
          props.options.map((value: EingabeAlphabetOption, key: React.Key) => (
              <button
                  key={key}
                  type="button"
                  className={"brickEditBtn"}
                  onClick={() => props.updateValue(value.label)}
              >
                {value.label == "1" &&
                    <img src={BrickWhite} className="" alt="brick black" />
                }
                {value.label == "#" &&
                    <img src={BrickBlack} className="" alt="brick white" />
                }
              </button>
          ))
      }

    </div>
  );
}
