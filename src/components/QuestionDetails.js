import React from "react";
import Card from "react-bootstrap/Card";

function QuestionDetails({ text }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default QuestionDetails;