import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import NotFoundPage from "../NotFoundPage";

const mockGoBack = jest.fn();
const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
    goBack: mockGoBack,
  }),
}));

describe("NotFoundPage", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockGoBack.mockClear();
  });

  test("renders the not found message, image, and buttons", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NotFoundPage />
      </Router>
    );

    expect(screen.getByText("Oops! This page must've taken a stroll in the garden...")).toBeInTheDocument();
    expect(screen.getByText("We can't find the page you're looking for. It might be lost among the flowers!")).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /garden scene/i })).toBeInTheDocument();
    expect(screen.getByText("Go back")).toBeInTheDocument();
    expect(screen.getByText("Home page")).toBeInTheDocument();
  });

  test("navigates to home on 'Home page' button click", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NotFoundPage />
      </Router>
    );

    fireEvent.click(screen.getByText("Home page"));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  test("navigates back on 'Go back' button click", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NotFoundPage />
      </Router>
    );

    fireEvent.click(screen.getByText("Go back"));
    expect(mockGoBack).toHaveBeenCalled();
  });
});