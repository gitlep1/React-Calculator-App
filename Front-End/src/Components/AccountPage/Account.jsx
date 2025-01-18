import "./Account.scss";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Signin } from "./Signin/Signin";
import { Signup } from "./Signup/Signup";
import { GoogleAuth } from "./GoogleAuth/GoogleAuth";

export const Accountpage = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSigningUp(!isSigningUp);
  };

  return (
    <div className="account-container">
      <div className="account-content">
        {isSigningUp ? (
          <Signup handleSignUpClick={handleSignUpClick} />
        ) : (
          <Signin handleSignUpClick={handleSignUpClick} />
        )}
        <GoogleAuth />
      </div>
    </div>
  );
};
