import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import API from "@/api/base";

import { alertReducer, homeReducer } from "./reducers";

import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({
  api: API.reducer,
  alert: alertReducer,
  home: homeReducer,
});

const rootReducer = (state, action) => {
  return reducers(action.type === "RESET_STATES" ? undefined : state, action);
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["home", "alert"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }).concat(API.middleware);

    return middlewares;
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
