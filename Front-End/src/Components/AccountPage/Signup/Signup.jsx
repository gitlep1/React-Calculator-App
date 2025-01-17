import "./Signup.scss";
import { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const Signup = ({ handleSignUpClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleConfirmPassword = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleConfirmPassword()) {
      return;
    }

    try {
      await axios
        .post(`${API}/users`, {
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
      setError(`An error occurred while signing up: ${error}`);
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <Form className="auth-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 email-input" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p style={{ fontSize: "12px" }} className="small-text-muted">
            We&#39;ll never share your email with anyone else.
          </p>
        </Form.Group>

        <Form.Group
          className="mb-3 password-input"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          className="mb-3 password-input"
          controlId="formBasicConfirmPassword"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      <p
        className="switch-auth-mode"
        onClick={() => {
          handleSignUpClick();
        }}
      >
        Already have an account? Sign In
      </p>
    </div>
  );
};
