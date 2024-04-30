import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./components/NavBar", () => () => <div>NavBar</div>);
jest.mock("./pages/posts/PostsPage", () => () => <div>PostsPage</div>);
jest.mock("./pages/auth/SignInForm", () => () => <div>SignInForm</div>);
jest.mock("./pages/auth/SignUpForm", () => () => <div>SignUpForm</div>);
jest.mock("./pages/errors/NotFoundPage", () => () => <div>NotFoundPage</div>);
jest.mock("lottie-react", () => ({
  __esModule: true,
  default: ({ style }) => <div style={style}>Mocked Lottie Animation</div>,
}));

describe("App Routing", () => {
  it("renders PostsPage with on '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("PostsPage")).toBeInTheDocument();
  });

  it("renders SignInForm on '/signin'", () => {
    render(
      <MemoryRouter initialEntries={["/signin"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("SignInForm")).toBeInTheDocument();
  });

  it("renders SignUpForm on '/signup'", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("SignUpForm")).toBeInTheDocument();
  });

  it("renders NotFoundPage for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/some/random/route"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("NotFoundPage")).toBeInTheDocument();
  });

  // Add more tests for other routes as necessary
});
