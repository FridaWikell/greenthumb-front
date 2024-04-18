import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import VoteForm from './VoteForm';

function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await axiosReq.get("/questions/");
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      {questions.map(question => (
        <div key={question.id}>
          <h4>{question.text}</h4>
          <VoteForm question={question} />
        </div>
      ))}
    </div>
  );
}

export default Questions;