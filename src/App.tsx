import React, { useState } from "react";
import "./App.css";
import Entry from "./pages/entry/Entry";
import { OrderDetailsProvider } from "./contexts/OrderDetailsProvider";
import { StagesType } from "./types/types";
import OrderSummary from "./pages/summary/OrderSummary";
import SummaryForm from "./pages/summary/SummaryForm";

function App() {
  const [stage, setStage] = useState<StagesType>("entry");

  return (
    <OrderDetailsProvider>
      {stage === "entry" && <Entry setStage={setStage} />}
      {stage === "summary" && (
        <>
          <OrderSummary />
          <SummaryForm />
        </>
      )}
    </OrderDetailsProvider>
  );
}

export default App;
