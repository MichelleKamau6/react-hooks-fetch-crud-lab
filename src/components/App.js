import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import NewQuestionForm from "./NewQuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);

  // Fetch questions on component mount
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  // Add a new question to state
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  return (
    <main>
      <h1>Quiz Admin Panel</h1>
      <NewQuestionForm onAddQuestion={handleAddQuestion} />
      <QuestionList questions={questions} setQuestions={setQuestions} />
    </main>
  );
}

export default App;
