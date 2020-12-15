import "@testing-library/jest-dom/extend-expect";
import moxios from "moxios";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { createMemoryHistory, History } from "history";

import MockAdapter from "axios-mock-adapter";
import api from "services/api";
import { customRender } from "./utils/App.utils";

const cryptoStub = require("./stub/crypto.json");

const updateCurrencyStub = { currency: "BRL", value: "2" };

const loginStub = { email: "arthur@email.com", password: "123123123" };

const apiMock = new MockAdapter(api);

const calcBTCCurrency = (value: number) =>
  value * cryptoStub.bpi.USD.rate_float;

const mockSuccessLoginRequest = () => {
  apiMock.onPost("/login").reply(200, { token: "myToken" });
  apiMock.onGet("/crypto").reply(200, cryptoStub);
};

const mockSuccessPostRequest = () => {
  apiMock.onPost("/crypto").reply(() => {
    cryptoStub.bpi[updateCurrencyStub.currency].rate_float = calcBTCCurrency(
      Number(updateCurrencyStub.value)
    );
    return [200, { message: "Alterado com sucesso" }];
  });
};

let history: History;

describe("Edit currency", () => {
  beforeEach(() => {
    moxios.install();
    history = createMemoryHistory();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should can not be able to edit BRL currency when is not logged", async () => {
    history.push("/editCurrency");
    customRender(history);

    expect(history.location.pathname).toEqual("/login");
  });

  it("should be able to edit BRL currency", async () => {
    mockSuccessLoginRequest();
    mockSuccessPostRequest();

    history.push("/login");
    customRender(history);

    const loginButton = screen.getByTestId("submit-login");
    const emailInput = screen.getByTestId("email-input");
    const passInput = screen.getByTestId("password-input");

    userEvent.type(emailInput, loginStub.email);
    userEvent.type(passInput, loginStub.password);

    await act(async () => {
      userEvent.click(loginButton, { button: 0 });
    });

    await act(async () => {
      customRender(history);
    });

    const goToEditCurrencyButton = screen.getByTestId("edit-currency-button");
    userEvent.click(goToEditCurrencyButton, { button: 0 });

    await act(async () => {
      customRender(history);
    });

    const updateCurrencyButton = screen.getByTestId("update-currency");

    const selectInput = screen.getByTestId("select-currency");

    const valueInput = screen.getByTestId("currency-value");

    const actualCurrency = screen.getByTestId("actual-currency");

    fireEvent.select(selectInput, {
      target: { value: updateCurrencyStub.currency },
    });

    userEvent.type(valueInput, updateCurrencyStub.value);

    await act(async () => {
      await userEvent.click(updateCurrencyButton, { button: 0 });
    });

    expect(actualCurrency.innerHTML).toBe(
      Number(updateCurrencyStub.value).toFixed(2)
    );
  });
});
