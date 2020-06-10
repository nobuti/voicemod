import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import Select from "../";

describe("Select", () => {
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "mango", label: "Mango" },
  ];

  const onChange = jest.fn();

  test("renders properly", () => {
    const { container } = render(
      <Select
        placeholder="Select Fruit"
        value={null}
        onChange={onChange}
        options={options}
      />
    );

    expect(container).toMatchSnapshot();
    expect(screen.queryByTestId("select")).toBeInTheDocument();
  });

  test("placeholder shows properly", () => {
    const placeholder = "Select your type of fruit";
    render(
      <Select
        placeholder={placeholder}
        value={null}
        onChange={onChange}
        options={options}
      />
    );

    expect(screen.queryByTestId("select-value").textContent).toEqual(
      placeholder
    );
  });

  test("initial value shows properly", () => {
    render(
      <Select
        placeholder="Fruits"
        value={options[1].value}
        onChange={onChange}
        options={options}
      />
    );

    expect(screen.queryByTestId("select-value").textContent).toEqual(
      options[1].label
    );
  });

  test("options are shown properly when click", () => {
    render(
      <Select
        placeholder="Fruits"
        value={null}
        onChange={onChange}
        options={options}
      />
    );

    fireEvent.click(screen.getByTestId("select-value"));

    expect(screen.queryAllByTestId("option")).toHaveLength(options.length);
  });

  test("options are toggled properly", () => {
    render(
      <Select
        placeholder="Fruits"
        value={null}
        onChange={onChange}
        options={options}
      />
    );

    fireEvent.click(screen.getByTestId("select-value"));
    expect(screen.queryAllByTestId("option")).toHaveLength(options.length);

    fireEvent.click(screen.getByTestId("select-value"));
    expect(screen.queryAllByTestId("option")).toHaveLength(0);
  });

  test("options are closed when click on outside", () => {
    render(
      <div>
        <Select
          placeholder="Fruits"
          value={null}
          onChange={onChange}
          options={options}
        />
        <div data-testid="wadus">wadus</div>
      </div>
    );

    fireEvent.click(screen.getByTestId("select-value"));
    fireEvent.mouseDown(screen.getByTestId("wadus"));

    expect(screen.queryAllByTestId("option")).toHaveLength(0);
  });

  describe("keyboard navigation", () => {
    test("should open when focus and down key is pressed", () => {
      render(
        <Select
          placeholder="Fruits"
          value={null}
          onChange={onChange}
          options={options}
        />
      );

      // fireEvent.focus doesn't seem to work here
      // https://github.com/testing-library/react-testing-library/issues/276#issuecomment-473392827
      act(() => screen.getByTestId("select").focus());

      fireEvent.keyDown(window, { key: "ArrowDown" });
      expect(screen.queryAllByTestId("option")).toHaveLength(options.length);
    });

    test("should navigate options with arrow keys", () => {
      render(
        <Select
          placeholder="Fruits"
          value={null}
          onChange={onChange}
          options={options}
        />
      );

      fireEvent.click(screen.getByTestId("select-value"));
      fireEvent.keyDown(window, { key: "ArrowDown" });
      fireEvent.keyDown(window, { key: "ArrowDown" });

      expect(screen.getByText("Orange")).toHaveClass("is-active");

      fireEvent.keyDown(window, { key: "ArrowUp" });
      expect(screen.getByText("Banana")).toHaveClass("is-active");
    });

    test("should select an option on enter key", () => {
      render(
        <Select
          placeholder="Fruits"
          value={null}
          onChange={onChange}
          options={options}
        />
      );

      fireEvent.click(screen.getByTestId("select-value"));
      fireEvent.keyDown(window, { key: "ArrowDown" });
      fireEvent.keyDown(window, { key: "Enter" });

      expect(onChange).toHaveBeenCalledWith("banana");
    });

    test("should close options on escape key", () => {
      render(
        <Select
          placeholder="Fruits"
          value={null}
          onChange={onChange}
          options={options}
        />
      );

      fireEvent.click(screen.getByTestId("select-value"));
      fireEvent.keyDown(window, { key: "Escape" });
      expect(screen.queryAllByTestId("option")).toHaveLength(0);
    });
  });
});
