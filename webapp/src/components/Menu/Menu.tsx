import Sidebar from "../Sidebar/Sidebar";
import Control from "../Control/Control";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslation} from "react-i18next";


function Menu() {

    const { t } = useTranslation(["general"])

    const currentZustand = useSelector(
        (state: RootState) => state.general.activeState
      );

      const mode = useSelector(
        (state: RootState) => state.general.mode
      );
      
    return (
        <div className={"menu w-full flex justify-between"}>
            <h1 className="text-white text-xl p-3 md:pl-2 min-w-max self-center float-left hidden xl:block w-[250px]">
                {t("menu.name")}
            </h1>
            <div className={"flex"}>
                <Control />
                <div className={"currentZustand flex-col content-center items-center justify-center mb-8 hidden md:flex pr-0" } >
                    { mode != "toiletpaper" && currentZustand ? (
                        <div className={"rounded-full w-32 bg-white text-thm-primary h-8 pl-5 mt-14 ml-8 "}>
                            {t("menu.currentState")}: {currentZustand.value}
                        </div>
                    ) : ("")}

                    { mode != "toiletpaper" && !currentZustand ? (
                        <div className={"rounded-full bg-white text-thm-primary h-8"}>
                            {t("menu.currentStateWarning")}
                        </div>
                    ) : ("")}
                </div>
            </div>
            <div className={"lg:w-[250px]"}>
                <Sidebar/>
            </div>
            {/* TODO: Wenn Sidebar nicht ganz am Anfang steht, ist Overlay nicht zu sehen (das ist immer rechts von Burgermenu-Icon?) */}
        </div>
    );
}

export default Menu;