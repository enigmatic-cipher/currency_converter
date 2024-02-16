import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  onSelectCurrency: (currency: string) => void;
}

const CurrencyApi: React.FC<Props> = ({ onSelectCurrency }) => {
  const [currencies, setCurrencies] = useState<string[]>([]);

  const apiCalling = async () => {
    try {
      const response = await axios.get(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
      );
      const currencyData = Object.keys(response.data);
      setCurrencies(currencyData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apiCalling();
  }, []);

  const handleSelect = (currency: string) => {
    onSelectCurrency(currency);
  };

  return (
    <div>
      <select onChange={(e) => handleSelect(e.target.value)}>
        <option value="">Select Currency</option>
        {currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyApi;
