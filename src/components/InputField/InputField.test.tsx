// src/components/InputField/InputField.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";

test("renders label and helper text", () => {
  render(<InputField label="Email" helperText="We'll never share it" />);
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByText("We'll never share it")).toBeInTheDocument();
});

test("shows error message when invalid", () => {
  render(<InputField label="User" invalid errorMessage="Required" />);
  expect(screen.getByText("Required")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
});

test("clear button empties value", () => {
  let v = "hello";
  render(
    <InputField
      label="Name"
      value={v}
      clearable
      onChange={(e) => {
        v = e.target.value;
      }}
    />
  );
  fireEvent.click(screen.getByLabelText("Clear input"));
  expect(v).toBe("");
});

test("password toggle switches type", () => {
  render(<InputField label="Password" type="password" />);
  const btn = screen.getByLabelText("Show password");
  fireEvent.click(btn);
  expect(screen.getByLabelText("Hide password")).toBeInTheDocument();
});
