import React from "react";

function QuestionList({ questions, setQuestions }) {
  // Delete question from server and state
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updated = questions.filter((q) => q.id !== id);
      setQuestions(updated);
    });
  }

  // Update correct answer index on server and state
  function handleCorrectIndexChange(id, newIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: parseInt(newIndex) }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updated = questions.map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        );
        setQuestions(updated);
      });
  }

  return (
    <section>
      <h2>Questions</h2>
      {questions.map((question) => (
        <div
          key={question.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{question.prompt}</h4>
          <ol type="A">
            {question.answers.map((ans, i) => (
              <li
                key={i}
                style={{
                  fontWeight: i === question.correctIndex ? "bold" : "normal",
                }}
              >
                {ans}
              </li>
            ))}
          </ol>
          <label>
            Correct Answer:
            <select
              value={question.correctIndex}
              onChange={(e) =>
                handleCorrectIndexChange(question.id, e.target.value)
              }
            >
              {question.answers.map((_, i) => (
                <option key={i} value={i}>
                  {`Answer ${i + 1}`}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button onClick={() => handleDelete(question.id)}>Delete</button>
        </div>
      ))}
    </section>
  );
}

export default QuestionList;
