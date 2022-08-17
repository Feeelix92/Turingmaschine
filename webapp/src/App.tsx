import TeepeeBand from "./components/Band/TeepeeBand";
import MespumaBand from "./components/Band/MespumaBand";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import Menu from "./components/Menu/Menu";
import ConditionsList from "./components/Zustaende/List";
import MespumaList from "./components/Zustaende/MespumaList";
import Bottomnav from "./components/Bottomnav/Bottomnav";
import ToPaTable from "./components/Zustandsüberführungsfunktion/ToPaTable";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Band from "./components/Band/Band";
import Tiptap from "./components/codeEditor/CodeEditor";
import { useState } from "react";

function App() {
  // mode für alle:
  const mode = useSelector((state: RootState) => state.general.mode);

  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Menu />

        {mode == "default" && <Band />}
        {mode == "toiletpaper" && <TeepeeBand />}
        {mode == "mespuma" && <MespumaBand />}
      </header>

      {mode != "toiletpaper" ? (
        <button onClick={toggleModal}>Show Code-Editor</button>
      ) : null}
      {showModal ? <Tiptap toggleEditor={toggleModal} /> : null}

      <div className={"App-body"}>
        <div className={" hidden md:grid md:grid-cols-4 md:items-start px-2"}>
          {mode == "default" && <ConditionsList />}
          {mode == "default" && <Table />}

          {mode == "toiletpaper" && <ToPaTable />}

          {mode == "mespuma" && <MespumaList />}
          {mode == "mespuma" && <Table />}
        </div>
        <div className={"md:hidden"}>
          <Bottomnav />
        </div>
      </div>
    </div>
  );
}

export default App;
