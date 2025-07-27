import React, { useState } from "react";

function NewQuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  // Submit form to server
  function handleSubmit(e) {
  e.preventDefault();

  fetch("http://localhost:4000/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: parseInt(formData.correctIndex)
    }),
  })
    .then((res) => res.json())
    .then(onAddQuestion);

  setFormData({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });
}


  return (
    <form onSubmit={handleSubmit}>
      <h3>New Question</h3>

      <label htmlFor="prompt">Prompt:</label>
      <input
        id="prompt"
        name="prompt"
        value={formData.prompt}
        onChange={handleChange}
        required
      />

      <br />
      <br />
      {formData.answers.map((ans, i) => (
        <div key={i}>
          <label htmlFor={`answer${i}`}>Answer {i + 1}:</label>
          <input
            id={`answer${i}`}
            name={`answer${i}`}
            value={ans}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <br />
      <label htmlFor="correctIndex">Correct Answer:</label>
      <select
        id="correctIndex"
        name="correctIndex"
        value={formData.correctIndex}
        onChange={handleChange}
      >
        {formData.answers.map((_, i) => (
          <option key={i} value={i}>
            {`Answer ${i + 1}`}
          </option>
        ))}
      </select>

      <br />
      <button type="submit">Add Question</button>
    </form>
  );
}

export default NewQuestionForm;
