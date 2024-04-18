import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import QuestionDetails from "../../components/QuestionDetails";
import Answer from "../../components/Answer";
import VoteForm from "./VoteForm";

function QuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const { data: questionData } = await axiosReq.get(`/questions/${id}`);
        setQuestion(questionData);
        setAnswers(questionData.answers); // Assuming answers are nested within question data
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuestionAndAnswers();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {question && (
            <QuestionDetails {...question} />
          )}
          {answers.length > 0 && (
            <Container>
              {answers.map((answer) => (
                <Answer key={answer.id} {...answer} />
              ))}
              <VoteForm questionId={id} answers={answers} />
            </Container>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Other related questions or popular questions here
      </Col>
    </Row>
  );
}

export default QuestionPage;
