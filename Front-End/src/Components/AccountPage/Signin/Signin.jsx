import "./Signin.scss";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const Signin = ({ handleSignUpClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="auth-container">
      <h1>Sign In</h1>
      <Form className="auth-form">
        <Form.Group className="mb-3 email-input" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      <p
        className="switch-auth-mode"
        onClick={() => {
          handleSignUpClick();
        }}
      >
        Don&apos;t have an account? Sign Up
      </p>
    </div>
  );
};
