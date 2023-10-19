import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { INITIAL_ORDER_COUNTS, PRICE_PER_ITEM } from "../constants/constants";
import {
  UpdateOptionCountType,
  OptionCountsType,
  OptionTypeT,
  OrderDetailsContextType,
} from "../types/types";

const OrderDetails = createContext<OrderDetailsContextType | null>(null);

// create a custom hook to check whether we're in a provider
// this function throws an error if we're not in contexts
// or returns the values of the context
// hooks start with use
export const useOrderDetails = (): OrderDetailsContextType => {
  const contextValue = useContext(OrderDetails);
  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider",
    );
  }
  return contextValue;
};

type OrderDetailsProviderProps = Record<string, unknown>;

export const OrderDetailsProvider: React.FC<
  PropsWithChildren<OrderDetailsProviderProps>
> = (props) => {
  const [optionCounts, setOptionCounts] =
    useState<OptionCountsType>(INITIAL_ORDER_COUNTS);

  function resetOrder(): void {
    setOptionCounts(INITIAL_ORDER_COUNTS);
  }

  function updateOptionCounts({
    optionType,
    itemName,
    newItemCount,
  }: UpdateOptionCountType): void {
    const newOptionCounts: OptionCountsType = {...optionCounts};
    newOptionCounts[optionType][itemName] = newItemCount;
    setOptionCounts(newOptionCounts);
  }

  function calculateSubTotal(optionType: OptionTypeT): number {
    // get an array of counts for the option type (for example [2, 1, 0])
    const countsArray = Object.values(optionCounts[optionType]);
    const optionCount = countsArray.reduce(
      (total, value) => total + value,
      0,
    );
    return optionCount * PRICE_PER_ITEM[optionType];
  }

  const subTotals = {
    scoops: calculateSubTotal("scoops"),
    toppings: calculateSubTotal("toppings"),
  };

  const value =  { optionCounts, subTotals, updateOptionCounts, resetOrder };
  return (
    <OrderDetails.Provider value={value} {...props} />
  );
};
