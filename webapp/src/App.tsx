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
import Tools from "./components/Tools/Tools";
import { useDispatch } from "react-redux";
import {
  activateNormalMode,
  activateToiletPaperMode,
  changeMespumaMode,
} from "./redux/generalStore";
import { bandResetAll } from "./redux/bandStore";
import Imprint from "./components/Imprint/Imprint";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/papier" element={<Papier />} />
        <Route path="/mehrspuren" element={<Mespuma />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
    </div>
  );
}

function Home() {
  const dispatch = useDispatch();
  dispatch(bandResetAll());
  dispatch(activateNormalMode());

  return (
    <>
      <header className="App-header">
        <Menu />
        <Band />
      </header>

      <div className={"App-body"}>
        <div
          className={
            "hidden w-full max-w-screen-2xl lg:grid lg:grid-cols-4 lg:items-start px-2 gap-4"
          }
        >
          <div className={"md:col-span-2"}>
            <ConditionsList />
            <Tools />
          </div>
          <Table />
        </div>
        <div className={"lg:hidden"}>
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

  return (
    <>
      <header className="App-header">
        <Menu />
        <TeepeeBand />
      </header>

      <div className={"App-body"}>
        <div
          className={
            "w-full max-w-screen-2xl grid grid-cols-4 md:items-start px-2"
          }
        >
          <ToPaTable />
        </div>
      </div>
    </>
  );
}

function Mespuma() {
  const dispatch = useDispatch();
  dispatch(bandResetAll());
  dispatch(changeMespumaMode(true));

  return (
    <>
      <header className="App-header">
        <Menu />
        <MespumaBand />
      </header>

      <div className={"App-body"}>
        <div
          className={
            "hidden w-full max-w-screen-2xl lg:grid lg:grid-cols-4 lg:items-start px-2 gap-4"
          }
        >
          <MespumaList />
          <Table />
        </div>
        <div className={"lg:hidden"}>
          <Bottomnav />
        </div>
      </div>
    </>
  );
}

function Impressum() {
  const dispatch = useDispatch();
  dispatch(bandResetAll());
  dispatch(activateToiletPaperMode());
  dispatch(bandResetAll());

  return (
    <>
      <header className="App-header">
        <Menu />
      </header>

      <div className={"App-body"}>
        <div className={"ml-3 mr-3 md:ml-0 space-x-10 "}>
          <Imprint />
        </div>
      </div>
    </>
  );
}

export default App;
