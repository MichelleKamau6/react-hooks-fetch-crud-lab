import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import NewQuestionForm from "./NewQuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List");

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
      <AdminNavBar onChangePage={setPage} />
      <h1>Quiz Admin Panel</h1>
      {page === "Form" ? (
        <NewQuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} setQuestions={setQuestions} />
      )}
    </main>
  );
}

export default App;
