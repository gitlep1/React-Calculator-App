import "./ScientificCalculator.scss";
import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import axios from "axios";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const API = import.meta.env.VITE_API_URL;

export const ScientificCalculator = () => {
  const authUser = Cookie.get("authUser") || null;
  const tokenData = Cookie.get("token") || null;

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [calculationDataId, setCalculationDataId] = useState("");
  const [history, setHistory] = useState([]);
  const [editing, setEditing] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    const token = JSON.parse(tokenData);

    if (authUser) {
      axios
        .get(`${API}/calculations/user-calculations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const DBHistory = res.data.payload;
          const scientificHistory = DBHistory.filter(
            (calc) => calc.calculator_type === "scientific"
          );
          setHistory(scientificHistory);
        })
        .catch((err) => {
          console.error("Error fetching user calculations:", err);
          setError(err.message);
        });
    }
  }, []); // eslint-disable-line

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
      const evalResult = evaluate(input).toString();
      setResult(evalResult);

      if (authUser) {
        const foundCalculation = history.find(
          (calc) => calc.id === calculationDataId
        );

        editing
          ? addEditToDB(input, evalResult, foundCalculation.id)
          : addHistoryToDB(input, evalResult);
      } else {
        setHistory((prev) => [
          ...prev,
          { expression: input, result: evalResult },
        ]);
      }
    } catch (error) {
      setResult("Error");
    }
  };

  const addHistoryToDB = async (expression, result) => {
    const calculationData = {
      expression,
      result,
      calculator_type: "scientific",
    };
    const token = JSON.parse(tokenData);

    await axios
      .post(`${API}/calculations`, calculationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async () => {
        await axios
          .get(`${API}/calculations/user-calculations`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const DBHistory = res.data.payload;
            const scientificHistory = DBHistory.filter(
              (calc) => calc.calculator_type === "scientific"
            );
            setHistory(scientificHistory);
          })
          .catch((err) => {
            console.error("Error fetching user calculations:", err);
            setError(err.message);
          });
      })
      .catch((err) => {
        console.error("Error adding history to DB:", err);
      });
  };

  const addEditToDB = async (expression, resultData, calcID) => {
    if (editing) {
      const token = JSON.parse(tokenData);

      const calculationData = {
        expression,
        result: resultData,
      };

      await axios
        .put(`${API}/calculations/${calcID}`, calculationData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async () => {
          await axios
            .get(`${API}/calculations/user-calculations`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              const DBHistory = res.data.payload;
              const scientificHistory = DBHistory.filter(
                (calc) => calc.calculator_type === "scientific"
              );
              setHistory(scientificHistory);
              setEditing(false);
            })
            .catch((err) => {
              console.error("Error fetching user calculations:", err);
              setError(err.message);
            });
        })
        .catch((err) => {
          console.error("Error updating calculation:", err);
        });
    }
  };

  const handleDeleteCalculation = async (calculationId) => {
    const token = JSON.parse(tokenData);

    if (editing) {
      return toast.error("Cannot delete a calculation while editing.", {
        containerId: "toast-notify",
      });
    }

    await axios
      .delete(`${API}/calculations/${calculationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async () => {
        await axios
          .get(`${API}/calculations/user-calculations`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const DBHistory = res.data.payload;
            const scientificHistory = DBHistory.filter(
              (calc) => calc.calculator_type === "scientific"
            );
            setHistory(scientificHistory);
          })
          .catch((err) => {
            console.error("Error fetching user calculations:", err);
            setError(err.message);
          });
      })
      .catch((err) => {
        console.error("Error deleting calculation:", err);
      });
  };

  const handleEditCalculation = async (calculationId) => {
    const calculation = history.find((calc) => calc.id === calculationId);
    setCalculationDataId(calculation.id);

    if (calculation) {
      setInput(calculation.expression);
      setResult(calculation.result);
    }

    setEditing(true);
  };

  return (
    <section className="scientific-calculator-container">
      <h1>Scientific Calculator</h1>
      <p>Advanced calculations for scientific purposes.</p>
      {error && <p className="error">{error}</p>}

      <div className="scientific-calculator-content">
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

        <div className="calculator-history-container">
          <h2>History</h2>
          <div className="history">
            {history.map((entry) => (
              <section className="history-entry-container" key={entry.id}>
                <MdDelete
                  className="delete-icon"
                  onClick={() => {
                    handleDeleteCalculation(entry.id);
                  }}
                />
                <div className="history-entry">
                  <p>{entry.expression}</p>
                  <p>= {entry.result}</p>
                </div>
                <FaEdit
                  className="edit-icon"
                  onClick={() => {
                    handleEditCalculation(entry.id);
                  }}
                />
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
