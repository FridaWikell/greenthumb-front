import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";

function VoteForm({ questionId, answers }) {
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  const handleSubmit = async () => {

    if (!selectedAnswerId) {
      alert("Please select an answer before voting.");
      return;
    }

    try {
      await axiosReq.post("/votes/", { answer: selectedAnswerId });
      alert("Thank you for voting!");
      setSelectedAnswerId(null); // Reset selection after voting
    } catch (err) {
      console.error("Error submitting vote:", err);
    }
  };

  return (
    <div>
      <Button 
        className={`${selectedAnswerId ? btnStyles.VoteEnabled : btnStyles.VoteDisabled} mt-3`}
        onClick={handleSubmit} 
        disabled={!selectedAnswerId}
      >
        Submit Vote
      </Button>
    </div>
  );
}

export default VoteForm;
