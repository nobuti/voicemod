import { types } from "../types";

const initialState = {
  search: "",
  categorie: "all",
  sort: "asc",
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_FILTER:
      return {
        ...state,
        [action.filter]: action.value,
      };

    case types.RESET_FILTER:
      return initialState;

    default:
      return state;
  }
};
