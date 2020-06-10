import { combineReducers } from "redux";

import { voicesReducer } from "./voicesReducer";
import { filterReducer } from "./filterReducer";

export default () =>
  combineReducers({
    voices: voicesReducer,
    filter: filterReducer,
  });
