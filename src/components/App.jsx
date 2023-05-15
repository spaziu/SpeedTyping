import React from "react";
import useWordGame from "./hooks/useWordGame";

export default function App() {
  const {
    toggleRun,
    restart,
    handleChange,
    count,
    text,
    time,
    isRunning,
    refFocus,
    bestScore,
  } = useWordGame();

  return (
    <>
      <h1>Speed Typing</h1>
      <textarea
        ref={refFocus}
        value={text}
        onChange={handleChange}
        disabled={!isRunning}
      />
      <h4 className="time">
        Time Remaining: <span className="num">{time}</span> s
      </h4>
      {isRunning ? (
        <button onClick={toggleRun}>pause</button>
      ) : time <= 0 ? (
        <button onClick={restart}>Play Again</button>
      ) : (
        <button onClick={toggleRun}>start</button>
      )}
      <div className="score">
        <h4>
          Word Count:
          <span className="num"> {count} </span>
        </h4>
        <h4>
          Best Score:
          <span className="num"> {bestScore}</span>
        </h4>
      </div>
    </>
  );
}
