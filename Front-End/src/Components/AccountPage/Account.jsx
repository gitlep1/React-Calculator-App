import "./Account.scss";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Signin } from "./Signin/Signin";
import { Signup } from "./Signup/Signup";

export const Accountpage = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSigningUp(!isSigningUp);
  };

  return (
    <div className="account-container">
      <div>
        {isSigningUp ? (
          <Signup handleSignUpClick={handleSignUpClick} />
        ) : (
          <Signin handleSignUpClick={handleSignUpClick} />
        )}
      </div>
    </div>
  );
};
