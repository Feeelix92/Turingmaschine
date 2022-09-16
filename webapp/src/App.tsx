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
import { useDispatch } from "react-redux";
import {
  activateNormalMode,
  activateToiletPaperMode,
  changeMespumaMode,
} from "./redux/generalStore";
import { bandResetAll } from "./redux/bandStore";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/papier" element={<Papier />} />
        <Route path="/mehrspuren" element={<Mespuma />} />
      </Routes>
    </div>
  );
}

function Home() {
  const dispatch = useDispatch();
  dispatch(bandResetAll());
  dispatch(activateNormalMode());
  dispatch(bandResetAll());

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
  const dispatch = useDispatch();
  dispatch(bandResetAll());
  dispatch(activateToiletPaperMode());
  dispatch(bandResetAll());

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

function Mespuma() {
  const dispatch = useDispatch();
  dispatch(bandResetAll());
  dispatch(changeMespumaMode(true));
  dispatch(bandResetAll());

  return (
    <>
      <header className="App-header">
        <Menu />
        <MespumaBand />
      </header>

      <div className={"App-body"}>
        <div className={" hidden md:flex space-x-10 "}>
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