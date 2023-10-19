import React, { useCallback } from "react";
import { Card, Form } from "react-bootstrap";
import { OptionProps } from "../../types/types";
import { useOrderDetails } from "../../contexts/OrderDetailsProvider";

export default function ToppingsOption({ optionType, item }: OptionProps) {
  // context
  const { optionCounts, updateOptionCounts } = useOrderDetails();

  // handle checbox event
  const handleCheckbox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newItemCount = optionCounts[optionType][item.name] === 1 ? 0 : 1;
      updateOptionCounts({ optionType, itemName: item.name, newItemCount });
    },
    [item.name, optionCounts, optionType, updateOptionCounts],
  );

  return (
    <Card
      style={{ width: "20rem", padding: "10px", margin: "5px" }}
      data-testid="card"
    >
      <Card.Img
        variant="top"
        src={`http://localhost:3035/${item.imagePath}`}
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
          <Form.Check
            type="checkbox"
            label="Select"
            id={item.name}
            checked={(optionCounts[optionType][item.name] as number) === 1}
            onChange={handleCheckbox}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
