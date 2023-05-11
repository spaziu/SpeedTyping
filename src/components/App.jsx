import React, { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  function handleChange(event) {
    const { value } = event.target;
    setText(value);
  }

  function toggleRun() {
    setIsRunning((prev) => !prev);
  }

  function countWord() {
    const numberOfWord = text.trim().split(" ");
    setCount(numberOfWord[0] === "" ? 0 : numberOfWord.length);
  }

  function restart() {
    setTime(5);
    setText("");
    setCount(0);
    toggleRun();
  }

  useEffect(() => {
    if (isRunning) {
      time > 0
        ? setTimeout(() => setTime((prev) => prev - 1), 1000)
        : (toggleRun(), countWord());
    }
  }, [time, isRunning]);

  return (
    <>
      <h1>Fast Typing</h1>
      <textarea value={text} onChange={handleChange} disabled={!isRunning} />
      <h4>Time Remaining: {time} s</h4>
      {isRunning ? (
        <button onClick={toggleRun}>pause</button>
      ) : time === 0 ? (
        <button onClick={restart}>Play Again</button>
      ) : (
        <button onClick={toggleRun}>start</button>
      )}
      <h4>Word Count: {count}</h4>
    </>
  );
}
