import React from "react";
import { render } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

jest.mock("../../pages/errors/InternalServerErrorPage", () => () => <div>Mocked Internal Server Error Page</div>);

describe("ErrorBoundary", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  it("renders InternalServerErrorPage on error", () => {
    const ProblematicComponent = () => {
      throw new Error("Test error");
    };

    const { getByText } = render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(getByText("Mocked Internal Server Error Page")).toBeInTheDocument();
  });

  it("renders children when there is no error", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });
});
