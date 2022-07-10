import BandItem from "./BandItem";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaAngleLeft,
  FaAngleRight,
  FaRedo,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  bandAddField,
  bandChangePointer,
  bandChangePointPos,
  bandDeleteAll,
  bandSetPointPos,
} from "../../redux/bandStore";
import { RootState } from "../../redux/store";
import React from "react";

export default function TeepeeBand() {
  const defaultPointerPos = 1; // Feld, auf dem Pointer im Default stehen soll

  const currentBand = useSelector((state: RootState) => state.band.currentBand);
  const currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );
  const dispatch = useDispatch();

  const setPointerAt = (index: number) => {
    dispatch(bandSetPointPos(index))
  };

  // Für Touch nach rechts & links:
  const setPointerLeft = () => {
    dispatch(bandChangePointPos(-1));
  };

  //Für Touch nach rechts:
  const setPointerRight = () => {
    dispatch(bandChangePointPos(1));
  };

    return (
        <div className={"w-screen"}>
            <div className={"flex"}>
                <div className={"teepeeContainerLeft"} onClick={() => dispatch(bandAddField('before'))}>
                        <div className={"teepeeHead"}/>
                        <div className={"teepeeBody"}/>
                        <div className={"teepeeBottom"}>
                            <div className={"teepeeCardboard"}/>
                        </div>
                    </div>
                    <div className="teepeeBand-container overflow-x-auto col-span-12">
                        {/*{currentBand.map((value, index) => (*/}
                        {/*    <BandItem*/}
                        {/*        value={value.value}*/}
                        {/*        label={value.label}*/}
                        {/*        index={index}*/}
                        {/*        pointer={value.pointer!}*/}
                        {/*        key={index}*/}
                        {/*        alphabet={currentAlphabet.alphabet}*/}
                        {/*        showEditField={true}*/}
                        {/*        setPointerAt={() => setPointerAt(index)}*/}
                        {/*    />*/}
                        {/*))}*/}
                        <div className={"teepeeBandItem"}/>
                        <div className={"teepeeBandItem"}/>
                        <div className={"teepeeBandItem"}/>
                        <div className={"teepeeBandItem"}/>
                        <div className={"teepeeBandItem"}/>
                        <div className={"teepeeBandItem"}/>
                        <div className={"teepeeBandItem"}/>
                        <div className={"teepeeBandItem"}/>
                        <div className={"teepeeBandItem"}/>
                        <div className={"teepeeBandItem"}/>
                        <div className={"teepeeBandItem"}/>
                    </div>
                    <div className={"teepeeContainerRight"} onClick={() => dispatch(bandAddField('after'))}>
                        <div className={"teepeeHead"}/>
                        <div className={"teepeeBody"}/>
                        <div className={"teepeeBottom"}>
                            <div className={"teepeeCardboard"}/>
                        </div>
                    </div>
                {/*<div className={"hidden md:block"}>*/}
                {/*    <div className={"flex justify-center gap-2"}>*/}
                {/*        <button*/}
                {/*            onClick={() => dispatch(bandDeleteAll())}*/}
                {/*            className={"w-36 invertedButton"}>*/}
                {/*            zurücksetzen*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="flex">*/}
                {/*    <div className={"w-3/4 text-left"}>*/}
                {/*        <button className={"m-2 md:invisible secondaryButton"}*/}
                {/*                onClick={() => setPointerLeft()}>*/}
                {/*            <FaAngleLeft />*/}
                {/*        </button>*/}

                {/*        <button className={"md:invisible secondaryButton"}*/}
                {/*                onClick={() => setPointerRight()}>*/}
                {/*            <FaAngleRight />*/}
                {/*        </button>*/}
                {/*    </div>*/}

                {/*    <div className={"w-1/4 text-right md:hidden"}>*/}
                {/*        <button*/}
                {/*            onClick={() => dispatch(bandDeleteAll())}*/}
                {/*            className={"m-2"}>*/}
                {/*            <FaRedo/>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
            
