import { voicesReducer } from "../voicesReducer";
import { types } from "../../types";

describe("voicesReducer", () => {
  it("should return the initial state", () => {
    expect(voicesReducer(undefined, {})).toEqual({
      collection: null,
      favorites: null,
      fetching: true,
    });
  });

  it("should init voices properly", () => {
    const payload = {
      voices: [
        { id: "wadus", name: "wadus", icon: "wadus.png" },
        { id: "man", name: "man", icon: "man.png" },
        { id: "women", name: "women", icon: "women.png" },
      ],
      favorites: [],
    };
    const state = voicesReducer(undefined, {
      type: types.INIT_VOICES,
      ...payload,
    });

    expect(state.fetching).toBe(false);
    expect(state.collection.length).toBe(payload.voices.length);
    expect(state.favorites.length).toBe(payload.favorites.length);

    payload.voices.forEach((voice, index) => {
      expect(state.collection[index]).toEqual(voice);
    });
  });

  it("should add favorite properly", () => {
    const initialState = {
      collection: [
        { id: "wadus", name: "wadus", icon: "wadus.png" },
        { id: "man", name: "man", icon: "man.png" },
        { id: "women", name: "women", icon: "women.png" },
      ],
      favorites: [],
    };

    const state = voicesReducer(initialState, {
      type: types.ADD_FAVORITE,
      voice: "wadus",
    });

    expect(state.favorites.length).toBe(1);
    expect(state.favorites[0]).toEqual(initialState.collection[0].id);
  });

  it("should remove favorite properly", () => {
    const initialState = {
      collection: [
        { id: "wadus", name: "wadus", icon: "wadus.png" },
        { id: "man", name: "man", icon: "man.png" },
        { id: "women", name: "women", icon: "women.png" },
      ],
      favorites: ["man"],
    };

    const state = voicesReducer(initialState, {
      type: types.REMOVE_FAVORITE,
      voice: "man",
    });

    expect(state.favorites.length).toBe(0);
  });
});
