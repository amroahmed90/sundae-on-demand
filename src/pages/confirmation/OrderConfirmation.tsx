import React, { useEffect, useState } from "react";
import { SetStageType } from "../../types/types";
import { useOrderDetails } from "../../contexts/OrderDetailsProvider";
import { Form } from "react-bootstrap";
import MyButton from "../common/MyButton";
import axios from "axios";
import Error from "../common/Error";

export default function OrderConfirmation({ setStage }: SetStageType) {
  // context
  const { resetOrder } = useOrderDetails();
  // states
  const [orderNumber, setOrderNumber] = useState<number>();
  const [error, setError] = useState<boolean>(false);

  // post order to server
  useEffect(() => {
    axios
      .post("http://localhost:3035/order")
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((err) => setError(true));
  }, []);

  // handle click button event
  const handleButtonClick = () => {
    resetOrder();
    setStage("entry");
  };

  // error response from server
  if (error) {
    return (
      <Error errorMessage="Something Wrong happened when processing your order to the server. Please Try again later." />
    );
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Order Confirmation</h1>
      <br />
      <h2 style={{ textAlign: "center" }}>
        Your Order Number Is: #{orderNumber}
      </h2>
      <br />
      <Form.Group style={{ display: "flex", justifyContent: "center" }}>
        <MyButton onClick={handleButtonClick} btnText="New Order" />
      </Form.Group>
    </>
  );
}
