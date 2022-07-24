import Sidebar from "../Sidebar/Sidebar";
import Control from "../Control/Control";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


function Menu() {

    const currentZustand = useSelector(
        (state: RootState) => state.general.activeState
      );
      
    return (
        <div className={"menu w-screen sm:pl-0 sm:pr-10 flex"}>
            <h1 className="text-white text-xl p-3 md:pl-6 md:pr-32 min-w-max self-center float-left hidden md:block">
                Turingmaschinen-Simulator
            </h1>
            
            <Control />

            <div className={"currentZustand flex-col content-center items-center justify-center mb-8 hidden md:flex" } >
                {currentZustand ? (
                <div className={"rounded-full w-32 bg-white text-thm-primary h-8 pl-5 mt-14 mr-32"}>
                    Zustand: {currentZustand.value}
                </div>
                ) : (
                <div className={"rounded-full bg-white text-thm-primary h-8"}>
                    Kein Zustand vorhanden!
                </div>
                )}
            </div>

            <Sidebar/>
            {/* TODO: Wenn Sidebar nicht ganz am Anfang steht, ist Overlay nicht zu sehen (das ist immer rechts von Burgermenu-Icon?) */}
            
        </div>
    );
}

export default Menu;