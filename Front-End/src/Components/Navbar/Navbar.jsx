import "./Navbar.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { themeContext } from "../../CustomContexts/Contexts";

import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";

export const Navbar = () => {
  const { themeState, setThemeState } = useContext(themeContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar-container">
      <div className="nav-title">
        <h1>Calcutor</h1>
      </div>

      <div className="navbar-links">
        <h3
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </h3>
        <h3
          onClick={() => {
            navigate("/calculators");
          }}
        >
          Calculators
        </h3>
        <h3
          onClick={() => {
            navigate("/account");
          }}
        >
          Account
        </h3>
        <h3
          onClick={() => {
            navigate("/about");
          }}
        >
          About
        </h3>
      </div>

      <div
        className={`nav-theme-switcher-outer-box ${
          themeState === "dark" ? "theme-switcher-dark" : "theme-switcher-light"
        }`}
        style={
          themeState === "dark"
            ? { border: "1px solid whitesmoke" }
            : { border: "1px solid black" }
        }
        onClick={() => {
          setThemeState(themeState === "dark" ? "light" : "dark");
        }}
      >
        <div
          className="nav-theme-switcher-inner-box"
          style={
            themeState === "dark"
              ? { backgroundColor: "whitesmoke" }
              : { backgroundColor: "black" }
          }
        ></div>

        <FaMoon id="nav-dark-logo" />
        <IoIosSunny id="nav-light-logo" />
      </div>
    </nav>
  );
};
