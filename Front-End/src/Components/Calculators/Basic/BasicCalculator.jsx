import "./BasicCalculator.scss";
import { useState } from "react";
import { evaluate } from "mathjs";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const BasicCalculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleEquals = () => {
    try {
      const evalResult = evaluate(input);
      setResult(evalResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <section className="basic-calculator-container">
      <h1>Basic Calculator</h1>
      <p>Perform basic arithmetic calculations with ease.</p>
      <div className="calculator">
        <div className="calculator-display">
          <input
            type="text"
            value={input}
            placeholder="0"
            readOnly
            className="calculator-input"
          />
          <div className="calculator-result">{result}</div>
        </div>
        <div className="calculator-buttons">
          <button onClick={handleClear} className="wide">
            C
          </button>
          <button onClick={handleBackspace}>&larr;</button>
          <button onClick={() => handleClick("/")}>&divide;</button>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("*")}>&times;</button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("-")}>&minus;</button>
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("+")}>&#43;</button>
          <button onClick={() => handleClick("0")} className="wide">
            0
          </button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={handleEquals}>=</button>
        </div>
      </div>
    </section>
  );
};
