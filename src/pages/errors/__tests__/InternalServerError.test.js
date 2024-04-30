import React from "react";
import { render, screen } from "@testing-library/react";
import InternalServerErrorPage from "../InternalServerErrorPage";

describe("InternalServerErrorPage", () => {
  test("renders the error message and image correctly", () => {
    render(<InternalServerErrorPage />);

    expect(screen.getByText(/Oh dear! Our garden seems a bit overgrown.../i)).toBeInTheDocument();

    expect(screen.getByText(/It looks like our system might have tangled itself up in the vines./i)).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /Happy plant/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://res.cloudinary.com/dihkuau3v/image/upload/v1713969505/500-page_robqzq.webp');
  });
});
