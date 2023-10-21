import { render, screen, waitFor } from "../../../testing-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

describe("test images response from server for scoops and toppings", () => {
  //scoops
  test("display images for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

    // find images
    const scoopImages = await screen.findAllByAltText(/scoop$/i);
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map(
      (element) => (element as HTMLImageElement).alt,
    );
    expect(altText).toEqual(["Mint Chip scoop", "Salted Caramel scoop"]);
  });

  //toppings
  test("display images for each topping option from server", async () => {
    render(<Options optionType="toppings" />);

    // find images
    const toppingImages = await screen.findAllByAltText(/topping$/i);
    expect(toppingImages).toHaveLength(2);

    // confirm alt text of images
    const altText = toppingImages.map(
      (element) => (element as HTMLImageElement).alt,
    );
    expect(altText).toEqual(["M&Ms topping", "Hot fudge topping"]);
  });
});

describe("test scoops and toppings Options component", () => {
  test("initial conditions for scoops", async () => {
    render(<Options optionType="scoops" />);

    // find scoops heading
    const scoopHeading = await screen.findByRole("heading", {
      name: /scoops/i,
    });
    expect(scoopHeading).toBeInTheDocument();

    // find cards
    const cards = await screen.findAllByTestId(/card/i);
    expect(cards).toHaveLength(2);

    // confirm labels
    const scoopNames = await screen.findAllByTestId(/scoop-name/i);
    expect(scoopNames.map((element) => element.textContent)).toEqual([
      "Mint Chip",
      "Salted Caramel",
    ]);

    // confirm select options
    const selectOptions = await screen.findAllByTestId(/scoop-count/i);
    expect(selectOptions).toHaveLength(2);
  });

  test("initial conditions for toppings", async () => {
    render(<Options optionType="toppings" />);

    // find toppings heading
    const scoopHeading = await screen.findByRole("heading", {
      name: /toppings/i,
    });
    expect(scoopHeading).toBeInTheDocument();

    // find cards
    const cards = await screen.findAllByTestId(/card/i);
    expect(cards).toHaveLength(2);

    // confirm labels
    const scoopNames = await screen.findAllByTestId(/topping-name/i);
    expect(scoopNames.map((element) => element.textContent)).toEqual([
      "M&Ms",
      "Hot fudge",
    ]);

    // confirm select options
    const checkboxes = await screen.findAllByRole("checkbox");
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked()); // add test for functionality
  });
});

describe("test subtotal", () => {
  const user = userEvent.setup();
  test("subtotal of scoops", async () => {
    render(<Options optionType="scoops" />);

    // find subtotal amount
    const subtotal = screen.getByText("Subtotal: $", { exact: false });

    // initially it will be $0.00
    expect(subtotal).toHaveTextContent("0.00");

    // update Mint chip to 1 and check subtotal ($2/scoop)
    const mintChipInput = await screen.findByTestId("mint-chip-scoop-count");
    await user.clear(mintChipInput);
    await user.type(mintChipInput, "1");

    expect(subtotal).toHaveTextContent("2.00");

    // update Salted caramel to 2 and check subtotal ($2/scoop)
    const saltedCaramelInput = await screen.findByTestId(
      "salted-caramel-scoop-count",
    );
    await user.clear(saltedCaramelInput);
    await user.type(saltedCaramelInput, "2");

    expect(subtotal).toHaveTextContent("6.00");
  });
  test("subtotal of toppings", async () => {
    render(<Options optionType="toppings" />)
    /* subtotal is initially 0.00 */
    const subTotal = await screen.findByText(/subtotal/i, { exact: false })
    expect(subTotal).toHaveTextContent("0.00")

    /* select some toppings and check subtotal */
    const toppingsSelect = await screen.findAllByText("Select")
    expect(toppingsSelect).toHaveLength(2)
    // click on toppings
    toppingsSelect.forEach(async (topping) => await userEvent.click(topping))
    // make sure checkboxes are checked after clicking on the labels
    const checkboxes = await screen.findAllByTestId("topping-select")
    await waitFor(() => checkboxes.forEach(cb => expect(cb).toBeChecked()))
    // make sure the toppings subtotal is updated    
    await waitFor(() => expect(subTotal).toHaveTextContent("3.00")) 

    /* deselect all toppings and assure subtotal is 0.00 */
    toppingsSelect.forEach(async (topping) => await userEvent.click(topping))
    // make sure checkboxes are unchecked after clicking on the labels the second time
    await waitFor(() => checkboxes.forEach(cb => expect(cb).not.toBeChecked()))
    // make sure the toppings subtotal is updated    
    await waitFor(() => expect(subTotal).toHaveTextContent("0.00"))

  })
});
