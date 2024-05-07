import Coin from "../components/Coin";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoSparklesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import TwentyFourHour from "../components/24hr";
import { Switch, FormGroup, FormControlLabel } from "@mui/material";

const Home = (props) => {
  const [search, setSearch] = useState("");
  const [volume, setVolume] = useState(false);
  const [fdv, setFdv] = useState(false);
  const [price, setPrice] = useState(false);

  const { coins, portfolio, addPortfolio } = props;

  const searchCoin = (e) => {
    setSearch(e.target.value);
  };

  // Toggle sorting
  const onVolumeSort = () => {
    setVolume(!volume);
  };

  const onFdvSort = () => {
    console.log("fdv");
    setFdv(!fdv);
  };

  const onPriceSort = () => {
    console.log("price");
    setPrice(!price);
  };

  const filtered = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  const sortCoinsByVolume = () => {
    return [...coins].sort((a, b) => b.total_volume - a.total_volume);
  };

  const sortCoinsByFdv = () => {
    return [...coins].sort(
      (a, b) => b.fully_diluted_valuation - a.fully_diluted_valuation
    );
  };

  const sortCoinsByPrice = () => {
    return [...coins].sort((a, b) => b.price_change_24h - a.price_change_24h);
  };

  //Determine which array to use based on the volume state? mabye redo this
  let coinsToUse;
  switch (true) {
    case volume:
      coinsToUse = sortCoinsByVolume();
      break;
    case fdv:
      coinsToUse = sortCoinsByFdv();
      break;
    case price:
      coinsToUse = sortCoinsByPrice();
      break;
    default:
      coinsToUse = filtered.length > 0 ? filtered : coins;
      break;
  }

  return (
    <>
      <div className="user-coin-search">
        <div className="search-bar">
          <input
            className="search-input"
            list="search-input-2"
            placeholder="Search Currency..."
            onInput={searchCoin}
          ></input>
        </div>
      </div>
      <div className="portfolio-link-customize">
        <div className="portfolio-link">
          Go to
          <Link to="/portfolio">
            <a href="#" className="portfolio-link-text">
              Portfolio {<FaStar className="star-icon-fill" size="10" />}
            </a>
          </Link>
        </div>
        <div className="dropdown">
          <button
            // onClick={toggleCustomiseModal}
            className="customize-modal-btn"
          >
            <IoSparklesOutline />
            Customize
          </button>
          <div className="dropdown-content">
            <h3>Metrics</h3>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={volume}
                    onChange={onVolumeSort}
                    size="small"
                    className="switch-item"
                  />
                }
                className="switch-item"
                label="Volume"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={fdv}
                    onChange={onFdvSort}
                    size="small"
                    className="switch-item"
                  />
                }
                className="switch-item"
                label="FDV"
              />
              <h3>Price Change</h3>
              <FormControlLabel
                control={
                  <Switch
                    checked={price}
                    onChange={onPriceSort}
                    size="small"
                    className="switch-item"
                  />
                }
                label="24hr"
                className="switch-item"
                // labelPlacement="start"
              />
            </FormGroup>
          </div>
        </div>
      </div>

      {coinsToUse.map((coin) => (
        <div className="coin-container" key={coin.id}>
          <div className="coin-row">
            <FaRegStar
              className="star-icon-fill"
              size="16"
              width={{ width: "10px" }}
            />
            <Coin
              id={coin.id}
              rank={coin.market_cap_rank}
              image={coin.image}
              name={coin.name}
              symbol={coin.symbol.toUpperCase()}
              marketCap={(coin.market_cap / 1000000000).toFixed(2)}
              coinPrice={coin.current_price.toFixed(2)}
              twentyFourHour={coin.price_change_percentage_24h.toFixed(1)}
              fdv={
                coin.fully_diluted_valuation
                  ? coin.fully_diluted_valuation.toLocaleString()
                  : "∞"
              }
              volume={coin.total_volume.toLocaleString()}
            />
          </div>
        </div>
      ))}

      <div className="page-footer"></div>
    </>
  );
};

export default Home;
