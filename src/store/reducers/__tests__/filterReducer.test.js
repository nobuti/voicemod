import { filterReducer } from "../filterReducer";
import { types } from "../../types";

describe("filterReducer", () => {
  it("should return the initial state", () => {
    expect(filterReducer(undefined, {})).toEqual({
      search: "",
      categorie: "all",
      sort: "asc",
    });
  });

  it("should update filter properly", () => {
    let state = filterReducer(undefined, {
      type: types.UPDATE_FILTER,
      filter: "categorie",
      value: "wadus",
    });

    expect(state).toEqual({ categorie: "wadus", sort: "asc", search: "" });

    state = filterReducer(state, {
      type: types.UPDATE_FILTER,
      filter: "search",
      value: "voicemod",
    });

    expect(state).toEqual({
      categorie: "wadus",
      sort: "asc",
      search: "voicemod",
    });
  });

  it("should reset filter properly", () => {
    let state = filterReducer(undefined, {
      type: types.UPDATE_FILTER,
      filter: "categorie",
      value: "wadus",
    });

    state = filterReducer(state, {
      type: types.RESET_FILTER,
    });

    expect(state).toEqual({
      search: "",
      categorie: "all",
      sort: "asc",
    });
  });
});
