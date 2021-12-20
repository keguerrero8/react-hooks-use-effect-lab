import { cleanup } from "@testing-library/react";
import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    let timer
    if (timeRemaining > 0) {
      timer = setTimeout(() => {
        // console.log("inside useEffect")
        setTimeRemaining((timeRemaining) => timeRemaining - 1)
      }, 1000)
    } 
    else {
      setTimeRemaining(10)
      onAnswered(false)
    }

    return function cleanup () {
      clearTimeout(timer)
    }


  }, [timeRemaining])

  console.log("render")

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
