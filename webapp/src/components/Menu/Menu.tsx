import Sidebar from "../Sidebar/Sidebar";



function Menu() {
    return (
        <div className={"menu w-screen"}>
            <Sidebar />
            <h1 className="text-white text-xl p-3">
                Turingmaschinen-Simulator
            </h1>

        </div>

        
    );
}

export default Menu;