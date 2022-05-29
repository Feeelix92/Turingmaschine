import React, { FunctionComponent } from 'react'
import {EingabelphabetOption} from "../../data/Alphabet";

type Props = {
    value: EingabelphabetOption,
    index: number,
    skin: string,
    handleClick: (value: EingabelphabetOption, index: number) => void,
    changeItemAt: (index: any, e: any) => void
};

export const BandItem:FunctionComponent<Props> = ({value, index, skin, handleClick, changeItemAt}) => {
  return (
    <div 
        className={`band-container__band ${skin}`} 
        key={index}
        onClick={() => handleClick(value, index)}>
        <form>
            <input
            className="bg-transparent w-10"
            type="text"
            placeholder=""
            value={value.value}
            onChange={e => changeItemAt(index, event)}
            >
            </input>
        </form>
        <div className={`band__buttons`}>
            <div className={`button btn-one index-${index}`}></div>
            <div className={`button btn-two index-${index}`}></div>
            <div className={`button btn-three index-${index}`}></div>
        </div>
    </div>
  )
}
