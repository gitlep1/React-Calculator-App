import { render, screen, fireEvent } from "@testing-library/react";
import { BasicCalculator } from "./BasicCalculator";
import "@testing-library/jest-dom";

describe("BasicCalculator", () => {
  test("renders the calculator UI correctly", () => {
    render(<BasicCalculator />);

    // Check for buttons and display
    expect(screen.getByPlaceholderText("0")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("=")).toBeInTheDocument();
  });

  test("handles basic calculations", () => {
    render(<BasicCalculator />);

    // Simulate button clicks for 7 + 5
    fireEvent.click(screen.getByText("7"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("="));

    // Check the result
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  test("clears input when 'C' is clicked", () => {
    render(<BasicCalculator />);

    // Simulate input and clear
    fireEvent.click(screen.getByText("8"));
    fireEvent.click(screen.getByText("C"));

    // Verify input and result reset
    expect(screen.getByPlaceholderText("0").value).toBe("");
    expect(screen.queryByText("8")).not.toBeInTheDocument();
  });

  test("handles division by zero gracefully", () => {
    render(<BasicCalculator />);

    // Simulate division by zero
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("/"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByText("="));

    // Check for error
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  test("backspace removes the last character", () => {
    render(<BasicCalculator />);

    // Simulate input and backspace
    fireEvent.click(screen.getByText("9"));
    fireEvent.click(screen.getByText("8"));
    fireEvent.click(screen.getByText("←"));

    // Check the updated input
    const inputField = screen.getByPlaceholderText("0");
    expect(inputField.value).toBe("9");
  });
});
