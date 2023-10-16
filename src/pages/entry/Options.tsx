import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingsOption from "./ToppingsOption";


type Props = {
  optionType: "scoops" | "toppings";
};

type DataType = {
  name: string;
  imagePath: string;
};

export default function Options({ optionType }: Props) {
  const [data, setData] = useState<DataType[]>([]);

  // fetch scoops/toppings data from server
  useEffect(() => {
    fetch(`http://localhost:3031/${optionType}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error => console.log(error)));
  }, [optionType]);

  const OptionComponent = optionType === "scoops" ? ScoopOption : ToppingsOption;

  return (
    <>
      <h1>{capitalizeFirstLetter(optionType)}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
        {data.map(item => {
          return (<OptionComponent key={item.name} item={item} />)
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
