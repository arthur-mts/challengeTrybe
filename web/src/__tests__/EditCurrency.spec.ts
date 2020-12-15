import "@testing-library/jest-dom/extend-expect";
import moxios from "moxios";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { createMemoryHistory, History } from "history";

import MockAdapter from "axios-mock-adapter";
import api from "services/api";
import { customRender } from "./utils/App.utils";

import cryptoStub from "./stub/crypto.json";

const apiMock = new MockAdapter(api);

const mockSuccessLoginRequest = () => {
  apiMock.onPost("/login").reply(200, { token: "myToken" });
  apiMock.onGet("/crypto").reply(200, cryptoStub);
};

const mockSuccessPostRequest = () => {
  apiMock
    .onPost("/crypto")
    .reply(200, { message: "Valor alterado com sucesso!" });
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

  // it("should be able to edit BRL currency", async () => {
  //   mockSuccessLoginRequest();
  //   mockSuccessPostRequest();

  //   history.push("/login");
  //   customRender(history);

  //   const loginButton = screen.getByTestId("submit-login");
  //   const emailInput = screen.getByTestId("email-input");
  //   const passInput = screen.getByTestId("password-input");

  //   userEvent.type(emailInput, "arthur@email.com");
  //   userEvent.type(passInput, "123123123");

  //   await act(async () => {
  //     await userEvent.click(loginButton, { button: 0 });
  //   });

  //   await act(async () => {
  //     await customRender(history);
  //   });

  //   const goToEditCurrencyButton = screen.getByTestId("edit-currency-button");

  //   await act(async () => {
  //     userEvent.click(goToEditCurrencyButton, { button: 0 });
  //     await customRender(history);
  //   });

  //   const button = screen.getByTestId("update-currency");
  //   const selectInput = screen.getByTestId("select-currency");
  //   const valueInput = screen.getByTestId("currency-value");

  //   fireEvent.select(selectInput, { target: { value: "BRL" } });
  //   userEvent.type(valueInput, "2");

  //   await act(async () => {
  //     await userEvent.click(button, { button: 0 });
  //   });

  //   await act(async () => {
  //     await waitFor(
  //       () => {
  //         console.log(screen.getByTestId("edit-currency-container"));
  //       },
  //       { container: screen.getByTestId("edit-currency-container") }
  //     );
  //     console.log(screen.getByTestId("actual-currency"));
  //   });

  //   const actualCurrency = screen.getByTestId("actual-currency");

  //   // console.log(actualCurrency.);
  //   // expect(actualCurrency.children).toEqual(2 / cryptoStub.bpi.USD.rate_float)
  // });
});
