import { render, screen } from "@testing-library/react";
import App from "./App.js";
import "@testing-library/jest-dom";

jest.mock("axios");

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(
    /Transcript to chatbot with a couple clicks/i
  );
  expect(linkElement).toBeInTheDocument();
});
