import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { createMemoryHistory, History } from "history";
import MockAdapter from "axios-mock-adapter";
import api from "services/api";
import { customRender } from "./utils/App.utils";

import cryptoStub from "./stub/crypto.json";

let history: History;

const apiMock = new MockAdapter(api);

const mockSuccessLoginRequest = () => {
  apiMock.onPost("/login").reply(200, { token: "myToken" });
  apiMock.onGet("/crypto").reply(200, cryptoStub);
};

const mockFailedLoginRequest = () => {
  apiMock.onPost("/login").reply(401);
};

describe("Login", () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {});

  it("should login with success", async () => {
    mockSuccessLoginRequest();
    history.push("/login");
    customRender(history);
    const button = screen.getByTestId("submit-login");
    const emailInput = screen.getByTestId("email-input");
    const passInput = screen.getByTestId("password-input");

    userEvent.type(emailInput, "arthur@email.com");
    userEvent.type(passInput, "123123123");

    await act(async () => {
      await userEvent.click(button, { button: 0 });
    });

    expect(history.location.pathname).toEqual("/");
  });

  it("should not able to login ", async () => {
    mockFailedLoginRequest();

    window.alert = jest.fn();

    history.push("/login");
    customRender(history);
    const button = screen.getByTestId("submit-login");
    const emailInput = screen.getByTestId("email-input");
    const passInput = screen.getByTestId("password-input");

    userEvent.type(emailInput, "wrongemail");
    userEvent.type(passInput, "wrongpass");

    await act(async () => {
      await userEvent.click(button, { button: 0 });
    });

    expect(window.alert).toHaveBeenCalledWith(
      "Erro no login! Por favor verifique suas credenciais"
    );
  });
});
