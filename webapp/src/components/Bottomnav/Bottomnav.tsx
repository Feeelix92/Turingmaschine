import ConditionsList from "../Zustaende/List";
import Table from "../Zustandsüberführungsfunktion/Table";


function Bottomnav() {
    return (
        <div>
            <div className={"mt-11 mb-36"}>
                <ConditionsList/>
            </div>

            <div className={"bottomnav w-screen p-5 flex justify-around  fixed bottom-0"}>
                <button className={""}>
                    Spezifikationen
                </button>

                <button className={""}>
                    Funktion
                </button>

                
                <button className={""}>
                    Code
                </button>
            </div>
        </div>



    );
}

export default Bottomnav;