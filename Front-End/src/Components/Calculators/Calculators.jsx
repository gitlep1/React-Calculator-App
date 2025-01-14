import "./Calculators.scss";
import { BasicCalculator } from "./Basic/BasicCalculator";

export const Calculators = () => {
  return (
    <section className="calculators-container">
      <h1>Calculators</h1>
      <BasicCalculator />
    </section>
  );
};
