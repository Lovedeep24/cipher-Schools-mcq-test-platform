import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Test() {
  const [questions, setQuestions] = useState([]);
  const [testName, setTestName] = useState("");
  const { testId } = useParams();
  console.log(testId);
  const fetchQuestions = async () => { 
    try {
      const response = await fetch(`http://localhost:9000/tests/${testId}/questions`);
      const data = await response.json();
      if (data.status === "success") {
        setQuestions(data.data.questions);
        setTestName(data.data.testName);
      } else {
        console.error("Error fetching questions");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [testId]);

  return (
    <>
      <h1>{testName}</h1>
      <div>
        {questions.length === 0 ? (
          <p>No questions available in the test</p>
        ) : (
          <ul>
            {questions.map((question) => (
              <div key={question._id}>
                <p>{question.questionText}</p>
                <ul>
                  {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Test;
