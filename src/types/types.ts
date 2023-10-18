export type OptionTypeT = "scoops" | "toppings";

export type UpdateOptionCountType = {
  optionType: OptionTypeT;
  itemName:
    | "Mint chip"
    | "Vanilla"
    | "Chocolate"
    | "Salted caramel"
    | "M&Ms"
    | "Hot fudge"
    | "Peanut butter cups"
    | "Gummi bears"
    | "Mochi"
    | "Cherries";
  newItemCount: number;
};

export type OptionCountsType = {
  scoops: {
    [key: string]: number;
  };
  toppings: {
    [key: string]: number;
  };
};
