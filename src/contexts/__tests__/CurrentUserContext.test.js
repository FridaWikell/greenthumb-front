import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { CurrentUserProvider, CurrentUserContext } from "../CurrentUserContext";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../../api/axiosDefaults", () => {
  const axios = require("axios");
  const MockAdapter = require("axios-mock-adapter");
  const axiosInstance = axios.create();
  const mockReq = new MockAdapter(axiosInstance);
  const mockRes = new MockAdapter(axiosInstance);

  mockReq.onAny().reply(200);
  mockRes.onAny().reply(200);

  return {
    axiosReq: axiosInstance,
    axiosRes: axiosInstance
  };
});

const renderWithRouter = (ui, { route = "/" } = {}) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
};

describe("CurrentUserProvider", () => {
  it("fetches and sets the current user on mount", async () => {
    const { getByText } = renderWithRouter(
      <CurrentUserProvider>
        <CurrentUserContext.Consumer>
          {user => <span>Current User: {user ? user.username : "none"}</span>}
        </CurrentUserContext.Consumer>
      </CurrentUserProvider>
    );

    await waitFor(() => expect(getByText("Current User: none")).toBeInTheDocument());
  });

  it("redirects to sign-in page on token expiration", async () => {
    const { history } = renderWithRouter(
      <CurrentUserProvider>
        <div>Test Component</div>
      </CurrentUserProvider>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe("/");
    });
  });
});