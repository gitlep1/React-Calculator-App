import "./Account.scss";
import { useState, useEffect, useContext } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

import { userContext, tokenContext } from "../../CustomContexts/Contexts";
import { Signin } from "./Signin/Signin";
import { Signup } from "./Signup/Signup";
import { GoogleAuth } from "./GoogleAuth/GoogleAuth";

import { SetCookies, RemoveCookies } from "../../CustomFunctions/HandleCookies";

const API = import.meta.env.VITE_API_URL;

export const Accountpage = () => {
  let error = "";

  const userData = Cookies.get("authUser");
  const tokenData = Cookies.get("token");

  const { authUser, setAuthUser } = useContext(userContext);
  const { authToken, setAuthToken } = useContext(tokenContext);

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("default");
  const [profileimg, setProfileimg] = useState("");

  const handleSignUpClick = () => {
    setIsSigningUp(!isSigningUp);
  };

  if (authUser) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    SetCookies("authUser", authUser, expirationDate);
    SetCookies("token", authToken, expirationDate);
  }

  const renderAuthForms = () => {
    return (
      <>
        {isSigningUp ? (
          <Signup handleSignUpClick={handleSignUpClick} />
        ) : (
          <Signin handleSignUpClick={handleSignUpClick} />
        )}
        <GoogleAuth />
      </>
    );
  };

  const handleSignOut = () => {
    toast.success("You have been signed out.", {
      containerId: "toast-notify",
    });
    setTimeout(() => {
      RemoveCookies("authUser");
      RemoveCookies("token");
      setAuthUser(null);
      setAuthToken(null);
      window.location.reload();
    }, 4100);
  };

  const handleRevert = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setTheme("");
    setProfileimg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(tokenData);

    const updatedUser = {
      profileimg,
      email,
      username,
      password,
      theme,
    };

    await axios
      .put(`${API}/users/user`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAuthUser(res.data.payload);
        ToastNotify("Your profile has been updated.", false);
      })
      .catch((err) => {
        error = err.response.data.error;
        ToastNotify(error, true);
      })
      .finally(() => {
        setEmail("");
        setUsername("");
        setPassword("");
        setTheme("");
        setProfileimg("");
      });
  };

  const ToastNotify = (message, isError) => {
    if (isError) {
      toast.error(message, {
        containerId: "toast-notify",
      });
    } else {
      toast.success(message, {
        containerId: "toast-notify",
      });
    }
  };

  const formatTheme = (theme) => {
    return theme
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderAccountSettings = () => {
    if (userData && tokenData) {
      const user = JSON.parse(userData);

      return (
        <div className="account-settings-container">
          <h1 title="account-settings-title">Account Settings</h1>
          <Form className="account-settings-form">
            <Form.Group
              controlId="formBasicProfileimg"
              className="form-input account-settings-user-profileimg-container"
            >
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  user.profileimg === null ? "URL to pic" : user.profileimg
                }
                value={profileimg}
                onChange={(e) => setProfileimg(e.target.value)}
              />
              <Image
                id="account-settings-user-profileimg"
                src={user.profileimg === null ? profileimg : user.profileimg}
                alt="profile image"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="form-input">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={user.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicUsername" className="form-input">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="form-input">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicTheme" className="form-input">
              <Form.Label>Theme</Form.Label>
              <Form.Control
                as="select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value={user.theme}>{formatTheme(user.theme)}</option>
                <option value="ocean-breeze">
                  Ocean Breeze (Teal Navbar / Light Blue Body)
                </option>
                <option value="forest-glade">
                  Forest Glade (Dark Green Navbar / Light Green Body)
                </option>
                <option value="sunset-blush">
                  Sunset Blush (Orange Navbar / Pink Body)
                </option>
                <option value="midnight-dream">
                  Midnight Dream (Black Navbar / Dark Blue Body)
                </option>
                <option value="golden-dawn">
                  Golden Dawn (Gold Navbar / Cream Body)
                </option>
              </Form.Control>
            </Form.Group>

            <div className="account-settings-buttons">
              <Button variant="danger" onClick={handleRevert}>
                <span>Revert Changes</span>
              </Button>
              <Button variant="success" onClick={handleSubmit}>
                <span>Save Changes</span>
              </Button>
            </div>
          </Form>

          <Button
            className="sign-out-button"
            variant="primary"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="account-container">
      <div className="account-content">
        {authUser ? renderAccountSettings() : renderAuthForms()}
      </div>
    </div>
  );
};
