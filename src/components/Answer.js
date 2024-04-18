import React from "react";
import Card from "react-bootstrap/Card";

function Answer({ text }) {
  return (
    <Card className="mb-2">
      <Card.Body>
        {text}
      </Card.Body>
    </Card>
  );
}

export default Answer;