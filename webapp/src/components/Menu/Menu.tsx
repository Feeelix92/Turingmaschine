import Sidebar from "../Sidebar/Sidebar";
import Control from "../Control/Control";


function Menu() {
    return (
        <div className={"menu w-screen sm:pl-0 sm:pr-10 flex"}>
            <h1 className="text-white text-xl p-3 md:pl-6 md:pr-32 min-w-max self-center float-left hidden md:block">
                Turingmaschinen-Simulator
            </h1>
            
            <Control />

            <Sidebar/>
            {/* TODO: Wenn Sidebar nicht ganz am Anfang steht, ist Overlay nicht zu sehen (das ist immer rechts von Burgermenu-Icon?) */}
            
        </div>
    );
}

export default Menu;