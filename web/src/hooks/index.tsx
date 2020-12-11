import React from "react";

import { AuthProvider } from "./auth";
import { CurrencyProvider } from "./currency";

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CurrencyProvider>{children}</CurrencyProvider>
  </AuthProvider>
);

export default AppProvider;
