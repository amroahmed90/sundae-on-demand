import React from "react";
import { Card, Form } from "react-bootstrap";
import { OptionProps } from "./ScoopOption";

export default function ToppingsOption({ item }: OptionProps) {
  return (
    <Card
      style={{ width: "20rem", padding: "10px", margin: "5px" }}
      data-testid="card"
    >
      <Card.Img
        variant="top"
        src={`http://localhost:3031/${item.imagePath}`}
        alt={`${item.name} topping`}
      />
      <Card.Body>
        <Card.Title
          style={{ textAlign: "center", marginTop: "10px" }}
          data-testid="topping-name"
        >
          {item.name}
        </Card.Title>
        <Form.Group
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form.Check type="checkbox" label="Select" id={item.name} />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
