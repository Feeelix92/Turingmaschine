import { useEffect, useState } from "react";
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
import AceJsonEditor from "../codeEditor/AceJsonEditor";
import { Link, useLocation } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { FlagIcon } from "react-flag-kit";

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
    dispatch(bandResetAll());
    dispatch(changeToiletPaperMode());
    dispatch(bandResetAll());
  };

  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  // Current Router Location:
  const location = useLocation(); // Current Pathname = location.pathname

  const changeMSMMode = (mespuma: boolean) => {
    dispatch(bandResetAll());
    dispatch(changeMespumaMode(mespuma));
    dispatch(bandResetAll());

    if (mespuma) {
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
    }
  };

  useEffect(() => {
    window.performance;
    return () => {
      if (location.pathname === "/mehrspuren") {
        changeMSMMode(true);
      } else if (location.pathname === "/papier") {
        changeTpMode();
      } else {
        changeMSMMode(false);
      }
    };
  }, []);

  const { i18n, t } = useTranslation(["general"]);

  /*useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("de")
    }
  }, []);*/

  ///Wechselt die Sprache///
  const handleLanguageChange = (language: { target: { value: string } }) => {
    i18n.changeLanguage(language.target.value);
  };

  const lngs = {
    de: { nativeName: "DE" },
    en: { nativeName: "GB" },
  };

  return (
    <Menu 
      right 
      // width={450}
      className='menu-options'
    >
      <div className={"mt-0"}>
        <Link className="no-underline" to="/">
          <a className={`text-white text-lg no-underline `} href="/">
            {t("sidebar.homePage")}
          </a>
        </Link>
      </div>

      <hr className="mt-5" />

      <div className="">{t("sidebar.mode")}</div>

      <div className="inline-flex rounded-md shadow-sm text-center">
        <a
          className={`no-underline py-2 px-4 text-sm font-medium rounded-l-lg text-white hover:bg-gray-900 cursor-pointer border border-thm-primary2
              ${location.pathname === "/" ? "bg-thm-primary" : "bg-gray-700 "}`}
          onClick={() => changeMSMMode(false)}
        >
          <Link to="/" className="no-underline text-white">
            Normal
          </Link>
        </a>

        <a
          className={`no-underline py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 cursor-pointer border border-thm-primary2
              ${
                location.pathname === "/papier"
                  ? "bg-thm-primary"
                  : "bg-gray-700 "
              }`}
          onClick={() => changeTpMode()}
        >
          <Link to="/papier" className="no-underline text-white ">
            Toilettenpapier
          </Link>
        </a>

        <a
          className={`no-underline py-2 px-4 text-sm rounded-r-md font-medium text-white hover:bg-gray-900 cursor-pointer border border-thm-primary2
              ${
                location.pathname === "/mehrspuren"
                  ? "bg-thm-primary"
                  : "bg-gray-700 "
              }`}
          onClick={() => changeMSMMode(true)}
        >
          <Link to="/mehrspuren" className="no-underline text-white ">
            Mehrspuren-Maschine
          </Link>
        </a>
      </div>

      {/* <div className={""}>
        <a className={"menu-item text-white text-lg no-underline"}>
          <Link to="/">
            <button className={`w-50 ${(location.pathname==='/') ? 'bg-thm-primary' : 'bg-gray-400 '}`} onClick={() => changeMSMMode(false)}>
              Normaler Modus
            </button>
          </Link>
        </a>
      </div>

      <div className={""}>
        <a className={"menu-item text-white text-lg no-underline"}>
          <Link to="/papier">
            <button
              className={`w-50 ${(location.pathname==='/papier') ? 'bg-thm-primary' : 'bg-gray-400 '}`}
              onClick={() => changeTpMode()}
            >
              {t("sidebar.toiletPaperMode")}
            </button>
          </Link>
        </a>
      </div>

      <div className={""}>
        <a className={"menu-item text-white text-lg no-underline"}>
          <Link to="/mehrspuren">
            <button className={`w-50 ${(location.pathname==='/mehrspuren') ? 'bg-thm-primary' : 'bg-gray-400 '}`} onClick={() => changeMSMMode(true)}>
              Mehrspurenmaschine
            </button>
          </Link>
        </a>
      </div> */}

      <hr className="mt-5" />

      <div className={""}>
        <a
          className={
            "hidden md:block menu-item text-white text-lg no-underline cursor-pointer"
          }
        >
          <a
            className="text-white text-lg no-underline flex items-center"
            onClick={toggleModal}
          >
            Code-Editor
            <div className="pl-2">
              <FaLaptopCode />
            </div>
          </a>
          {showModal ? <AceJsonEditor toggleEditor={toggleModal} /> : null}
        </a>
      </div>

      <div>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            className={
              i18n.resolvedLanguage === lng ? "activeLng" : "notActiveLng"
            }
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            <FlagIcon code={lngs[lng].nativeName} size={32} />
          </button>
        ))}
      </div>
    </Menu>
  );
}

export default Sidebar;
