import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "../App";

test("user work flow (happy path)", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);

  /* ENTRY PAGE */
  // make sure that "To Checkout" button is initially disabled (with no orders)
  const toChechoutBtn = screen.getByRole("button", { name: /to checkout/i });
  expect(toChechoutBtn).toBeDisabled();

  // add a scoop
  const saltedCaramel = await screen.findByTestId(
    /salted-caramel-scoop-count/i,
  );
  await user.clear(saltedCaramel);
  await user.type(saltedCaramel, "2");
  expect(saltedCaramel).toHaveValue(2);

  // add a topping
  const hotFudge = await screen.findByTestId(/hot-fudge-topping-select/i);
  await user.click(hotFudge);

  // check subtotals and grand total
  const subTotals = await screen.findAllByText(/subtotal/i, { exact: false });
  expect(subTotals[0]).toHaveTextContent("$4.00");
  expect(subTotals[1]).toHaveTextContent("$1.50");
  const grandTotal = await screen.findByText(/grand total/i, { exact: false });
  expect(grandTotal).toHaveTextContent("$5.50");

  // click "To Checkout" button
  await user.click(toChechoutBtn);

  /* ORDER SUMMARY PAGE */
  // order summary header
  const orderSummaryHeader = screen.getByText("Order Summary");
  expect(orderSummaryHeader).toBeInTheDocument();
  // scoops summary
  const scoopsSubtotal = await screen.findByText(/scoops sub-total/i, {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("$4.00");
  const scoopsList = await screen.findAllByText(/scoops$/i, { exact: false });
  expect(scoopsList).toHaveLength(1);
  scoopsList.forEach((list) =>
    expect(list).toHaveTextContent(/salted caramel: 2 scoops/i),
  );
  // toppings summary
  const toppingsSubtotal = await screen.findByText(/toppings sub-total/i, {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("$1.50");
  const toppingsList = await screen.findByText("Hot fudge");
  expect(toppingsList).toBeInTheDocument();
  // grand total
  const grandTotalSummary = await screen.findByText("Grand Total", {
    exact: false,
  });
  expect(grandTotalSummary).toBeInTheDocument();
  expect(grandTotalSummary).toHaveTextContent("$5.50");

  /* BACK TO ENTRY PAGE */
  const backToOrderBtn = screen.getByRole("button", { name: "Back to Order" });
  await user.click(backToOrderBtn);
  await waitFor(async () => {
    const toChechoutBtn = screen.getByRole("button", { name: /to checkout/i });
    expect(toChechoutBtn).toBeInTheDocument();
    await user.click(toChechoutBtn);
  });

  /* BACK TO ORDER SUMMARY PAGE */
  const confirmOrderBtn = screen.getByRole("button", { name: "Confirm Order" });
  expect(confirmOrderBtn).toBeDisabled();
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions.$/i,
  });
  await user.click(checkbox);
  await user.click(confirmOrderBtn);

  /* TO CONFIRMATION PAGE */
  await waitFor(() => {
    const confirmationHeader = screen.getByText("Order Confirmation");
    expect(confirmationHeader).toBeInTheDocument();
  });
  const orderNumber = await screen.findByText(/your order number is:/i, {
    exact: false,
  });
  await waitFor(() => expect(orderNumber).toHaveTextContent("#123"));
  const newOrderBtn = screen.getByRole("button", { name: "New Order" });
  await user.click(newOrderBtn);

  /* ENTRY PAGE */
  await waitFor(() => {
    const landingPageHeader = screen.getByText(/customize your sunday/i);
    expect(landingPageHeader).toBeInTheDocument();
  });
  // make sure all scoops are reset
  const scoopsInputs = await screen.findAllByTestId(/scoop-count$/i);
  scoopsInputs.forEach((input) => expect(input).toHaveValue(null));
  // make sure scoops subtotal is $0.00
  const scoopsSubtotalFinal = await screen.findByTestId(/scoops-subtotal/i, {
    exact: false,
  });
  expect(scoopsSubtotalFinal).toHaveTextContent("$0.00");
  // make sure price per scoop is correct ($2.00)
  const scoopsPrice = await screen.findByTestId(/scoops-price/i, {
    exact: false,
  });
  expect(scoopsPrice).toHaveTextContent("$2.00 each.");
  // make sure all toppings are reset
  const toppingsCheckboxes = await screen.findAllByTestId(/topping-select$/i, {
    exact: false,
  });
  toppingsCheckboxes.forEach((cb) => expect(cb).not.toBeChecked());
  // make sure toppings subtotal is $0.00
  const toppingsSubtotalFinal = await screen.findByTestId(
    /toppings-subtotal/i,
    {
      exact: false,
    },
  );
  expect(toppingsSubtotalFinal).toHaveTextContent("$0.00");
  // make sure price per item is correct ($1.50)
  const toppingsPrice = await screen.findByTestId(/toppings-price/i, {
    exact: false,
  });
  expect(toppingsPrice).toHaveTextContent("$1.50 each.");
  // make sure grand total is reset ($0.00)
  const grandTotalFinal = await screen.findByText(/grand total/i, {
    exact: false,
  });
  expect(grandTotalFinal).toHaveTextContent("$0.00");
  //expect "To Checkout" button to be disabled
  const toChechoutBtnFinal = screen.getByRole("button", {
    name: "To Checkout",
  });
  expect(toChechoutBtnFinal).toBeDisabled();

  unmount();
});
