import { combineReducers, legacy_createStore as createStore } from "redux";
import modalWarning from "./modal-warning/reducer";
import onSidebar from "./sidebar/reducer";
import { userReducer } from "./user/reducer";

export const rootReducer = combineReducers({
  modalWarning,
  onSidebar,
  userReducer,
});

export const store = createStore(rootReducer);
