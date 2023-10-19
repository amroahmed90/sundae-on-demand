import React from "react";
import { Button } from "react-bootstrap";

type ButtonType = {
  variant?: string;
  onClick: () => void;
  btnText: string;
  isDisabled?: boolean;
};

export default function MyButton({
  variant = "primary",
  onClick,
  btnText,
  isDisabled = false,
}: ButtonType) {
  return (
    <Button
      variant={variant}
      type="button"
      style={{
        width: "25%",
        margin: "5px",
        fontWeight: "bold",
        fontSize: "22px",
      }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {btnText}
    </Button>
  );
}
