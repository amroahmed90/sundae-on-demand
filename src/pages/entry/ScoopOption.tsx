import React from "react";
import { Card, Form } from "react-bootstrap";

export type OptionProps = {
  item: {
    name: string;
    imagePath: string;
  },
};

export default function ScoopOption({ item }: OptionProps) {

  return (
    <Card style={{ width: "20rem", padding: "10px", margin: "5px" }} data-testid="card">
      <Card.Img
        variant="top"
        src={`http://localhost:3031/${item.imagePath}`}
        alt={`${item.name} scoop`}
      />
      <Card.Body>
        <Card.Title style={{ textAlign: "center", marginTop: "10px" }} data-testid="scoop-name">
          {item.name}
        </Card.Title>
        <Form.Group style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Form.Label style={{ margin: "0 10px 0 0" }} data-testid="count" >Count:{" "}</Form.Label>
          <Form.Select aria-label="Scoop Count" data-testid="select">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
