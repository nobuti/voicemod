import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Filter } from "../";

jest.mock("../../../utils/debounce", () => jest.fn((fn) => fn));

describe("Filter", () => {
  const selectRandom = jest.fn();
  const updateFilter = jest.fn();

  const filter = {
    search: "",
    categorie: "all",
    sort: "asc",
  };

  const voices = [
    { id: 1, name: "zerous", tags: ["one"] },
    { id: 2, name: "cebolleta", tags: ["two"] },
    { id: 3, name: "wadus", tags: ["one", "two"] },
    { id: 4, name: "1x2", tags: ["three"] },
  ];

  test("should render properly", () => {
    const { container } = render(
      <Filter
        filter={filter}
        updateFilter={updateFilter}
        voices={voices}
        onRandom={selectRandom}
      />
    );

    expect(container).toMatchSnapshot();
    expect(screen.queryByTestId("filter")).toBeInTheDocument();
  });

  test("should show filter state properly", () => {
    const { rerender, container } = render(
      <Filter
        filter={filter}
        updateFilter={updateFilter}
        voices={voices}
        onRandom={selectRandom}
      />
    );

    const updatedFilter = {
      ...filter,
      categorie: "one",
    };

    rerender(
      <Filter
        filter={updatedFilter}
        updateFilter={updateFilter}
        voices={voices}
        onRandom={selectRandom}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test("should update filter state properly", () => {
    render(
      <Filter
        filter={filter}
        updateFilter={updateFilter}
        voices={voices}
        onRandom={selectRandom}
      />
    );

    fireEvent.change(screen.getByTestId("search-field"), {
      target: { value: "wadus" },
    });

    expect(updateFilter).toHaveBeenCalledWith({
      filter: "search",
      value: "wadus",
    });
  });

  test("should select random voice properly", () => {
    render(
      <Filter
        filter={filter}
        updateFilter={updateFilter}
        voices={voices}
        onRandom={selectRandom}
      />
    );
    fireEvent.click(screen.queryByTestId("filter-random"));
    expect(selectRandom).toHaveBeenCalled();
  });
});
