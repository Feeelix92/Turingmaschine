import Sidebar from "../Sidebar/Sidebar";



function Menu() {
    return (
        <div className={"menu w-screen sm:w-3/4 lg:w-2/4 xl:w-1/4"}>
            <Sidebar />
            <h1 className="text-white text-xl p-3">
                Turingmaschinen-Simulator
            </h1>

        </div>

        
    );
}

export default Menu;