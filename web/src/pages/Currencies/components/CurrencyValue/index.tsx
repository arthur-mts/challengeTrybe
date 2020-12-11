import React from "react";

import { Wrapper } from "./styles";

interface CurrencyValueProps {
  currencyName: string;
  currencyValue: string;
}

const CurrencyValue: React.FC<CurrencyValueProps> = ({
  currencyName,
  currencyValue,
}) => {
  return (
    <Wrapper>
      <h2>{currencyName}</h2>
      <p>{currencyValue}</p>
    </Wrapper>
  );
};

export default CurrencyValue;
