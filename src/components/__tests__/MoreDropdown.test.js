import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { MoreDropdown, ProfileEditDropdown, QuestionOptionsDropdown } from "../MoreDropdown";

describe("MoreDropdown", () => {
  const handleEdit = jest.fn();
  const handleDelete = jest.fn();

  test("clicking edit and delete", () => {
    render(<MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />);
    
    fireEvent.click(screen.getByLabelText("More options"));

    fireEvent.click(screen.getByText("Edit"));
    expect(handleEdit).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Delete"));
    expect(handleDelete).toHaveBeenCalled();
  });
});

describe("ProfileEditDropdown", () => {
  const history = createMemoryHistory();

  test("navigating on dropdown item click", () => {
    render(
      <Router history={history}>
        <ProfileEditDropdown id="1" />
      </Router>
    );

    fireEvent.click(screen.getByLabelText("More options"));

    fireEvent.click(screen.getByLabelText("edit-profile"));
    expect(history.location.pathname).toBe("/profiles/1/edit");
    
    fireEvent.click(screen.getByLabelText("edit-username"));
    expect(history.location.pathname).toBe("/profiles/1/edit/username");
    
    fireEvent.click(screen.getByLabelText("edit-password"));
    expect(history.location.pathname).toBe("/profiles/1/edit/password");
  });
});

describe('QuestionOptionsDropdown', () => {
  const handleDelete = jest.fn();
  const questionId = '1';

  beforeEach(() => {
    render(<QuestionOptionsDropdown questionId={questionId} handleDelete={handleDelete} />);
  });

  test('shows confirmation modal on delete option click', () => {
    fireEvent.click(screen.getByLabelText('More options'));
    fireEvent.click(screen.getByLabelText('delete-question'));

    expect(screen.getByText('Confirm deletion')).toBeInTheDocument();
  });

  test('calls handleDelete with questionId on confirm', () => {
    fireEvent.click(screen.getByLabelText('More options'));
    fireEvent.click(screen.getByLabelText('delete-question'));
    fireEvent.click(screen.getByText('Confirm'));

    expect(handleDelete).toHaveBeenCalledWith(questionId);
  });
});