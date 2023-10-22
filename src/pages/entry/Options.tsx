import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingsOption from "./ToppingsOption";
import Error from "../common/Error";
import { PRICE_PER_ITEM } from "../../constants/constants";
import { DataType, OptionTypeT } from "../../types/types";
import { useOrderDetails } from "../../contexts/OrderDetailsProvider";

export default function Options({ optionType }: { optionType: OptionTypeT }) {
  // context
  const { subTotals } = useOrderDetails();
  // states
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState<boolean>(false);

  // fetch scoops/toppings data from server
  useEffect(() => {
    const controller = new AbortController();
    fetch(`http://localhost:3035/${optionType}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => setError(true));
    return () => controller.abort();
  }, [optionType]);

  // render error if error occurs
  if (error) {
    return (
      <Error errorMessage={"Error occured while fetching data from server"} />
    );
  }

  const OptionComponent =
    optionType === "scoops" ? ScoopOption : ToppingsOption;

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        {capitalizeFirstLetter(optionType)}
      </h2>
      <h3 data-testid={`${optionType}-price`}>
        ${PRICE_PER_ITEM[optionType].toFixed(2)} each.
      </h3>
      <h3 data-testid={`${optionType}-subtotal`}>
        SubTotal: ${subTotals[optionType].toFixed(2)}
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {data.map((item) => {
          return (
            <OptionComponent
              key={item.name}
              item={item}
              optionType={optionType}
            />
          );
        })}
      </div>
    </>
  );
}

// helper functions
const capitalizeFirstLetter = (string: string): string => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};
