import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Search from "../";

describe("Seacrh", () => {
  const onChange = jest.fn();

  test("renders properly", () => {
    const { container } = render(<Search onChange={onChange} name="wadus" />);

    expect(container).toMatchSnapshot();
    expect(screen.queryByTestId("search")).toBeInTheDocument();
  });

  test("search icon shows properly", () => {
    render(<Search onChange={onChange} />);

    expect(screen.queryByTestId("search-icon")).toBeDefined();
  });

  test("placeholder shows properly", () => {
    const placeholder = "Search something";
    render(<Search placeholder={placeholder} onChange={onChange} />);

    expect(screen.queryByTestId("search-field").placeholder).toEqual(
      placeholder
    );
  });

  test("manages focus properly", () => {
    render(<Search onChange={onChange} />);

    fireEvent.focus(screen.getByTestId("search-field"));

    expect(screen.queryByTestId("search")).toHaveClass("is-focused");
  });

  test("reset button is shown properly", () => {
    render(<Search onChange={onChange} />);

    expect(screen.queryByTestId("search-reset")).toBeNull();

    fireEvent.change(screen.getByTestId("search-field"), {
      target: { value: "wadus" },
    });

    expect(screen.getByTestId("search-field").value).toEqual("wadus");
    expect(screen.queryByTestId("search-reset")).toBeDefined();
  });

  test("reset button resets the field value properly", () => {
    render(<Search onChange={onChange} />);

    fireEvent.change(screen.getByTestId("search-field"), {
      target: { value: "wadus" },
    });

    expect(screen.getByTestId("search-field").value).toEqual("wadus");
    expect(onChange).toHaveBeenCalledWith("wadus");

    fireEvent.click(screen.getByTestId("search-reset"));
    expect(onChange).toHaveBeenCalledWith("");
  });
});
