import React from "react";
import Form from "react-bootstrap/Form";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { SetStageType } from "../../types/types";
import MyButton from "../common/MyButton";

export default function SummaryForm({ setStage }: SetStageType) {
  const [isChecked, setIsChecked] = React.useState(false);

  const checkboxLabel = (
    <span>
      I agree to{" "}
      <OverlayTrigger
        placement="right"
        overlay={(props) => (
          <Tooltip id="terms-and-conditions" {...props}>
            No ice-cream will be actually delivered!
          </Tooltip>
        )}
      >
        <span style={{ color: "blue", fontWeight: "bold" }}>
          Terms and Conditions.
        </span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group
        controlId="terms-and-conditions"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          label={checkboxLabel}
          style={{}}
        />
        <MyButton
          onClick={() => setStage("confirmation")}
          btnText="Confirm Order"
          isDisabled={!isChecked}
        />
        <MyButton
          variant="light"
          onClick={() => setStage("entry")}
          btnText="Back to Order"
        />
      </Form.Group>
    </Form>
  );
}
