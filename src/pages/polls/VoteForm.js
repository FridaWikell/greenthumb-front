import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function VoteForm({ questionId, answers }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post("/votes/", { answer_id: selectedAnswer });
      alert("Vote submitted!");
    } catch (err) {
      console.error("Error submitting vote:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {answers.map((answer) => (
        <Form.Check
          key={answer.id}
          type="radio"
          label={answer.text}
          name="vote"
          value={answer.id}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        />
      ))}
      <Button type="submit" className="mt-2">Submit Vote</Button>
    </Form>
  );
}

export default VoteForm;
