import React from "react";
import { screen } from "@testing-library/react";

import { customRender } from "../../../utils/test";
import Voices from "../";

describe("Voices", () => {
  test("should render properly", () => {
    const props = {
      voices: [
        { id: "wadus", name: "Wadus", icon: "VoicesVoiceIcon01.png" },
        { id: "manzana", name: "Manzana", icon: "VoicesVoiceIcon02.png" },
        { id: "cebolleta", name: "Cebolleta", icon: "VoicesVoiceIcon01.png" },
      ],
      favorites: ["manzana", "cebolleta"],
    };

    const { container } = customRender(<Voices {...props} />, {
      voices: {
        collection: props.voices,
        favorites: props.favorites,
      },
    });

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId("grid-title").textContent).toEqual("Pro voices");
  });

  test("should pass favorite prop properly", () => {
    const props = {
      voices: [
        { id: "manzana", name: "Manzana", icon: "VoicesVoiceIcon02.png" },
      ],
      favorites: ["manzana"],
    };

    customRender(<Voices {...props} />, {
      voices: {
        collection: props.voices,
        favorites: props.favorites,
      },
    });

    expect(screen.queryByTestId("voice")).toHaveClass("is-favorite");
  });

  test("should show empty message properly", () => {
    const props = {
      voices: [],
    };

    customRender(<Voices {...props} />, {
      voices: {
        collection: props.voices,
      },
    });
    expect(screen.getByTestId("voices-empty")).toBeInTheDocument();
  });
});
