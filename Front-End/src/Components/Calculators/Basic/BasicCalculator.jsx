import "./BasicCalculator.scss";
import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import axios from "axios";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const API = import.meta.env.VITE_API_URL;

export const BasicCalculator = () => {
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
          setHistory(res.data.payload);
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
            setHistory(res.data.payload);
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
              setHistory(res.data.payload);
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
            setHistory(res.data.payload);
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
    const token = JSON.parse(tokenData);

    const calculation = history.find((calc) => calc.id === calculationId);
    setCalculationDataId(calculation.id);

    if (calculation) {
      setInput(calculation.expression);
      setResult(calculation.result);
    }

    setEditing(true);
  };

  return (
    <section className="basic-calculator-container">
      <h1>Basic Calculator</h1>
      <p>Perform basic arithmetic calculations with ease.</p>
      {error && <p className="error">{error}</p>}

      <div className="basic-calculator-content">
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
            <Button onClick={handleClear} className="wide misc-buttons">
              C
            </Button>
            <Button onClick={handleBackspace} className="misc-buttons">
              &larr;
            </Button>
            <Button onClick={() => handleClick("/")}>&divide;</Button>
            <Button onClick={() => handleClick("7")}>7</Button>
            <Button onClick={() => handleClick("8")}>8</Button>
            <Button onClick={() => handleClick("9")}>9</Button>
            <Button onClick={() => handleClick("*")}>&times;</Button>
            <Button onClick={() => handleClick("4")}>4</Button>
            <Button onClick={() => handleClick("5")}>5</Button>
            <Button onClick={() => handleClick("6")}>6</Button>
            <Button onClick={() => handleClick("-")}>&minus;</Button>
            <Button onClick={() => handleClick("1")}>1</Button>
            <Button onClick={() => handleClick("2")}>2</Button>
            <Button onClick={() => handleClick("3")}>3</Button>
            <Button onClick={() => handleClick("+")}>&#43;</Button>
            <Button
              onClick={() => handleClick("0")}
              className="wide misc-buttons"
            >
              0
            </Button>
            <Button onClick={() => handleClick(".")} className="misc-buttons">
              .
            </Button>
            <Button onClick={handleEquals} className="misc-buttons">
              =
            </Button>
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
