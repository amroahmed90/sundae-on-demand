import { render, screen } from "@testing-library/react";
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
    const selectOptions = await screen.findAllByTestId(/select/i);
    expect(selectOptions.map((element) => element.textContent)).toEqual([
      "012",
      "012",
    ]); // 0, 1, 2 => to be edited when functionality is added
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
