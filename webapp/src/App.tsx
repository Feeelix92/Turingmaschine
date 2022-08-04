import TeepeeBand from "./components/Band/TeepeeBand";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import Menu from "./components/Menu/Menu";
import Control from "./components/Control/Control";
import ConditionsList from "./components/Zustaende/List";
import Bottomnav from "./components/Bottomnav/Bottomnav";
import ToPaTable from "./components/Zustandsüberführungsfunktion/ToPaTable";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Band from "./components/Band/Band";
import Tiptap from "./components/codeEditor/CodeEditor";
import { useState } from "react";

function App() {
  const toiletPaperMode = useSelector(
    (state: RootState) => state.general.toiletPaperMode
  );

  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    console.log("toggle");
    setShowModal(!showModal);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Menu />
        {/* <Control /> */}
        {!toiletPaperMode && <Band />}
        {toiletPaperMode && <TeepeeBand />}
      </header>
      <button onClick={toggleModal}>Show Code-Editor</button>
      {showModal ? <Tiptap toggleEditor={toggleModal} /> : null}
      <div className={"App-body"}>
        <div className={" hidden md:grid md:grid-cols-4 md:items-start px-2"}>
          {!toiletPaperMode && <ConditionsList />}
          {!toiletPaperMode && <Table />}
          {toiletPaperMode && <ToPaTable />}
        </div>
        <div className={"md:hidden"}>
          <Bottomnav />
        </div>
      </div>
    </div>
  );
}

export default App;
