import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import AppProvider from "hooks";
import { Router } from "react-router-dom";
import Routes from "routes";

import { History } from "history";

export const customRender = (history: History) =>
  render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </Router>
  );
