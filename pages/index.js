import React, { useState } from "react";
import styles from "../styles/Home.module.css"; // Import your styles module

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch("/api/getAnswers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();

    setAnswers(data.map((item) => item.text.trim()));
    setLoading(false);
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI Email Generator</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          id="inputAi"
          className={styles.inputT}
          placeholder="Enter your prompt here"
          onChange={handleChange}
        />
        <button
          type="button"
          className={styles.button}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Emails"}
        </button>
      </div>
      <div className={styles.answerContainer}>
        {answers.map((answer, index) => (
          <div key={index} className={styles.answerBlock}>
            <p className={styles.paragraph}>{answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
