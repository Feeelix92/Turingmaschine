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

function App() {
  const toiletPaperMode = useSelector(
    (state: RootState) => state.general.toiletPaperMode
  );

  return (
    <div className="App">
      <header className="App-header">
        <Menu />
        <Control />
        {!toiletPaperMode && <Band />}
        {toiletPaperMode && <TeepeeBand />}
      </header>
      <div className={"App-body"}>
          {!toiletPaperMode &&
              <div className={"hidden md:grid md:grid-cols-4 md:items-start"}>
                  <ConditionsList/>
                  <Table/>
              </div>
          }
          {toiletPaperMode &&
              <ToPaTable />
          }
          {!toiletPaperMode &&
              <div className={"md:hidden"}>
                  <Bottomnav/>
              </div>
          }
      </div>
    </div>
  );
}

export default App;
