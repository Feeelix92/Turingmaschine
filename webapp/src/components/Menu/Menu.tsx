import Sidebar from "../Sidebar/Sidebar";
import Control from "../Control/Control";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { initReactI18next, useTranslation} from "react-i18next";


function Menu() {

    const { t } = useTranslation(["general"])

    const currentZustand = useSelector(
        (state: RootState) => state.general.activeState
      );

      const mode = useSelector(
        (state: RootState) => state.general.mode
      );
      
    return (
        <div className={"menu w-full flex"}>
            <h1 className="text-white text-xl p-3 md:pl-2 pr-2 2xl:pr-16 min-w-max self-center float-left hidden xl:block">
                Turingmaschinen-Simulator
            </h1>
            
            <Control />

            <div className={"currentZustand flex-col content-center items-center justify-center mb-8 hidden md:flex pr-0" } >
                { mode != "toiletpaper" && currentZustand ? (
                <div className={"rounded-full w-32 bg-white text-thm-primary h-8 pl-5 mt-14 ml-0 mr-8 xl:mr-32"}>
                    {t("menu.currentState")}: {currentZustand.value}
                </div>
                ) : ("")}

                { mode != "toiletpaper" && !currentZustand ? (
                <div className={"rounded-full bg-white text-thm-primary h-8"}>
                    {t("menu.currentStateWarning")}
                </div>
                    ) : ("")}
                </div>

            <Sidebar/>
            {/* TODO: Wenn Sidebar nicht ganz am Anfang steht, ist Overlay nicht zu sehen (das ist immer rechts von Burgermenu-Icon?) */}
            
        </div>
    );
}

export default Menu;