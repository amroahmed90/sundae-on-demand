import React from "react";
import { Card, Form } from "react-bootstrap";

type Props = {
  item: {
    name: string;
    imagePath: string;
  },
};

export default function ScoopOption({ item }: Props) {

  return (
    <Card style={{ width: "20rem", padding: "10px", margin: "5px" }}>
      <Card.Img
        variant="top"
        src={`http://localhost:3031/${item.imagePath}`}
        alt={`${item.name} scoop`}
      />
      <Card.Body>
        <Card.Title style={{ textAlign: "center", marginTop: "10px" }}>
          {item.name}
        </Card.Title>
        <Form.Group style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Form.Label style={{ marginRight: "5px" }}>Count:{" "}</Form.Label>
          <Form.Select aria-label="Scoop Count">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
