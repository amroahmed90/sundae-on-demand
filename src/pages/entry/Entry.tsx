import React from "react";
import Options from "./Options";

export default function Entry() {
  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </>
  );
}
