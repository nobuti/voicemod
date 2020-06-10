import { types } from "../types";

export function updateFilter({ filter, value }) {
  return {
    type: types.UPDATE_FILTER,
    filter,
    value,
  };
}

export function resetFilter() {
  return {
    type: types.RESET_FILTER,
  };
}
