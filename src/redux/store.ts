import { combineReducers, legacy_createStore as createStore } from "redux";
import modalWarning from "./modal-warning/reducer";

export const rootReducer = combineReducers({
  modalWarning,
});

export const store = createStore(rootReducer);
