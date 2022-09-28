import TeepeeBandItem from "./TeepeeBandItem";
import { FaAngleLeft, FaAngleRight, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { bandAddField, bandChangePointPos, bandDeleteAll, bandSetPointPos} from "../../redux/bandStore";
import { RootState } from "../../redux/store";
import Dice from "./Dice";

export default function TeepeeBand() {
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
        <div className={"w-full"}>
            <Dice />
            <div className={"flex h-60 sm:h-80 justify-center"}>
                <div className={"teepeeContainerLeft"}>
                        <div className={"teepeeHead"} onClick={() => dispatch(bandAddField('before')) &&  dispatch(bandChangePointPos(1))}/>
                        <div className={"teepeeBody"} onClick={() => dispatch(bandAddField('before')) &&  dispatch(bandChangePointPos(1))}/>
                        <div className={"teepeeBottom"} onClick={() => dispatch(bandAddField('before')) &&  dispatch(bandChangePointPos(1))}>
                            <div className={"teepeeCardboard"}/>
                        </div>
                    </div>
                    <div className="teepeeBand-container overflow-x-auto col-span-12">
                        {currentBand.map((value, index) => (
                            <TeepeeBandItem
                               value={value.value}
                               label={value.label}
                               index={index}
                               pointer={value.pointer!}
                               key={index}
                               alphabet={currentAlphabet.alphabet}
                               showEditField={true}
                               setPointerAt={() => setPointerAt(index)}
                               bandIndex={index}
                            />
                        ))}
                    </div>
                    <div className={"teepeeContainerRight"}>
                        <div className={"teepeeHead"} onClick={() => dispatch(bandAddField('after'))}/>
                        <div className={"teepeeBody"} onClick={() => dispatch(bandAddField('after'))}/>
                        <div className={"teepeeBottom"} onClick={() => dispatch(bandAddField('after'))}>
                            <div className={"teepeeCardboard"}/>
                        </div>
                    </div>
            </div>
            <div className="flex">
                <div className={"w-3/4 text-left md:invisible"}>
                    <button className={"m-2 secondaryButton"}
                            onClick={() => setPointerLeft()}>
                        <FaAngleLeft />
                    </button>
                    <button className={"md:invisible secondaryButton"}
                            onClick={() => setPointerRight()}>
                        <FaAngleRight />
                    </button>
                </div>
                <div className={"w-1/4 text-right"}>
                    <button
                        onClick={() => dispatch(bandDeleteAll())}
                        className={"m-2"}
                    >
                        <FaTrash/>
                    </button>
                </div>
            </div>
        </div>
    );
}
            
