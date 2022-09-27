import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { bandResetPointerPos} from "../../redux/bandStore";
import { bandResetAnzahlSpuren } from "../../redux/generalStore";
import AceJsonEditor from "../codeEditor/AceJsonEditor";
import { Link, useLocation } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { FlagIcon } from "react-flag-kit";
import * as React from "react";

function Sidebar() {
  const mode = useSelector((state: RootState) => state.general.mode);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Toggle Modal
  function toggleModal() {
    setShowModal(!showModal);
  }

  // Page reload
  function reloadPage() {
    window.location.reload();
  }

  // Current Router Location:
  const location = useLocation(); // Current Pathname = location.pathname

  ///Wechselt die Sprache///
  const { i18n, t } = useTranslation(["general"]);
  const handleLanguageChange = (language: { target: { value: string } }) => {
    i18n.changeLanguage(language.target.value);
  };

  const lngs = {
    de: "DE",
    en: "GB",
  };

  function getFlag(lng: any) {
    if (lng == "de") {
      return <FlagIcon code={"DE"} size={32} />;
    } else if (lng == "en") {
      return <FlagIcon code={"GB"} size={32} />;
    }
  }

  const pull_data = (data: boolean) => {
    setMenuIsOpen(data);
  }

  return (
    <Menu
      right
      className="menu-options"
      isOpen={menuIsOpen}
    >
      <div className={"mt-0"}>
        {/*Link zum default Modus*/}
        <Link className="no-underline text-white text-lg" to="/">
          {t("sidebar.homePage")}
        </Link>
      </div>

      <div
        className={"mt-0 no-underline text-white text-lg cursor-pointer"}
        onClick={() => reloadPage()}
      >
        {t("sidebar.reload")}
      </div>

      <hr className="mt-5" />

      <div className="">{t("sidebar.mode")}</div>

      <div className="hidden md:inline-flex">
        <div className="rounded-md shadow-sm text-center inline-flex">
          {/*Link zum default Modus*/}
          <Link
            to="/"
            className={`no-underline py-2 px-2 sm:px-4 text-sm font-medium rounded-l-lg text-white cursor-pointer border border-thm-primary2
                ${
                  location.pathname === "/"
                    ? "bg-thm-primary pointer-events-none"
                    : "bg-gray-700 hover:bg-gray-900"
                }`}
                onClick={() => {
                  dispatch(bandResetPointerPos());
                  dispatch(bandResetAnzahlSpuren());
                  }
                }
          >
            {t("sidebar.normalMode")}
          </Link>
          {/*Link zum Toilettenpapiermodus*/}
          <Link
            to="/papier"
            className={`no-underline py-2 px-4 text-sm font-medium text-white cursor-pointer border border-thm-primary2
                ${
                  location.pathname === "/papier"
                    ? "bg-thm-primary pointer-events-none"
                    : "bg-gray-700 hover:bg-gray-900"
                }`}
                onClick={() => dispatch(bandResetPointerPos())}
          >
            {t("sidebar.toiletPaperMode")}
          </Link>
          {/*Link zum Mehrspurenmodus*/}
          <Link
            to="/mehrspuren"
            className={`no-underline py-2 px-4 text-sm rounded-r-md font-medium text-white cursor-pointer border border-thm-primary2
                ${
                  location.pathname === "/mehrspuren"
                    ? "bg-thm-primary pointer-events-none"
                    : "bg-gray-700 hover:bg-gray-900"
                }`}
                onClick={() => dispatch(bandResetPointerPos())}
          >
            {t("sidebar.multiTrackMachine")}
          </Link>
        </div>
      </div>

      <hr className="mt-5" />
      {mode != "toiletpaper" && (
        <div className={""}>
          <div
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
            {showModal ? <AceJsonEditor 
              toggleEditor={toggleModal} 
              checkIfOpen={pull_data}
            /> : null}
          </div>
        </div>
      )}

      <div>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            className={
              i18n.resolvedLanguage === lng ? "bg-thm-primary" : "notActiveLng"
            }
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {getFlag(lng)}
          </button>
        ))}
      </div>

      <div className={"mt-0"}>
        {/*Link zum Imprint*/}
        <Link
          to="/impressum"
          className={`no-underline py-2 px-4 text-sm rounded font-medium text-white hover:bg-gray-900 cursor-pointer border border-thm-primary2
                ${
                  location.pathname === "/impressum"
                    ? "bg-thm-primary pointer-events-none"
                    : "bg-gray-700 "
                }`}
        >
          {t("sidebar.imprint")}
        </Link>
      </div>
    </Menu>
  );
}

export default Sidebar;
