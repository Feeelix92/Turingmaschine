import TeepeeBand from "./components/Band/TeepeeBand";
import Table from "./components/Zustandsüberführungsfunktion/Table";
import Menu from "./components/Menu/Menu";
import Control from "./components/Control/Control";
import ConditionsList from "./components/Zustaende/List";
import Bottomnav from "./components/Bottomnav/Bottomnav";
import ToPaTable from "./components/Zustandsüberführungsfunktion/ToPaTable";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "./redux/store";
import Band from "./components/Band/Band";
import { Routes, Route, Link } from "react-router-dom";
import {activateToiletPaperMode, deactivateToiletPaperMode, changeToiletPaperMode} from "./redux/generalStore";
import {useEffect} from "react";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route
                path="/"
                element={<Home />}

            />
            <Route
                path="/papier"
                element={<Papier />}
            />
        </Routes>
    </div>
      /**
       * <header className="App-header">
       *         <Menu />
       *         <Control />
       *         {!toiletPaperMode && <Band />}
       *         {toiletPaperMode && <TeepeeBand />}
       *       </header>
       *       <div className={"App-body"}>
       *           {!toiletPaperMode &&
       *               <div className={"hidden md:grid md:grid-cols-4 md:items-start"}>
       *                   <ConditionsList/>
       *                   <Table/>
       *               </div>
       *           }
       *           {toiletPaperMode &&
       *               <ToPaTable />
       *           }
       *           {!toiletPaperMode &&
       *               <div className={"md:hidden"}>
       *                   <Bottomnav/>
       *               </div>
       *           }
       *       </div>
       */
  );
}

function Home() {
    const toiletPaperMode = useSelector((state: RootState) => state.general.toiletPaperMode)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(deactivateToiletPaperMode()) ;dispatch(changeToiletPaperMode()); console.log('ac', toiletPaperMode)
    })

    return (
        <>
            <header className="App-header">
                <Menu/>
                <Control/>
                <Band/>
            </header>
            <div className={"App-body"}>

                <div className={"hidden md:grid md:grid-cols-4 md:items-start"}>
                    <ConditionsList/>
                    <Table/>
                </div>

                <div className={"md:hidden"}>
                    <Bottomnav/>
                </div>

            </div>
        </>
    )
}

function Papier() {
    const toiletPaperMode = useSelector((state: RootState) => state.general.toiletPaperMode)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(activateToiletPaperMode()) ;dispatch(changeToiletPaperMode()); console.log('paper', toiletPaperMode)
    })

    return (
        <>
            <header className="App-header">
                <Menu/>
                <Control/>
                <TeepeeBand/>
            </header>
            <div className={"App-body"}>
                <ToPaTable/>
            </div>
        </>
    )
}


export default App;
