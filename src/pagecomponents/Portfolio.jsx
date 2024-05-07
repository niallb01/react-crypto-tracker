//this component is child of app - data is being sent down from app
import { useState } from "react";
import "../Modal.css";
import "react-toastify/dist/ReactToastify.css";
// import InputCoin from "../inputcomponents/InputCoin";
import PortfolioCoin from "../portfoliocomponents.jsx/PortfolioCoin";
import { BsLightning } from "react-icons/bs";

const Portfolio = (props) => {
  const [portfolioModal, setPortfolioModal] = useState(false);

  const { coins, portfolio, addPortfolio } = props;

  const togglePortfolioModal = () => {
    setPortfolioModal(!portfolioModal);
  };

  return (
    <>
      <h4 className="portfolio-header">
        <BsLightning size={22} />
        Quick Portfolio
      </h4>
      <div className="add-portfolio-btn">
        <button onClick={togglePortfolioModal} className="btn-modal">
          + Add Coin
        </button>
      </div>
      {portfolioModal && (
        <div className="modal">
          <div onClick={togglePortfolioModal} className="overlay"></div>
          <div className="modal-content-portfolio">
            <h4 className="modal-header">Add Coin</h4>
            <input
              className="portfolio-search"
              list="search-input-3"
              placeholder="Search Coin..."
            />
            <input
              type="text"
              className="portfolio-quantity"
              placeholder="Add Quantity..."
            />
            <button className="add-portfolio-coin-btn">+ Add</button>

            <button onClick={togglePortfolioModal} className="close-modal">
              X
            </button>
          </div>
        </div>
      )}
      {portfolio.map((coin) => {
        // code for item/quantity goes here
        return (
          <div className="portfolio-container">
            <div className="portfolio-row">
              <PortfolioCoin
                rank={coin.market_cap_rank}
                image={coin.image}
                name={coin.name}
                symbol={coin.symbol.toUpperCase()}
                twentyFourHour={coin.price_change_percentage_24h.toFixed(1)}
                coinPrice={coin.current_price.toLocaleString()}
                marketCap={(coin.market_cap / 1000000000).toFixed(2)}
              />
            </div>
          </div>
        );
      })}

      {/* {coinPortfolio.length === 0 && (
        <div className="add-portfolio-coin-text">
          <p>
            You don't have any holdings at the moment. Click Add a Coin button
            to add Coins to your portfolio.
          </p>
        </div>
      )} */}

      <div className="delete-portfolio-btn">
        <button className="delete-coin-button">Delete Portfolio</button>
      </div>

      <div className="portfolio-page-footer"></div>
    </>
  );
};

export default Portfolio;
