import "./Calculators.scss";
import { BasicCalculator } from "./Basic/BasicCalculator";
import { ScientificCalculator } from "./Scientific/ScientificCalculator";
import Carousel from "react-bootstrap/Carousel";

export const Calculators = () => {
  return (
    <section className="calculators-container">
      <h1>Calculators</h1>
      <Carousel interval={null} variant="light">
        <Carousel.Item>
          <BasicCalculator />
        </Carousel.Item>
        <Carousel.Item>
          <ScientificCalculator />
        </Carousel.Item>
      </Carousel>
    </section>
  );
};
