import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import layoutReducer from "./layout/reducer";
import navbarReducer from "./navbar/reducer";
// -------------------
import { authReducer } from "./auth/reducer";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: [
    "router",
    "layout",
    "spinningWheel",
  ],
};

export default function createReducer(asyncReducers, history) {
  return persistReducer(
    rootPersistConfig,
    combineReducers({
      ...asyncReducers,
      router: connectRouter(history),
      app: require("./app/reducer").reducer,
      auth: authReducer,
      layout: layoutReducer,
      navbar: navbarReducer,
      spinningWheel: require("./spinningWheel/reducer").reducer,
 


    })
  );
}
