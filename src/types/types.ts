import { SetStateAction } from "react";

export type OptionTypeT = "scoops" | "toppings";

type ItemNameType =
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

export type UpdateOptionCountType = {
  optionType: OptionTypeT;
  itemName: ItemNameType;
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

type SubTotalsType = {
  scoops: number;
  toppings: number;
};

export type OrderDetailsContextType = {
  optionCounts: OptionCountsType;
  subTotals: SubTotalsType;
  updateOptionCounts: ({
    optionType,
    itemName,
    newItemCount,
  }: UpdateOptionCountType) => void;
  resetOrder: () => void;
};

// types for ScoopOptions.tsx
export type DataType = {
  name: ItemNameType;
  imagePath: string;
};
export type OptionProps = {
  item: DataType;
  optionType: OptionTypeT;
};

export type StagesType = "entry" | "summary" | "final";

export type SetStageType = {
  setStage: React.Dispatch<SetStateAction<StagesType>>;
};
