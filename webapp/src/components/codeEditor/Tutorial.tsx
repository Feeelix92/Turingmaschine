import React from "react";
import {FiDownload, FiUpload} from "react-icons/all";


export default function Tutorial() {

    return (
        <div className={""}>
            <h3>Funktionsweise und Syntax</h3>
            <p>Sie können die Turingmaschine über den Code-Editor im JSON-Format konfigurieren.</p>
            <p>Hierfür ist standardmäßig ein leeres Band, Spezifikationen und eine leere Tabelle vorhanden.</p>
            <br/>
            <h3>Download</h3>
            <div className={"flex text-black"}>
                <p>Sie können Ihre Turingmaschine als JSON Datei speichern, klicken Sie dazu auf den Download Button &#160;</p>
                <FiDownload />.
            </div>
            <br/>
            <h3>Upload</h3>
            <div className={"flex text-black"}>
                <p>Sie können Ihre programmierte Turingmaschine auch wieder in den Editor laden, indem Sie auf Upload-Button klicken &#160;</p>
                <FiUpload />.
            </div>
            <br/>
            <h3>Shortcuts</h3>
            <p>Im Editor können Shortcuts verwendet werden, mit denen der entsprechende Code erzeugt wird.</p>
            <p>Innerhalb des Editors können die folgenden Shortcuts verwendet werden:</p>
            <ul className={"text-black list-disc pl-5 text-base"}>
                <li>band - erzeugt ein leeres Band.</li>
                <li>specifications - erzeugt das Codegerüst für die Eingabe der Spezifikationen.</li>
                <li>alphabet - erzeugt das Codegerüst für das Eingabealphabet.</li>
                <li>alphabet_#_1 - erzeugt Code für ein Eingabealphabet mit "#" und "1".</li>
                <li>alphabet_0_1 - erzeugt Code für ein Eingabealphabet mit "0" und "1".</li>
                <li>states - erzeugt das Codegerüst für die Eingabe von Zuständen.</li>
                <li>states_q1_q2 - erzeugt Code für die Zuständen "q1" und "q2" </li>
                <li>startState - erzeugt das Codegerüst für die Eingabe des Anfangszustand.</li>
                <li>startState_q1 - erzeugt Code für Anfangszustand "q1".</li>
                <li>endStates - erzeugt das Codegerüst für die Eingabe des Endzustand.</li>
                <li>endStates_q2 - erzeugt Code für Endzustand "q2".</li>
                <li>specifications - erzeugt das Codegerüst für die Eingabe der Tabelle.</li>
                <li>example - erzeugt den kompletten Code, um die Turingmaschine für die Addition von zwei unär kodierten Zahlen zu programmieren, zusehen im nachfolgenden Abschnitt</li>
            </ul>
            <br/>
            <h3>Beispiel</h3>
            <p>&#123;<br/>
                &#160; &#160; "band":&#123;<br/>
                &#160; &#160; &#160; &#160; "input":["B","B","1","#","1","B","B","B"]<br/>
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
                &#160; &#160; &#160; &#160; &#160; &#160; "B":["q4", "B", "L"],<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "1":["q3", "#", "L"]<br/>
                &#160; &#160; &#160; &#160; &#125;,<br/>
                &#160; &#160; &#160; &#160; "q3":&#123;<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "#":["q1", "1", "R"]<br/>
                &#160; &#160; &#160; &#160; &#125;,<br/>
                &#160; &#160; &#160; &#160; "q4":&#123;<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "B":["q5", "B", "R"],<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "#":["q4", "B", "L"],<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "1":["q4", "1", "L"]<br/>
                &#160; &#160; &#160; &#160; &#125;,<br/>
                &#160; &#160; &#160; &#160; "q5":&#123;<br/>
                &#160; &#160; &#160; &#160; &#160; &#160; "B":["q5", "B", "R"]<br/>
                &#160; &#160; &#160; &#160; &#125;<br/>
                &#160; &#160; &#125;<br/>
                &#125;</p>
            <br/>
        </div>
    );
}