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
    await updateCurrency({ type: currency, value: Number.parseFloat(value) });
    setValue("");
  }, [value, currency, updateCurrency]);

  return (
    <Wrapper>
      <BackLink to="/">
        <AiOutlineArrowLeft />
        Voltar
      </BackLink>
      <Container>
        <Select
          name="Moeda"
          options={noDolarCurrencies}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />

        <ActualValueContainer>
          <Title>Valor atual: </Title>
          <p>
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
        />

        <Button onClick={onClick}>ATUALIZAR</Button>
      </Container>
    </Wrapper>
  );
}
