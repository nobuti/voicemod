import { types } from "../types";
import config from "../../config";

const initialState = {
  collection: null,
  favorites: null,
};

const storage = window.sessionStorage;

const syncStorage = (payload) => {
  if (process.env.NODE_ENV !== "test") {
    storage.setItem(config.storageKey, JSON.stringify(payload));
  }
};

export const voicesReducer = (state = initialState, action) => {
  let favorites = null;

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

      favorites =
        favorite != null
          ? [...state.favorites, favorite]
          : [...state.favorites];
      syncStorage({ voices: state.collection, favorites: state.favorites });

      return {
        ...state,
        favorites,
      };

    case types.REMOVE_FAVORITE:
      favorites = state.favorites.filter((fav) => fav.id !== action.voice);
      syncStorage({ voices: state.collection, favorites });

      return {
        ...state,
        favorites,
      };

    default:
      return state;
  }
};
