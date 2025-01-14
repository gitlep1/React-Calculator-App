import "./App.scss";
import { useState, useEffect, useContext } from "react";

import { screenVersionContext, themeContext } from "./CustomContexts/Contexts";
import { Navbar } from "./Components/Navbar/Navbar";
import { Desktop } from "./Components/Desktop/Desktop";
import { Mobile } from "./Components/Mobile/Mobile";

const App = () => {
  const screenVersion = useContext(screenVersionContext);
  const { themeState } = useContext(themeContext);

  return (
    <section
      className={`app ${themeState === "dark" ? "darkmode" : "lightmode"}`}
    >
      <Navbar />
      {screenVersion === "desktop" ? <Desktop /> : <Mobile />}
    </section>
  );
};

export default App;
