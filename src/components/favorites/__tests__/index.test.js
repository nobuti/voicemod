import React from "react";
import { render, screen } from "@testing-library/react";
import Favorites from "../";

describe("Favorites", () => {
  test("should render properly", () => {
    const props = {
      voices: [
        { id: "wadus", name: "Wadus", icon: "VoicesVoiceIcon01.png" },
        { id: "manzana", name: "Manzana", icon: "VoicesVoiceIcon02.png" },
        { id: "cebolleta", name: "Cebolleta", icon: "VoicesVoiceIcon01.png" },
      ],
      favorites: ["manzana"],
    };

    const { container } = render(<Favorites {...props} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId("grid-title").textContent).toEqual(
      "Favourite voices"
    );
    expect(screen.getAllByTestId("voice")).toHaveLength(props.favorites.length);
  });

  test("should show empty message properly", () => {
    const props = {
      voices: [
        { id: "wadus", name: "Wadus", icon: "VoicesVoiceIcon01.png" },
        { id: "manzana", name: "Manzana", icon: "VoicesVoiceIcon02.png" },
        { id: "cebolleta", name: "Cebolleta", icon: "VoicesVoiceIcon01.png" },
      ],
      favorites: [],
    };

    render(<Favorites {...props} />);
    expect(screen.getByTestId("favourite-empty")).toBeInTheDocument();
  });
});
