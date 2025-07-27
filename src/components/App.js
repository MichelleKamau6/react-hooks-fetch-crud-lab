import React, { useEffect, useState } from "react";
import NewQuestionForm from "./NewQuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);

  // Fetch all questions when the app loads
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  // Add a new question to the state
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
