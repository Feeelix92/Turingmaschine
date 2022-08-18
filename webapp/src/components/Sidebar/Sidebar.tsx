import { slide as Menu } from "react-burger-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  changeToiletPaperMode,
  changeMespumaMode,
  alphabetChangeCurrentMespuma,
} from "../../redux/generalStore";
import { RootState } from "../../redux/store";
import { bandResetAll } from "../../redux/bandStore";
import { EingabeAlphabet } from "../../interfaces/CommonInterfaces";
import { cartesianProduct } from "../../interfaces/CommonFunctions";

function Sidebar() {
  const dispatch = useDispatch();

  const mode = useSelector((state: RootState) => state.general.mode);
  const currentAlphabet = useSelector(
    (state: RootState) => state.general.currentAlphabet
  );
  const anzahlSpuren = useSelector(
    (state: RootState) => state.general.anzahlSpuren
  );

  const changeTpMode = () => {
    dispatch(changeToiletPaperMode());
    dispatch(bandResetAll());
  };

  const changeMSMMode = () => {
    dispatch(changeMespumaMode());
    dispatch(bandResetAll());

    let literalArr: string[] = [];

    let tempAlphabet = Object.assign(
      [],
      currentAlphabet.alphabet
    ) as EingabeAlphabet[];
    tempAlphabet.push({ value: "B", label: "", warningMode: false });

    tempAlphabet.forEach((literal) => {
      literalArr.push(literal.value);
    });

    let combinationArr: string[][] = [];

    for (let i = 0; i < anzahlSpuren; i++) {
      combinationArr.push(literalArr);
    }

    let cartesianArr = cartesianProduct(combinationArr);

    let finalBandAlphabet: string[] = [];

    cartesianArr.forEach((element: any[]) => {
      let el = "(" + element.join() + ")";
      finalBandAlphabet.push(el);
    });

    dispatch(
      alphabetChangeCurrentMespuma({
        cartesian: finalBandAlphabet,
        alphabet: currentAlphabet,
      })
    );
  };

  return (
    <Menu right>
      <div className={""}>
        <a className={"menu-item text-white text-lg no-underline"} href="/">
          Startseite
        </a>
      </div>
      <div className={""}>
        <a className={"menu-item text-white text-lg no-underline"}>
          Skin ändern
        </a>
      </div>

      <div className={""}>
        <a className={"menu-item text-white text-lg no-underline"}>
          <button
            className={
              "w-50" /*  + mode=="toiletpaper" ? 'bg-thm-primary' : 'bg-white text-thm-primary2'*/
            }
            onClick={() => changeTpMode()}
          >
            Toilettenpapiermodus {mode == "toiletpaper" ? "aus" : "an"}
          </button>
        </a>
      </div>

      <div className={""}>
        <a className={"menu-item text-white text-lg no-underline"}>
          <button className={"w-50"} onClick={() => changeMSMMode()}>
            Mehrspurenmaschine {mode == "mespuma" ? "aus" : "an"}
          </button>
        </a>
      </div>
    </Menu>
  );
}

export default Sidebar;
