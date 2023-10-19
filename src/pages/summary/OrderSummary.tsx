import React from "react";
import { useOrderDetails } from "../../contexts/OrderDetailsProvider";
import { OptionTypeT } from "../../types/types";

export default function OrderSummary() {
  //context
  const { subTotals } = useOrderDetails();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Order Summary</h1>
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <OptionSummary optionType={"scoops"} />
        <OptionSummary optionType={"toppings"} />
      </div>
      <br />
      <h2 style={{ textAlign: "center" }}>
        Grand Total: ${subTotals["scoops"] + subTotals["toppings"]}
      </h2>
    </>
  );
}

const OptionSummary = ({ optionType }: { optionType: OptionTypeT }) => {
  // context
  const { optionCounts, subTotals } = useOrderDetails();

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const option = { ...optionCounts[optionType] };

  const usedItemsArray = Object.keys(option).filter(
    (item) => option[item] !== 0,
  );

  return (
    <div>
      <h2>
        {title} sub-total: ${subTotals[optionType].toFixed(2)}
      </h2>
      <ul>
        {usedItemsArray.map((item) => (
          <li key={item}>
            <b>{item}:</b> {option[item]} {optionType}
          </li>
        ))}
      </ul>
    </div>
  );
};
