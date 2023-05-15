import { useEffect, useState, useRef } from "react";

export default function useWordGame() {
  const timer = 12;
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(timer);
  const [isRunning, setIsRunning] = useState(false);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore") || 0
  );
  const refFocus = useRef(null);

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
    setTime(timer);
    setText("");
    setCount(0);
    toggleRun();
  }

  useEffect(() => {
    if (isRunning) {
      refFocus.current.focus(),
        time > 0
          ? setTimeout(() => setTime((prev) => prev - 1), 1000)
          : (toggleRun(), countWord());
    }
    count > bestScore
      ? (localStorage.setItem("bestScore", count), setBestScore(count))
      : bestScore;
  }, [time, isRunning, count]);

  return {
    toggleRun,
    restart,
    handleChange,
    count,
    text,
    time,
    isRunning,
    refFocus,
    bestScore,
  };
}
