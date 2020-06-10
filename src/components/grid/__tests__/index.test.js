import React from "react";
import { render, screen } from "@testing-library/react";
import Grid from "../";

describe("Grid", () => {
  test("should render properly", () => {
    const { container } = render(
      <Grid title="Wadus">
        <li>wadus</li>
        <li>wadus</li>
      </Grid>
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId("grid")).toBeInTheDocument();
    expect(screen.getByTestId("grid-title").textContent).toEqual("Wadus");
  });
});
