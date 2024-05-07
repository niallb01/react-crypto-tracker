import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pagecomponents/Home";
import Portfolio from "./pagecomponents/Portfolio";

import CoinData from "./CoinData.json";

function App() {
  const [coins, setCoins] = useState([]);
  const [portfolio, addPortfolio] = useState([]);

  // on mount
  useEffect(() => {
    getCoins();
  }, []);

  // get coin data into state
  function getCoins() {
    const getCoinData = CoinData;
    setCoins(getCoinData);
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              coins={coins}
              portfolio={portfolio}
              addPortfolio={addPortfolio}
            />
          }
        />
        <Route
          path="/portfolio"
          element={
            <Portfolio
              portfolio={portfolio}
              addPortfolio={addPortfolio}
              coins={coins}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
