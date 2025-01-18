import "./Mobile.scss";
import { Routes, Route } from "react-router-dom";

export const Mobile = () => {
  return (
    <section className="mobile-container">
      <div className="mobile-content">
        <Routes>
          <Route path="/">
            <Route path="/" index element={<h1>Home</h1>} />
            <Route path="about" element={<h1>About</h1>} />
            <Route path="account" element={<h1>account</h1>} />
          </Route>
        </Routes>
      </div>
    </section>
  );
};
