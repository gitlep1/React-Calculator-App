import "./App.scss";
import { useState, useEffect, useContext } from "react";

import { screenVersionContext, themeContext } from "./CustomContexts/Contexts";
import { Navbar } from "./Components/Navbar/Navbar";
import { Desktop } from "./Components/Desktop/Desktop";
import { Mobile } from "./Components/Mobile/Mobile";
import { ToastNotify } from "./CustomFunctions/ToastNotify/ToastNotify";

const App = () => {
  const screenVersion = useContext(screenVersionContext);
  const { themeState } = useContext(themeContext);

  return (
    <section
      className={`app ${themeState === "dark" ? "darkmode" : "lightmode"}`}
    >
      <Navbar />
      {/* <ToastNotify message={"Hello World"} /> */}
      {screenVersion === "desktop" ? <Desktop /> : <Mobile />}
    </section>
  );
};

export default App;
