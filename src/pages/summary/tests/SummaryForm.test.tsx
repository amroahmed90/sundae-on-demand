import React from "react";
import { render, screen } from "../../../testing-utils/testing-library-utils";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("Initial conditions", () => {
  test("Checkbox is unchecked by default", () => {
    render(<SummaryForm setStage={jest.fn()} />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();
  });

  test("Submit button is disabled by default", () => {
    render(<SummaryForm setStage={jest.fn()} />);
    const button = screen.getByRole("button", { name: /confirm order/i });
    expect(button).toBeDisabled();
  });
});

describe("Checkbox and button interactions", () => {
  test("Button is enabled when checkbox is checked", async () => {
    const user = userEvent.setup();

    render(<SummaryForm setStage={jest.fn()} />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });

    // check checkbox
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();

    // uncheck checkbox
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });
});

describe("tooltip responds to hover", () => {
  test("tooltip starts out hidden", () => {
    // initial coinditions => tooltip is hidden
    render(<SummaryForm setStage={jest.fn()} />);
    const tooltip = screen.queryByText(
      /no ice-cream will be actually delivered/i,
    );
    expect(tooltip).not.toBeInTheDocument();
  });

  test("tooltip appears upon mouseover of checkbox label and disappears upon mouseleave", async () => {
    render(<SummaryForm setStage={jest.fn()} />);
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    // on mouseover => tooltip appears
    await userEvent.hover(termsAndConditions);
    const tooltip = screen.getByText(
      /no ice-cream will be actually delivered/i,
    );
    expect(tooltip).toBeInTheDocument();

    // on mouseout => tooltip disappears
    await userEvent.unhover(termsAndConditions);
    expect(tooltip).not.toBeInTheDocument();
  });
});
