import { combineReducers, legacy_createStore as createStore } from "redux";
import modalWarning from "./modal-warning/reducer";
import onSidebar from "./sidebar/reducer";

export const rootReducer = combineReducers({
  modalWarning,
  onSidebar,
});

export const store = createStore(rootReducer);
