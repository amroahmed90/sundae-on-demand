import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { OptionProps } from "../../types/types";
import { useOrderDetails } from "../../contexts/OrderDetailsProvider";

export default function ScoopOption({ item, optionType }: OptionProps) {
  // context
  const { optionCounts, updateOptionCounts } = useOrderDetails();
  // state
  const [isValid, setIsValid] = useState(true);

  // handle change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newItemCount = parseFloat(e.target.value);

    // check if new value is valid
    const isNewItemCountValid =
      newItemCount >= 0 &&
      newItemCount <= 10 &&
      Math.floor(newItemCount) === newItemCount;

    setIsValid(isNewItemCountValid);

    updateOptionCounts({
      optionType,
      itemName: item.name,
      newItemCount: isNewItemCountValid ? parseInt(e.target.value) : 0,
    });
  };

  return (
    <Card
      style={{ width: "20rem", padding: "10px", margin: "5px" }}
      data-testid="card"
    >
      <Card.Img
        variant="top"
        src={`http://localhost:3035/${item.imagePath}`}
        alt={`${item.name} scoop`}
      />
      <Card.Body>
        <Form.Group
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form.Label style={{ margin: "0 10px 0 0" }} data-testid="count">
            <Card.Title
              style={{ textAlign: "center", marginTop: "10px" }}
              data-testid="scoop-name"
            >
              {item.name}
            </Card.Title>
          </Form.Label>
          <Form.Control
            style={{ maxWidth: "40%" }}
            aria-label="Scoop Count"
            data-testid={`${item.name
              .toLowerCase()
              .replace(" ", "-")}-scoop-count`}
            type="number"
            defaultValue={optionCounts[optionType][item.name] as number}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
