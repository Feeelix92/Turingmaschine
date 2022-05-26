import React, { FunctionComponent } from 'react'
import {EingabelphabetOption} from "../../data/Alphabet";

type Props = {
    value: EingabelphabetOption,
    index: number,
    skin: string,
    handleClick: (value: EingabelphabetOption, index: number) => void
};

export const BandItem:FunctionComponent<Props> = ({value, index, skin, handleClick}) => {
  return (
    <div 
        className={`band-container__band ${skin}`} 
        key={index}
        onClick={() => handleClick(value, index)}>
        {value.value}
        <div className={`band__buttons`}>
            <div className={`button btn-one index-${index}`}></div>
            <div className={`button btn-two index-${index}`}></div>
            <div className={`button btn-three index-${index}`}></div>
        </div>
    </div>
  )
}
