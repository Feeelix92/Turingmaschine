import { useTranslation} from "react-i18next";

function Imprint() {
    const { t } = useTranslation(["general"])

    return (
        <div className={"imprint text-left mt-10"}>
            <h1>{t("imprint.name")}</h1>
            <div className={"iem mb-3 mt-5"} >
                <p>Technische Hochschule Mittelhessen (THM)</p>
                <p>University of Applied Sciences</p>
                <p>{t("imprint.faculty")} 11 - IEM</p>
            </div>
            <div className={"iem-address mb-3"}>
                <p>Wilhelm-Leuschner-Straße 13</p>
                <p>61169 Friedberg</p>
                <p>{t("imprint.germany")}</p>
            </div>
            <div className={"iem-contact mb-3"}>
                <div>
                    <p>{t("imprint.eMail")}: <a className={"no-underline text-thm-primary"} href={"mailto:dekanat@iem.thm.de"}>dekanat@iem.thm.de</a></p>
                </div>
                <div>
                    <p>{t("imprint.phone")}: <a className={"no-underline text-thm-primary"} href={"tel:+496031604200"}>+49 6031 604-200</a></p>
                </div>
            </div>

            <div className={"mb-3"}>
                <p>{t("imprint.lecturer")}: <a className={"no-underline text-thm-primary"} href={"https://www.thm.de/iem/dominik-schultes"} target={"_blank"}>Prof. Dr. rer. nat. Dominik Schultes</a></p>
                <p>{t("imprint.students")}:</p>
                <li>Block, Pascal</li>
                <li>Knipprath, Chiara</li>
                <li>Maurer, Felix</li>
                <li>Wassmuth, Sarah</li>
                <li>Wegener, Felix</li>
            </div>

            <p>{t("imprint.moreInformation")} <a className={"no-underline text-thm-primary"} href={"https://www.thm.de/site/"} target={"_blank"}>{t("imprint.moreInformationLink")}</a>.</p>
        </div>
    )
}

export default Imprint