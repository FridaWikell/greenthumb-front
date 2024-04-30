import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CloseModal from "../CloseModal";
import btnStyles from "../../styles/Button.module.css";

jest.mock('../styles/Button.module.css', () => ({
  StandardBtn: 'StandardBtn',
}));

describe("CloseModal", () => {
  const handleClose = jest.fn();

  beforeEach(() => {
    handleClose.mockClear();
  });

  test("renders the modal with the correct content when 'show' is true", () => {
    render(
      <CloseModal
        show={true}
        title="Test Modal Title"
        message="Test modal body content."
        handleClose={handleClose}
      />
    );

    expect(screen.getByText("Test Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Test modal body content.")).toBeInTheDocument();
    expect(screen.getByText("Close", { selector: `button.${btnStyles.StandardBtn}`})).toBeInTheDocument();
  });

  test("does not render the modal when 'show' is false", () => {
    render(
      <CloseModal
        show={false}
        title="Test Modal Title"
        message="Test modal body content."
        handleClose={handleClose}
      />
    );

    expect(screen.queryByText("Test Modal Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Test modal body content.")).not.toBeInTheDocument();
    expect(screen.queryByText("Close", { selector: `button.${btnStyles.StandardBtn}`})).not.toBeInTheDocument();
  });

  test("calls handleClose when the close button is clicked", () => {
    render(
      <CloseModal
        show={true}
        title="Test Modal Title"
        message="Test modal body content."
        handleClose={handleClose}
      />
    );

    const closeButton = screen.getByText("Close", { selector: `button.${btnStyles.StandardBtn}`});
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("closes the modal using the modal header close button", () => {
    render(
      <CloseModal
        show={true}
        title="Test Modal Title"
        message="Test modal body content."
        handleClose={handleClose}
      />
    );

    const buttons = screen.getAllByRole('button');
    const headerCloseButton = buttons[0];
    fireEvent.click(headerCloseButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});