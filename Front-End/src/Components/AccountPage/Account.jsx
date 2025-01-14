import "./Account.scss";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Signin } from "./Signin/Signin";
import { Signup } from "./Signup/Signup";

export const Accountpage = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  return (
    <div className="account-container">
      <h1>Account</h1>
      <div className="account-content">
        {isSigningUp ? <Signup /> : <Signin />}
      </div>
      <div>
        <Button variant="primary">
          {isSigningUp ? "Switch to Sign In" : "Switch to Sign Up"}
        </Button>
      </div>
    </div>
  );
};
