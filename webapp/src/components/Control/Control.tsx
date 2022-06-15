import { FaPlay, FaPause,  FaStop, FaStepForward} from "react-icons/fa";

function Control() {
    return (
        <div className={"control w-screen"}>

            <div className="flex mb-4">
                <div className="w-3/4 text-left">   
                    <button
                        className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
                        >
                        <FaPlay/>
                    </button>

                    <button
                        className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
                        >
                        <FaPause/>
                    </button>

                    <button
                        className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
                        >
                        <FaStop/>
                    </button>

                    <button
                        className="primaryBtn text-white font-bold py-1 px-2 rounded m-2 "
                        >
                        <FaStepForward/>
                    </button>
                </div>

                <div className="m-2 text-black">                      
                    {/*<label htmlFor="velSlider" className="form-label ">Geschwindigkeit</label>*/}

                    <input id="velSlider" type="range" className="w-full h-2 bg-gray-500 rounded-lg 
                    appearance-none cursor-pointer"></input>
                    

                </div>
                
            </div>

        </div>

        



        
    );
}

export default Control;