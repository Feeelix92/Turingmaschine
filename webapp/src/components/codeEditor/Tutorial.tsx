import {FiDownload, FiUpload} from "react-icons/all";
import {useTranslation} from "react-i18next";

export default function Tutorial() {
    const { t } = useTranslation(["general"]);


    return (
        <div className={""}>
            <h3>{t("codeEditor.tutorial.section.1.headline")}</h3>
            <p>{t("codeEditor.tutorial.section.1.description")}</p>
            <br/>
            <h3>{t("codeEditor.tutorial.section.2.headline")}</h3>
            <div className={"flex text-black"}>
                <p>{t("codeEditor.tutorial.section.2.description")}</p>
                <FiDownload />).
            </div>
            <br/>
            <h3>{t("codeEditor.tutorial.section.3.headline")}</h3>
            <div className={"flex text-black"}>
                <p>{t("codeEditor.tutorial.section.3.description")} </p>
                <FiUpload />).
            </div>
            <br/>
            <h3>{t("codeEditor.tutorial.section.4.headline")}</h3>
            <p>{t("codeEditor.tutorial.section.4.description")}</p>
            <ul className={"text-black list-disc pl-5 text-base"}>
                <li>{t("codeEditor.tutorial.shortcuts.band")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.specifications")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.alphabet")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.alphabet_#_1")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.alphabet_0_1")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.states")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.states_q1_q2")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.startState")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.startState_q1")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.endStates")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.endStates_q2")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.table")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.addUn")}</li>
                <li>{t("codeEditor.tutorial.shortcuts.mespuma_addBin")}</li>
            </ul>
            <br/>
            <h3>{t("codeEditor.tutorial.section.5.headline")}</h3>
            <p>&#123;<br/>
                &#160; &#160; "band":&#123;<br/>
                &#160; &#160; &#160; &#160; "input":["ß","ß","1","#","1","ß","ß","ß"]<br/>
                &#160; &#160; &#125;,<br/>
                &#160; &#160; "specifications":&#123;<br/>
                &#160; &#160; "alphabet":["1","#"],<br/>
                &#160; &#160; "states":["q1","q2","q3","q4","q5"],<br/>
                &#160; &#160; "startState":["q1"],<br/>
                &#160; &#160; "endStates":["q5"]<br/>
                &#160; &#160; &#125;,<br/>
                &#160; &#160; "table":&#123;<br/>
                &#160; &#160; &#160; &#160; "q1":&#123;<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "#":["q2", "#", "R"],<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "1":["q1", "1", "R"]<br/>
                &#160; &#160; &#160; &#160; &#125;,<br/>
                &#160; &#160; &#160; &#160; "q2":&#123;<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "ß":["q4", "ß", "L"],<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "1":["q3", "#", "L"]<br/>
                &#160; &#160; &#160; &#160; &#125;,<br/>
                &#160; &#160; &#160; &#160; "q3":&#123;<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "#":["q1", "1", "R"]<br/>
                &#160; &#160; &#160; &#160; &#125;,<br/>
                &#160; &#160; &#160; &#160; "q4":&#123;<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "ß":["q5", "ß", "R"],<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "#":["q4", "ß", "L"],<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "1":["q4", "1", "L"]<br/>
                &#160; &#160; &#160; &#160; &#125;<br/>
                &#160; &#160; &#125;<br/>
                &#125;</p>
            <br/>
        </div>
    );
}