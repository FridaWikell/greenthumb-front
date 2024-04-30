import React from "react";
import { render, screen } from "@testing-library/react";
import Asset from "../Asset";
import Lottie from "lottie-react";

jest.mock("lottie-react", () => {
  return {
    __esModule: true,
    default: () => <div style={{ width: '150px', height: '150px' }}>Mocked Lottie Animation</div>,
  };
});

describe("Asset Component", () => {
  test("renders Lottie spinner when spinner prop is true", () => {
    render(<Asset spinner={true} />);
    const lottie = screen.getByText("Mocked Lottie Animation");
    expect(lottie).toBeInTheDocument();
    expect(lottie).toHaveStyle({ width: '150px', height: '150px' });
  });
  

  test("renders an image with the correct src and alt text", () => {
    const testMessage = "Test Image";
    const testSrc = "https://example.com/test-image.jpg";
    render(<Asset src={testSrc} message={testMessage} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', testSrc);
    expect(image).toHaveAttribute('alt', testMessage);
  });

  test("renders a message when message prop is provided", () => {
    const testMessage = "Test Message";
    render(<Asset message={testMessage} />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});