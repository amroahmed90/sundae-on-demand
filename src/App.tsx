import React, { useState } from "react";
import "./App.css";
import Entry from "./pages/entry/Entry";
import { OrderDetailsProvider } from "./contexts/OrderDetailsProvider";
import { StagesType } from "./types/types";
import OrderSummary from "./pages/summary/OrderSummary";
import SummaryForm from "./pages/summary/SummaryForm";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const [stage, setStage] = useState<StagesType>("entry");

  return (
    <OrderDetailsProvider>
      {stage === "entry" && <Entry setStage={setStage} />}
      {stage === "summary" && (
        <>
          <OrderSummary />
          <br />
          <SummaryForm setStage={setStage} />
        </>
      )}
      {stage === "confirmation" && <OrderConfirmation setStage={setStage} />}
    </OrderDetailsProvider>
  );
}

export default App;
