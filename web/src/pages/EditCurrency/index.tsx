import React, { useCallback, useState } from "react";
import Input from "components/Input";
import Select from "components/Select";
import Title from "components/Title";
import Button from "components/Button";
import currencyTypes from "utils/currencyTypes";
import { useCurrency } from "hooks/currency";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Wrapper, Container, BackLink, ActualValueContainer } from "./styles";

export default function EditCurrency() {
  const noDolarCurrencies = currencyTypes.filter((c) => c !== "USD");
  const { currencies, updateCurrency } = useCurrency();
  const [currency, setCurrency] = useState(noDolarCurrencies[0]);
  const [value, setValue] = useState("0");

  const onClick = useCallback(async () => {
    console.log(value, currency);
    await updateCurrency({ type: currency, value: Number.parseFloat(value) });
    setValue("");
  }, [value, currency, updateCurrency]);

  return (
    <Wrapper>
      <BackLink to="/">
        <AiOutlineArrowLeft />
        Voltar
      </BackLink>
      {Object.keys(currencies).length && (
        <Container data-testid="edit-currency-container">
          <Select
            data-testid="select-currency"
            name="Moeda"
            options={noDolarCurrencies}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />

          <ActualValueContainer>
            <Title>Valor atual: </Title>
            <p data-testid="actual-currency">
              {(
                currencies[currency].rate_float / currencies.USD.rate_float
              ).toFixed(2)}
            </p>
          </ActualValueContainer>

          <Input
            name="Novo valor"
            value={value}
            type="number"
            onChange={(e) => setValue(e.target.value)}
            data-testid="currency-value"
          />

          <Button onClick={onClick} data-testid="update-currency">
            ATUALIZAR
          </Button>
        </Container>
      )}
    </Wrapper>
  );
}
