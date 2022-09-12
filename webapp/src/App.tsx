import TeepeeBand from "./components/Band/TeepeeBand";
import MespumaBand from "./components/Band/MespumaBand";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import Menu from "./components/Menu/Menu";
import ConditionsList from "./components/Zustaende/List";
import MespumaList from "./components/Zustaende/MespumaList";
import Bottomnav from "./components/Bottomnav/Bottomnav";
import ToPaTable from "./components/Zustandsüberführungsfunktion/ToPaTable";
import Band from "./components/Band/Band";
import { Routes, Route } from "react-router-dom";
import Calculator from "./components/Calculator/Calculator";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/papier" element={<Papier />} />
        <Route path="/mehrspuren" element={<Mesuba />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <header className="App-header">
        <Menu />

        <Band />
      </header>

      <div className={"App-body"}>
        <div className={" hidden md:grid md:grid-cols-4 md:items-start px-2"}>
          <ConditionsList />
          <Table />
          <Calculator />
        </div>
        <div className={"md:hidden"}>
          <Bottomnav />
        </div>
      </div>
    </>
  );
}

function Papier() {
  return (
    <>
      <header className="App-header">
        <Menu />
        <TeepeeBand />
      </header>

      <div className={"App-body"}>
        <div className={" hidden md:grid md:grid-cols-4 md:items-start px-2"}>
          <ToPaTable />
        </div>
        <div className={"md:hidden"}>
          <Bottomnav />
        </div>
      </div>
    </>
  );
}

function Mesuba() {
  return (
    <>
      <header className="App-header">
        <Menu />
        <MespumaBand />
      </header>

      <div className={"App-body"}>
        <div className={" hidden md:grid md:grid-cols-4 md:items-start px-2"}>
          <MespumaList />
          <Table />
        </div>
        <div className={"md:hidden"}>
          <Bottomnav />
        </div>
      </div>
    </>
  );
}

export default App;

/*
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
 */
