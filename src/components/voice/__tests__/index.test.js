import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { Voice } from "../";

describe("Voice", () => {
  const addFavorite = jest.fn();
  const removeFavorite = jest.fn();

  test("renders properly", () => {
    const { container } = render(
      <Voice
        id={1}
        name="Wadus"
        icon="VoicesVoiceIcon01.png"
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
      />
    );

    expect(container).toMatchSnapshot();
    expect(screen.queryByTestId("voice")).toBeInTheDocument();
  });

  test("renders properly when active", () => {
    render(
      <Voice
        id={1}
        name="Wadus"
        active={true}
        icon="VoicesVoiceIcon01.png"
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
      />
    );

    expect(screen.queryByTestId("voice")).toHaveClass("is-active");
  });

  test("renders properly when favorite", () => {
    render(
      <Voice
        id={1}
        name="Wadus"
        favorite={true}
        icon="VoicesVoiceIcon01.png"
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
      />
    );

    expect(screen.queryByTestId("voice")).toHaveClass("is-favorite");
  });

  test("fav button toggle favorite properly", () => {
    render(
      <Voice
        id={123}
        name="Wadus"
        icon="VoicesVoiceIcon01.png"
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
      />
    );

    fireEvent.click(screen.getByTestId("voice-fav"));
    expect(addFavorite).toHaveBeenCalledWith(123);
  });
});
