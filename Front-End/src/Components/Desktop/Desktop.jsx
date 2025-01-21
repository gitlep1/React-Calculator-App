import "./Desktop.scss";
import { Routes, Route } from "react-router-dom";

import { Homepage } from "../HomePage/Homepage";
import { Calculators } from "../Calculators/Calculators";
import { Accountpage } from "../AccountPage/Account";
import { About } from "../AboutPage/About";

export const Desktop = () => {
  return (
    <section className="desktop-container">
      <div className="desktop-content">
        <Routes>
          <Route path="/">
            <Route path="/" index element={<Homepage />} />
            <Route path="calculators" element={<Calculators />} />
            <Route path="account" element={<Accountpage />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </div>
    </section>
  );
};
