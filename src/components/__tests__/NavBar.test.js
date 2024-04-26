import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Mock hooks and modules
jest.mock('../../contexts/CurrentUserContext', () => ({
  useCurrentUser: jest.fn(),
  useSetCurrentUser: jest.fn()
}));

const mockUseCurrentUser = useCurrentUser;

describe("NavBar Component", () => {
  it("should display sign in and sign up links when no user is logged in", () => {
    mockUseCurrentUser.mockReturnValue(null);

    render(
      <Router>
        <NavBar />
      </Router>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });

  it("should display user links and sign out link when a user is logged in", () => {
    mockUseCurrentUser.mockReturnValue({ profile_id: "1", profile_image: "url-to-image" });

    render(
      <Router>
        <NavBar />
      </Router>
    );

    expect(screen.getByText(/plant friends/i)).toBeInTheDocument();
    expect(screen.getByText(/questions/i)).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
  });
});
