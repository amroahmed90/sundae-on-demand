import { ReactElement } from "react";
import { RenderOptions, render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetailsProvider";

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  return render(ui, { wrapper: OrderDetailsProvider, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render
export { renderWithContext as render };
