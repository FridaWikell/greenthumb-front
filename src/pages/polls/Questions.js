import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import VoteForm from "./VoteForm";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Answer from "../../components/Answer";
import { Link } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/Questions.module.css";
import btnStyles from "../../styles/Button.module.css";

function Questions({ message = "No questions found." }) {
  const [questions, setQuestions] = useState({ results: [], next: null });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axiosReq.get(`/questions/?search=${query}`);
        setQuestions(data);
        setHasLoaded(true);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchQuestions();
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectAnswer = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 mx-auto" lg={8}>
        <div className="d-flex justify-content-center mb-4">
          <Link to="/questions/create">
            <Button className={btnStyles.StandardBtn}><i className="fa-regular fa-square-plus"></i>Add question</Button>
          </Link>
        </div>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search questions"
          />
        </Form>
        {hasLoaded ? (
          <>
            {questions.results.length ? (
              <InfiniteScroll
                dataLength={questions.results.length}
                next={() => fetchMoreData(questions, setQuestions)}
                hasMore={!!questions.next}
                loader={<Asset spinner />}
                children={questions.results.map((question) => (
                  <Container key={question.id} className={`mb-4 py-4 px-4 ${appStyles.Content}`}>
                    <h4>{question.text}</h4>
                    <div className="mb-2">
                      <small>
                        Asked by <Link to={`/profiles/${question.owner}`}>{question.owner_username}</Link>, at {question.created_at}
                      </small>
                    </div>
                    {question.answers.map((answer) => (
                      <Answer
                        key={answer.id}
                        id={answer.id}
                        text={answer.text}
                        isSelected={selectedAnswers[question.id] === answer.id}
                        onSelectAnswer={() => handleSelectAnswer(question.id, answer.id)}
                      />
                    ))}
                    <VoteForm questionId={question.id} selectedAnswerId={selectedAnswers[question.id]} />
                  </Container>
                ))}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src="https://res.cloudinary.com/dihkuau3v/image/upload/v1712912063/no-result_ugwawx.jpg" message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default Questions;
