import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  screenVersionContext,
  themeContext,
  authContext,
  errorContext,
} from "./Contexts";
import DetectScreenSize from "../CustomFunctions/DetectScreenSize";

const GlobalContextProvider = ({ children }) => {
  const [screenVersion, setScreenVersion] = useState("desktop");
  const [themeState, setThemeState] = useState("dark");
  const [authUser, setAuthUser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const checkScreenVersion = () => {
      const { width } = DetectScreenSize();
      setScreenVersion(width >= 800 ? "desktop" : "mobile");
    };

    checkScreenVersion();
    const intervalId = setInterval(checkScreenVersion, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <screenVersionContext.Provider value={screenVersion}>
      <themeContext.Provider value={{ themeState, setThemeState }}>
        <authContext.Provider value={{ authUser, setAuthUser }}>
          <errorContext.Provider value={{ error, setError }}>
            {children}
          </errorContext.Provider>
        </authContext.Provider>
      </themeContext.Provider>
    </screenVersionContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalContextProvider;
