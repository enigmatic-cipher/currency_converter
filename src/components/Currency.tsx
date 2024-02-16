import { useEffect, useState } from "react";
import CurrencyApi from "./Api";
import axios from "axios";
import "./index.css";
import convertImage from "../asset/convert-icon.png";

const Currency = () => {
  const [currencyValue, setCurrencyValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

  const currencyData = async () => {
    try {
      const response = await axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyValue}.json`
      );
      console.log("new data", response.data);
      const data = Object.values(response.data);
      const rate: any = data?.[1];
      if (rate.hasOwnProperty(toValue)) {
        setValue(rate[toValue]);
      }
    } catch (error) {
      console.log();
    }
  };

  const handleCurrencySelect = (currency: any) => {
    setCurrencyValue(currency);
  };

  const handleToCurrencySelect = (currency: any) => {
    setToValue(currency);
  };

  const calculateAmount = () => {
    const finalRate = amount * value;
    setConversionRate(finalRate);
  };

  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    currencyData();
  }, [currencyValue, toValue]);

  return (
    <>
      <div className="container">
        <h1>Currency Converter</h1>
        <div>
          <div className="cal">
            <div className="item">
              <h3>Amount</h3>
              <input placeholder="" onChange={(e) => handleChange(e)} />
            </div>
            <div className="item">
              <h3>From</h3>
              <CurrencyApi onSelectCurrency={handleCurrencySelect} />
            </div>
            <div className="img">
              <img src={convertImage} alt="convert" />
            </div>
            <div className="item">
              <h3>To</h3>
              <CurrencyApi onSelectCurrency={handleToCurrencySelect} />
            </div>
          </div>
          <div className="button">
            <button onClick={calculateAmount}>Convert</button>
            <h2>Converted Amount:</h2>{" "}
            {conversionRate !== 0 ? (
              <h3>
                {amount} {currencyValue} {"="} {conversionRate} {toValue}
              </h3>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Currency;
