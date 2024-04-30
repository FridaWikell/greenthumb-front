import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Answer from "../Answer";

describe("Answer", () => {
  const mockOnSelectAnswer = jest.fn();

  beforeEach(() => {
    mockOnSelectAnswer.mockClear();
  });

  test("renders the answer text", () => {
    render(<Answer text="Test Answer" id={1} onSelectAnswer={mockOnSelectAnswer} isSelected={false} />);
    expect(screen.getByText("Test Answer")).toBeInTheDocument();
  });

  test("applies selected style when isSelected is true", () => {
    render(<Answer text="Test Answer" id={1} onSelectAnswer={mockOnSelectAnswer} isSelected={true} />);
    const cardBody = screen.getByText("Test Answer").parentNode;
    expect(cardBody.className).toContain('selectedAnswer');
  });

  test("does not apply selected style when isSelected is false", () => {
    render(<Answer text="Test Answer" id={1} onSelectAnswer={mockOnSelectAnswer} isSelected={false} />);
    const card = screen.getByText("Test Answer").closest('div');
    expect(card.className).not.toContain('selectedAnswer');
  });

  test("calls onSelectAnswer with the correct id when clicked", () => {
    render(<Answer text="Test Answer" id={123} onSelectAnswer={mockOnSelectAnswer} isSelected={false} />);
    fireEvent.click(screen.getByText("Test Answer"));
    expect(mockOnSelectAnswer).toHaveBeenCalledWith(123);
  });
});