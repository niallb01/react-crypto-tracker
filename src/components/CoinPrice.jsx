const CoinPrice = (props) => {
  return (
    <>
      <div className="item-5">
        <p className="coin-price">Price: £{props.coinPrice}</p>
      </div>
    </>
  );
};

export default CoinPrice;
