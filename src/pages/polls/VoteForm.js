// VoteForm.js
import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import btnStyles from "../../styles/Button.module.css";

function VoteForm({ questionId, selectedAnswerId }) {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!selectedAnswerId) {
      alert("Please select an answer before voting.");
      return;
    }

    try {
      await axiosReq.post("/votes/", { answer: selectedAnswerId });
      alert("Thank you for voting!");
      // No need to reset selectedAnswerId here, handle that in the QuestionPage if needed
    } catch (err) {
      console.error("Error submitting vote:", err);
      if (err.response && err.response.data) {
        setErrorMessage("You have already voted on this question."); // Customize based on your API response
        setShowModal(true);
      }
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Button 
        disabled={!selectedAnswerId}
        className={`${selectedAnswerId ? btnStyles.StandardBtn : btnStyles.VoteDisabled} mt-3`}
        onClick={handleSubmit} 
      >
        Submit
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Voting error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button className={btnStyles.StandardBtn} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VoteForm;
