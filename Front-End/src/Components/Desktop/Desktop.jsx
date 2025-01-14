import "./Desktop.scss";
import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { Homepage } from "../HomePage/Homepage";
import { Calculators } from "../Calculators/Calculators";
import { Accountpage } from "../AccountPage/Account";

export const Desktop = () => {
  return (
    <section className="desktop-container">
      <div className="desktop-title">
        <h1>Desktop App</h1>
      </div>

      <div className="desktop-content">
        <Routes>
          <Route path="/">
            <Route path="/" index element={<Homepage />} />
            <Route path="calculators" element={<Calculators />} />
            <Route path="account" element={<Accountpage />} />
            <Route path="about" element={<h1>About</h1>} />
          </Route>
        </Routes>
      </div>
    </section>
  );
};
