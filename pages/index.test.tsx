import { render, screen } from "@testing-library/react";
import Index from "./index";

test("should show home page", () => {
  render(<Index />);
  expect(screen.getByText(/next starter/i)).toBeInTheDocument();
});
