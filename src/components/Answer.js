import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../styles/Answer.module.css";

function Answer({ text, id, onSelectAnswer, isSelected }) {
  const handleSelect = () => {
    onSelectAnswer(id);
  };

  return (
    <Card 
      className={`mb-2 w-100 clickable ${styles.answerButton} ${isSelected ? styles.selectedAnswer : ''}`} 
      onClick={handleSelect}
    >
      <Card.Body>
        {text}
      </Card.Body>
    </Card>
  );
}

export default Answer;
