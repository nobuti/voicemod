import { types } from "../types";

export function initVoices({ voices, favorites }) {
  return {
    type: types.INIT_VOICES,
    voices,
    favorites,
  };
}

export function addFavorite(id) {
  return {
    type: types.ADD_FAVORITE,
    voice: id,
  };
}

export function removeFavorite(id) {
  return {
    type: types.REMOVE_FAVORITE,
    voice: id,
  };
}
