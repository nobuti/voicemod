import { combineReducers } from "redux";

import { voicesReducer } from "./voicesReducer";

export default () =>
  combineReducers({
    voices: voicesReducer,
  });
