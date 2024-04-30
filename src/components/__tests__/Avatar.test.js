import React from "react";
import { render, screen } from "@testing-library/react";
import Avatar from "../Avatar";

describe("Avatar", () => {
  const src = "https://example.com/avatar.png";
  const altText = "avatar";
  const textContent = "Username";

  test("renders the avatar with given src, height, and alt text", () => {
    render(<Avatar src={src} text={textContent} />);

    const image = screen.getByRole('img', { name: altText });
    expect(image).toHaveAttribute('src', src);
    expect(image).toHaveAttribute('height', '45');
    expect(image).toHaveAttribute('width', '45');
  });

  test("renders the avatar with custom height", () => {
    const customHeight = 60;
    render(<Avatar src={src} height={customHeight} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('height', customHeight.toString());
    expect(image).toHaveAttribute('width', customHeight.toString());
  });

  test("displays text alongside the avatar", () => {
    render(<Avatar src={src} text={textContent} />);

    const text = screen.getByText(textContent);
    expect(text).toBeInTheDocument();
  });
});