import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserReducer from "../Slice/user.slice.js";

const rootReducer = combineReducers({
  userdata: UserReducer,
});

const PersistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(PersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistStor = persistStore(store);
