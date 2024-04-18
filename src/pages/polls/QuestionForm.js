import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function QuestionForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [questionData, setQuestionData] = useState({
    questionText: "",
    answers: [""]
  });
  const history = useHistory();

  // Corrected handleChange to properly update the state based on input name
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "questionText") {
      setQuestionData(prev => ({ ...prev, questionText: value }));
    } else {
      const index = parseInt(name.split("-")[1]); // Assuming names are "answer-0", "answer-1", etc.
      const newAnswers = [...questionData.answers];
      newAnswers[index] = value;
      setQuestionData(prev => ({ ...prev, answers: newAnswers }));
    }
  };

  const addAnswer = () => {
    setQuestionData(prev => ({
      ...prev,
      answers: [...prev.answers, ""],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { questionText, answers } = questionData;
    try {
      const formData = {
        text: questionText,
        answers: answers.map(answer => ({ text: answer.trim() })) // Ensuring it's an array of objects
      };
      const { data } = await axiosReq.post("/questions/", formData);
      history.push(`/questions/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={12} lg={12}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group>
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                name="questionText"
                value={questionData.questionText}
                onChange={handleChange}
                placeholder="Enter your question"
              />
              {errors?.questionText?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
              ))}
            </Form.Group>

            {questionData.answers.map((answer, index) => (
              <Form.Group key={index}>
                <Form.Label>Answer {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  name={`answer-${index}`}  // Corrected name to ensure unique handling per answer
                  value={answer}
                  onChange={handleChange}
                  placeholder="Enter an answer option"
                />
                {index + 1 === questionData.answers.length && (
                  <Button variant="outline-secondary" onClick={addAnswer} className="mt-2">
                    Add Another Answer
                  </Button>
                )}
              </Form.Group>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue} mt-3`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue} mt-3`}
              type="submit"
            >
              Submit Question
            </Button>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default QuestionForm;
