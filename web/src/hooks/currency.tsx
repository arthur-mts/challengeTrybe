import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";

import api from "services/api";
import { useAuth } from "./auth";

interface BitcoinCurrencies {
  [key: string]: { rate_float: number };
}

interface UpdateCurrencyData {
  type: string;
  value: number;
}

interface CurrencyContextData {
  currencies: BitcoinCurrencies;
  updateCurrency(data: UpdateCurrencyData): Promise<void>;
  getCurrencies(): Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextData>(
  {} as CurrencyContextData
);

const CurrencyProvider: React.FC = ({ children }) => {
  const { token } = useAuth();

  const [currencies, setCurrencies] = useState({} as BitcoinCurrencies);

  const getCurrencies = useCallback(async () => {
    if (token) {
      const {
        data: { bpi },
      } = await api.get("/crypto", {
        headers: { Authorization: token },
      });
      setCurrencies(bpi);
    }
  }, [setCurrencies, token]);

  const updateCurrency = useCallback(
    async ({ type, value }: UpdateCurrencyData) => {
      if (token) {
        await api.post(
          "/crypto",
          { currency: type, value },
          { headers: { Authorization: token } }
        );

        await getCurrencies();
      }
    },
    [token, getCurrencies]
  );

  useEffect(() => {
    (async () => {
      await getCurrencies();
    })();
  }, [getCurrencies]);

  return (
    <CurrencyContext.Provider
      value={{ updateCurrency, getCurrencies, currencies }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

function useCurrency(): CurrencyContextData {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used within an CurrencyProvider");
  }

  return context;
}

export { CurrencyProvider, useCurrency };
