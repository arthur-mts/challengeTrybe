import { useCurrency } from "hooks/currency";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import CurrencyValue from "./components/CurrencyValue";

import { Wrapper, Container, StyledButton, CurrenciesGroup } from "./styles";

const Currencies: React.FC = () => {
  const { currencies } = useCurrency();
  const { push } = useHistory();

  const onClick = useCallback(() => {
    push("/editCurrency");
  }, [push]);

  return (
    <Wrapper>
      <Container>
        {Object.keys(currencies).length > 0 && (
          <>
            <StyledButton onClick={onClick}>
              Atualizar valor monetário
            </StyledButton>
            <CurrencyValue
              currencyName="BTC"
              currencyValue={currencies.BTC.rate_float.toFixed(3)}
            />
            <CurrenciesGroup>
              <CurrencyValue
                currencyName="USD"
                currencyValue={currencies.USD.rate_float.toFixed(3)}
              />
              <CurrencyValue
                currencyName="BRL"
                currencyValue={currencies.BRL.rate_float.toFixed(3)}
              />
              <CurrencyValue
                currencyName="EUR"
                currencyValue={currencies.EUR.rate_float.toFixed(3)}
              />
              <CurrencyValue
                currencyName="CAD"
                currencyValue={currencies.CAD.rate_float.toFixed(3)}
              />
            </CurrenciesGroup>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default Currencies;
