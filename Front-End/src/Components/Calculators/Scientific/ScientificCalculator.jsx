import "./ScientificCalculator.scss";
import { useState } from "react";
import { evaluate } from "mathjs";
import { Button } from "react-bootstrap";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const ScientificCalculator = () => {
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
    <section className="scientific-calculator-container">
      <h1>Scientific Calculator</h1>
      <p>Advanced calculations for scientific purposes.</p>
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
          <div className="scientific-buttons-container">
            <Button variant="warning" onClick={() => handleClick("sin(")}>
              sin
            </Button>
            <Button variant="warning" onClick={() => handleClick("cos(")}>
              cos
            </Button>
            <Button variant="warning" onClick={() => handleClick("tan(")}>
              tan
            </Button>
            <Button variant="warning" onClick={() => handleClick("sqrt(")}>
              √
            </Button>
            <Button variant="warning" onClick={() => handleClick("^")}>
              ^
            </Button>
            <Button variant="warning" onClick={() => handleClick("log(")}>
              log
            </Button>
            <Button variant="warning" onClick={() => handleClick("ln(")}>
              ln
            </Button>
            <Button variant="warning" onClick={() => handleClick("pi")}>
              π
            </Button>
            <Button variant="warning" onClick={() => handleClick("e")}>
              e
            </Button>
            <Button variant="warning" onClick={() => handleClick("(")}>
              (
            </Button>
            <Button variant="warning" onClick={() => handleClick(")")}>
              )
            </Button>
            <Button variant="warning" onClick={() => handleClick("hyp(")}>
              hyp
            </Button>
          </div>

          <div className="number-buttons-container">
            {["9", "8", "7", "6", "5", "4", "3", "2", "1"].map((digit) => (
              <Button
                variant="primary"
                key={digit}
                onClick={() => handleClick(digit)}
              >
                {digit}
              </Button>
            ))}
          </div>

          <div className="basic-buttons-container">
            <Button variant="success" onClick={() => handleClick("/")}>
              &divide;
            </Button>
            <Button variant="success" onClick={() => handleClick("*")}>
              &times;
            </Button>
            <Button variant="success" onClick={() => handleClick("-")}>
              &minus;
            </Button>
            <Button variant="success" onClick={() => handleClick("+")}>
              &#43;
            </Button>
          </div>

          <div className="misc-calculator-buttons">
            <Button variant="dark" onClick={handleBackspace}>
              &larr;
            </Button>
            <Button
              variant="dark"
              onClick={() => handleClick("0")}
              className="wide"
            >
              0
            </Button>
            <Button variant="dark" onClick={() => handleClick(".")}>
              .
            </Button>
            <Button variant="dark" onClick={handleClear} className="wide">
              C
            </Button>
            <Button variant="dark" onClick={handleEquals}>
              =
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
