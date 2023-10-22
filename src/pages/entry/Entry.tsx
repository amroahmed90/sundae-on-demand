import React from "react";
import Options from "./Options";
import { SetStageType } from "../../types/types";
import { useOrderDetails } from "../../contexts/OrderDetailsProvider";
import MyButton from "../common/MyButton";

export default function Entry({ setStage }: SetStageType) {
  // context
  const { subTotals } = useOrderDetails();

  const total = subTotals["scoops"] + subTotals["toppings"];

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Customize Your Sunday!</h1>
      <Options optionType="scoops" />
      <hr />
      <Options optionType="toppings" />
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Grand Total = ${total.toFixed(2)}</h2>
        <MyButton
          onClick={() => setStage("summary")}
          btnText="To Checkout"
          isDisabled={total < 2}
        />
      </div>
      <br />
    </>
  );
}
