import { types } from "../types";

const initialState = {
  collection: null,
  favorites: null,
};

export const voicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_VOICES:
      return {
        ...state,
        collection: action.voices,
        favorites: action.favorites,
      };

    case types.ADD_FAVORITE:
      const [favorite] = state.collection.filter(
        (fav) => fav.id === action.voice
      );

      const favorites =
        favorite != null
          ? [...state.favorites, favorite]
          : [...state.favorites];

      return {
        ...state,
        favorites,
      };

    case types.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== action.voice),
      };

    default:
      return state;
  }
};
