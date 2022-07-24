import Sidebar from "../Sidebar/Sidebar";


function Menu() {
    return (
        <div className={"menu w-screen sm:pl-0 sm:pr-10"}>
            <Sidebar/>
            <h1 className="text-white text-xl p-3 md:pl-6">
                Turingmaschinen-Simulator
            </h1>
        </div>
    );
}

export default Menu;