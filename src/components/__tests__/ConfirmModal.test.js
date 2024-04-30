import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmModal from "../ConfirmModal";

describe("ConfirmModal", () => {
  const handleClose = jest.fn();
  const handleConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal when show is true", () => {
    render(
      <ConfirmModal
        show={true}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    );
    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to proceed?")).toBeInTheDocument();
  });

  test("does not render the modal when show is false", () => {
    render(
      <ConfirmModal
        show={false}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    );
    expect(screen.queryByText("Confirm Action")).not.toBeInTheDocument();
    expect(screen.queryByText("Are you sure you want to proceed?")).not.toBeInTheDocument();
  });

  test("calls handleClose when the 'Cancel' button is clicked", () => {
    render(
      <ConfirmModal
        show={true}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("calls handleConfirm when the 'Confirm' button is clicked", () => {
    render(
      <ConfirmModal
        show={true}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    );
    fireEvent.click(screen.getByText("Confirm"));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});