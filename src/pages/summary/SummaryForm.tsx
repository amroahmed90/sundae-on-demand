import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function SummaryForm() {
  const [isChecked, setIsChecked] = React.useState(false);

  const checkboxLabel = (
    <span>
      I agree to{" "}
      <OverlayTrigger
        placement="right"
        overlay={() => (
          <Tooltip id="terms-and-conditions">
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
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="button" disabled={!isChecked}>
        Confirm order
      </Button>
    </Form>
  );
}
