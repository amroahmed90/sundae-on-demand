import React from "react";
import { Alert } from "react-bootstrap";

export default function Error({ errorMessage }: { errorMessage: string }) {
  return <Alert variant="danger">{errorMessage}</Alert>;
}
