import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function AddQuestion() {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']); // Array for options
  const [correctOption, setCorrectOption] = useState(''); // Index for the correct option
  const [error, setError] = useState('');
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    setError(''); // Clear error when changing options
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (options.some(option => option.trim() === '') || questionText.trim() === '') {
        setError("All fields are mandatory");
        return;
    }
    try {
        const response = await axios.post("http://localhost:9000/insertquestions", {
            questionText,
            options,
            correctOption
        });
        if(response.status===201){
            setError("New question inserted successfully");
            console.log("New question inserted successfully");
            setQuestionText('');
            setOptions(['', '', '', '']); // Reset options
            setCorrectOption(''); // Reset correct option index
        }
    } catch (error) {
        if(error.response.status===401){
            setError("All fields are mandatory");
            return;
        }
        else if(error.response.status===400){
            setError("Must give 4 options");
            console.log("Must give 4 options");
        }
        else if(error.response.status===409){
            setError("Question already exists in the database");
            console.log("Question already exists in the database");
        }
        else{
            setError("Internal server error");
            console.log("Internal server error");
        }
    }

    const newQuestion = {
      questionText,
      options,
      correctOption,
    };
    console.log("New Question:", newQuestion);
    // Reset the form after submission if needed
    setQuestionText('');
    setOptions(['', '', '', '']); // Reset options
    setCorrectOption(''); // Reset correct option index
  };

  return (
    <div>
         <Link to="/">Home</Link>
      <h1>Add Question</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Enter Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <div>
          <label htmlFor="correctOption">Correct Option Index (0-3): </label>
          <input
            type="number"
            id="correctOption"
            value={correctOption}
            onChange={(e) => setCorrectOption(Number(e.target.value))}
            min="0"
            max="3"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>{error}</h2>
    </div>
  );
}

export default AddQuestion;
