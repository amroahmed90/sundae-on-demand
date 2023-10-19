import React from "react";
import { Button } from "react-bootstrap";
import Options from "./Options";
import { SetStageType } from "../../types/types";
import { useOrderDetails } from "../../contexts/OrderDetailsProvider";


export default function Entry({ setStage }: SetStageType) {
  // context
  const { subTotals } = useOrderDetails();

  const total = subTotals["scoops"] + subTotals["toppings"]
  
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Customize Your Sunday!</h1>
      <Options optionType="scoops" />
      <hr />
      <Options optionType="toppings" />
      <hr />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h2>Grand Total = ${total}</h2>
      <Button type="button" onClick={() => setStage("summary")} disabled={total < 2}>To Checkout</Button>
      </div>
      <br />
    </>
  );
}
