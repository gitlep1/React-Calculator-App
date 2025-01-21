import "./App.scss";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

import {
  screenVersionContext,
  themeContext,
  userContext,
  tokenContext,
} from "./CustomContexts/Contexts";
import CustomToastContainers from "./CustomFunctions/CustomToasts/CustomToastContainers";

import { Navbar } from "./Components/Navbar/Navbar";
import { Desktop } from "./Components/Desktop/Desktop";
import { Mobile } from "./Components/Mobile/Mobile";

const App = () => {
  const screenVersion = useContext(screenVersionContext);
  const { themeState } = useContext(themeContext);
  const { authUser, setAuthUser } = useContext(userContext);
  const { authToken, setAuthToken } = useContext(tokenContext);

  const userData = Cookies.get("authUser") || null;
  const tokenData = Cookies.get("token") || null;

  useEffect(() => {
    handleReauthUser();
  }, []); // eslint-disable-line

  const handleReauthUser = () => {
    if (
      userData !== "undefined" &&
      userData !== null &&
      tokenData !== "undefined" &&
      tokenData !== null
    ) {
      setAuthUser(JSON.parse(userData));
      setAuthToken(JSON.parse(tokenData));
    } else {
      setAuthUser(null);
      setAuthToken(null);
    }
  };

  return (
    <section
      className={`app ${themeState === "dark" ? "darkmode" : "lightmode"}`}
    >
      <Navbar />
      <CustomToastContainers />
      {screenVersion === "desktop" ? <Desktop /> : <Mobile />}
    </section>
  );
};

export default App;
